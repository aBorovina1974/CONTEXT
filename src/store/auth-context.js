import React, { useState, useEffect } from "react";

/**
 * To use context in app we need to do two things
 * 1. Provide it: tell React all components that
 *    are wrapped by it should access it.
 *
 * 2. Consume it: If we need for ex. this context
 *    in entire app. we need to wrapp everything in
 *    app. component with it.
 *    If we for ex. need it in Login comp and it's
 *    child components we can only wrapp Login components,
 *    All wrapped components and therir's CHILD components
 *    can utilize context
 *
 *    BUILDING A CUSTOM CONTEXT PROVIDER COMPONENT:
 *    It is a good idea to also add functions to the
 *    default context when we create context.
 *
 *    Depending on our application structure, and how
 *    we managing our data we also mihgt to pull more
 *    logic out for example App component, and create
 *    separate let's say Context Management component.
 *
 *
 *    So in our AutContext store file let's create
 *    AuthContextProvider conmponent now actually,
 *    where we return <AuthContext.provider/> and accept
 *    props, and simply pass whatever we got via
 *    {props.children}. In addition we also export
 *    AuthContextProvider as named export. Now we can
 *    import useState here inside of the auth-context.js,
 *    and manage isLogged in state.
 *
 *    NOW WE HAVE THIS STAND ALONE FILE WHICH MANAGES
 *    THE ENTIRE LOGIN STATE IN AuthContextProvider
 *    COMPONENT, AND WHICH ALSO SETS UP ALL THE CONTEXT.
 *
 *    NOW WE CAN STRIP THAT ALL OUT OF App COMPONENT
 *    WE NEED TO MOVE LOCAL STORAGE ACCES HERE FROM App
 *    COMPONENT, AND ALSO ADD useEffect HERE
 *
 *    WE CAN WRAPP App COMPONENT IN index.js FILE
 *    WITH OUR AuthContextProvider COMPONENT, AND WITH
 *    THAT WE HAVE ONE CENTRAL PLACE FOR THE STATE
 *    MANAGEMENT (AUTH STATE MANAGEMENT), AND THAT
 *    CENTRAL PLACE IS NOW NOT App COMPONENT, BUT THE
 *    DEDICATED CONTEXT COMPONENT AND THE DEDICATIED
 *    CONTEXT FILE. THIS MAY BE A STRUCTURE TO CONSIDER
 *    BECAUSE IT GIVES A LEANER App COMPONENT, WHICH IS NOW
 *    NOT CONCERNED WITH APP WIDE STATE MANAGEMENT
 *    AND NOW INSTEAD JUST FOCUS ON BRINGING SOMETHING
 *    ONTO THE SCREEN.
 */

const AuthContext = React.createContext({
  isLoggedIn: false,
  //Dummy function, only for better autocompletion
  onLogout: () => {},
  //Dummy function, to make clear that we are dealing with
  //email and password, technically we are not doing anything
  //with that data but technically we would need it
  //in a real app
  onLogin: (email, password) => {},
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "LOGGED_IN") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "LOGGED_IN");
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
