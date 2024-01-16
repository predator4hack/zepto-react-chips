import styled from "styled-components";

const Chip = ({ name, logoName, highlighted, onRemove }) => {
    return (
        <>
            <Container highlight={highlighted} className="chipitem">
                <LogoWrapper>
                    <img
                        src={require(`../assets/${logoName || "bear.png"}`)}
                        alt=""
                    />
                </LogoWrapper>
                <NameWrapper>{name}</NameWrapper>
                <CloseButton onClick={onRemove}>
                    <img
                        width="24"
                        height="24"
                        src="https://img.icons8.com/material-rounded/24/delete-sign.png"
                        alt="delete-sign"
                    />
                </CloseButton>
            </Container>
        </>
    );
};

const Container = styled.div`
    display: inline-flex;
    align-items: center;
    border-radius: 25px;
    background-color: #e0e0e0;
    margin-right: 8px;
    margin-bottom: 8px;
    border: ${(props) => (props.highlight ? "#6980c5 2px solid" : "")};
`;

const LogoWrapper = styled.div`
    margin-right: 8px;
    text-align: center;
    justify-content: center;
    display: flex;

    img {
        width: 35px;
    }
`;

const NameWrapper = styled.div`
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const CloseButton = styled.div`
    cursor: pointer;
    padding: 3px;
    border-radius: 15px;
    margin-left: 8px;
    margin-right: 4px;
    display: flex;
    transition: all 0.2s ease-in;

    &:hover {
        background-color: #b1b1b1;
    }
`;

export default Chip;
