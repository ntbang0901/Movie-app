import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PlayIcon from "@mui/icons-material/PlayArrow";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeIcon from "@mui/icons-material/VolumeUp";
import { CircularProgress, IconButton } from "@mui/material";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fetchTrailer } from "../apis/movie.api";
import { modalState, movieState } from "../recoil/ModalRecoil";
import { DetailMovie, Genre, Video } from "../types/Movie";
import Loading from "./Loading";

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
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!currentMovie) return;
    const fetchMovie = async () => {
      try {
        const type = currentMovie.media_type === "tv" ? "tv" : "movie";

        const { data }: { data: DetailMovie } = await fetchTrailer(
          type,
          currentMovie.id
        );

        if (data.videos) {
          const movie = data.videos.results.find(
            (video: Video) => video.type === "Trailer"
          );
          setTrailer(movie?.key as string);
        }

        if (data?.genres) {
          setGenres(data.genres);
        }
      } catch (error) {
        console.log("ERROR:::", error);
      }
    };

    fetchMovie();
  }, [currentMovie]);

  const handleClose = () => {
    setMuted(true);
    setGenres([]);
    setTrailer("");
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
        {trailer !== "" && (
          <StyledContent>
            <div style={{ backgroundColor: "#000" }}>
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
            </div>

            <StyledInfoMovie>
              <StyleActions>
                <div>
                  <StyledButtonIcon
                    sx={{
                      border: "1px solid #fff",
                      borderRadius: "999px",
                    }}>
                    <PlayIcon
                      className="icon"
                      sx={{ width: "30px", height: "30px" }}
                    />{" "}
                    PLAY
                  </StyledButtonIcon>
                  <StyledButtonIcon
                    sx={{
                      border: "1px solid #fff",
                      borderRadius: "999px",
                    }}>
                    <ThumbUpIcon
                      className="icon"
                      sx={{
                        width: "30px",
                        height: "30px",
                        color: !muted ? "#068DFF !important" : "",
                      }}
                    />
                  </StyledButtonIcon>
                  <StyledButtonIcon
                    sx={{
                      border: "1px solid #fff",
                      borderRadius: "999px",
                    }}>
                    {muted ? (
                      <AddIcon sx={{ width: "30px", height: "30px" }} />
                    ) : (
                      <CheckIcon sx={{ width: "30px", height: "30px" }} />
                    )}
                  </StyledButtonIcon>
                  <StyledButtonIcon
                    sx={{ ml: "auto" }}
                    onClick={() => setMuted(!muted)}>
                    {muted ? (
                      <VolumeOffIcon sx={{ width: "30px", height: "30px" }} />
                    ) : (
                      <VolumeIcon sx={{ width: "30px", height: "30px" }} />
                    )}
                  </StyledButtonIcon>
                </div>
              </StyleActions>
              <StyledDetailMovie>
                <div>
                  <p>
                    {currentMovie &&
                      currentMovie.vote_average &&
                      currentMovie.vote_average * 10}
                    % Match
                  </p>

                  <p className="font-light">
                    {currentMovie?.release_date || currentMovie?.first_air_date}
                  </p>
                  <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                    HD
                  </div>
                </div>
                <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                  <p className="w-5/6">{currentMovie?.overview}</p>
                  <div className="flex flex-col space-y-3 text-sm">
                    <div>
                      <span className="text-[gray]">Genres: </span>
                      {genres.map((genre) => genre.name).join(", ")}
                    </div>

                    <div>
                      <span className="text-[gray]">Original language: </span>
                      {currentMovie?.original_language}
                    </div>

                    <div>
                      <span className="text-[gray]">Total votes: </span>
                      {currentMovie?.vote_count}
                    </div>
                  </div>
                </div>
              </StyledDetailMovie>
            </StyledInfoMovie>
          </StyledContent>
        )}
      </StyledDetailContainer>
    </MuiModal>
  );
};

export default Modal;
