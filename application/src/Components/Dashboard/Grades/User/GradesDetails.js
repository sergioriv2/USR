import { useSelector } from "react-redux";

import GradeDetailsDataTable from "../../../DataTable/GradesDetailsDataTable";

const GradesDetails = () => {
  const user = useSelector(({ user }) => user);
  const careerRedux = useSelector(({ career }) => career.entity);

  return (
    <div>
      <h1>Tus Notas de {careerRedux.descripcion}</h1>
      <GradeDetailsDataTable
        userId={user.entity._id}
        careerId={careerRedux.uid}
      />
    </div>
  );
};

export default GradesDetails;
