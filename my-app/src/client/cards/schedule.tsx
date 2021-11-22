import styled from "styled-components";

const ScheduleCardContainer = styled.div`
    height: 60%;
    width: 100%;
    background-color: red;
`

const ScheduleCardHeader = styled.div`
    margin: 5px;
`

const ScheduleCardContent = styled.div`

`
const ScheduleCard: React.FC = () => {
    return (
        <ScheduleCardContainer>
            <ScheduleCardHeader>
                共同日程
            </ScheduleCardHeader>
            <ScheduleCardContent></ScheduleCardContent>
        </ScheduleCardContainer>
    )
}

export default ScheduleCard;