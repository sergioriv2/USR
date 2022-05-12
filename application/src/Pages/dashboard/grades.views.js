import styled from "styled-components";

import { Outlet } from "react-router";

import UserGrades from "../../Components/Dashboard/Grades/User/UserGrades";
import TeacherGrades from "../../Components/Dashboard/Grades/Teacher/TeacherGrades";

const Layout = styled.section``;

const GradesViews = () => {
  return (
    <Layout>
      <UserGrades />
      <TeacherGrades />
      <Outlet></Outlet>
    </Layout>
  );
};

export default GradesViews;
