import styled from "styled-components";
import moment from "moment";
import { Calendar } from "antd";

const SchedulePageContainer = styled.div`
    height: 100%;
    width: 100%;
`

const ScheduleContainer = styled.div`
    
`


const getListData = (val: moment.Moment) => {
    let listData;
}

export const SchedulePage: React.FC = () => {
    return (
        <SchedulePageContainer>
            <ScheduleContainer>
                <Calendar></Calendar>
            </ScheduleContainer>
        </SchedulePageContainer>
    )
}
