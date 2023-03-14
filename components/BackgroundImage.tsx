import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { BASE_URL_IMAGE } from "../constants/movie";
import { Movie } from "../types/Movie";

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

const BackgroundImage = ({ movie }: { movie: Movie | null }) => {
  return (
    <div>
      <StyledImageBackground
        src={`${BASE_URL_IMAGE}${movie?.backdrop_path || movie?.poster_path}`}
        alt={movie?.title || "alt"}
        fill
        loading="lazy"
      />
      <StyledLinner1 />
    </div>
  );
};

export default BackgroundImage;
