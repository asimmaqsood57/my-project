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
    addUser,
    getUser,
    updateUser,
} from "../../store/actions/UserActions";
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

interface TextUser {
    fullname: string;
    email: string;
    profileID?: number;
}

interface Props {
    paramsId: string;
}

const User = (props: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const updateLoading = useAppSelector((s) => s.updateUser.loading);
    const addLoading = useAppSelector((s) => s.addUser.loading);
    
   
    const {
        data: userData,
        loading,
        error,
    } = useAppSelector((s) => s.user);

    useEffect(() => {
        setupdate({
            fullname: "",
            email: "",
        });
        if (!loading && !error && userData) {
            setupdate(userData);
        }
        if (props.paramsId === "0") {
            setupdate({
                fullname: "",
                email: "",
            });
        }
    }, [userData, loading, error, props.paramsId]);
    const [createUser, setupdate] = useState<TextUser>({
        fullname: "",
        email: "",
    });
    const [helperText, setHelperText] = useState<TextUser>({
        fullname: "",
        email: "",


    });
    const { fullname, email } = createUser;

    useEffect(() => {
        // Only after paymentterms have been loaded...
        if (props.paramsId && Number(props.paramsId) > 0) {
            loadUserById();
        }
    }, []);

    const handleUserSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const sendData = {
            fullname: fullname,
            email: email,
        };
        if (props.paramsId && Number(props.paramsId) > 0) {
            dispatch(
                updateUser(sendData, props.paramsId, {
                    onSuccess: () => {
                        history.push("/home/settings");
                        toast.success(
                            t("mainpage.side_menu.settings") +
                            " " +
                            t("mainpage.common.updatedSuccessfully")
                        );
                    },
                    onFailure: onFailure(history),
                })
            );
        } else {
            dispatch(
                addUser(sendData, {
                    onSuccess: () => {
                        history.push("/home/settings");
                        toast.success(
                            t("mainpage.side_menu.users") +
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
        setupdate({ ...createUser, [e.target.name]: e.target.value });
        onBlurField(e);
    };
   
    const onBlurField = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.target.name === "name") {
            if (e.target.value.length === 0) {
                setHelperText((prevState) => {
                    prevState.fullname = t("mainpage.common.fullnameInputR");
                    return { ...prevState };
                });
            } else {
                setHelperText((prevState) => {
                    prevState.fullname = "";
                    return { ...prevState };
                });
            }
        } 
    };

    const loadUserById = async () => {
        dispatch(
            getUser(props.paramsId, {
                onSuccess: (res) => {

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
                        <Link color="inherit" href="/home/user">
                            {t("mainpage.side_menu.user")}
                        </Link>
                        <Typography color="textPrimary">
                            {t("mainpage.side_menu.user")}
                        </Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                    {t("mainpage.side_menu.user")}
                </Grid>
                <Grid item md={12} xs={12}>
                    <form
                        className="update"
                        onSubmit={(event) => handleUserSubmit(event)}
                    >
                        <Grid item md={12} xs={12}>
                            {t("mainpage.common.name")}
                        </Grid>
                        <Grid item md={12} xs={12} style={{ marginBottom: "10px" }}>
                            <TextField
                                error={!!helperText.fullname}
                                helperText={helperText.fullname}
                                onBlur={(e) => onBlurField(e)}
                                margin="normal"
                                id="fullname"
                                type="text"
                                variant="outlined"
                                name="fullname"
                                style={{ width: "100%" }}
                                value={fullname}
                                onChange={(e) => onChangeUpdate(e)}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            {t("mainpage.common.email")}
                        </Grid>
                        <Grid item md={12} xs={12} style={{ marginBottom: "10px" }}>
                            <TextField
                                error={!!helperText.email}
                                helperText={helperText.email}
                                onBlur={(e) => onBlurField(e)}
                                margin="normal"
                                fullWidth
                                id="email"
                                type="text"
                                variant="outlined"
                                name="email"
                                value={email}
                                onChange={(e) => onChangeUpdate(e)}
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
                                onClick={() => history.push(`/home/settings`)}
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

export default User;
