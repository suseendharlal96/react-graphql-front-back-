import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

import "./App.css";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar />
          <Route path="/" exact component={Home} />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
