import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    flexEnd: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
    },
  }),
);

const Messages = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={3}>
      <Grid item md={12} className={classes.flexEnd}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link color="inherit" href="/home/dashboard">
              {t("mainpage.home_page.home")}
            </Link>
            <Typography color="textPrimary">Messages</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={12}>
        Messages
        </Grid>
      </Grid>
    </div>
  );
}

export default Messages
