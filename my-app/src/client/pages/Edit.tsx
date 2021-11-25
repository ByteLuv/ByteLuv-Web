import { Tabs } from "antd"
import styled from "styled-components"

const EditPageContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
`

const EditPageAsider = styled.div`
    display: flex;
    flex-direction: column;
`

const NewButton = styled.button`
    background-color: blue;
    color: white;
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
            <EditPageAsider>
                <Tabs tabPosition="left">
                    <TabPane tab="sending" key="1">我制作的情书</TabPane>
                    <TabPane tab="received" key="2">我收到的情书</TabPane>
                    <TabPane tab="deleted" key="3">回收站</TabPane>
                </Tabs>
            </EditPageAsider>
            <EditPageContent></EditPageContent>
        </EditPageContainer>
    )
}