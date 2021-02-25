import React, { Component } from "react";
import "./basic.scss";

import { Switch, Route, Redirect } from "react-router-dom";

import { auth, handleUserProfile } from "./firebase/utils";

// layout
import MainLayout from "./Layouts/MainLayout";
import HomePageLayout from "./Layouts/HomePageLayout";

// pages
import Homepage from "./pages/HomePage";
import Registration from "./pages/Registration";
import LoginPage from "./pages/LoginPage";
import Recovery from "./pages/Recovery";

const initialState = {
  currentUser: null,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);

        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }

      this.setState(() => ({
        ...initialState,
      }));
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePageLayout currentUser={currentUser}>
                <Homepage />
              </HomePageLayout>
            )}
          />

          <Route
            path="/registration"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Registration />
                </MainLayout>
              )
            }
          />

          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <LoginPage />
                </MainLayout>
              )
            }
          />

          <Route
            path="/recovery"
            render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;

/*
delete tho code because we needed to save the data into firestore as well


  componentDidMount() {
    this.authListener = auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        this.setState(() => ({
          ...initialState,
        }));
      }

      this.setState(() => ({
        currentUser: userAuth,
      }));
    });
  }


*/
