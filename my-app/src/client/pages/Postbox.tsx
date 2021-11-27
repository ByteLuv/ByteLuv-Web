import {
  AppstoreOutlined,
  ContainerOutlined,
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Card, Popconfirm, Tabs, message } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { LuvLetter } from "../../api/postbox";
import { store } from "../../utils/store";
import { TypeData } from "@idraw/types";
import { useHistory }  from "react-router-dom";

const { TabPane } = Tabs;
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
  height: 20%;
  width: 20%;
`;

const PreviewCards: React.FC<{ list: LuvLetter[]; onConfirm: () => void }> = ({
  list,
  onConfirm,
}) => {
  let history = useHistory()
  return (
    <PreviewCardsContainer>
      {list.map((item) => {
        return (
          <PreviewCardContainer>
            <Card
              onClick={() => history.push("/editor")}
              actions={[
                <EditOutlined key="edit" />,
                <Popconfirm
                  title="确定要删除这封情书吗"
                  onConfirm={() => {
                    onConfirm();
                    message.success("已删除");
                  }}
                  onCancel={() => {
                    message.error("已取消");
                  }}
                  okText="删除"
                  cancelText="取消"
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
              ]}
            />
          </PreviewCardContainer>
        );
      })}
    </PreviewCardsContainer>
  );
};

export const PostboxPage: React.FC = () => {
  const [list, setList] = useState<LuvLetter[]>([]);

  const onClickNewButton = () => {
    setList([...list, { uid, name: "undefined", data: {} as TypeData, id: 0 }]);
    //GetList
  };

  const onDelete = (id: number) => {
    setList(list.filter((item) => item.id === id));
    //GetList
  };

  useEffect(() => {
    //GetList
  });

  return (
    <PostboxPageContainer>
      <NewButton onClick={onClickNewButton}>新建情书</NewButton>
      <PostboxPageAsider>
        <Tabs tabPosition="left">
          <TabPane
            tab={
              <span>
                <ContainerOutlined />
                我制作的情书
              </span>
            }
            key="1"
          >
            <TabPaneTitle>文件</TabPaneTitle>
            <PreviewCards list={list} onConfirm={onDelete}></PreviewCards>
          </TabPane>
          <TabPane
            tab={
              <span>
                <MailOutlined />
                我收到的情书
              </span>
            }
            key="2"
          ></TabPane>
          <TabPane
            tab={
              <span>
                <AppstoreOutlined />
                其他应用
              </span>
            }
            key="3"
          ></TabPane>
        </Tabs>
      </PostboxPageAsider>
      <PostboxPageContent></PostboxPageContent>
    </PostboxPageContainer>
  );
};
