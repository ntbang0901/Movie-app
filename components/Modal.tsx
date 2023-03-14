import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PlayIcon from "@mui/icons-material/PlayArrow";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeIcon from "@mui/icons-material/VolumeUp";
import { Alert, IconButton } from "@mui/material";
import MuiModal from "@mui/material/Modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fetchDetailMovieWithType, fetchTrailerMovie } from "../apis/movie.api";
import { modalState, movieState } from "../recoil/ModalRecoil";
import { DetailMovie, Genre, Video } from "../types/Movie";

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

const StyleActions = styled.div`
  position: absolute;
  top: 0;
  margin-top: -60px;
  left: 40px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 576px) {
    left: 0px;
  }
`;

const StyledButtonIcon = styled(IconButton)`
  background-color: #fff;
  color: #000;
  margin-right: 10px;
  :hover {
    background-color: #fff;
    opacity: 0.8;
  }

  .icon {
    color: #000;
  }
`;

const StyledDetailMovie = styled.div`
  background: #1a1d29;
  box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.1);
`;

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!currentMovie) return;
    const fetchMovie = async () => {
      try {
        const type = currentMovie.media_type === "tv" ? "tv" : "movie";

        const { data }: { data: DetailMovie } = await fetchDetailMovieWithType(
          type,
          currentMovie.id
        );

        const trailerMovie = await fetchTrailerMovie(currentMovie.id);

        if (trailerMovie.data.results.length > 0) {
          const movie = trailerMovie.data.results.find(
            (video: Video) => video.type === "Trailer"
          );

          if (movie) {
            setTrailer(movie.key);
          } else {
            setTrailer(trailerMovie.data.results[0].key);
          }
        }
        if (data?.genres) {
          setGenres(data.genres);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("ERROR:::", error);
      }
    };

    fetchMovie();
  }, [currentMovie, trailer]);

  const handleClose = () => {
    setMuted(true);
    setGenres([]);
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
                muted={muted}
              />
            )}
          </div>
        </StyledContent>
      </StyledDetailContainer>
    </MuiModal>
  );
};

export default Modal;
