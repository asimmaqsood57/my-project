import React, { ChangeEvent, useState } from "react";
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
import { useDispatch } from "react-redux";
import {
  addPaymentTerm,
  getPaymentTerm,
  getPaymentTerms,
  updatePaymentTerm,
} from "../../store/actions/DataActions";
import { onFailure } from "../helper/onFailure";
import { useAppSelector } from "../../store/hooks";

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

export interface Data {
  description: string;
  days: number | null;
  active: boolean;
}

const PaymentTerm = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { data: paymentTerm, loading: getLoading } = useAppSelector(
    (s) => s.paymentTerm
  );
  const { loading: addLoading } = useAppSelector((s) => s.addPaymentTerm);
  const { loading: updateLoading } = useAppSelector((s) => s.updatePaymentTerm);

  const [createPaymentTerm, setupdate] = useState<Data>({
    description: "",
    active: false,
    days: null,
  });
  useEffect(() => {
    if (paymentTerm) {
      setupdate({
        description: paymentTerm.description,
        active: paymentTerm.active,
        days: paymentTerm.days,
      });
    } else {
      setupdate({
        description: "",
        active: false,
        days: null,
      });
    }
  }, [paymentTerm]);
  const { active, description, days } = createPaymentTerm;

  useEffect(() => {
    loadPaymentTermById();
  }, [props.paramsId]);

  const handlePaymentTermSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const sendData = {
      Description: description,
      Active: active,
      Days: Number(days),
    };
    if (Number(props.paramsId) > 0) {
      dispatch(
        updatePaymentTerm(props.paramsId, sendData, {
          onFailure: onFailure(history),
          onSuccess: () => {
            dispatch(getPaymentTerms({ onFailure: onFailure(history) }));
            toast.success(
              t("mainpage.side_menu.paymentTerm") +
                " " +
                t("mainpage.common.updatedSuccessfully")
            );
            history.push("/home/settings");
          },
        })
      );
    } else {
      dispatch(
        addPaymentTerm(sendData, {
          onFailure: onFailure(history),
          onSuccess: () => {
            dispatch(getPaymentTerms({ onFailure: onFailure(history) }));
            toast.success(
              t("mainpage.side_menu.paymentTerm") +
                " " +
                t("mainpage.common.addedSuccessfully")
            );
            history.push("/home/settings");
          },
        })
      );
    }
  };
  const onChangeUpdate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setupdate({ ...createPaymentTerm, [e.target.name]: e.target.value });
  };
  const onChangeUpdateCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setupdate({ ...createPaymentTerm, [e.target.name]: e.target.checked });
  };

  const loadPaymentTermById = async () => {
    dispatch(
      getPaymentTerm(props.paramsId, {
        onFailure: onFailure(history),
      })
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <Backdrop
        className={classes.backdrop}
        open={getLoading || addLoading || updateLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {props.modal == null && (
        <Grid container spacing={3}>
          <Grid item md={12} xs={12} className={classes.flexEnd}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link color="inherit" href="/home/articles">
                {t("mainpage.side_menu.articles")}
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
                onChange={onChangeUpdate}
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
                type="number"
                style={{ width: "100%" }}
                variant="outlined"
                name="days"
                value={days}
                onChange={onChangeUpdate}
              />
            </Grid>

            <Checkbox
              id="active"
              checked={active}
              name="active"
              onChange={onChangeUpdateCheck}
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
                    if (!props.modal) {
                      history.push(`/home/settings`);
                    } else {
                      props.setShowModal?.(false);
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

export default PaymentTerm;
