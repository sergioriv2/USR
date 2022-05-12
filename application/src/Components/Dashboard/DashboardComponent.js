import { useSelector } from "react-redux";
import styled from "styled-components";
import SelectCareer from "./Careers/User/SelectCareer";
import UserCourses from "./Cursos/User/SelectCourses";

import DashboardOptions from "./DashboardOptions";
import Schedule from "./Schedule";

const Layout = styled.section`
  margin: 20px 0;
  padding: 0 30px;
`;

const WelcomeContainer = styled.div`
  font-size: 20px;
  margin-bottom: 30px;
`;

const Welcome = styled.h1`
  font-size: 45px;
  margin-bottom: 10px;
  color: var(--primary);
`;

const Phrase = styled.p`
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
  font-size: 16px;
`;

const Dashboard = () => {
  const { entity } = useSelector(({ user }) => user);
  return (
    <Layout>
      <WelcomeContainer>
        <Welcome>Bienvenido {entity.nombres}.</Welcome>
        <Phrase>
          Explora tus horarios de cursada, notas y anotate en los días de
          inscripción a los cursos.
        </Phrase>
      </WelcomeContainer>

      <DashboardOptions></DashboardOptions>
      <Schedule></Schedule>
      <UserCourses></UserCourses>
      <SelectCareer></SelectCareer>
    </Layout>
  );
};

export default Dashboard;
