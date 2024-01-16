import React from "react";
import styled from "styled-components";

const Item = ({ data, click }) => {
    return (
        <>
            <Container onClick={click}>
                <LogoWrapper>
                    <img
                        src={require(`../assets/${
                            data.logoName || "bear.png"
                        }`)}
                        alt=""
                    />
                </LogoWrapper>
                <NameWrapper>{data.name}</NameWrapper>
                <EmailWrapper>{data.email}</EmailWrapper>
            </Container>
        </>
    );
};

const Container = styled.div`
    display: flex;
    cursor: pointer;
    transition: all 0.2s ease-in;
    padding: 3px;
    align-items: center;
    text-align: start;
    padding: 10px 15px 10px 15px;

    &:hover {
        background-color: #eceaec;
    }
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
    width: 35%;
`;

const EmailWrapper = styled.div`
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: #747474;
    width: 40%;
`;

export default Item;
