import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton } from "@mui/material";
import MuiModal from "@mui/material/Modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fetchDetailMovieWithType, fetchTrailerMovie } from "../apis/movie.api";
import { modalState, movieState } from "../recoil/ModalRecoil";
import { Genre, Video } from "../types/Movie";

const StyledCloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
`;

const StyledDetailContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;

  @media screen and (max-width: 976px) {
    width: 600px;
  }

  @media screen and (max-width: 576px) {
    top: 50%;
    width: 350px;
  }
`;

const StyledContent = styled.div`
  position: relative;

  .image {
    height: 500px !important;
    position: relative !important;
  }
`;

const StyledInfoMovie = styled.div`
  position: relative;

  color: #fff;
`;

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    if (!currentMovie) return;

    const fetchMovie = async () => {
      try {
        const type = currentMovie.media_type === "tv" ? "tv" : "movie";
        const { data } = await fetchDetailMovieWithType(type, currentMovie.id);
        const trailerMovie = await fetchTrailerMovie(currentMovie.id);
        const trailer =
          trailerMovie.data.results.find(
            (video: Video) => video.type === "Trailer"
          )?.key || trailerMovie.data.results[0].key;

        setTrailer(trailer);
      } catch (error) {
        console.log("ERROR:::", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchMovie();
  }, [currentMovie, trailer]);

  const handleClose = () => {
    setTrailer("");
    setCurrentMovie(null);
    setShowModal(false);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description">
      <StyledDetailContainer>
        <StyledCloseButton onClick={() => handleClose()}>
          <CloseIcon width={50} sx={{ color: "#fff" }} />
        </StyledCloseButton>

        <StyledContent>
          <div style={{ backgroundColor: "#000" }}>
            {!trailer && !loading ? (
              <>
                <Alert severity="error">Trailer Not Found</Alert>
                <Image
                  className="image"
                  src={`https://image.tmdb.org/t/p/w500${
                    currentMovie && currentMovie.poster_path
                      ? currentMovie.poster_path
                      : currentMovie?.backdrop_path
                  }`}
                  fill
                  alt={currentMovie?.title as string}
                />
              </>
            ) : (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer}`}
                width="100%"
                height="500px"
                playing
                config={{
                  youtube: {
                    playerVars: {
                      showinfo: 1,
                      origin: window.location.href,
                    },
                  },
                }}
                controls
                muted={false}
              />
            )}
          </div>
        </StyledContent>
      </StyledDetailContainer>
    </MuiModal>
  );
};

export default Modal;
