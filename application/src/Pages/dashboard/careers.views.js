import AdminCareers from "../../Components/Dashboard/Careers/Admin/AdminCareers";
import UserCareers from "../../Components/Dashboard/Careers/User/UserCareers";

const CareersViews = () => {
  return (
    <section>
      <AdminCareers></AdminCareers>
      <UserCareers></UserCareers>
    </section>
  );
};

export default CareersViews;
