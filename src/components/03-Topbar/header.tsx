import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import logodashboard from "../../assets/images/flowit-logo-dashboard.png";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import SearchBar from 'material-ui-search-bar';
import { useTranslation } from 'react-i18next';
import { onFailure } from '../helper/onFailure';
import axios from "axios";

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

export default function Header({ setShow }: any) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [haveimage, setHaveimage] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    window.location.href = "/"
  }
  const token = localStorage.getItem("userToken");
  const SERVER_URL = process.env.REACT_APP_SERVER;

  const loadUsers = async () => {
    try {

      const result = await axios.get(
          `${SERVER_URL}/user/${token}`
      );

      console.log(result.data, "My userrrrrrrrrr");
      if (result.data.profilePictureBase64 !== null) {
        setHaveimage(true)
        var image = new Image();
        image.src = `data:image/png;base64,${result.data.profilePictureBase64}`;
        document.getElementById("imageDiv").appendChild(image);
      }

    } catch (error) {
      console.log(error)

    }
  };
  React.useEffect(() => {
    loadUsers()
  }, [])

  return (
    <div className={classes.root}>

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <div className="sidebar-logo" style={{ width: "60px", overflow: "hidden", marginLeft: "-10px" }}>
              <img
                onClick={() => setShow(true)}
                className="sidebar-logo-dashboard"
                alt="logo"
                style={{ cursor: "pointer" }}
                src={logodashboard}
              />

            </div>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <SearchBar

              onChange={e => {
                //this.setState({ searchItem: e.target.value })
              }}
              placeholder={t("mainpage.common.search")}
              onRequestSearch={() => console.log('onRequestSearch')}
              style={{
                margin: '0 auto',
                maxWidth: 800
              }}
            />
          </Typography>
          {auth && (

            <div>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {haveimage ?
                  <div id='imageDiv' style={{ width: "30px", borderRadius: "50%", overflow: "hidden", cursor:"pointer" }}>

                  </div>
                  : <AccountCircle />}

              </IconButton>
              <Menu
                id="menu-appbar"
                style={{ marginTop: "40px" }}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >

                <Link to="/home/profile" className='text-gray'>
                  <MenuItem onClick={handleClose}>
                    Profile
                  </MenuItem>
                </Link>

                <MenuItem onClick={() => {
                  handleClose()
                  logout()
                }}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
