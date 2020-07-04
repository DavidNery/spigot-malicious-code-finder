import React from "react";

import GlobalStyle from "./styles/GlobalStyle";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

// I have some future ideas. So the routes
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact component={Home} path="/" />
        </Switch>
      </BrowserRouter>

      <GlobalStyle />
    </>
  );
};

export default App;
