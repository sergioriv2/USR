import styled from "styled-components";
import EntityOption from "./EntityOption";

const Container = styled.div``;

const List = styled.ul`
  list-style: none;
  padding: 0;
  height: ${(params) => params.hght};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EntityListOptions = (props) => {
  const { options = [], hght = "180px" } = props;

  return (
    <Container>
      <List hght={hght}>
        {options.map((data, index) => (
          <EntityOption entity={data} key={index}></EntityOption>
        ))}
      </List>
    </Container>
  );
};

export default EntityListOptions;
