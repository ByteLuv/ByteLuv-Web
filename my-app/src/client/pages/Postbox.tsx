import {
  AppstoreOutlined,
  ContainerOutlined,
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Card, Popconfirm, Tabs, message } from "antd";
import styled from "styled-components";

const { TabPane } = Tabs;

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

const PreviewCards: React.FC = () => {
  return (
    <PreviewCardsContainer>
      <PreviewCardContainer>
        <Card
          cover={
            <img
              alt=""
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <EditOutlined key="edit" />,
            <Popconfirm
              title="确定要删除这封情书吗"
              onConfirm={() => {
                message.success("删除的情书可以在回收站找到哟");
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
    </PreviewCardsContainer>
  );
};

export const PostboxPage: React.FC = () => {
  return (
    <PostboxPageContainer>
      <NewButton>新建</NewButton>
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
            <PreviewCards></PreviewCards>
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
                回收站
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
