import styled from "styled-components";

const SignUp = styled.p`
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Course = ({ curso_uid, materia, signedUp, handleClick }) => {
  return (
    <div>
      <p>{materia.nombre}</p>
      {!signedUp ? (
        <SignUp onClick={() => handleClick(curso_uid)}>Anotarse</SignUp>
      ) : null}
    </div>
  );
};
export default Course;
