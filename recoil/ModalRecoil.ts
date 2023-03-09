import { atom } from "recoil";
import { Movie } from "../types/Movie";

export const modalState = atom({
  key: "modelState",
  default: false,
});

export const movieState = atom<Movie | null>({
  key: "movieState",
  default: null,
});
