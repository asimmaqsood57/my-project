import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useTranslation } from "react-i18next";
import logodashboard from "../../assets/images/flowit-logo-dashboard.png";
import { useEffect } from "react";
import { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


const SideMenuList = ({setShow}:any) => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<any>(null);
  const classes = useStyles();
  useEffect(() => {
    if (localStorage.getItem("userData") !== null) {
      let data = localStorage.getItem("userData");
      setUserData(data !== null ? JSON.parse(data) : null);
    }
  }, []);

  return (
    <>
          <SimpleBar style={{ maxHeight: "100vh", overflow: "hidden" }}>
              <div className="sidebar-left ">
                  <div className="sidebar-logo ">
                      <img
                          onClick={() => setShow(false)}

                          className="sidebar-logo-dashboard "
                          alt="logo"
                          style={{ cursor: "pointer", marginTop: "-5px" }}
                          src={logodashboard}
                      />

                  </div>
                  <List className="sidemenu-list">
                      <ListItem button className={window.location.pathname.toLowerCase() === "/home/dashboard" ? "active" : ""}>
                          <Link to="/home/dashboard">
                              <ListItemIcon>
                                  <svg
                                      fill="#647bbc"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="7 2 9 40"
                                      width="25px"
                                      height="25px"
                                  >
                                      <path d="M 3 6 L 3 7 L 3 26 L 29 26 L 29 6 L 3 6 z M 5 8 L 11 8 L 11 24 L 5 24 L 5 8 z M 13 8 L 27 8 L 27 15 L 13 15 L 13 8 z M 13 17 L 19 17 L 19 24 L 13 24 L 13 17 z M 21 17 L 27 17 L 27 24 L 21 24 L 21 17 z" />
                                  </svg>
                              </ListItemIcon>
                              <ListItemText className="left-menu-item" primary="Dashboard" />
                          </Link>
                      </ListItem>
                      <ListItem button className={window.location.pathname.toLowerCase() === "/home/invoices" ? "active" : ""}>
                          <Link to="/home/invoices">
                              <ListItemIcon>
                                  <svg
                                      fill="#647bbc"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="6 6 9 44"
                                      width="25px"
                                      height="25px"
                                  >
                                      <path d="M 4 6 L 4 26 L 28 26 L 28 6 Z M 6 8 L 26 8 L 26 24 L 6 24 Z M 8 12 L 8 14 L 19 14 L 19 12 Z M 21 12 L 21 14 L 24 14 L 24 12 Z M 8 16 L 8 18 L 19 18 L 19 16 Z M 21 16 L 21 18 L 24 18 L 24 16 Z M 21 20 L 21 22 L 24 22 L 24 20 Z" />
                                  </svg>
                              </ListItemIcon>
                              <ListItemText className="left-menu-item" primary={t("mainpage.side_menu.invoices")} />
                          </Link>
                      </ListItem>
                      <ListItem button className={window.location.pathname.toLowerCase() === "/home/documents" ? "active" : ""}>
                          <Link to="/home/documents">
                              <ListItemIcon>
                                  <svg
                                      fill="#647bbc"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="7 2 9 40"
                                      width="25px"
                                      height="25px"
                                  >
                                      <path d="M 3 5 L 3 10 L 3 27 L 7 27 L 7 29 L 13.007812 29 L 12.992188 27 L 19.037109 27 L 19.050781 29 L 25 29 L 25 27 L 29 27 L 29 7 L 13.414062 7 L 11.414062 5 L 3 5 z M 5 7 L 10.585938 7 L 11.585938 8 L 10.587891 9 L 5 9.0019531 L 5 7 z M 13.414062 9 L 27 9 L 27 25 L 25 25 L 25 17 L 7 17 L 7 18 L 7 25 L 5 25 L 5 11.001953 L 11.416016 11 L 13.414062 9 z M 9 19 L 23 19 L 23 27 L 21.037109 27 L 20.992188 21 L 10.949219 21 L 10.992188 27 L 9 27 L 9 19 z M 12.962891 23 L 19.007812 23 L 19.021484 25 L 12.978516 25 L 12.962891 23 z" />
                                  </svg>
                              </ListItemIcon>
                              <ListItemText className="left-menu-item" primary={t("mainpage.side_menu.documents")} />
                          </Link>
                      </ListItem>
                      <ListItem button className={window.location.pathname.toLowerCase() === "/home/customers" ? "active" : ""}>
                          <Link to="/home/customers">
                              <ListItemIcon>
                                  <svg
                                      fill="#647bbc"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="7 2 9 40"
                                      width="25px"
                                      height="25px"
                                  >
                                      <path d="M 6 3 L 6 8 L 5 8 L 5 10 L 8 10 L 8 8 L 8 5 L 24 5 L 24 16.4375 C 24.633 16.2125 25.303 16.071391 26 16.025391 L 26 3 L 6 3 z M 16 9 C 13.802706 9 12 10.802706 12 13 C 12 14.116489 12.468707 15.127464 13.214844 15.855469 C 11.882042 16.756969 11 18.282542 11 20 L 13 20 C 13 18.345455 14.345455 17 16 17 C 17.654545 17 19 18.345455 19 20 L 21 20 C 21 18.282542 20.117958 16.756969 18.785156 15.855469 C 19.531293 15.127464 20 14.116489 20 13 C 20 10.802706 18.197294 9 16 9 z M 6 11 L 6 13 L 5 13 L 5 15 L 8 15 L 8 13 L 8 11 L 6 11 z M 16 11 C 17.116414 11 18 11.883586 18 13 C 18 14.116414 17.116414 15 16 15 C 14.883586 15 14 14.116414 14 13 C 14 11.883586 14.883586 11 16 11 z M 6 16 L 6 18 L 5 18 L 5 20 L 8 20 L 8 18 L 8 16 L 6 16 z M 26.5 18 C 23.5 18 21 20.5 21 23.5 C 21 24.7 21.4 25.699609 22 26.599609 L 18.300781 30.300781 L 19.699219 31.699219 L 23.400391 28 C 24.300391 28.6 25.4 29 26.5 29 C 29.5 29 32 26.5 32 23.5 C 32 20.5 29.5 18 26.5 18 z M 26.5 20 C 28.4 20 30 21.6 30 23.5 C 30 25.4 28.4 27 26.5 27 C 24.6 27 23 25.4 23 23.5 C 23 21.6 24.6 20 26.5 20 z M 6 22 L 6 27 L 19.871094 27 C 19.542094 26.379 19.295391 25.708 19.150391 25 L 8 25 L 8 22 L 6 22 z" />
                                  </svg>
                              </ListItemIcon>
                              <ListItemText className="left-menu-item" primary={t("mainpage.side_menu.customers")} />
                          </Link>
                      </ListItem>

                      <ListItem button className={window.location.pathname.toLowerCase() === "/home/articles" ? "active" : ""}>
                          <Link to="/home/articles">
                              <ListItemIcon>
                                  <svg
                                      fill="#647bbc"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="7 2 9 40"
                                      width="25px"
                                      height="25px"
                                  >
                                      <path d="M 2 7 L 2 25 L 4 25 L 4 7 Z M 6 7 L 6 25 L 12 25 L 12 7 Z M 14 7 L 14 25 L 16 25 L 16 7 Z M 18 7 L 18 25 L 22 25 L 22 7 Z M 24 7 L 24 25 L 26 25 L 26 7 Z M 28 7 L 28 25 L 30 25 L 30 7 Z" />
                                  </svg>
                              </ListItemIcon>
                              <ListItemText className="left-menu-item" primary={t("mainpage.side_menu.articles")} />
                          </Link>
                      </ListItem>

                      <ListItem button className={window.location.pathname.toLowerCase() === "/home/settings" ? "active" : ""}>
                          <Link to="/home/settings">
                              <ListItemIcon>
                                  <svg
                                      fill="#647bbc"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="5 5 9 40"
                                      width="25px"
                                      height="25px"
                                  >
                                      <path d="M 13.1875 3 L 13.03125 3.8125 L 12.4375 6.78125 C 11.484375 7.15625 10.625 7.683594 9.84375 8.3125 L 6.9375 7.3125 L 6.15625 7.0625 L 5.75 7.78125 L 3.75 11.21875 L 3.34375 11.9375 L 3.9375 12.46875 L 6.1875 14.4375 C 6.105469 14.949219 6 15.460938 6 16 C 6 16.539063 6.105469 17.050781 6.1875 17.5625 L 3.9375 19.53125 L 3.34375 20.0625 L 3.75 20.78125 L 5.75 24.21875 L 6.15625 24.9375 L 6.9375 24.6875 L 9.84375 23.6875 C 10.625 24.316406 11.484375 24.84375 12.4375 25.21875 L 13.03125 28.1875 L 13.1875 29 L 18.8125 29 L 18.96875 28.1875 L 19.5625 25.21875 C 20.515625 24.84375 21.375 24.316406 22.15625 23.6875 L 25.0625 24.6875 L 25.84375 24.9375 L 26.25 24.21875 L 28.25 20.78125 L 28.65625 20.0625 L 28.0625 19.53125 L 25.8125 17.5625 C 25.894531 17.050781 26 16.539063 26 16 C 26 15.460938 25.894531 14.949219 25.8125 14.4375 L 28.0625 12.46875 L 28.65625 11.9375 L 28.25 11.21875 L 26.25 7.78125 L 25.84375 7.0625 L 25.0625 7.3125 L 22.15625 8.3125 C 21.375 7.683594 20.515625 7.15625 19.5625 6.78125 L 18.96875 3.8125 L 18.8125 3 Z M 14.8125 5 L 17.1875 5 L 17.6875 7.59375 L 17.8125 8.1875 L 18.375 8.375 C 19.511719 8.730469 20.542969 9.332031 21.40625 10.125 L 21.84375 10.53125 L 22.40625 10.34375 L 24.9375 9.46875 L 26.125 11.5 L 24.125 13.28125 L 23.65625 13.65625 L 23.8125 14.25 C 23.941406 14.820313 24 15.402344 24 16 C 24 16.597656 23.941406 17.179688 23.8125 17.75 L 23.6875 18.34375 L 24.125 18.71875 L 26.125 20.5 L 24.9375 22.53125 L 22.40625 21.65625 L 21.84375 21.46875 L 21.40625 21.875 C 20.542969 22.667969 19.511719 23.269531 18.375 23.625 L 17.8125 23.8125 L 17.6875 24.40625 L 17.1875 27 L 14.8125 27 L 14.3125 24.40625 L 14.1875 23.8125 L 13.625 23.625 C 12.488281 23.269531 11.457031 22.667969 10.59375 21.875 L 10.15625 21.46875 L 9.59375 21.65625 L 7.0625 22.53125 L 5.875 20.5 L 7.875 18.71875 L 8.34375 18.34375 L 8.1875 17.75 C 8.058594 17.179688 8 16.597656 8 16 C 8 15.402344 8.058594 14.820313 8.1875 14.25 L 8.34375 13.65625 L 7.875 13.28125 L 5.875 11.5 L 7.0625 9.46875 L 9.59375 10.34375 L 10.15625 10.53125 L 10.59375 10.125 C 11.457031 9.332031 12.488281 8.730469 13.625 8.375 L 14.1875 8.1875 L 14.3125 7.59375 Z M 16 11 C 13.25 11 11 13.25 11 16 C 11 18.75 13.25 21 16 21 C 18.75 21 21 18.75 21 16 C 21 13.25 18.75 11 16 11 Z M 16 13 C 17.667969 13 19 14.332031 19 16 C 19 17.667969 17.667969 19 16 19 C 14.332031 19 13 17.667969 13 16 C 13 14.332031 14.332031 13 16 13 Z" />
                                  </svg>
                              </ListItemIcon>
                              <ListItemText className="left-menu-item" primary={t("mainpage.side_menu.settings")} />
                          </Link>
                      </ListItem>
                  </List>
                  <List className="sidemenu-list-bottom" style={{ width: "100%", textAlign: "center" }}>
                      <span className="fd">Version: 1.0.0</span>
                  </List>
              </div>
          </SimpleBar>
    </>
  );
};

export default SideMenuList;
