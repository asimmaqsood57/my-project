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
import Topbar from "../03-Topbar/topbar";
import { useTranslation } from "react-i18next";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AutoComplete from "@material-ui/lab/AutoComplete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tablefll: {
      width: "100%",
      display: "flex",
      overflowX: "auto",
    },
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

const DocumentType = (props: any) => {
  const SERVER_URL = process.env.REACT_APP_SERVER;
  const { t } = useTranslation();
  const token = localStorage.getItem("userToken");
  const classes = useStyles();
  const history = useHistory();
  const [openLoader, setOpenLoader] = useState(false);

  const [createPaymentTerm, setupdate] = useState<any>({
    description: "",
    active: null,
    days: null,
  });

  const { active, description, days } = createPaymentTerm;

  useEffect(() => {
    if (props.paramsId != undefined && Number(props.paramsId) > 0)
      loadPaymentTermById();
  }, []);

  const handlePaymentTermSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setOpenLoader(true);
    event.preventDefault();
    const sendData = {
      Description: description,
      Active: active == "" ? false : true,
      Days: Number(days),
    };
    try {
      if (props.paramsId != undefined && Number(props.paramsId) > 0) {
        await axios
          .put(
            SERVER_URL + `/documentType/${Number(props.paramsId)}/${token}`,
            sendData
          )
          .then((response) => {
            setTimeout(() => {
              setOpenLoader(false);
              history.push("/home/settings");
            }, 1000);
          });
        toast.success(
          t("mainpage.side_menu.documentType") +
            " " +
            t("mainpage.common.updatedSuccessfully")
        );
      } else {
        await axios
          .post(SERVER_URL + `/documentType/${token}`, sendData)
          .then((response) => {
            setTimeout(() => {
              setOpenLoader(false);
              if (props.modal == null) {
                history.push("/home/documentType");
              } else {
                props.setShowModal(false);
              }
            }, 1000);
          });
        toast.success(
          t("mainpage.side_menu.documentType") +
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
    setupdate({ ...createPaymentTerm, [e.target.name]: e.target.value });
  };
  const onChangeUpdateCheck = (e: any) => {
    setupdate({ ...createPaymentTerm, [e.target.name]: e.target.checked });
  };

  const loadPaymentTermById = async () => {
    setOpenLoader(true);
    try {
      const result = await axios.get(
          `${SERVER_URL}/documentType/${Number(
          props.paramsId
        )}/${token}`
      );
      const res = await result.data;
      console.log(res);

      if (res.description != null) setupdate(res);

      setTimeout(() => {
        setOpenLoader(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      debugger;
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
      {props.modal == null && (
        <Grid container spacing={3}>
          <Grid item md={12} xs={12} className={classes.flexEnd}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link color="inherit" href="/home/documentType">
                {t("mainpage.side_menu.documentType")}
              </Link>
              <Typography color="textPrimary">
                {t("mainpage.common.new")}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={3}>
        {props.modal == null && (
          <Grid item md={12} xs={12}>
            {t("mainpage.side_menu.paymentType")}
          </Grid>
        )}
        <Grid item md={12} xs={12}>
          <form
            className="update"
            onSubmit={(event) => handlePaymentTermSubmit(event)}
          >
            <Grid item md={12} xs={12}>
              {t("mainpage.common.description")}
            </Grid>
            <Grid item md={12} xs={12} style={{ marginBottom: "10px" }}>
              <TextField
                margin="normal"
                fullWidth
                id="description"
                type="text"
                style={{ width: "100%" }}
                variant="outlined"
                name="description"
                value={description}
                onChange={(e) => onChangeUpdate(e)}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              {t("mainpage.common.days")}
            </Grid>
            <Grid item md={12} xs={12} style={{ marginBottom: "10px" }}>
              <TextField
                margin="normal"
                fullWidth
                id="days"
                type="text"
                style={{ width: "100%" }}
                variant="outlined"
                name="days"
                value={days}
                onChange={(e) => onChangeUpdate(e)}
              />
            </Grid>

            <Checkbox
              id="active"
              checked={active}
              name="active"
              onChange={(e) => onChangeUpdateCheck(e)}
              inputProps={{ "aria-label": "Checkbox A" }}
            />
            {t("mainpage.common.active")}

            <div className="buttons mt-4 mb-2">
              <Grid item md={12} xs={12}>
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
                  onClick={() => {
                    if (props.modal == null) {
                      history.push(`/home/settings`);
                    } else {
                      props.setShowModal(false);
                    }
                  }}
                >
                  {t("mainpage.common.cancel")}
                </Button>
              </Grid>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default DocumentType;
