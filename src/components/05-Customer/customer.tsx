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
import { useTranslation } from "react-i18next";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AutoComplete from "@material-ui/lab/AutoComplete";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import {
  addCustomer,
  getCustomer,
  updateCustomer,
} from "../../store/actions/CustomerActions";
import { PaymentTerm } from "../../store/types/DataTypes";
import { onFailure } from "../helper/onFailure";

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
    tablefll: {
      width: "100%",
      display: "flex",
      overflowX: "auto",
    },
  })
);

interface TextCustomer {
  name: string;
  vatNumber: string;
  address: string;
}

interface Props {
  paramsId: string;
}

const Customer = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const updateLoading = useAppSelector((s) => s.updateCustomer.loading);
  const addLoading = useAppSelector((s) => s.addCustomer.loading);
  const [paymentTermSelected, setPaymentTermSelected] =
    useState<PaymentTerm | null>(null);
  const { data: paymentTerm = [] } = useAppSelector(
    (state) => state.paymentTerms
  );
  const {
    data: customerData,
    loading,
    error,
  } = useAppSelector((s) => s.customer);
  useEffect(() => {
    setupdate({
      name: "",
      vatNumber: "",
      address: "",
    });
    if (!loading && !error && customerData) {
      setupdate(customerData);
      if (paymentTerm.length) {
        setPaymentTermSelected(
          paymentTerm.find((p) => p.id === customerData.paymentTermID) || null
        );
      }
    }
    if (props.paramsId === "0") {
      setupdate({
        name: "",
        vatNumber: "",
        address: "",
      });
    }
  }, [customerData, loading, error, paymentTerm, props.paramsId]);
  const [createCustomer, setupdate] = useState<TextCustomer>({
    name: "",
    vatNumber: "",
    address: "",
  });
  const [helperText, setHelperText] = useState<TextCustomer>({
    name: "",
    vatNumber: "",
    address: "",
  });
  const { name, vatNumber, address } = createCustomer;

  useEffect(() => {
    if (paymentTerm.length > 0) {
      // Only after paymentterms have been loaded...
      if (props.paramsId && Number(props.paramsId) > 0) {
        loadCustomerById();
      }
    }
  }, [paymentTerm]);

  const handleCustomerSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const sendData = {
      Name: name,
      VATNumber: vatNumber,
      Address: address,
      PaymentTermID: paymentTermSelected?.id ?? null,
    };
    if (props.paramsId && Number(props.paramsId) > 0) {
      dispatch(
        updateCustomer(sendData, props.paramsId, {
          onSuccess: () => {
            history.push("/home/customers");
            toast.success(
              t("mainpage.side_menu.customers") +
                " " +
                t("mainpage.common.updatedSuccessfully")
            );
          },
          onFailure: onFailure(history),
        })
      );
    } else {
      dispatch(
        addCustomer(sendData, {
          onSuccess: () => {
            history.push("/home/customers");
            toast.success(
              t("mainpage.side_menu.customers") +
                " " +
                t("mainpage.common.addedSuccessfully")
            );
          },
          onFailure: onFailure(history),
        })
      );
    }
  };
  const onChangeUpdate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setupdate({ ...createCustomer, [e.target.name]: e.target.value });
    onBlurField(e);
  };
  const handlePaymentTermChange = (
    event: React.ChangeEvent<{}>,
    value: PaymentTerm
  ) => setPaymentTermSelected(value);

  const onBlurField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "name") {
      if (e.target.value.length === 0) {
        setHelperText((prevState) => {
          prevState.name = t("mainpage.common.fullnameInputR");
          return { ...prevState };
        });
      } else {
        setHelperText((prevState) => {
          prevState.name = "";
          return { ...prevState };
        });
      }
    } else if (e.target.name === "description") {
      if (e.target.value.length === 0) {
        setHelperText((prevState) => {
          prevState.address = t("mainpage.common.compInputEr");
          return { ...prevState };
        });
      } else {
        setHelperText((prevState) => {
          prevState.address = "";
          return { ...prevState };
        });
      }
    }
  };

  const loadCustomerById = async () => {
    dispatch(
      getCustomer(props.paramsId, {
        onSuccess: (res) => {
          setPaymentTermSelected(
            paymentTerm.find((e) => e.id == res.paymentTermID) || null
          );
        },
        onFailure: onFailure(history),
      })
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <Backdrop
        className={classes.backdrop}
        open={addLoading || updateLoading || loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container spacing={3}>
        <Grid item md={12} xs={12} className={classes.flexEnd}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link color="inherit" href="/home/customer">
              {t("mainpage.side_menu.customers")}
            </Link>
            <Typography color="textPrimary">
              {t("mainpage.side_menu.customers")}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          {t("mainpage.side_menu.customers")}
        </Grid>
        <Grid item md={12} xs={12}>
          <form
            className="update"
            onSubmit={(event) => handleCustomerSubmit(event)}
          >
            <Grid item md={12} xs={12}>
              {t("mainpage.common.name")}
            </Grid>
            <Grid item md={12} xs={12} style={{ marginBottom: "10px" }}>
              <TextField
                error={!!helperText.name}
                helperText={helperText.name}
                onBlur={(e) => onBlurField(e)}
                margin="normal"
                id="name"
                type="text"
                variant="outlined"
                name="name"
                style={{ width: "100%" }}
                value={name}
                onChange={(e) => onChangeUpdate(e)}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              {t("mainpage.common.vatNumber")}
            </Grid>
            <Grid item md={12} xs={12} style={{ marginBottom: "10px" }}>
              <TextField
                error={!!helperText.vatNumber}
                helperText={helperText.vatNumber}
                onBlur={(e) => onBlurField(e)}
                margin="normal"
                fullWidth
                id="vatNumber"
                type="text"
                variant="outlined"
                name="vatNumber"
                value={vatNumber}
                onChange={(e) => onChangeUpdate(e)}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              {t("mainpage.common.address")}
            </Grid>
            <Grid item md={12} xs={12} style={{ marginBottom: "10px" }}>
              <TextField
                variant="outlined"
                error={!!helperText.address}
                helperText={helperText.address}
                onBlur={(e) => onBlurField(e)}
                margin="normal"
                fullWidth
                id="address"
                type="text"
                name="address"
                value={address}
                onChange={(e) => onChangeUpdate(e)}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              {t("mainpage.common.paymentTerm")}
            </Grid>
            <Grid item md={12} xs={12} style={{ margin: "10px 0" }}>
              <AutoComplete
                id="paymentTermSelect"
                options={paymentTerm}
                value={paymentTermSelected}
                onChange={(event, value: PaymentTerm | null) =>
                  setPaymentTermSelected(value)
                }
                style={{ width: "100%" }}
                getOptionLabel={(option) => option?.description}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </Grid>
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
                onClick={() => history.push(`/home/customers`)}
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

export default Customer;
