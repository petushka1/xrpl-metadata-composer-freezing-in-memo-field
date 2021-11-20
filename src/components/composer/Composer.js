import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useStateValue } from "../app/AppContext";
import times from "lodash/times";
import size from "lodash/size";
import constant from "lodash/constant";
import Grid from "@material-ui/core/Grid";
import Edit from "./Edit";
import Preview from "../preview/Preview";
import { Output } from "../Output/Output";
import useForm from "../../hooks/useForm";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1, 3),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  space: {
    flex: '1 1 auto',
  },
  toolbar: theme.mixins.toolbar,
}))

export default function () {
  const classes = useStyles()
  const [{ form }] = useStateValue()
  const [isValid, setIsValid] = useState(times(size(form?.fields), constant(true)))
  const { values, handleChange } = useForm();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography>XRP memo field composer</Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Edit
                form={form}
                isValid={isValid}
                setIsValid={setIsValid} />
          </Grid>
          <Grid item xs={6}>
            <Preview
                values={values}
                handleChange={handleChange}
                form={form}
                isValid={isValid} />
            <Output values={values}/>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}
