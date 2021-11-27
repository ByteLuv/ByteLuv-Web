import React, {
  DetailedReactHTMLElement,
  InputHTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef
} from "react";
import "@idraw/studio/dist/idraw-studio.css";
import styled from "styled-components";
import iDraw from "idraw";
import HeaderBar from "../components/HeaderBar";
import {Layout, Menu, Space} from "antd";
import {GeneralList} from "../components/GeneralList";
import {IconList} from "../components/IconList";
import Text from "antd/es/typography/Text";
import {TypeElementBase, TypeElemDesc} from "@idraw/types";

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;

const EditPageContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const IconContainer = styled.div`
  height: 80px;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`

let DragElement: TypeElementBase<keyof TypeElemDesc>;

const GeneralIcon:
  React.FC<{ icon: DetailedReactHTMLElement<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, text: string, element?: any }>
  = ({
       icon,
       text,
       element
     }) => {

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("type", element.type);
    DragElement = element;
  }

  return (
    <IconContainer>
      <div draggable={true} onDragStart={onDragStart}>
        {icon}
      </div>
      <Text style={{userSelect: "none"}}>{text}</Text>
    </IconContainer>
  )
}

export const EditPage: React.FC = () => {
  const ref: MutableRefObject<any> = useRef(null);
  let draw: iDraw;
  useEffect(() => {
    const data = {
      // bgColor: '#f0f0f0',
      elements: [
        {
          name: "rect-001",
          x: 160,
          y: 120,
          w: 200,
          h: 100,
          angle: 30,
          type: "rect",
          desc: {
            bgColor: "#d5f5f9",
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#3f51b5",
          },
        },
      ],
    }
    const options = {
      width: ref.current.clientWidth - 40,
      height: ref.current.clientHeight - 40,
      contextWidth: ref.current.clientWidth - 40,
      contextHeight: ref.current.clientHeight - 40,
      devicePixelRatio: 1,
    };
    draw = new iDraw(ref.current, options);
    draw.setData(data)
    draw.selectElementByIndex(0);
  })

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    console.log(event.dataTransfer.getData("type"))

    if (event.target === ref.current.children[0]) {
      let canvas = ref.current.children[0];

      DragElement.x = event.clientX - canvas.offsetLeft;
      DragElement.y = event.clientY - canvas.offsetTop;
      draw.addElement(DragElement);
    }
  }

  return (
    <EditPageContainer>
      <Layout>
        <Header>
          <HeaderBar/>
        </Header>
        <Layout>
          <Sider width={"30%"} style={{overflow: "hidden"}}>
            <Menu mode={"inline"} style={{height: "100%", borderRight: 0}}
                  defaultOpenKeys={["general", "icon"]}>
              <SubMenu key={"general"} title={"基础图形"}>
                <Space wrap size={"small"}>
                  {
                    GeneralList.map((item, index) => {
                      return <GeneralIcon key={index} icon={item.icon} text={item.name} element={item.element}/>;
                    })
                  }
                </Space>
              </SubMenu>
              <SubMenu key={"icon"} title={"特殊图形"}>
                <Space wrap size={"small"}>
                  {
                    IconList.map((item, index) => {
                      return <GeneralIcon key={index} icon={item.icon} text={item.name} element={item.element}/>;
                    })
                  }
                </Space>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{height: window.innerHeight - 64, width: "70%"}}>
            <div onDragOver={event => event.preventDefault()} onDrop={onDrop} ref={ref}
                 style={{height: "100%", width: "100%", padding: "20px"}}/>
          </Content>
        </Layout>
      </Layout>
    </EditPageContainer>
  );
};
