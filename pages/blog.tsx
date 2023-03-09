import Head from "next/head";
import React from "react";
import styled from "styled-components";
import NavbarHeader from "../components/NavbarHeader";

const StyledContainer = styled.div`
  height: 120vh;
`;

const Blog = () => {
  return (
    <StyledContainer>
      <Head>
        <title>Blogs</title>
      </Head>
      <NavbarHeader />
    </StyledContainer>
  );
};

export default Blog;
