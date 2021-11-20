import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from './Input';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import snakeCase from 'lodash/snakeCase';
import size from 'lodash/size';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2, 2),
        margin: theme.spacing(2, 0),
    },
    textField: {
        margin: theme.spacing(1, 0),
    },
}));

export default function ({ form, values, handleChange }) {
    const classes = useStyles();

    if (!size(form?.fields)) return null;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    {form?.fields?.map(({ field, name }, index) =>
                        (
                            <div
                                key={`${field.label}_${index}`}
                                className={classes.textField}>
                                <Input
                                    value={values[snakeCase(name)]}
                                    name={name}
                                    handleChange={handleChange}
                                    field={field}/>
                            </div>
                        ))}
                </Paper>
            </Grid>
        </Grid>
    );
}
