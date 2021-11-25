import styled from "styled-components";
import moment from "moment";
import { Badge, Calendar, Popover } from "antd";

type ScheduleItemStatusType = "warning" | "success" | "error" | "processing" | "default"

interface ScheduleItem {
    type: ScheduleItemStatusType;
    content: string;
}

const SchedulePageContainer = styled.div`
    height: 100%;
    width: 100%;
`

const ScheduleContainer = styled.div`
    
`

const Schedule: React.FC = () => {
    function getListData(val: moment.Moment) {
        let listData: ScheduleItem[] = [];
        switch (val.date()) {
            case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
            case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
            case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
            default:
        }
        return listData;
    }

    function dateCellRender(val: moment.Moment) {
        const listData = getListData(val);
        const tabList = [
            {
                key: 'tab1',
                tab: '你的日程'
            },
            {
                key: 'tab2',
                tab: 'Ta的日程'
            },        
            {
                key: 'tab3',
                tab: '共同日程'
            }
        ]

        return listData.map((item: ScheduleItem) => (
                <div key={item.content}>
                    <Badge status={item.type} text={item.content} />
                </div>
        ))
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
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender}></Calendar>
    )
}

export const SchedulePage: React.FC = () => {
    return (
        <SchedulePageContainer>
            <ScheduleContainer>
                <Schedule></Schedule>
            </ScheduleContainer>
        </SchedulePageContainer>
    )
}