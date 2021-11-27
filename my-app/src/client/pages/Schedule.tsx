import styled from "styled-components";
import moment from "moment";
import { Badge, Button, Calendar, Drawer, Form, Input, Select } from "antd";
import {
  CheckCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  AddScheduleDetail,
  DeleteScheduleDetail,
  GetMonthScheduleDetail,
  ModifyScheduleDetail,
  ModifyScheduleItemReq,
  OWNTYPE,
  ScheduleItemResp,
  ScheduleItemStatusType,
} from "../../api/schedule";
import { store } from "../../utils/store";

const uid = store.get("uid") ?? 0;

const SchedulePageContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const ScheduleContainer = styled.div``;

const DrawerItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DrawerItemTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: grey;
`;

const DrawerItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

const DrawerItemContentButtons = styled.div`
  min-width: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
`;

const DrawerItemContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DrawerEmpty = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddScheduleHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  weight: 100%;
  padding-bottom: 16px;
`;

const AddScheduleText = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: grey;
  margin-left: 8px;
`;

const AddScheduleContent = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "flex" : "none")}
  width: 100%;
  padding-bottom: 16px;
`;

const AddScheduleForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddSchedule: React.FC<{ date: string; update: () => void }> = ({
  date,
  update,
}) => {
  const [visible, setVisible] = useState(false);
  const [ownType, setOwnType] = useState<OWNTYPE>("own");
  const [content, setContent] = useState("");

  const AddScheduleItem = async () => {
    await AddScheduleDetail({
      content,
      date,
      ownType,
      statusType: "Default",
      uid,
    });
    update();
  };
  return (
    <AddScheduleContainer>
      <AddScheduleHeader
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? <MinusOutlined /> : <PlusOutlined />}
        <AddScheduleText>{visible ? "放弃添加" : "添加日程"}</AddScheduleText>
      </AddScheduleHeader>
      <AddScheduleContent visible={visible}>
        <AddScheduleForm>
          <Form layout={"horizontal"}>
            <Form.Item label="日程类型">
              <Select value={ownType} onChange={(val) => setOwnType(val)}>
                <Select.Option value="together">共同日程</Select.Option>
                <Select.Option value="own">我的日程</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="日程内容"
              rules={[{ required: true, message: "请输入内容！" }]}
            >
              <Input
                value={content}
                onChange={(event) => setContent(event.target.value)}
              ></Input>
            </Form.Item>
          </Form>
          <Button
            style={{ width: "50%", backgroundColor: "#1890ff", color: "white" }}
            onClick={AddScheduleItem}
          >
            添加
          </Button>
        </AddScheduleForm>
      </AddScheduleContent>
    </AddScheduleContainer>
  );
};

const DrawerItem: React.FC<{
  list: ModifyScheduleItemReq[];
  title: string;
  update: () => void;
}> = ({ list, title, update }) => {
  const [editId, setEditId] = useState<number[]>([]);
  const [editContent, setEditContent] = useState<Record<number, string>>({});
  const onClickDelete = async (dateId: number) => {
    await DeleteScheduleDetail(dateId);
  };
  return (
    <DrawerItemContainer>
      <DrawerItemTitle>{title}</DrawerItemTitle>
      <DrawerItemContentContainer>
        {list.map((item) => {
          return (
            <DrawerItemContent>
              <div>
                {editId.includes(item.id) ? (
                  <Input
                    defaultValue={item.content}
                    onChange={(e) => {
                      setEditContent((pre) => ({
                        ...pre,
                        [item.id]: e.target.value,
                      }));
                    }}
                  />
                ) : (
                  <span>{item.content}</span>
                )}
              </div>
              <DrawerItemContentButtons>
                {editId.includes(item.id) ? (
                  <CheckCircleTwoTone
                    onClick={async () => {
                      await ModifyScheduleDetail({
                        ...item,
                        dateId: item.id,
                        content: editContent[item.id],
                      });
                      setEditId((pre) =>
                        pre.filter((editItem) => editItem !== item.id)
                      );
                      update();
                    }}
                  />
                ) : (
                  <EditTwoTone
                    onClick={() => {
                      setEditId((pre) => [...pre, item.id]);
                    }}
                  />
                )}

                <DeleteTwoTone
                  onClick={() => {
                    onClickDelete(item.id);
                    update();
                  }}
                />
              </DrawerItemContentButtons>
            </DrawerItemContent>
          );
        })}
      </DrawerItemContentContainer>
    </DrawerItemContainer>
  );
};

const Schedule: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState<ModifyScheduleItemReq[]>([]);
  const [chosenDate, setChosenDate] = useState<string>("");

  const getMonthData = async () => {
    const data = await GetMonthScheduleDetail({ date: "2021-11-27", uid });
    setList(data as unknown as ModifyScheduleItemReq[]);
    console.log(data);
  };

  useEffect(() => {
    getMonthData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DrawerTypeMap = [
    {
      title: "共同日程",
      filter: (list: ModifyScheduleItemReq[]) =>
        list.filter((item) => item.ownType === "together"),
    },
    {
      title: "ta的日程",
      filter: (list: ModifyScheduleItemReq[]) =>
        list.filter((item) => item.ownType === "partner"),
    },
    {
      title: "你的日程",
      filter: (list: ModifyScheduleItemReq[]) =>
        list.filter((item) => item.ownType === "own"),
    },
  ];

  function dateCellRender(val: moment.Moment) {
    const current = list.filter(
      (schedule) => schedule.date === val.format("YYYY-MM-DD")
    );
    return (
      <div
        style={{ height: "100%" }}
        onClick={() => {
          setChosenDate(val.format("YYYY-MM-DD"));
          setVisible(true);
        }}
      >
        {current?.map((item) => (
          <div key={item.content}>
            <Badge
              status={
                item.statusType.toLowerCase() as
                  | "warning"
                  | "success"
                  | "error"
                  | "processing"
                  | "default"
                  | undefined
              }
              text={item.content}
            />
          </div>
        ))}
      </div>
    );
  }

  function monthCellRender(val: moment.Moment) {
    return <></>;
  }

  return (
    <>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      ></Calendar>
      <Drawer
        onClose={() => setVisible(false)}
        title="日程详情"
        visible={visible}
        placement="right"
        width="66%"
      >
        <AddSchedule
          date={chosenDate}
          update={async () => {
            await getMonthData();
          }}
        ></AddSchedule>
        {DrawerTypeMap.map((item) => {
          const resList = item?.filter(
            list.filter((val) => val.date === chosenDate)
          );
          return resList.length ? (
            <DrawerItem
              update={async () => {
                await getMonthData();
              }}
              key={item.title}
              title={item.title}
              list={resList}
            />
          ) : (
            <DrawerEmpty>
              <DrawerItemTitle>{item.title}</DrawerItemTitle>
              <div style={{ padding: "16px 0" }}>暂无相关日程</div>
            </DrawerEmpty>
          );
        })}
      </Drawer>
    </>
  );
};

export const SchedulePage: React.FC = () => {
  return (
    <SchedulePageContainer>
      <ScheduleContainer>
        <Schedule />
      </ScheduleContainer>
    </SchedulePageContainer>
  );
};
