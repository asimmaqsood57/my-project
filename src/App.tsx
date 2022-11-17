import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import "react-toastify/dist/ReactToastify.css";
import Login from "../src/components/01-Login/login";
import "./App.scss";
import "./styles/style.css";
import Home from "./components/00-Home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@material-ui/core/Grid";
import "./index.scss";
import ProtectedRoute from "../src/components/Routs-auth/auth";

export const MainContent = createContext<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}>({
  show: false,
  setShow: (s) => {},
});

export const useMainContext = () => useContext(MainContent);

function App() {
  const [show, setShow] = useState<boolean>(true);
  return (
    <>
      <MainContent.Provider value={{ show, setShow }}>
        <Grid container spacing={0}>
          <Grid item sm={12} md={12} xs={12}>
            <Router>
              <div className="App">
                <ToastContainer />
                <Switch>
                  <Route exact path="/" component={Login} />
                  <ProtectedRoute path="/home" component={Home} />
                </Switch>
              </div>
            </Router>
          </Grid>
        </Grid>
      </MainContent.Provider>
    </>
  );
}

export default App;
