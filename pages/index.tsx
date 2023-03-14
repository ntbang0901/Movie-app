import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import styled from "styled-components";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import NavbarHeader from "../components/NavbarHeader";
import Row from "../components/Row";
import { Movie, ResponseMovie } from "../types/Movie";
import http from "../utils/axios";
import requests from "../utils/request";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

export default function Home({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) {
  return (
    <Layout title="My app">
      <>
        <Banner netflixOriginals={netflixOriginals} />

        <Row title="Trending Now" movies={trendingNow} />
        <Row title="Top Rated" movies={topRated} />
        <Row title="Action Thrillers" movies={actionMovies} />
        <Row title="Comedies" movies={comedyMovies} />
        <Row title="Scary Movies" movies={horrorMovies} />
        <Row title="Romance Movies" movies={romanceMovies} />
        <Row title="Documentaries" movies={documentaries} />
      </>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    http
      .get<ResponseMovie>(requests.fetchNetflixOriginals)
      .then((res) => res.data),
    http.get<ResponseMovie>(requests.fetchTrending).then((res) => res.data),
    http.get<ResponseMovie>(requests.fetchTopRated).then((res) => res.data),
    http.get<ResponseMovie>(requests.fetchActionMovies).then((res) => res.data),
    http.get<ResponseMovie>(requests.fetchComedyMovies).then((res) => res.data),
    http.get<ResponseMovie>(requests.fetchHorrorMovies).then((res) => res.data),
    http
      .get<ResponseMovie>(requests.fetchRomanceMovies)
      .then((res) => res.data),
    http
      .get<ResponseMovie>(requests.fetchDocumentaries)
      .then((res) => res.data),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
