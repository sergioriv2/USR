import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  setFetchPending,
  setFetchFulfilled,
  setFetchError,
} from "../../Actions/loginActions";

import TextField from "../FormComponents/TextField";

const Container = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
  border-right: 1px solid rgb(0, 0, 0, 0.2);
  background-color: #fff;
  position: relative;
  z-index: 10;
`;

const Content = styled.div`
  min-height: 60%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  & > h1,
  p {
    margin: 0;
  }

  & > h1 {
    font-size: 32px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  text-align: center;
  margin-bottom: 20px;
  width: 80%;
`;
const FormContainer = styled.div`
  width: 80%;
  height: 400px;

  & > form {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div {
      width: 100%;
    }
  }
`;

const LoginButton = styled.button`
  background-color: #0c0910;
  color: #eef1ef;
  min-width: 300px;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  border: 0;
  height: 55px;
  border-radius: 8px;
  margin-top: 5%;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 5px 9px 0 rgba(0, 0, 0, 0.3);
  }
`;

const apiEndpoint = "http://localhost:3001/api/auth";

const handleSubmitLogin = (values) => async (dispatch) => {
  dispatch(setFetchPending());

  await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then(async (res) => {
      const data = await res.json();

      if (res.status !== 200) {
        if (data.length >= 1) {
          dispatch(setFetchError({ status: res.status, message: data[0].msg }));
          return;
        }
        dispatch(setFetchError({ status: res.status, message: data.msg }));
        return;
      }

      dispatch(setFetchFulfilled(data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const LoginComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((e) => e.fetchToken);

  const handleSubmit = (values, resetForm) => {
    dispatch(handleSubmitLogin(values));
    dispatch({ type: "logout/set", payload: false });
  };

  return (
    <Container>
      <Content>
        <Header>
          <h1>Inicio de Sesión</h1>
          <p>Accede al panel administrativo para alumnos y docentes de USR.</p>
        </Header>
        <FormContainer>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { resetForm }) =>
              handleSubmit(values, resetForm)
            }
            validationSchema={Yup.object({
              email: Yup.string()
                .required("Obligatorio")
                .typeError("Ingresa un email valido."),
              password: Yup.string().required("Obligatorio"),
            })}
          >
            <Form>
              <TextField
                name="email"
                type="email"
                label="Correo electrónico"
                important={true}
                disabled={user.loading === "pending" ? true : false}
              ></TextField>
              <TextField
                name="password"
                type="password"
                label="Contraseña"
                disabled={user.loading === "pending" ? true : false}
              ></TextField>
              <LoginButton
                type="submit"
                disabled={user.loading === "pending" ? true : false}
              >
                Iniciar sesion
              </LoginButton>
            </Form>
          </Formik>
        </FormContainer>
        {user.loading === "rejected" ? <p>{user.error.message}</p> : null}
      </Content>
    </Container>
  );
};

export default LoginComponent;
