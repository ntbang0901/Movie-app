import React, {
  KeyboardEventHandler,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import Modal from "./Modal";

const StyledSearchContainer = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  position: relative;
  .icon-search {
    color: #c0bebe;
    width: 24px;
    height: 24px;
    position: absolute;
    left: 5px;
    top: 25%;
  }

  .icon-clear {
    top: 25%;
    right: 5px;
    width: 24px;
    height: 24px;
    color: #fff;
    cursor: pointer;
    position: absolute;
  }
`;

const StyledInputSearch = styled.input`
  border: none;
  outline: none;
  color: #fff;
  background: #101116;
  border: 1px solid rgba(255, 255, 255, 0.12);

  padding: 14px 35px;
  font-size: 16px;
  border-radius: 4px;
  width: 100%;
`;

const StyledSearchTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const SearchBox = () => {
  const router = useRouter();

  const { q } = router.query;

  const [showInputSearch, setShowInputSearch] = useState(false);
  const searchInputRef = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState(q || "");

  useEffect(() => {
    const checkClickOutSide = (event: Event): void => {
      if (
        showInputSearch &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as HTMLDivElement)
      ) {
        setShowInputSearch(false);
      }
    };
    document.addEventListener("mousedown", checkClickOutSide);

    return () => document.removeEventListener("mousedown", checkClickOutSide);
  }, [showInputSearch]);

  const handleDeleteText = () => {
    if (!text) {
      setShowInputSearch(false);
    } else {
      setText("");
    }
  };

  const handleSearchEnter: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== "Enter" || !text) return;
    event.preventDefault();
    router.push(`search?q=${text}`);
  };

  return (
    <StyledSearchContainer>
      {showInputSearch ? (
        <div ref={searchInputRef}>
          <SearchIcon className="icon-search" />
          <StyledInputSearch
            placeholder="Type in here…"
            value={text}
            onKeyDown={handleSearchEnter}
            onChange={(e) => setText(e.target.value)}
          />
          <ClearIcon
            className="icon-clear"
            onClick={() => handleDeleteText()}
          />
        </div>
      ) : (
        <StyledSearchTitle onClick={(e) => setShowInputSearch(true)}>
          <SearchIcon width={80} />
          <span>Search</span>
        </StyledSearchTitle>
      )}
    </StyledSearchContainer>
  );
};

export default SearchBox;
