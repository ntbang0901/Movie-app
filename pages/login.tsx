import Button from "@mui/material/Button";
import Image from "next/image";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import styled from "styled-components";
import logo from "../assets/logo.png";

import logoGoogle from "../assets/logo_google.svg";
import Loading from "../components/Loading";
import { auth } from "../configs/firebase";
import { useCheckAuth } from "../hooks/useCheckAuth";

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
`;

const Login = () => {
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);
  const { loggedInUser } = useCheckAuth();
  const signWithGoogle = async () => {
    await signInWithGoogle();
  };

  return (
    <>
      {loggedInUser ? (
        <Loading />
      ) : (
        <StyledContainer>
          <Image src={logo} alt="logo" />
          <Button variant="outlined" onClick={signWithGoogle}>
            <Image src={logoGoogle} alt="logo google" width={50} />
            SIGN IN WITH GOOGLE
          </Button>
        </StyledContainer>
      )}
    </>
  );
};

export default Login;
