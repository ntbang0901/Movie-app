import Alert from "@mui/material/Alert";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import {
  fetchDetailMovieWithType,
  getDetailMovie,
  getSimilarMovie,
  getSimilarTV,
} from "../../apis/movie.api";
import BackgroundImage from "../../components/BackgroundImage";
import Layout from "../../components/Layout";

import { Tooltip } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayArrow";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarIcon from "@mui/icons-material/Star";

import { Movie } from "../../types/Movie";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../recoil/ModalRecoil";
import Row from "../../components/Row";

interface Props {
  movie: Movie;
  similar: Movie[];
}

const StyledDetailMovieContainer = styled.div`
  position: relative;
`;

const StyledInfomation = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;

  @media screen and (max-width: 576px) {
    width: 100%;
  }

  .text-white {
    color: #fff;
  }

  .content-detail {
  }

  .flex-wrapper {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    color: #fff;
  }

  .rate {
    display: flex;
    align-items: center;

    @media screen and (max-width: 576px) {
      border-right: 1px solid #3c9ee5;
    }
  }
  .single-chart {
    width: 100px;
    justify-content: space-around;
  }

  .circular-chart {
    display: block;
    margin: 10px auto;
    max-width: 80%;
    max-height: 250px;
  }

  .circle-bg {
    fill: none;
    stroke: #eee;
    stroke-width: 3.8;
  }

  .circle {
    fill: none;
    stroke-width: 2.8;
    stroke-linecap: round;
    animation: progress 1s ease-out forwards;
  }

  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
  }

  .circular-chart.green .circle {
    stroke: #4cc790;
  }

  .circular-chart.blue .circle {
    stroke: #3c9ee5;
  }

  .percentage {
    fill: #fff;
    font-family: sans-serif;
    font-size: 0.45em;
    text-anchor: middle;
  }
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 20px;

  .action-item-center {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .action-item {
    border-radius: 999px;
    padding: 10px;
    background-color: #3c9ee5;

    @media screen and (max-width: 576px) {
      display: none;
    }
  }

  .hover-action {
    :hover {
      opacity: 0.8;
    }
  }
`;

const StyledGenre = styled.div`
  display: flex;
  align-items: center;

  > span {
    font-size: 16px;
  }
`;

const MovieDetail = ({ movie, similar }: Props) => {
  const [_showModal, setShowModal] = useRecoilState(modalState);
  const [_currentMovie, setCurrentMovie] = useRecoilState(movieState);

  if (!movie) return <Alert severity="error">Movie Not Found</Alert>;

  return (
    <Layout title={movie.title || "Detail"}>
      <StyledDetailMovieContainer>
        <BackgroundImage movie={movie} />
        <StyledInfomation>
          <div className="content-detail">
            <div className="text-white">
              <h1 style={{ fontSize: "60px" }}>{movie.title || movie.name}</h1>
            </div>

            <div className="flex-wrapper">
              <div className="rate">
                <div className="single-chart">
                  <svg viewBox="0 0 36 36" className="circular-chart blue">
                    <path
                      className="circle-bg"
                      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      strokeDasharray={`${movie.vote_average * 10}, 100`}
                      d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x={18} y="20.35" className="percentage">
                      {(movie.vote_average * 10).toFixed(2)}%
                    </text>
                  </svg>
                </div>
                User Score
              </div>
              <StyledActions>
                <Tooltip title="Add to list" placement="bottom">
                  <div className="action-item action-item-center">
                    <FormatListBulletedIcon />
                  </div>
                </Tooltip>

                <Tooltip title="Mark as favorite" placement="bottom">
                  <div className="action-item action-item-center">
                    <FavoriteIcon />
                  </div>
                </Tooltip>
                <Tooltip title="Add to your watchlist" placement="bottom">
                  <div className="action-item action-item-center">
                    <BookmarkIcon />
                  </div>
                </Tooltip>
                <Tooltip title="Rate it!" placement="bottom">
                  <div className="action-item action-item-center">
                    <StarIcon />
                  </div>
                </Tooltip>
                <div
                  className="action-item-center hover-action"
                  onClick={() => {
                    setCurrentMovie(movie);
                    setShowModal(true);
                  }}>
                  <PlayIcon />
                  <span>Play Trailer</span>
                </div>
              </StyledActions>
            </div>
            <div
              className="text-white"
              style={{ display: "flex", alignItems: "center" }}>
              <h2>Release date: </h2>
              <span>{movie.release_date}</span>
            </div>

            {movie.genres.length > 0 && (
              <StyledGenre className="text-white">
                <h2>Genres:</h2>
                <span>
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </span>
              </StyledGenre>
            )}

            <div className="text-white">
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        </StyledInfomation>
        {similar.length > 0 && <Row movies={similar} title="Similar" />}
      </StyledDetailMovieContainer>
    </Layout>
  );
};

export default MovieDetail;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.params?.id;
  const type = context.query.type === "tv" ? "tv" : "movie";

  let res;
  let similar;
  try {
    if (type === "tv") {
      similar = await getSimilarTV(parseInt(id as string));
    } else {
      similar = await getSimilarMovie(parseInt(id as string));
    }
    res = await fetchDetailMovieWithType(type, parseInt(id as string));
  } catch (error) {
    res = await getDetailMovie(id as string);
    similar = await getSimilarMovie(parseInt(id as string));
  }

  return {
    props: {
      movie: res.data as Movie,
      similar: similar.data.results,
    },
  };
};
