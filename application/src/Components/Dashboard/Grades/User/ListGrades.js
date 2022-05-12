import styled from "styled-components";

import { Outlet } from "react-router";

import UserCareers from "../../Careers/User/UserCareers";

const Layout = styled.section``;

const Grades = () => {
  return (
    <Layout>
      <UserCareers></UserCareers>

      <Outlet></Outlet>
    </Layout>
  );
};

export default Grades;
