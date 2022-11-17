import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import React from 'react';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import MoveToInboxOutlinedIcon from '@material-ui/icons/MoveToInboxOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useEffect } from 'react';
import { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import ExtensionOutlinedIcon from '@material-ui/icons/ExtensionOutlined';
import BeachAccessOutlinedIcon from '@material-ui/icons/BeachAccessOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';


const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      minHeight: '64px'
    },
    noneInSmall: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    noneInMidudem: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

export type TopBarProps = {
  addLink: Function;
}

const Topbar: React.FunctionComponent<TopBarProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
    const link = React.useState(0);

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (localStorage.getItem('userData') !== null) {
      let data = localStorage.getItem('userData')
      setUserData(data !== null ? JSON.parse(data) : null);
    }
  }, []);

  const changeLanguage = (e: any) => {
    i18next.changeLanguage(e);

    handleMenuCloseLanguage();
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMenuOpenLanguage = Boolean(anchorE2);


  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNewItem = (event: React.MouseEvent<HTMLElement>) => {
      props.addLink();
  };


  const handleMenuCloseLanguage = () => {
    setAnchorE2(null);
  };
  const logout = () => {
    localStorage.setItem("isVal", '0');
    localStorage.setItem("userData", '');
    history.push("/");
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <div className="primary-right-plus-icon-menu">
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >

        {/* {userData !== null && (<MenuItem><strong>{userData.name}</strong></MenuItem>)} */}
        <MenuItem className="topbarlinkprofile">
          <PersonOutlineOutlinedIcon />
          <a href="/home/profile"><strong>General Information</strong><br /><span>Profile photo, name & language</span></a>
        </MenuItem>
        <MenuItem className="topbarlinkprofile">
          <ExtensionOutlinedIcon />
          <a href="#"><strong>Account & Apps</strong><br /><span>Connected tools & services</span></a>
        </MenuItem>
        <MenuItem className="topbarlinkprofile">
          <BeachAccessOutlinedIcon />
          <a href="/home/accountsettings"><strong>Security</strong><br /><span>Password & security questions</span></a>
        </MenuItem>
        <MenuItem className="topbarlinkprofile">
          <PaymentOutlinedIcon />
          <a href="#"><strong>Billing</strong><br /><span>Setup payment method mode</span></a>
        </MenuItem>
        <MenuItem className="topbarlinkprofile no-border">
          <NotificationsNoneOutlinedIcon />
          <a href="#"><strong>Notification</strong><br /><span>Set your email notifications</span></a>
        </MenuItem>
        {/* <MenuItem onClick={logout}><LockOutlinedIcon /> {t("mainpage.home_page.logout")}</MenuItem> */}
      </Menu>
    </div>
  );

  const menuIdLanguage = 'primary-search-account-menuLanguage';
  const renderMenuLanguage = (
    <Menu
      anchorEl={anchorE2}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuIdLanguage}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpenLanguage}
      onClose={handleMenuCloseLanguage}
    >
      <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
      <MenuItem onClick={() => changeLanguage("pt")}>Portuguese</MenuItem>
      <MenuItem onClick={() => changeLanguage("es")}>Spanish</MenuItem>
    </Menu>
  );

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className={classes.toolbar}>
       
          <div className={classes.grow} />
                  <IconButton
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleNewItem}
                      color="inherit"
                  >
                      <AddCircleOutlineOutlinedIcon />
                  </IconButton>
       
        </div>
        {renderMenuLanguage}
        {renderMenu}
      </div>
    </div>
  );
}

export default Topbar