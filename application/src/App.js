import { Routes, Route, Navigate } from "react-router-dom";

import InicioSesion from "./Pages/login";
import Dashboard from "./Pages/dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Navigate to="/inicio" />} />
        <Route path="inicio" element={<InicioSesion />}></Route>
        <Route path="dashboard/*" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
