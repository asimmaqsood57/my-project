import { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, TextField, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import i18next from "i18next";
import Backdrop from "@material-ui/core/Backdrop";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";
import { onFailure } from "../helper/onFailure";
import ImageConvert from "./imageconver"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    mainBg: {
      background: "#426DEE",
      flexGrow: 1,
    },
    mihHeight: {
      minHeight: "100vh",
      "@media (max-width: 960px)": {
        minHeight: "1px !important;",
      },
    },
    leftcard: {
      background: "#ffffff",
      borderRadius: "0px 20px 20px 0px",
      width: "55%",
      "@media (max-width: 960px)": {
        width: "100%",
      },
    },
    flexEnd: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
    },
    rightcard: {
      textAlign: "center",
      width: "45%",
      "@media (max-width: 960px)": {
        width: "100%",
      },
    },
  })
);

const initial = {
  fullname: "",
  email: "",
    phone: "",
  profilePictureBase64:null,
};

interface data {
  UserData: typeof initial;
}

const Profile = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER;
  const { t } = useTranslation();
  const token = localStorage.getItem("userToken");
  const classes = useStyles();
  const history = useHistory();
  const [getBusinessID, setGetBusinessID] = useState([]);
  const [openLoader, setOpenLoader] = useState(false);
  const [image, setImage] = useState<any>()

  const [update, setupdate] = useState<data["UserData"]>({
    fullname: "",
    email: "",
      phone: "",
      profilePictureBase64:null,
  });
  const [helperText, setHelperText] = useState<data["UserData"]>({
    fullname: "",
    email: "",
      phone: "",
    profilePictureBase64:null
  });
  const { fullname, email, phone } = update;

  useEffect(() => {
    loadUsers();
    loadBusineestypeId();
  }, []);

  const loadUsers = async () => {
    try {
      setOpenLoader(true);
      const result = await axios.get(
          `${SERVER_URL}/user/${token}`
      );
      setupdate(result.data);

        

      setTimeout(() => {
        setOpenLoader(false);
      }, 1000);
    } catch (error) {
      onFailure(history)(error);
      setTimeout(() => {
        setOpenLoader(false);
      }, 1000);
    }
  };




  const loadBusineestypeId = async () => {
    const result = await axios.get(SERVER_URL + "/businessType");
    setGetBusinessID(result.data);
  };
  const handleUserUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    setOpenLoader(true);
    event.preventDefault();
    const sendData = {
      Fullname: fullname,
      Email: email,
      Phone: phone,
      ProfilePicture: image
    };
    try {
      await axios
        .put(SERVER_URL + `/user/${token}`, sendData)
        .then((response) => {
          setTimeout(() => {
              loadUsers();
              history.go(0);
          }, 1000);
        });
    } catch (error) {
      onFailure(history)(error);
      setTimeout(() => {
        setOpenLoader(false);
      }, 1000);
    }
  };
  const onChangeUpdate = (e: any) => {
    setupdate({ ...update, [e.target.name]: e.target.value });
    onBlurField(e);
  };
  const onBlurField = (e: any) => {
    if (e.target.name === "fullname") {
      if (e.target.value.length === 0) {
        setHelperText({
          ...helperText,
          fullname: t("mainpage.common.fullnameInputR"),
        });
      } else {
        setHelperText({ ...helperText, fullname: "" });
      }
    } else if (e.target.name === "email") {
      if (e.target.value.length === 0) {
        setHelperText({
          ...helperText,
          email: t("mainpage.common.emailInputR"),
        });
      } else if (e.target.value.length > 0) {
        var pattern = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        if (!pattern.test(e.target.value)) {
          setHelperText({
            ...helperText,
            email: t("mainpage.common.emailInputEr"),
          });
        } else {
          setHelperText({ ...helperText, email: "" });
        }
      } else {
        setHelperText({ ...helperText, email: "" });
      }
    } else if (e.target.name === "phone") {
      if (e.target.value.length !== 9) {
        setHelperText({
          ...helperText,
          phone: t("mainpage.common.phoneInputEr"),
        });
      } else {
        setHelperText({ ...helperText, phone: "" });
      }
    } else {
    }
  };
 
  return (
    <div style={{ padding: 20 }}>
      <Backdrop className={classes.backdrop} open={openLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={3}>
        <Grid item md={12} className={classes.flexEnd}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link color="inherit" href="/home/dashboard">
              {t("mainpage.home_page.dashboard")}
            </Link>
            <Typography color="textPrimary">
              {t("mainpage.side_menu.profile")}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={12}>
          {t("mainpage.side_menu.profile")}
        </Grid>
        <Grid item md={3} xs={12}>
          <form
            className="update"
            onSubmit={(event) => handleUserUpdate(event)}
                  >
                     
                      
                     
                      <ImageConvert setImage={setImage} getImage={update != null ? update.profilePictureBase64:null } />
                      
            <TextField
              label={t("mainpage.common.fullName")}
              helperText={helperText.fullname}
              onBlur={(e) => onBlurField(e)}
              margin="normal"
              fullWidth
              id="fullname"
              type="text"
              placeholder={t("mainpage.common.enterName")}
              name="fullname"
              value={fullname}
              onChange={(e) => onChangeUpdate(e)}
              InputProps={{
                endAdornment: (
                  <div className="icon-block">
                    <i className="las la-user-alt"></i>
                  </div>
                ),
              }}
            />
            <TextField
              label={t("mainpage.common.emailAddress")}
              helperText={helperText.email}
              onBlur={(e) => onBlurField(e)}
              margin="normal"
              fullWidth
              id="email"
              type="email"
              placeholder={t("mainpage.common.enterEmail")}
              name="email"
              value={email}
              onChange={(e) => onChangeUpdate(e)}
              InputProps={{
                endAdornment: (
                  <div className="icon-block">
                    <i className="las la-envelope-open"></i>
                  </div>
                ),
              }}
            />

            <TextField
              label={t("mainpage.common.phone")}
              helperText={helperText.phone}
              onBlur={(e) => onBlurField(e)}
              margin="normal"
              fullWidth
              id="phone"
              type="number"
              placeholder={t("mainpage.common.startTyping")}
              name="phone"
              value={phone}
              onChange={(e) => onChangeUpdate(e)}
              InputProps={{
                endAdornment: (
                  <div className="icon-block">
                    <i className="las la-phone-volume"></i>
                  </div>
                ),
              }}
            />
            <div className="buttons mt-4 mb-2">
              <Button
                type="submit"
                variant="contained"
                className="btn btn-dark float-left"
              >
                {t("mainpage.common.update")}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
export default Profile;
