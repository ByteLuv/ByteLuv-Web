import React, {
  DetailedReactHTMLElement,
  InputHTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef, useState
} from "react";
import "@idraw/studio/dist/idraw-studio.css";
import styled from "styled-components";
import iDraw from "idraw";
import HeaderBar from "../components/HeaderBar";
import {Button, Form, Input, InputNumber, Layout, Menu, message, Space} from "antd";
import {GeneralList} from "../components/GeneralList";
import {IconList} from "../components/IconList";
import Text from "antd/es/typography/Text";
import {TypeElementBase, TypeElemDesc} from "@idraw/types";
import {store} from "../../utils/store";
import axios from "axios";
import {useLocation} from "react-router-dom";

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;

const uid = store.get("uid");

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

const DescriptionMenu: React.FC<{ draw: iDraw }> = ({draw}) => {

  let element = draw.getSelectedElements()[0];
  if (element == null) {
    return (
      <></>
    )
  }
  return (
    <Menu>
      <Form>
        <Form.Item label={"X"}>
          <InputNumber value={element.x}
                       onChange={value => {
                         element.x = value;
                         draw.updateElement(element);
                       }}/>
        </Form.Item>
        <Form.Item label={"Y"}>
          <InputNumber value={element.y}
                       onChange={value => {
                         element.y = value;
                         draw.updateElement(element);
                       }}/>
        </Form.Item>
        <Form.Item label={"W"}>
          <InputNumber value={element.w}
                       onChange={value => {
                         element.w = value;
                         draw.updateElement(element);
                       }}/>
        </Form.Item>
        <Form.Item label={"H"}>
          <InputNumber value={element.h}
                       onChange={value => {
                         element.h = value;
                         draw.updateElement(element);
                       }}/>
        </Form.Item>
        <Form.Item label={"Angle"}>
          <InputNumber value={element.angle}
                       onChange={value => {
                         element.angle = value;
                         draw.updateElement(element);
                       }}/>
        </Form.Item>
        {
          Object.keys(element.desc).map((item) => {
            // @ts-ignore
            let value = element.desc[item].toString();
            return (
              <Form.Item label={item}>
                <Input defaultValue={value} onChange={event => {
                  if (item == "borderWidth") {
                    // @ts-ignore
                    element.desc[item] = Number.parseInt(event.target.value);
                  } else {
                    // @ts-ignore
                    element.desc[item] = event.target.value;
                  }
                  draw.updateElement(element);
                }}/>
              </Form.Item>
            )
          })
        }
      </Form>
    </Menu>
  )
}

export const EditPage: React.FC = () => {
  const location = useLocation()
  console.log(location)

  const ref: MutableRefObject<any> = useRef(null);

  let [drawWidth, setDrawWidth] = useState(800);
  let [drawHeight, setDrawHeight] = useState(800);
  let [maxWidth, setMaxWidth] = useState(1000);
  let [maxHeight, setMaxHeight] = useState(1000);

  let [flag] = useState(false);
  let [draw, setDraw] = useState<iDraw>();

  let [elementList, setElementList] = useState<{ name: string, index: number }[]>();
  let [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // @ts-ignore
  useEffect(() => {
    setDrawWidth(ref.current.clientWidth);
    setDrawHeight(ref.current.clientHeight);
    setMaxWidth(ref.current.clientWidth);
    setMaxHeight(ref.current.clientHeight);
    const options = {
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
      contextWidth: ref.current.clientWidth,
      contextHeight: ref.current.clientHeight,
      devicePixelRatio: 1,
    };

    setDraw(new iDraw(ref.current, options, {scrollWrapper: {use: true}}));

    let canvas = ref.current.children[0];
    canvas.style.border = "1px solid black";
  }, [flag])

  useEffect(() => {
    draw?.setData({elements: []}, {triggerChangeEvent: true});
    draw?.on("changeData", e => {
      setElementList(e.elements.map((item, index) => {
        return {
          name: item.name || "Unnamed",
          index: index
        }
      }))
    });
    draw?.on("screenSelectElement", e => {
      if (e.index != null)
        setSelectedKeys([e.index.toString()]);
    });
  }, [draw])

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (event.target === ref.current.children[0]) {
      let canvas = ref.current.children[0];

      DragElement.x = event.clientX - canvas.offsetLeft;
      DragElement.y = event.clientY - canvas.offsetTop;
      draw?.addElement(DragElement);
    }
  }

  const upload = () => {
    let uploadData = {
      uid: uid,
      width: drawWidth,
      height: drawHeight,
      data: draw?.getData().elements
    };

    axios({
      url: "addLetterByUid",
      method: "POST",
      data: {
        uid: uid,
        content: JSON.stringify(uploadData)
      }
    }).then(response => {
        console.log(response);
      }
    )
  }

  return (
    <EditPageContainer>
      <Layout>
        <Header>
          <HeaderBar/>
        </Header>
        <Layout>
          <Sider width={"20%"} style={{overflow: "hidden"}} theme={"dark"}>
            <Menu mode={"inline"} style={{borderRight: 0}}
                  defaultOpenKeys={["general", "icon"]}>
              <SubMenu key={"general"} title={"基础图形"}>
                <Space wrap size={"small"} style={{marginBottom: 20}}>
                  {
                    GeneralList.map((item, index) => {
                      return <GeneralIcon key={index} icon={item.icon} text={item.name} element={item.element}/>;
                    })
                  }
                </Space>
              </SubMenu>
              <SubMenu key={"icon"} title={"特殊图形"}>
                <Space wrap size={"small"} style={{marginBottom: 20}}>
                  {
                    IconList.map((item, index) => {
                      return <GeneralIcon key={index} icon={item.icon} text={item.name} element={item.element}/>;
                    })
                  }
                </Space>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{height: window.innerHeight - 64, width: "60%"}}>
            <div style={{position: "absolute", right: 0, marginTop: 25, marginRight: "20%", width: 450}}>
              <Form layout={"inline"}>
                <Form.Item label={"Width"}>
                  <InputNumber value={drawWidth} onChange={value => {
                    setDrawWidth(value);
                    draw?.resetSize({
                      width: value > maxWidth ? maxWidth : drawWidth,
                      height: drawHeight > maxHeight ? maxHeight : drawHeight,
                      contextWidth: value,
                      contextHeight: drawHeight
                    })
                  }} onPressEnter={event => {
                    event.preventDefault();
                  }} min={200} step={10}/>
                </Form.Item>
                <Form.Item label={"Height"}>
                  <InputNumber value={drawHeight} onChange={value => {
                    setDrawHeight(value)
                    draw?.resetSize({
                      width: drawWidth > maxWidth ? maxWidth : drawWidth,
                      height: value > maxHeight ? maxHeight : drawHeight,
                      contextWidth: drawWidth,
                      contextHeight: value
                    })
                  }} min={200} step={10}/>
                </Form.Item>
                <Form.Item>
                  <Button type={"primary"} onClick={upload}>Upload</Button>
                </Form.Item>
              </Form>
            </div>
            <div onDragOver={event => event.preventDefault()} onDrop={onDrop} ref={ref}
                 style={{height: "100%", width: "100%", border: "20px solid white"}}>
            </div>
          </Content>
          <Sider width={"20%"} theme={"light"} style={{overflow: "hidden"}}>
            <Menu mode={"inline"} style={{height: "50%", maxHeight: "50%", borderRight: 0, overflow: "auto"}}
                  defaultOpenKeys={["elements"]} selectedKeys={selectedKeys}>
              <SubMenu key={"elements"} title={"元素"}>
                {
                  elementList?.map((item, index) => {
                    return <Menu.Item key={index}
                                      onClick={() => {
                                        setSelectedKeys([index.toString()]);
                                        draw?.selectElementByIndex(index);
                                      }}>{item.name}</Menu.Item>
                  })
                }
              </SubMenu>
            </Menu>
            <Menu mode={"inline"} style={{height: "50%", borderRight: 0}}
                  defaultOpenKeys={["description"]}>
              <SubMenu key={"description"} title={"描述"}>
                {
                  selectedKeys.length != 0 ? (
                    <DescriptionMenu draw={draw as iDraw}/>
                  ) : null
                }
              </SubMenu>
            </Menu>
          </Sider>
        </Layout>
      </Layout>
    </EditPageContainer>
  );
};
