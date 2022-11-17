import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Checkbox,
  Paper,
  CircularProgress,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Link from "@material-ui/core/Link";
import { useTranslation } from "react-i18next";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    paperspace: {
      padding: theme.spacing(2),
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
    rightcard: {
      textAlign: "center",
      width: "45%",
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
  })
);

const Supplier = (props: any) => {
  const SERVER_URL = process.env.REACT_APP_SERVER;
  const { t } = useTranslation();
  const token = localStorage.getItem("userToken");
  const classes = useStyles();
  const history = useHistory();
  const [openLoader, setOpenLoader] = useState(false);

  const [createSupplier, setupdate] = useState<any>({
    name: "",
    vatNumber: "",
  });
  const [helperText, setHelperText] = useState<any>({
    name: "",
    vatNumber: "",
  });
  const { name, vatNumber } = createSupplier;

  useEffect(() => {
    console.log(props.paramsId);
    if (props.paramsId != undefined && Number(props.paramsId) > 0)
      loadSupplierById();
  }, []);

  const handleSupplierSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setOpenLoader(true);
    event.preventDefault();
    const sendData = {
      Name: name,
      VATNumber: vatNumber,
    };
    try {
      if (props.paramsId != undefined && Number(props.paramsId) > 0) {
        await axios
          .put(
            SERVER_URL + `/supplier/${Number(props.paramsId)}/${token}`,
            sendData
          )
          .then((response) => {
            setTimeout(() => {
              setOpenLoader(false);
              history.push("/home/suppliers");
            }, 1000);
          });
        toast.success(
          t("mainpage.side_menu.suppliers") +
            " " +
            t("mainpage.common.updatedSuccessfully")
        );
      } else {
        await axios
          .post(SERVER_URL + `/supplier/${token}`, sendData)
          .then((response) => {
            setTimeout(() => {
              setOpenLoader(false);
              history.push("/home/suppliers");
            }, 1000);
          });
        toast.success(
          t("mainpage.side_menu.suppliers") +
            " " +
            t("mainpage.common.addedSuccessfully")
        );
      }
      setTimeout(() => {
        setOpenLoader(false);
      }, 1000);
    } catch (error) {
      setOpenLoader(false);
      console.log(error);
      if (error.response.status != undefined && error.response.status === 403) {
        localStorage.clear();
        history.push("/");
      } else if (
        error.response.status != undefined &&
        error.response.status === 400
      ) {
        toast.error(error.response.data.detail);
      }
    }
  };
  const onChangeUpdate = (e: any) => {
    setupdate({ ...createSupplier, [e.target.name]: e.target.value });
    onBlurField(e);
  };
  const onChangeUpdateCheck = (e: any) => {
    setupdate({ ...createSupplier, [e.target.name]: e.target.checked });
  };
  const onBlurField = (e: any) => {
    if (e.target.name === "reference") {
      if (e.target.value.length === 0) {
        setHelperText((prevState: any) => {
          prevState.reference = t("mainpage.common.fullnameInputR");
          prevState.referenceVal = true;
          return { ...prevState };
        });
      } else {
        setHelperText((prevState: any) => {
          prevState.reference = "";
          prevState.referenceVal = false;
          return { ...prevState };
        });
      }
    } else if (e.target.name === "description") {
      if (e.target.value.length === 0) {
        setHelperText((prevState: any) => {
          prevState.description = t("mainpage.common.compInputEr");
          prevState.descriptionVal = true;
          return { ...prevState };
        });
      } else {
        setHelperText((prevState: any) => {
          prevState.description = "";
          prevState.descriptionVal = false;
          return { ...prevState };
        });
      }
    }
  };

  const loadSupplierById = async () => {
    setOpenLoader(true);
    try {
      const result = await axios.get(
          `${SERVER_URL}/supplier/${Number(
          props.paramsId
        )}/${token}`
      );
      const res = await result.data;
      console.log(res);

      setupdate(res);
      setTimeout(() => {
        setOpenLoader(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      if (error.response.status != undefined && error.response.status === 403) {
        localStorage.clear();
        history.push("/");
      }
      setTimeout(() => {
        setOpenLoader(false);
      }, 1000);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Backdrop className={classes.backdrop} open={openLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container spacing={3}>
        <Grid item md={12} xs={12} className={classes.flexEnd}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link color="inherit" href="/home/supplier">
              {t("mainpage.side_menu.suppliers")}
            </Link>
            <Typography color="textPrimary">
              {t("mainpage.side_menu.suppliers")}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          {t("mainpage.side_menu.suppliers")}
        </Grid>
        <Grid item md={3} xs={12}>
          <form
            className="update"
            onSubmit={(event) => handleSupplierSubmit(event)}
          >
            <TextField
              label={t("mainpage.common.name")}
              error={helperText.referenceVal}
              helperText={helperText.reference}
              onBlur={(e) => onBlurField(e)}
              margin="normal"
              fullWidth
              id="name"
              type="text"
              placeholder={t("mainpage.common.name")}
              name="name"
              value={name}
              onChange={(e) => onChangeUpdate(e)}
            />

            <TextField
              label={t("mainpage.common.vatNumber")}
              error={helperText.referenceVal}
              helperText={helperText.reference}
              onBlur={(e) => onBlurField(e)}
              margin="normal"
              fullWidth
              id="vatNumber"
              type="text"
              placeholder={t("mainpage.common.vatNumber")}
              name="vatNumber"
              value={vatNumber}
              onChange={(e) => onChangeUpdate(e)}
            />

            <div className="buttons mt-4 mb-2">
              <Button
                type="submit"
                variant="contained"
                className="btn btn-dark float-left"
              >
                {t("mainpage.common.submit")}
              </Button>
              <Button
                variant="contained"
                className="btn btn-light float-right"
                onClick={() => history.push(`/home/suppliers`)}
              >
                {t("mainpage.common.cancel")}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Supplier;
