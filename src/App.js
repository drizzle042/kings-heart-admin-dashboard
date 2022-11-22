import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/Authentication/SignIn/SignIn";
import Scoresheets from "./Pages/Scoresheets/Scoresheets";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Home />} path="" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<Scoresheets />} path="/scoresheets" />
      </Routes>
    </HashRouter>
  );
}

export default App;
