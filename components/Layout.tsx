import { Container } from "@mui/material";
import Head from "next/head";
import React, { ReactElement } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import NavbarHeader from "./NavbarHeader";

const StyledContainer = styled.div`
  position: relative;
`;

interface Props {
  title: string;
  children: ReactElement;
}

const Layout = ({ title, children }: Props) => {
  return (
    <StyledContainer>
      <Head>
        <title>{title}</title>
      </Head>
      <NavbarHeader />
      {children}
      <Footer />
    </StyledContainer>
  );
};

export default Layout;
