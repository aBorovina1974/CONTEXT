import React, { useContext, useRef } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const myRef = useRef(null);
  console.log("This is my ref: ", myRef);
  const contextData = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!contextData.isLoggedIn && <Login />}
        {contextData.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
