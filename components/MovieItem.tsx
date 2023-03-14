import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { modalState, movieState } from "../recoil/ModalRecoil";
import { Movie } from "../types/Movie";

const StyledImage = styled.div`
  cursor: pointer;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  min-width: 330px;
  min-height: 250px;

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

  @media screen and (max-width: 976px) {
    min-width: 250px !important;
    min-height: 150px !important;
  }

  @media screen and (max-width: 576px) {
    min-width: 140px !important;
    min-height: 140px !important;
  }
`;

const MovieItem = ({ movie }: { movie: Movie }) => {
  const [_showModal, setShowModal] = useRecoilState(modalState);
  const [_currentMovie, setCurrentMovie] = useRecoilState(movieState);

  const imageURL = `https://image.tmdb.org/t/p/w500${
    movie.backdrop_path ? movie.backdrop_path : movie.poster_path
  }`;

  const type = movie.media_type === "tv" ? "tv" : "movie";

  return (
    <StyledImage key={movie.id}>
      <Link href={`/movie/${movie.id}?type=${type}`}>
        <Image src={imageURL} alt={movie.title} fill loading="lazy" />
      </Link>
    </StyledImage>
  );
};

export default MovieItem;
