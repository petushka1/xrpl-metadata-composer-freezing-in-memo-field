import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import AddField from './AddField'
import { useStateValue } from '../app/AppContext'
import without from 'lodash/without'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  rootGrid: {
    position: 'relative',
  },
  listGrid: {
    height: 'calc(100vh - 86px)'
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}))

export default function ({ form = {}, isValid, setIsValid }) {
  const classes = useStyles()

  const [, dispatch] = useStateValue()

  function handleAddField () {
    setIsValid([...isValid, false])

    dispatch({
      type: 'fields@add',
    })
  }

  const setIsValidField = index => value => {
    const temp = [...isValid]
    temp[index] = value
    setIsValid(without(temp, undefined))
  }

  function handleSubmit (event) {
    event.preventDefault()
  }

  return (
    <Fragment>
      <Grid container spacing={2} direction="column" className={classes.rootGrid}>
        <Grid item className={classes.listGrid}>
          <form noValidate onSubmit={handleSubmit}>
            {form?.fields?.map((field, index) =>
              <AddField
                key={`${field.label}_${index}`}
                isFieldValid={isValid[index]}
                setIsValidField={setIsValidField(index)}
                fieldIndex={index} />
            )}
          </form>
        </Grid>

        <Fab color="primary" aria-label="Add" variant="extended" className={classes.fab} onClick={handleAddField}>
          <AddIcon />
          Add Field
        </Fab>
      </Grid>
    </Fragment>
  )
}
