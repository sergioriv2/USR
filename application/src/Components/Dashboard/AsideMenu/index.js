import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import AsideMenuOptions from "./MenuOptions";

const Layout = styled.aside`
  width: ${(props) => (!props.state ? "300px" : "80px")};
  padding: 30px 15px;
  height: 100vh;
  position: sticky;
  left: 0;
  top: 0;
  z-index: 1000;
  font-size: 16px;
  font-weight: 300;

  transition: all 0.4s;
  & > div > img,
  & > div > p,
  & > div > div > p {
    white-space: nowrap;
    display: block;
    ${(props) => (!props.state ? "" : "display: none")};
  }
`;

const UserLayout = styled.div`
  & > img {
    margin: 15px 10px;
    max-width: 70px;
    border-radius: 50%;
    box-shadow: -3px 2px 7px 2px rgba(0, 0, 0, 0.2);
  }

  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const UserDescription = styled.div`
  position: relative;
  & > p {
    margin: 0;
    font-weight: 700;
  }
`;

const UserNames = styled.p`
  font-weight: bold;
`;

const UserRole = styled.p`
  text-transform: capitalize;
  color: #4062cc;
  font-size: 14px;
  margin-top: -5px !important;
`;

const ToggleButton = styled.i`
  color: #4062cc;
  font-size: 30px;
  position: absolute;
  top: 12%;
  right: -15px;
  z-index: 1001;

  &:hover {
    cursor: pointer;
  }

  ${(props) => (!props.state ? "transform: rotate(180deg)" : "")};
`;

const AsideMenu = () => {
  const user = useSelector(({ user }) => user);
  const [closed, setClosed] = useState(false);

  const closeSideBar = () => {
    setClosed(!closed);
  };

  return (
    <Layout state={closed}>
      <UserLayout>
        {user.loading !== "succeded" ? (
          <Skeleton circle={true} width={70} height={70}></Skeleton>
        ) : (
          <img
            src={user.entity.img}
            alt={
              user.entity.nombres.toLowerCase() +
              "-" +
              user.entity.apellidos.toLowerCase()
            }
          ></img>
        )}

        <UserDescription state={closed}>
          {user.loading !== "succeded" ? (
            <Skeleton width={160}></Skeleton>
          ) : (
            <UserNames>
              {user.entity.nombres} {user.entity.apellidos}
            </UserNames>
          )}
          {user.loading !== "succeded" ? (
            <Skeleton width={70}></Skeleton>
          ) : (
            <UserRole>{user.entity.rol.toLowerCase()}</UserRole>
          )}
        </UserDescription>
      </UserLayout>
      <ToggleButton
        state={closed}
        onClick={closeSideBar}
        className="fa-solid fa-circle-chevron-right"
      ></ToggleButton>
      <AsideMenuOptions />
    </Layout>
  );
};

export default AsideMenu;
