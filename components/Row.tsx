import ChevronLeftIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Container } from "@mui/system";
import { useRef, useState } from "react";
import styled from "styled-components";
import { Movie } from "../types/Movie";
import MovieItem from "./MovieItem";

const StyledContainer = styled(Container)`
  height: 100%;
  @media screen and (max-width: 576px) {
    height: 100%;
  }
`;

const StyledHeading = styled.h2`
  color: #fff;
`;

const StyledListMovie = styled.div`
  max-height: 100%;
  display: flex;
  overflow: hidden;
`;
const StyledListMoviesContainer = styled.div`
  position: relative;

  .chevron-icon {
    color: #fff;
    border-radius: 999px;
    position: absolute;
    width: 50px;
    height: 50px;
    transition: all 0.3s;

    :hover {
      cursor: pointer;
      transform: scale(1.25);
    }
  }

  .chevron-icon--left {
    left: 10px;
    top: 40%;
    z-index: 10;
  }

  .chevron-icon--right {
    right: 10px;
    bottom: 40%;
    z-index: 10;
  }

  @media screen and (max-width: 576px) {
    .chevron-icon--left {
      left: 5px;
      top: 35%;
    }

    .chevron-icon--right {
      right: 5px;
      bottom: 35%;
    }
  }
`;

const Row = ({ title, movies }: { title: string; movies: Movie[] }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [_isMoved, setIsMoved] = useState(false);

  const handleOnclick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <StyledContainer maxWidth="xl">
      <StyledHeading>{title}</StyledHeading>
      <StyledListMoviesContainer>
        <ChevronLeftIcon
          onClick={() => handleOnclick("left")}
          className="chevron-icon chevron-icon--left"
          width={80}
        />

        <StyledListMovie ref={rowRef}>
          {movies?.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </StyledListMovie>

        <ChevronRightIcon
          onClick={() => handleOnclick("right")}
          className="chevron-icon chevron-icon--right"
          width={80}
        />
      </StyledListMoviesContainer>
    </StyledContainer>
  );
};

export default Row;
