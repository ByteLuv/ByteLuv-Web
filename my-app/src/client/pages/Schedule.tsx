import styled from "styled-components";
import moment from "moment";
import { Badge, Calendar, Drawer } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useState } from "react";
import { ScheduleItemStatusType } from "../../api/schedule";


interface ScheduleItem {
  type: ScheduleItemStatusType;
  content: string;
}

const SchedulePageContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const ScheduleContainer = styled.div``;

const ScheduleDetailItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ScheduleDetailButton = styled.div`
  min-width: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
`;

const ScheduleDetailList: React.FC<{ list: ScheduleItem[] }> = ({ list }) => (
  <>
    {list.map((item) => (
      <ScheduleDetailItemContainer>
        <div>{item.content}</div>
        <ScheduleDetailButton>
          <EditTwoTone />
          <DeleteTwoTone />
        </ScheduleDetailButton>
      </ScheduleDetailItemContainer>
    ))}
  </>
);

const DrawerItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DrawerItemTitle = styled.div``;

const DrawerItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const DrawerItem: React.FC<{ list: ScheduleItem[]; title: string }> = ({
  list,
  title,
}) => {
  return (
    <DrawerItemContainer>
      <DrawerItemTitle>{title}</DrawerItemTitle>
      <DrawerItemContent>
        {list.map((item) => {
          return <span>我爱小黄</span>;
        })}
      </DrawerItemContent>
    </DrawerItemContainer>
  );
};

const Schedule: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentList, setCurrentList] = useState([]);

  const DrawerTypeMap = [
    { title: "共同日程", list: [] },
    { title: "ta的日程", list: [] },
    { title: "你的日程", list: [] },
  ];

  function getListData(val: moment.Moment) {
    let listData: ScheduleItem[] = [];
    switch (val.date()) {
      case 8:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
        ];
        break;
      case 10:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
          { type: "error", content: "This is error event." },
        ];
        break;
      case 15:
        listData = [
          { type: "warning", content: "This is warning event" },
          { type: "success", content: "This is very long usual event。。...." },
          { type: "error", content: "This is error event 1." },
          { type: "error", content: "This is error event 2." },
          { type: "error", content: "This is error event 3." },
          { type: "error", content: "This is error event 4." },
        ];
        break;
      default:
    }
    return listData;
  }

  function dateCellRender(val: moment.Moment) {
    const listData = getListData(val);

    return (
      <div onClick={() => setVisible(true)}>
        {listData.map((item: ScheduleItem) => (
          <div key={item.content}>
            <Badge status={item.type} text={item.content} />
          </div>
        ))}
      </div>
    );
  }

  function getMonthData(val: moment.Moment) {
    if (val.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(val: moment.Moment) {
    const num = getMonthData(val);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
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
      >
        {DrawerTypeMap.map((item) => (
          <DrawerItem title={item.title} list={[]} />
        ))}
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
