import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import styled from "styled-components";

import MotChill from "../assets/motchill.png";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledImageWrapper = styled.div`
  margin-bottom: 50px;
`;

const Loading = () => {
  return (
    <StyledContainer>
      <CircularProgress />
    </StyledContainer>
  );
};

export default Loading;
