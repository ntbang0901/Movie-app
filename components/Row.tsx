import { Container } from "@mui/system";
import styled from "styled-components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import Image from "next/image";
import { Movie } from "../types/Movie";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../recoil/ModalRecoil";

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

const StyledImage = styled.div`
  cursor: pointer;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  min-width: 330px;
  min-height: 210px;

  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;

  border-radius: 10px;
  transition: all 0.3s;

  > img {
    opacity: 0.9;
    border-radius: 10px;
  }

  border: 1px solid;
  :hover {
    border-color: whitesmoke;
    transition: all 0.3s;

    transform: scale(1.03);
    opacity: 1;
  }

  @media screen and (max-width: 576px) {
    min-width: 200px !important;
    min-height: 120px !important;
  }
`;

const Row = ({ title, movies }: { title: string; movies: Movie[] }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [_isMoved, setIsMoved] = useState(false);
  const [_showModal, setShowModal] = useRecoilState(modalState);
  const [_currentMovie, setCurrentMovie] = useRecoilState(movieState);

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
            <StyledImage key={movie.id}>
              <Image
                onClick={() => {
                  setShowModal(true);
                  setCurrentMovie(movie);
                }}
                src={`https://image.tmdb.org/t/p/w500${
                  movie.backdrop_path || movie.poster_path
                }`}
                alt={movie.title}
                fill
              />
            </StyledImage>
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
