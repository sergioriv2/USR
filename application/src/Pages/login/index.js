import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginBackground from "../../assets/login_background.svg";

import styled from "styled-components";

import LoginComponent from "../../Components/LoginComponent";
import { useEffect } from "react";

const Content = styled.section`
  height: 100vh;
  background-color: #eef1ef;
  position: relative;
  overflow: hidden;

  & > img {
    position: absolute;
    height: 100vh;
    width: 90%;
    right: -300px;
  }
`;

const InicioSesion = () => {
  const fetchToken = useSelector(({ fetchToken }) => fetchToken);
  const logout = useSelector(({ logout }) => logout);

  const navigate = useNavigate();

  useEffect(() => {
    //Arreglar esto para salir de la sesion
    if (!logout.entity && fetchToken.loading === "succeded")
      navigate("/dashboard");
  }, [fetchToken, navigate, logout]);

  return (
    <Content>
      <img draggable="false" src={LoginBackground} alt="background" />
      <LoginComponent></LoginComponent>
    </Content>
  );
};

export default InicioSesion;
