import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
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
import { useAppSelector } from "../../store/hooks";
import { SaftType } from "../../store/types/DataTypes";
import {
  addArticle,
  getArticle,
  updateArticle,
} from "../../store/actions/ArticleActions";
import { History } from "history";
import { useDispatch } from "react-redux";
import { Article } from "../../store/types/ArticleTypes";
import { onFailure } from "../helper/onFailure";

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

interface ArticleData {
  reference: string;
  description: string;
  isService: boolean;
  active: boolean | null;
  serializable: boolean;
}

const initial: ArticleData = {
  reference: "",
  description: "",
  isService: false,
  serializable: false,
  active: false,
};

interface ArticleProps {
  paramsId?: string;
  modal?: boolean | null;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
}

const ArticlePage = (props: ArticleProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading: addLoading } = useAppSelector((s) => s.addArticle);
  const { loading: updateLoading } = useAppSelector((s) => s.updateArticle);
  const { loading: getLoading } = useAppSelector((s) => s.article);
  const [createArticle, setupdate] = useState<ArticleData>(initial);
  const [helperText, setHelperText] = useState<ArticleData>(initial);
  const { reference, description, active, isService, serializable } =
    createArticle;
  const [saftTypeSelected, setSaftTypeSelected] = useState<SaftType | null>(
    null
  );
  const { data: saftType = [], loading: saftTypeLoading } = useAppSelector(
    (state) => state.saftTypes
  );
  useEffect(() => {
    if (saftType.length > 0) {
      if (props.paramsId != undefined && Number(props.paramsId) > 0)
        loadArticlesById();
    }
  }, []);
  const handleArticleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!saftTypeSelected) {
      return toast.error("SAFT Type not selected");
    }
    if (reference.length == 0) {
      return toast.error("Reference cannot be empty");
    }
    const sendData = {
      Reference: reference,
      Description: description,
      Active: active,
      Serializable: serializable,
      IsService: isService,
      SaftProductTypeID: saftTypeSelected.id,
    };
    if (Number(props.paramsId) > 0) {
      dispatch(
        updateArticle(Number(props.paramsId), sendData, {
          onSuccess: () => {
            history.push("/home/articles");
            toast.success(
              t("mainpage.side_menu.articles") +
                " " +
                t("mainpage.common.updatedSuccessfully")
            );
          },
          onFailure: onFailure(history),
        })
      );
    } else {
      dispatch(
        addArticle(sendData, {
          onSuccess: () => {
            history.push("/home/articles");
            toast.success(
              t("mainpage.side_menu.articles") +
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
    setupdate({ ...createArticle, [e.target.name]: e.target.value });
    onBlurField(e);
  };
  const onChangeUpdateCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setupdate({ ...createArticle, [e.target.name]: e.target.checked });
  };
  const onBlurField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "reference") {
      if (e.target.value.length === 0) {
        setHelperText((prevState) => {
          prevState.reference = t("mainpage.common.fullnameInputR");
          return { ...prevState };
        });
      } else {
        setHelperText((prevState) => {
          prevState.reference = "";
          return { ...prevState };
        });
      }
    } else if (e.target.name === "description") {
      if (e.target.value.length === 0) {
        setHelperText((prevState) => {
          prevState.description = t("mainpage.common.compInputEr");
          return { ...prevState };
        });
      } else {
        setHelperText((prevState) => {
          prevState.description = "";
          return { ...prevState };
        });
      }
    }
  };

  const loadArticlesById = () => {
    dispatch(
      getArticle(Number(props.paramsId), {
        onSuccess: (data) => {
          if (data.reference) setupdate(data);
          if (data.saftProductTypeID)
            setSaftTypeSelected(
              saftType.find((e) => e.id == data.saftProductTypeID) || null
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
        open={addLoading || updateLoading || getLoading || saftTypeLoading}
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
            {t("mainpage.side_menu.articles")}
          </Grid>
        )}
        <Grid item md={12} xs={12}>
          <form className="update" onSubmit={handleArticleSubmit}>
            <Grid item md={12} xs={12}>
              {t("mainpage.common.reference")}
            </Grid>
            <Grid item md={12} xs={12} style={{ marginBottom: "10px" }}>
              <TextField
                error={!!helperText.reference}
                helperText={helperText.reference}
                onBlur={onBlurField}
                margin="normal"
                fullWidth
                id="reference"
                type="text"
                variant="outlined"
                name="reference"
                value={reference}
                onChange={onChangeUpdate}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              {t("mainpage.common.description")}
            </Grid>
            <Grid item md={12} xs={12} style={{ marginBottom: "10px" }}>
              <TextField
                error={!!helperText.description}
                helperText={helperText.description}
                onBlur={onBlurField}
                margin="normal"
                fullWidth
                id="description"
                type="text"
                variant="outlined"
                name="description"
                value={description}
                onChange={onChangeUpdate}
              />
            </Grid>

            {!isService && (
              <div>
                <Grid item md={12} xs={12}>
                  {t("mainpage.common.saftProductType")}
                </Grid>
                <Grid item md={12} xs={12} style={{ margin: "10px 0" }}>
                  <AutoComplete<SaftType>
                    id="paymentTermSelect"
                    options={saftType}
                    value={saftTypeSelected}
                    disabled={isService}
                    onChange={(event, value: SaftType | null) =>
                      setSaftTypeSelected(value)
                    }
                    style={{ width: "100%" }}
                    getOptionLabel={(option) => option.description}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </Grid>
              </div>
            )}

            <Checkbox
              id="active"
              checked={active || false}
              name="active"
              onChange={onChangeUpdateCheck}
              inputProps={{ "aria-label": "Checkbox A" }}
            />
            {t("mainpage.common.active")}
            <br />
            <Checkbox
              id="isService"
              checked={isService}
              name="isService"
              onChange={onChangeUpdateCheck}
              inputProps={{ "aria-label": "Checkbox A" }}
            />
            {t("mainpage.common.isService")}
            <br />
            <Checkbox
              id="serializable"
              checked={serializable}
              name="serializable"
              onChange={onChangeUpdateCheck}
              inputProps={{ "aria-label": "Checkbox A" }}
            />
            {t("mainpage.common.serializable")}
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
                    if (props.modal === null) {
                      history.push(`/home/articles`);
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

export default ArticlePage;
