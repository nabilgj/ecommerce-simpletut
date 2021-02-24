import React from "react";
import "./basic.scss";

import { Switch, Route } from "react-router-dom";

// layout
import MainLayout from "./Layouts/MainLayout";
import HomePageLayout from "./Layouts/HomePageLayout";

// pages
import Homepage from "./pages/HomePage";
import Registration from "./pages/Registration";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomePageLayout>
              <Homepage />
            </HomePageLayout>
          )}
        />

        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
