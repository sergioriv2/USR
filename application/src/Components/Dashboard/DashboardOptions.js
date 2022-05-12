import { useSelector } from "react-redux";
import styled from "styled-components";
import UserCourses from "./Cursos/User/SelectCourses";
import Schedule from "./Schedule";

const Layout = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const Option = styled.section`
  --blurred-secondary: #bf136373;
  --blurred-primary: #4062cc70;

  width: 100%;
  height: 250px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  color: #eee;
  h2 {
    margin-top: 45px;
    margin-left: 40px;
    z-index: 2;
    position: relative;
  }

  &:nth-child(1) {
    max-width: 350px;
    background-color: var(--primary);
    box-shadow: 0px 5px 20px 5px var(--blurred-primary);
    overflow: hidden;

    &:after {
      content: "";
      display: block;
      position: absolute;
      border-radius: 0% 100% 70% 30% / 100% 100% 0% 0%;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      background-color: #2e4489;
    }
  }

  &:nth-child(2) {
    max-width: 400px;
    background-color: var(--secondary);
    box-shadow: 0px 5px 20px 5px var(--blurred-secondary);
    margin-left: 5%;
    overflow: hidden;
    &:before {
      content: "";
      display: block;
      position: absolute;
      border-radius: 0% 100% 81% 19% / 100% 50% 50% 0%;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      transform: rotate(180deg);
      background-color: #f1c1c938;
    }
  }
`;

const Button = styled.div`
  width: 45px;
  height: 45px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  border-radius: 15px;
  top: 30%;
  left: 20%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 3;
  &:after {
    display: block;
    content: ">";
    position: absolute;
    font-size: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const DashboardOptions = () => {
  const career = useSelector(({ career }) => career.entity);

  if (!career) return null;

  return (
    <Layout>
      {/* <Option>
        <h1>Visto últimamente</h1>
      </Option> */}
      <Option>
        <h2>Ver mis horarios</h2>
        <Button></Button>
      </Option>
      <Option>
        <h2>Ver mis cursos</h2>
        <Button></Button>
      </Option>
    </Layout>
  );
};

export default DashboardOptions;
