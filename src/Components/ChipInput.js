import React, { useState, useEffect, useRef, useMemo } from "react";
import userData from "../assets/UserData.json";
import Chip from "./Chip";
import styled from "styled-components";
import Item from "./Item";

const ChipInput = () => {
    const [inputValue, setInputValue] = useState("");
    const [chips, setChips] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [highlightedChip, setHighlightedChip] = useState(null);
    const [listContainerVisible, setListContainerVisible] = useState(false);
    const inputRef = useRef(null);

    // Memoize the allItems array to prevent unnecessary re-renders
    const allItems = useMemo(() => userData.users, []);
    const handleDocumentClick = (event) => {
        const target = event.target;

        // Check if the click is outside the input, chips, and list container
        if (
            !target.closest("input") &&
            !target.closest(".chip") &&
            !target.closest(".chipitem")
        ) {
            setListContainerVisible(false);
        }
    };

    // Attach a click event listener to the document
    // to handle clicks outside the input, chips, and list container
    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        // Filter items based on user input
        setFilteredItems(
            allItems.filter(
                (item) =>
                    !chips.includes(item) &&
                    item.name.toLowerCase().includes(inputValue.toLowerCase())
            )
        );
    }, [inputValue, chips, allItems]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setHighlightedChip(null);
    };

    const handleItemClick = (item) => {
        setChips([...chips, item]);
        setInputValue("");
        setFilteredItems(
            filteredItems.filter((filteredItem) => filteredItem !== item)
        );
        setListContainerVisible(true);
    };

    const handleChipRemove = (chip) => {
        setChips(chips.filter((c) => c !== chip));
        setFilteredItems([...filteredItems, chip]);
        setListContainerVisible(true);
    };

    const handleInputClick = () => {
        if (inputValue === "") {
            setFilteredItems(allItems.filter((item) => !chips.includes(item)));
        }
        setListContainerVisible(true);
    };

    const handleInputKeyDown = (event) => {
        if (
            event.key === "Backspace" &&
            inputValue === "" &&
            chips.length > 0
        ) {
            // Handle backspace when input is empty and there are chips
            if (highlightedChip) {
                setChips(chips.filter((c) => c !== highlightedChip));
                setFilteredItems([...filteredItems, highlightedChip]);
                setHighlightedChip(null);
            } else {
                const lastChip = chips[chips.length - 1];
                setHighlightedChip(lastChip);
            }
        }
    };

    return (
        <Container className="chip">
            <ChipsContainer>
                {chips.map((chip, index) => (
                    <Chip
                        key={index}
                        name={chip.name}
                        logoName={chip.logoName}
                        highlighted={highlightedChip === chip}
                        onRemove={() => handleChipRemove(chip)}
                    />
                ))}
                <InputContainer>
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        onClick={handleInputClick}
                        ref={inputRef}
                        placeholder="Add New User"
                    />
                    <ListContainer visible={listContainerVisible}>
                        {filteredItems.map((item, index) => (
                            <Item
                                key={index}
                                data={item}
                                click={() => handleItemClick(item)}
                            />
                        ))}
                    </ListContainer>
                </InputContainer>
            </ChipsContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    border-bottom: 3px #6980c5 solid;
`;

const ChipsContainer = styled.div`
    flex-wrap: wrap;
    display: flex;
    width: 100%;
`;

const InputContainer = styled.div`
    flex: 1;
    position: relative;
    min-width: 4rem;
`;

const Input = styled.input`
    text-decoration: none;
    border: none;
    margin: 5px;
    padding: 5px;
    font-size: 15px;
    width: 100%;

    &:focus {
        outline: none;
    }
`;

const ListContainer = styled.div`
    margin: 5px;
    max-height: 225px;
    overflow-y: auto;
    position: absolute;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    z-index: 1;
    scrollbar-face-color: aliceblue;
    display: ${(props) => (props.visible ? "block" : "none")};
`;

export default ChipInput;
