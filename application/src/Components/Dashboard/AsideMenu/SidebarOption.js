import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const OptionLayout = styled.div`
  display: flex;
  height: 55px;
  margin-bottom: 20px;
  align-items: center;
  transition: background-color 0.4s, color 0.2ms;
  justify-content: flex-start;
  width: 100%;
  border-radius: 5px;

  &:not(:hover) {
    color: #5b5b5d;
  }

  &:last-child {
    transition: all 0.3s;
    position: absolute;
    bottom: 0px;
    margin: 0;
    color: #eef1ef;
    background-color: #0c0910;
    width: 100%;
    height: 70px;
    border: 1px solid #0c0910;

    &:hover {
      background-color: inherit;
      color: #0c0910;
    }
  }

  &:hover {
    cursor: pointer;
    background-color: #bf1363;
    color: #eef1ef;
  }

  & > i {
    display: flex;
    margin-left: 15px;
    min-width: 60px;
    font-size: 20px;
  }
`;

const SidebarOption = ({ option }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (element) => {
    if (element.path === "/") {
      dispatch({ type: "logout/set", payload: true });
    }

    navigate(element.path);
  };

  return (
    <OptionLayout onClick={() => handleClick(option)}>
      <i className={option.icon}></i>
      <p>{option.name}</p>
    </OptionLayout>
  );
};

export default SidebarOption;
