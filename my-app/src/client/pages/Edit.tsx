import { AppstoreOutlined, ContainerOutlined, MailOutlined } from "@ant-design/icons"
import { Tabs } from "antd"
import styled from "styled-components"

const EditPageContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const EditPageAsider = styled.div`
    display: flex;
    flex-direction: column;
    
`

const NewButton = styled.button`
    background-color: blue;
    color: white;
    width: 84px;
    height: 36px;
    border-radius: 8px;
    margin: 8px 24px;
`

const EditPageContent = styled.div`

`

const EditPageContentHeader = styled.div`

`

const EditOption = styled.div`
    display: flex;
`

const EditOptionText = styled.div`
    color: black;
`

const EditOptionIcon = styled.div`
    color: black;
`

const {TabPane} = Tabs;

export const EditPage: React.FC = () => {
    return (
        <EditPageContainer>
            <NewButton>新建</NewButton>
            <EditPageAsider>
                <Tabs tabPosition="left">
                    <TabPane 
                        tab={
                            <span>
                                <ContainerOutlined />
                                我制作的情书
                            </span>
                        }
                        key="1"></TabPane>
                    <TabPane 
                        tab={
                            <span>
                                <MailOutlined />我收到的情书
                            </span>
                        }
                        key="2"></TabPane>
                    <TabPane 
                        tab={
                            <span>
                                <AppstoreOutlined />回收站
                            </span>
                        } 
                        key="3"></TabPane>
                </Tabs>
            </EditPageAsider>
            <EditPageContent></EditPageContent>
        </EditPageContainer>
    )
}