import { useEffect, useState } from "react";

import { Container } from "@mui/system";
import { useRouter } from "next/router";
import styled from "styled-components";
import { fetchSearchMovies } from "../apis/movie.api";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import MovieItem from "../components/MovieItem";
import { Movie } from "../types/Movie";

const StyledSearchResultContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 976px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Search = () => {
  const router = useRouter();

  const { q } = router.query;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const page = router.query.page ? parseInt(router.query.page as string) : 1;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetchSearchMovies(page, q as string);
        setMovies(res.data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [q, page]);

  return (
    <Layout title={`Search with ${router.query.q}`}>
      <Container maxWidth="xl" sx={{ marginTop: "150px" }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <h2 style={{ color: "#fff" }}>{`Search with keyword: "${q}"`}</h2>
            <StyledSearchResultContainer>
              {movies.length > 0 &&
                movies.map((movie) => (
                  <MovieItem key={movie.id} movie={movie} />
                ))}
            </StyledSearchResultContainer>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Search;
