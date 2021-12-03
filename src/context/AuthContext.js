import React, { useEffect, useState } from "react";
export const AuthContext = React.createContext();

const userInfoInitialState = {
  name: "",
  email: "",
  user_id: "",
};

function AuthContextProvider({ children }) {
  let prevAuth = false;
  let jwtToken = null;
  let prevUserInfo = userInfoInitialState;
  let prevUsing = null;

  // only execute on client side
  if (typeof window !== "undefined") {
    prevAuth =
      JSON.parse(window.localStorage.getItem("authenticated")) || false;
    jwtToken = window.localStorage.getItem("token") || null;
    prevUsing = window.localStorage.getItem("using") || null;
    prevUserInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  }
  const [authenticated, setAuthenticated] = useState(prevAuth || false);
  const [token, setToken] = useState(jwtToken || null);
  const [using, setUsing] = useState(prevUsing || null);
  const [userInfo, setUserInfo] = useState(
    prevUserInfo || userInfoInitialState
  );

  useEffect(() => {
    window.localStorage.setItem("authenticated", authenticated);
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("using", using);
    window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [authenticated, token, using, userInfo]);

  const defaultContext = {
    authenticated,
    setAuthenticated,
    token,
    setToken,
    using,
    setUsing,
    userInfo,
    setUserInfo,
  };
  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
