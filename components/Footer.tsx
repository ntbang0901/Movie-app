import Image from "next/image";
import React from "react";
import styled from "styled-components";

import logo from "../assets/logo.png";

const StyledFooterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #090b13;
  padding: 50px;
  color: #fff;

  > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  > img {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  > p {
    max-width: 500px;
    padding: 32px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    /* or 150% */

    text-align: center;
  }
`;
const Footer = () => {
  return (
    <StyledFooterContainer>
      <Image src={logo} alt="logo" width={92} height={56} />
      <div>
        <span>Política de privacidad</span>
        <span>Acuerdo de suscripción</span>
        <span>Ayuda</span>
        <span>Dispositivos compatible</span>
        <span>Acerca de Disney+</span>
        <span>Publicidad personalizada</span>
      </div>
      <p>
        Disney+ es un servicio por suscripción de pago, su contenido está sujeto
        a disponibilidad. El servicio Disney+ es comercializado por Disney DTC
        LATAM, Inc., 2400 W Alameda AVE., Burbank CA 91521.
      </p>
      <span>© Disney. Todos los derechos reservados.</span>
    </StyledFooterContainer>
  );
};

export default Footer;
