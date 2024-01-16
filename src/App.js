import styled from "styled-components";
import ChipInput from "./Components/ChipInput";

function App() {
    return (
        <>
            <Wrapper>
                <TitleContainer>
                    <h1>Pick Users</h1>
                </TitleContainer>
                <SearchContainer>
                    <ChipInput />
                </SearchContainer>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    margin: 0 7rem 0 7rem;
    text-align: center;
`;

const TitleContainer = styled.div`
    padding: 10px;
    margin: 50px 10px 50px 10px;

    h1 {
        color: #6980c5;
    }
`;

const SearchContainer = styled.div`
    margin: 0 5rem 0 5rem;
`;

export default App;
