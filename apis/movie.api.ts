import axios from "axios";
import http from "../utils/axios";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchDetailMovieWithType = (type: string, id: number) =>
  http.get(
    `${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
  );

export const fetchTrailerMovie = (id: number) =>
  http.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`);

export const fetchSearchMovies = (page: number, text: string) =>
  http.get(
    `search/movie?api_key=${API_KEY}&language=en-US&query=${text}&page=${page}&include_adult=false`
  );

export const getDetailMovie = (id: string) =>
  http.get(`
movie/${id}?api_key=${API_KEY}&language=en-US`);

export const getSimilarMovie = (id: number) =>
  http.get(`movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);

export const getSimilarTV = (id: number) =>
  http.get(`tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
