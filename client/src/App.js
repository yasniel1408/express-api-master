import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";
import { Page404 } from "./pages/Page404/Page404";
import { connect } from "react-redux";
import { Page403 } from "./pages/Page403/Page403";
import { autoLoginUser } from "./redux/actions/userActions";
import { Products } from "./pages/Products/Products";
import { Users } from "./pages/Users/Users";

export function App({ user, autoLoginUser }) {
  useEffect(() => {
    const load = async () => {
      await autoLoginUser();
    };
    load();
  }, [autoLoginUser]);

  return (
    <Router>
      <>
        <Header />

        <NavBar />

        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" render={() => <Home />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/contact" render={() => <Contact />} />
            <Route
              exact
              path="/dashboard"
              render={() => (user !== null ? <Dashboard /> : <Page403 />)}
            />
            <Route
              exact
              path="/product"
              render={() => (user !== null ? <Products /> : <Page403 />)}
            />
            <Route
              exact
              path="/user"
              render={() => (user !== null ? <Users /> : <Page403 />)}
            />
            <Route component={() => <Page404 />} />
          </Switch>
        </Suspense>

        <Footer />
      </>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    loading: state.userReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLoginUser: () => dispatch(autoLoginUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
