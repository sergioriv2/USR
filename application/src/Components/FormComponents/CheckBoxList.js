import CheckBox from "./CheckBox";

const CheckBoxList = ({ ...props }) => {
  const { source } = props;
  return (
    <div>
      {source.map((x, index) => (
        <CheckBox value={x.value} key={index} {...props}>
          {x.name}
        </CheckBox>
      ))}
    </div>
  );
};

export default CheckBoxList;
