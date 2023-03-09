import axios from "axios";
const API_KEY = "048af06211961ae1ead864660680461c";

export const fetchTrailer = (type: string, id: number) =>
  axios.get(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
  );
