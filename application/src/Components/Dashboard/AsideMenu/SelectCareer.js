import { useSelector } from "react-redux";
import styled from "styled-components";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Layout = styled.div`
  border-bottom: 1px solid #5b5b5d;
  padding-bottom: 20px;
  margin: 10px 0 20px 0;
  font-family: Quicksand;
  width: 100%;
  position: relative;
  display: none;
`;

const Description = styled.p`
  margin: 0;
  font-weight: 500;
  color: #5b5b5d;
`;

const SelectLayout = styled.div``;

const Label = styled.p`
  margin: 0;
  margin-bottom: 20px;
  font-size: 14px;
  text-decoration: underline;
  font-weight: 700;
`;

const ChangeButton = styled.p`
  margin: 0;
  width: 80px;
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  bottom: 26%;
  right: 0;
  cursor: pointer;
  white-space: nowrap;
`;

const SelectCareer = () => {
  const { entity: career } = useSelector(({ career }) => career);
  const { loading, entity } = useSelector(({ user }) => user);

  return (
    <Layout>
      <SelectLayout>
        <Label>CARRERA SELECCIONADA</Label>
        <ChangeButton>(Cambiar)</ChangeButton>
        <Description>{career?.descripcion}</Description>
      </SelectLayout>
    </Layout>
  );
};
export default SelectCareer;
