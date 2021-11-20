import React from 'react';
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import size from "lodash/size";
import { hexEncode } from "../../helpers/hexConvert";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2, 2),
        margin: theme.spacing(2, 0),
    },
    output: {
        lineBreak: 'anywhere',
        whiteSpace: 'break-spaces',
    },
    error: {
      color: 'red',
    },
}));

export const Output = ({ values }) => {
    const classes = useStyles();
    if (!size(values)) return null

    const memoData = hexEncode(JSON.stringify(values));
    const valuesInBytesLength = new Blob([memoData]).size;

    const output = {
        "TransactionType": "Payment",
        "Account": hexEncode("someaccount"),
        "Destination": hexEncode("somedestination"),
        "Memos": [
            {
                "Memo": {
                    "MemoType": hexEncode("JSON"),
                    "MemoData": memoData
                }
            }
        ],
        "Amount": "1"
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <pre>{JSON.stringify(output, '', 2)}</pre>
                    <pre>{valuesInBytesLength / 1000} Kb</pre>
                    {valuesInBytesLength > 1000 && (
                        <Typography className={classes.error}>Provided value should be less than 1Kb</Typography>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};
