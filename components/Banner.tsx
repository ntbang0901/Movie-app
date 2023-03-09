import InfoIcon from "@mui/icons-material/Info";
import PlayIcon from "@mui/icons-material/PlayCircle";
import { Container } from "@mui/system";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { BASE_URL_IMAGE } from "../constants/movie";
import { modalState, movieState } from "../recoil/ModalRecoil";
import { Movie } from "../types/Movie";
import Modal from "./Modal";

const StyledImageBackground = styled(Image)`
  z-index: -10;
  max-height: 92vh;
  width: 100vw;

  @media screen and (max-width: 576px) {
    max-height: 70vh;
  }
  @media screen and (max-width: 976px) {
    max-height: 70vh;
  }
`;

const StyledLinner1 = styled.div`
  background: linear-gradient(
    179.79deg,
    rgba(26, 29, 41, 0) 15.81%,
    rgba(26, 29, 41, 0.791667) 64.73%,
    #1a1d29 97.83%
  );
  height: 92vh;

  @media screen and (max-width: 576px) {
    height: 70vh;
  }

  @media screen and (max-width: 976px) {
    height: 70vh;
  }
`;

const StyledInfoMovie = styled.div`
  max-width: 750px;
  padding: 10px;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 250px;
  gap: 15px;
  @media screen and (max-width: 576px) {
    top: 150px;
    max-width: 300px;
  }
`;

const StyledActions = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledButton = styled.button`
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 8px 14px;
  > span {
    font-weight: 600;
  }

  @media screen and (max-width: 576px) {
    > span {
      font-size: 12px;
    }
  }
`;

const StyledDetail = styled.div`
  flex-direction: column;
  display: flex;

  > h2 {
    margin-bottom: 12px;
    font-weight: 600;
    color: #fff;
    font-size: 60px;
  }

  > span {
    color: #fff;
    font-size: 20px;
    line-height: 30px;
    font-weight: 400;
  }

  @media screen and (max-width: 576px) {
    gap: 12px;
    > span {
      color: #fff;
      font-size: 12px;
      line-height: 1.5;
      font-weight: 400;
    }
    > img {
      width: 150px;
      height: 100px;
    }
  }
`;

const Banner = ({ netflixOriginals }: { netflixOriginals: Movie[] }) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  const [_showModal, setShowModal] = useRecoilState(modalState);

  return (
    <>
      <div>
        <StyledImageBackground
          src={`${BASE_URL_IMAGE}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.title || "alt"}
          fill
        />
        <StyledLinner1 />
      </div>

      <Container maxWidth="xl">
        <StyledInfoMovie>
          <StyledDetail>
            <h2>{movie?.title || movie?.name || movie?.original_name}</h2>
            <span>{movie?.overview}</span>
          </StyledDetail>
          <StyledActions>
            <StyledButton>
              <PlayIcon />
              <span>PLAY</span>
            </StyledButton>
            <StyledButton
              onClick={() => {
                setShowModal(true);
                setCurrentMovie(movie);
              }}>
              <InfoIcon />
              <span> MORE INFORMATION</span>
            </StyledButton>
          </StyledActions>
        </StyledInfoMovie>
      </Container>
      {/* Header */}

      <Modal />
    </>
  );
};

export default Banner;
