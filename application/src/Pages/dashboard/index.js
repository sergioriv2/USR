import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import {
  setFetchPending,
  setFetchFulfilled,
  setFetchError,
} from "../../Actions/userActions";

import useLocalStorage from "../../Hooks/useLocalStorage";

import DashboardComponent from "../../Components/Dashboard/DashboardComponent";

import AsideMenu from "../../Components/Dashboard/AsideMenu";

import GradesDetails from "../../Components/Dashboard/Grades/User/GradesDetails";

import CreateCourses from "../../Components/Dashboard/Cursos/Admin/CreateCourses";
import ListarCursos from "../../Components/Dashboard/Cursos/Admin/ListCourses";

import CareerDetails from "../../Components/Dashboard/Careers/User/CareerDetails";
import CreateCareers from "../../Components/Dashboard/Careers/Admin/CreateCareers";
import ListCareers from "../../Components/Dashboard/Careers/Admin/ListAdminCareers";

import CreateUser from "../../Components/Dashboard/Users/Admin/CreateUser";
import ListTeachers from "../../Components/Dashboard/Users/Admin/ListTeachers";
import ListStudents from "../../Components/Dashboard/Users/Admin/ListStudents";

import { Courses, Careers, Users, Grades, Stats, NoMatch } from "./views.js";

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  background: #eef1ef;
  padding: 20px 40px;
  width: 100%;
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [token] = useLocalStorage("token");

  const apiEndpoint = "http://localhost:3001/api/usuarios/";

  const fetchUser = useCallback(async () => {
    dispatch(setFetchPending());

    fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.status !== 200) {
          dispatch(
            setFetchError({ status: res.status, message: data.message })
          );
          return;
        }
        dispatch(setFetchFulfilled(data.results));
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Container>
      <AsideMenu />
      <Content>
        <Routes>
          <Route index path="/" element={<DashboardComponent />} />
          <Route path="courses">
            <Route index element={<Courses />} />
            <Route path="add" element={<CreateCourses />}></Route>
            <Route path="list" element={<ListarCursos />}></Route>
            <Route path="*" element={<NoMatch />}></Route>
          </Route>

          <Route path="careers">
            <Route index element={<Careers />} />
            <Route path="add" element={<CreateCareers />}></Route>
            <Route path="list" element={<ListCareers />}></Route>
            <Route path="details/:id" element={<CareerDetails />}></Route>
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="add" element={<CreateUser />} />
            <Route path="list_teachers" element={<ListTeachers />} />
            <Route path="list_students" element={<ListStudents />} />
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
          <Route path="stats" element={<Stats />} />
          <Route path="grades" element={<Grades />}>
            <Route path="add"></Route>
            <Route path="list"></Route>
            <Route path="edit"></Route>
            <Route path="details/:id" element={<GradesDetails />}></Route>
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
        </Routes>
      </Content>

      <Outlet></Outlet>
    </Container>
  );
};
export default Dashboard;
