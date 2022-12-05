import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/Authentication/SignIn";
import Scoresheets from "./Pages/Scoresheets/Scoresheets";
import Employees from "./Pages/Employees/Employees";
import Students from "./Pages/Students/Students";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Home />} path="" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<Students />} path="/students" />
        <Route element={<Employees />} path="/employees" />
        <Route element={<Scoresheets />} path="/scoresheets" />
      </Routes>
    </HashRouter>
  );
}

export default App;
