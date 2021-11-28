import {
  AppstoreOutlined,
  ContainerOutlined,
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {Card, Popconfirm, Tabs, message, Layout, Space, Image} from "antd";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {LuvLetter} from "../../api/postbox";
import {store} from "../../utils/store";
import {TypeData, TypeElement} from "@idraw/types";
import {useNavigate} from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import iDraw from "idraw";
import ReactDOM from "react-dom";
import {TypeElemDesc} from "@idraw/types/src/lib/element";

const {Header, Sider, Content} = Layout;
const {TabPane} = Tabs;
const uid = store.get("uid") || 0;
const PostboxPageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PostboxPageAsider = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewButton = styled.button`
  background-color: #4386f5;
  color: white;
  width: 110px;
  height: 36px;
  border-radius: 8px;
  margin: 8px 24px;
`;

const PostboxPageContent = styled.div``;

const TabPaneTitle = styled.div`
  color: #aaa;
  font-size: 12px;
  margin-top: -4px;
  margin-bottom: 8px;
`;

const PreviewCardsContainer = styled.div`
  display: flex;
`;

const PreviewCardContainer = styled.div`
  height: 400px;
  width: 400px;
`;

const PreviewCards: React.FC<{ list: LuvLetter[]; onConfirm: (id: number) => void }>
  = ({
       list,
       onConfirm,
     }) => {
  let navigate = useNavigate();

  return (
    <Space wrap style={{width: "100%"}}>
      {list.map((item) => {
        return (
          <PreviewCardContainer>
            <CanvasCard
              actions={[
                <EditOutlined onClick={() => navigate("/editor", {state: {data: item}})} key="edit"/>,
                <Popconfirm
                  title="确定要删除这封情书吗"
                  onConfirm={() => {
                    onConfirm(item.id);
                    message.success("已删除", 1);
                  }}
                  onCancel={() => {
                    message.error("已取消", 1);
                  }}
                  okText="删除"
                  cancelText="取消"
                >
                  <DeleteOutlined key="delete"/>
                </Popconfirm>,
              ]}
              data={item}>
            </CanvasCard>
          </PreviewCardContainer>
        );
      })}
    </Space>
  );
};

const CanvasCard: React.FC<{ data: LuvLetter, actions: React.ReactNode[] }> = ({data, actions}) => {
  let ref: MutableRefObject<any> = useRef();
  let image: MutableRefObject<any> = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    let options = {
      width: 600,
      height: 600,
      contextWidth: 600,
      contextHeight: 600,
      devicePixelRatio: 1
    }
    let draw = new iDraw(ref.current, options);
    draw.setData({
      elements: data.content.data
    })
    draw.exportDataURL("image/png", 1).then(
      response => {
        image.current.src = response
      }
    );
  })

  return (
    <Card
      actions={actions}
      cover={
        <div onClick={() => {
          navigate("/editor", {state: {data: data}});
        }} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div ref={ref} id={"card" + data.id.toString()} style={{display: "none"}}/>
          <img ref={image} style={{width: 300, height: 300}}/>
        </div>
      }
    >
    </Card>
  )
}

export const PostboxPage: React.FC = () => {
  const [list, setList] = useState<LuvLetter[]>([]);
  const [flag] = useState(false);

  const onClickNewButton = () => {
    setList([...list, {uid, id: -1, content: {width: 0, height: 0, data: [] as TypeElement<keyof TypeElemDesc>[]}}]);
  };

  const onDelete = (id: number) => {
    setList(list.filter((item) => item.id !== id));
    //GetList
    axios({
      url: "/deleteLetterById",
      method: "GET",
      params: {id: id}
    }).then(response => {
      if (response.data.ErrorCode !== 0)
        message.error("出现了一些小问题", 1);
    })
  };

  useEffect(() => {
    axios({
      url: "/getLetterByUid",
      method: "GET",
      params: {
        uid: store.get("uid")
      }
    }).then(response => {
      setList(response.data.Schedule.map((item: { id: any; uid: any; content: string; }) => {
        return {
          id: item.id,
          uid: item.uid,
          content: JSON.parse(decodeURI(item.content))
        }
      }))
      if (response.data.ErrorCode !== 0)
        message.error("出现了一些小问题", 1);
    })
  }, [flag]);

  return (
    <Layout>
      <Header>
        <HeaderBar/>
      </Header>
      <Layout style={{height: window.innerHeight - 64}}>
        <PostboxPageContainer>
          <NewButton onClick={onClickNewButton}>新建情书</NewButton>
          <PostboxPageAsider>
            <Tabs tabPosition="left">
              <TabPane tab={<span><ContainerOutlined/>我制作的情书</span>} key="1">
                <TabPaneTitle>文件</TabPaneTitle>
                <PreviewCards list={list} onConfirm={onDelete}/>
              </TabPane>
              <TabPane tab={<span><MailOutlined/>我收到的情书</span>} key="2"/>
              <TabPane tab={<span><AppstoreOutlined/>其他应用</span>} key="3"/>
            </Tabs>
          </PostboxPageAsider>
          <PostboxPageContent/>
        </PostboxPageContainer>
      </Layout>
    </Layout>
  );
};
