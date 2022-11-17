import { ChangeEvent, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
    Radio,
    Button,
    TextField,
    FormControlLabel,
    Grid,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/LOGO_STABELY_2.png";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import i18next from "i18next";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { login, recover } from "../../store/actions/UserActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { Dispatch } from "redux";
import { LoginAction, RecoverAction } from "../../store/types/UserTypes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        whiteColor: {
            color: "#fff",
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
            background: "#263651",
            borderRadius: "0px 20px 20px 0px",
            width: "100%",
            "@media (max-width: 960px)": {
                width: "100%",
            },
        },

    })
);

interface User {
    email: string;
    password: string;
}

const Login = () => {
    const dispatch = useDispatch<Dispatch<LoginAction | RecoverAction>>();
    const { loading } = useAppSelector((state) => state.login);
    const recoverLoading = useAppSelector((state) => state.recover.loading);
    const { t } = useTranslation();

    const history = useHistory();
    const classes = useStyles();
    const [isTermCond, setIsTermCond] = useState(false);
    const [currntLng, setCurrentLng] = useState(
        localStorage.getItem("i18nextLng")
    );
    const [register, setRegister] = useState<User>({
        password: "",
        email: "",
    });
    const [helperText, setHelperText] = useState<User>({
        email: "",
        password: "",
    });
    const [isShowScreen, setIsShowScreen] = useState<{
        [key: string]: boolean;
    }>({
        isshowlogin: true,
        isshowRecover: false,
        isshowRecoverSuccess: false,
    });
    const { password, email } = register;
    useEffect(() => {
        localStorage.setItem("isVal", "0");
    }, []);
    const changeLanguage = (e: string) => {
        i18next.changeLanguage(e);
        setCurrentLng(e);
    };

    const recoverPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const forgotdata = { Email: email };
        recover(forgotdata, {
            onSuccess: (res) => {
                if (res.id) {
                    allsetClose();
                    setIsShowScreen({ isshowRecoverSuccess: true });
                } else {
                    toast.error(t("mainpage.common.emailNtFound"));
                }
            },
            onFailure: () => {
                toast.error(t("mainpage.common.emailNtFound"));
            },
        })(dispatch);
    };
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const sendData = { Email: email, Password: password };
        login(sendData, {
            onSuccess: (res) => {
                if (res.token) {
                    localStorage.setItem("userData", JSON.stringify(res));
                    localStorage.setItem("isVal", "1");
                    localStorage.setItem("userToken", res.token);
                    localStorage.setItem("profilePicture", res.profilePicture);
                    toast.success(t("mainpage.common.loginSuccessfully"));
                    history.push("/home/dashboard");
                } else {
                    toast.error(t("mainpage.common.emailPasswordIncorrect"));
                }
            },
            onFailure: () => {
                toast.error(t("mainpage.common.emailPasswordIncorrect"));
            },
        })(dispatch);
    };
    const onChangeRegister = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRegister({ ...register, [e.target.name]: e.target.value });
        onBlurField(e);
    };
    const onBlurField = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.target.name === "email") {
            if (e.target.value.length === 0) {
                setHelperText((prevState) => {
                    prevState.email = t("mainpage.common.emailInputR");
                    return { ...prevState };
                });
            } else if (e.target.value.length > 0) {
                var pattern = new RegExp(
                    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                );

                if (!pattern.test(e.target.value)) {
                    setHelperText((prevState) => {
                        prevState.email = t("mainpage.common.emailInputEr");
                        return { ...prevState };
                    });
                } else {
                    setHelperText((prevState) => {
                        prevState.email = "";
                        return { ...prevState };
                    });
                }
            } else {
                setHelperText((prevState) => {
                    prevState.email = "";
                    return { ...prevState };
                });
            }
        } else if (e.target.name === "password") {
            if (e.target.value.length < 8) {
                setHelperText((prevState) => {
                    prevState.password = t("mainpage.common.passInputEr");
                    return { ...prevState };
                });
            } else {
                setHelperText((prevState) => {
                    prevState.password = "";
                    return { ...prevState };
                });
            }
        }
    };
    const allsetClose = () => {
        setIsShowScreen({
            isshowlogin: false,
        });
    };

    const onforgotpassword = () => {
        allsetClose();
        setIsShowScreen({ isshowRecover: true });
    };

    const onAcceptTermsCond = () => {
        setIsTermCond(false);
    };
    return (
        <div className={classes.mainBg + " " + classes.mihHeight}>
            <Backdrop className={classes.backdrop} open={loading || recoverLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={0} className={classes.mihHeight}>
                <Grid item className={classes.mihHeight + " " + classes.leftcard}>
                    <Dialog
                        open={isTermCond}
                        onClose={onAcceptTermsCond}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {t("mainpage.common.termsAndConditions")}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy
                                text ever since the 1500s,
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onAcceptTermsCond} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <div className="select-language-part">
                        <Link
                            className={currntLng === "pt" ? "active" : "non-active"}
                            href="#"
                            variant="body1"
                            onClick={() => changeLanguage("pt")}
                        >
                            PT
                        </Link>
                        <span className="color-dark"> | </span>
                        <Link
                            className={currntLng === "es" ? "active" : "non-active"}
                            href="#"
                            variant="body1"
                            onClick={() => changeLanguage("es")}
                        >
                            ES
                        </Link>
                        <span className="color-dark"> | </span>
                        <Link
                            className={currntLng === "en" ? "active" : "non-active"}
                            href="#"
                            variant="body1"
                            onClick={() => changeLanguage("en")}
                        >
                            EN
                        </Link>
                    </div>
                    <div className="mainpage">
                        <div className="mainpage-logo mt-4">
                            <img className="loginrightbackground" alt="logo" src={logo} />
                        </div>
                        {isShowScreen.isshowlogin && (
                            <div className="login-part">
                                <h1 className="my-3">
                                    {t("mainpage.login.mainTitle_1")} <br />
                                    {t("mainpage.login.mainTitle_2")}
                                </h1>
                                <h6>{t("mainpage.login.subTitle")}</h6>
                                <form
                                    className="login"
                                    onSubmit={(event) => handleLogin(event)}
                                >
                                    <TextField
                                        label={t("mainpage.common.emailAddress")}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        error={!!helperText.email}
                                        helperText={helperText.email}
                                        type="text"
                                        placeholder={t("mainpage.common.enterEmail")}
                                        name="email"
                                        value={email}
                                        onChange={onChangeRegister}
                                        InputProps={{
                                            className: classes.whiteColor,
                                            endAdornment: (
                                                <div className="icon-block">
                                                    <i className="las la-envelope-open"></i>
                                                </div>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        label={t("mainpage.common.password")}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password"
                                        type="password"
                                        placeholder={t("mainpage.common.password")}
                                        name="password"
                                        value={password}
                                        onChange={onChangeRegister}
                                        InputProps={{
                                            className: classes.whiteColor,
                                            endAdornment: (
                                                <div className="icon-block">
                                                    <i className="las la-lock"></i>
                                                </div>
                                            ),
                                        }}
                                    />
                                    <FormControlLabel
                                        className="mt-2 mb-2 custom-control-label float-left"
                                        control={<Radio value="remember" color="primary" />}
                                        label={t("mainpage.login.rememberMe")}
                                    />
                                    <Link
                                        className="float-right rc-password"
                                        onClick={onforgotpassword}
                                    >
                                        {t("mainpage.login.recoverPassword")}
                                    </Link>
                                    <div className="buttons mt-2 mb-2">
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            className="btn btn-dark float-left"
                                        >
                                            {t("mainpage.common.signIn")}
                                        </Button>
                                        {/* <Button variant="contained" className="btn btn-light float-right" onClick={onRegistrationFirst}>{t("mainpage.common.signUp")}</Button>*/}
                                    </div>
                                </form>
                            </div>
                        )}
                        <form
                            className="recover-password"
                            onSubmit={(event) => recoverPassword(event)}
                        >
                            {isShowScreen.isshowRecover && (
                                <div className="login-part">
                                    <h1 className="my-3">
                                        {t("mainpage.recover_password.mainTitle_1")} <br />
                                        {t("mainpage.recover_password.mainTitle_2")}
                                    </h1>
                                    <h6>{t("mainpage.recover_password.subTitle")}</h6>
                                    <TextField
                                        label={t("mainpage.common.emailAddress")}
                                        error={!!helperText.email}
                                        helperText={helperText.email}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        type="email"
                                        placeholder={t("mainpage.recover_password.enterEmail")}
                                        name="email"
                                        value={email}
                                        onChange={onChangeRegister}
                                        InputProps={{
                                            endAdornment: (
                                                <div className="icon-block">
                                                    <i className="las la-envelope-open"></i>
                                                </div>
                                            ),
                                        }}
                                    />
                                    <div className="buttons mt-2 mb-2">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            className="btn btn-dark float-left"
                                        >
                                            {t("mainpage.common.recover")}
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {isShowScreen.isshowRecoverSuccess && (
                                <div className="login-part">
                                    <h1 className="my-3">
                                        {t("mainpage.recover_sucess.mainTitle_1")}
                                    </h1>
                                    <h6>{t("mainpage.recover_sucess.subTitle")}</h6>
                                    <div className="registration-part-finish-button">
                                        <div className="buttons mt-4 mb-2">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                className="btn btn-dark float-left"
                                            >
                                                {t("mainpage.common.resendEmail")}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </Grid>

            </Grid>
        </div>
    );
};
export default Login;
