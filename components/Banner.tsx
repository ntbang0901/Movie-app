import InfoIcon from "@mui/icons-material/Info";
import PlayIcon from "@mui/icons-material/PlayCircle";
import { Container } from "@mui/system";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { modalState, movieState } from "../recoil/ModalRecoil";
import { Movie } from "../types/Movie";
import BackgroundImage from "./BackgroundImage";
import Modal from "./Modal";

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

  const [_currentMovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  const [_showModal, setShowModal] = useRecoilState(modalState);

  return (
    <>
      <BackgroundImage movie={movie} />
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
    </>
  );
};

export default Banner;
