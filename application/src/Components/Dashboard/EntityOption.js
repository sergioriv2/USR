import styled from "styled-components";
import { useNavigate } from "react-router";

const Container = styled.li`
  & > p {
    margin: 0;
    text-align: center;
    padding: 0 15px;
    color: white;
    width: 100%;
  }

  cursor: pointer;
  display: flex;
  align-items: center;

  width: 230px;
  border-radius: 7px;
  height: 70px;
  background-color: #4062cc;
  transition: all 0.5s;
  font-size: 15px;
  &:hover {
    width: 300px;
    background-color: #495782d4;
  }
`;

const EntityOption = (props) => {
  const { entity } = props;
  const { name, path } = entity;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`./${path}`);
  };

  return (
    <Container onClick={() => handleClick()}>
      <p>{name}</p>
    </Container>
  );
};

export default EntityOption;
