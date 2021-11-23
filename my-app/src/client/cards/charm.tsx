import styled from "styled-components";

const CharmCardContainer = styled.div`
    width: 100%;
    height: 40%;
`

const CharmCardHeader = styled.div`
    margin: 5px;
`

const CharmCardContent = styled.div`

`

const CharmCard: React.FC = () => {
    return (
        <CharmCardContainer>
            <CharmCardHeader>心动指数</CharmCardHeader>
            <CharmCardContent></CharmCardContent>
        </CharmCardContainer>
    )
}

export default CharmCard;