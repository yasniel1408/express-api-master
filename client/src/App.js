import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
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
        {user == null ? <Header /> : ""}

        <NavBar />

        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" render={() => <Home />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/contact" render={() => <Contact />} />

            {user !== null ? ( //Rutas protegidas
              <Route exact path="/dashboard" render={() => <Dashboard />} />
            ) : (
              <Route exact path="/dashboard" render={() => <Page403 />} />
            )}

            {user !== null ? ( //Rutas protegidas
              <Route exact path="/product" render={() => <Products />} />
            ) : (
              <Route exact path="/product" render={() => <Page403 />} />
            )}

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
