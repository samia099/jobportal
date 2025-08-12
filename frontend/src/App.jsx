import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";

import Main from "./layout/Main";
import SignUpFlow from "./pages/Auth/SignUpFlow";
import SignIn from "./pages/Auth/SignIn";

const App = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/signUp" element={<SignUpFlow />} />
      <Route path="/signIn" element={<SignIn />} />
    </Routes>
  );
};

export default App;
