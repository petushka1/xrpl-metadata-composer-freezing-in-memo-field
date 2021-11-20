import React, { useEffect, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core'
import { types } from '../../helpers/OptionsTypes'
import Options from './Options'
import { useStateValue } from '../app/AppContext'
import useValidation from '../../hooks/useValidation'
import rules from '../../helpers/FieldsValidationRules'
import get from 'lodash/get'

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1, 0),
  },
  paper: ({ isFieldValid }) => ({
    overflow: 'hidden',
    border: `1px solid ${isFieldValid ? 'transparent' : theme.palette.secondary.main}`,
    padding: theme.spacing(2, 2),
    margin: theme.spacing(2, 0),
  }),
  formControl: {
    width: '100%'
  },
  select: {
    marginBottom: theme.spacing(1),
  },
  deleteButton: {
    float: 'right',
    marginTop: theme.spacing(1),
  },
}))

export default function ({ fieldIndex, setIsValidField, isFieldValid }) {
  const classes = useStyles({ isFieldValid })

  const [{ form }, dispatch] = useStateValue()
  const field = get(form, ['fields', fieldIndex])

  const [labelWidth, setLabelWidth] = useState(0)
  const inputLabel = useRef(null)

  const { errors, handleChange } = useValidation(field, setIsValidField, rules)

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  function handleSelectType (e) {
    const { target: { value: type } } = e
    dispatch({
      type: 'fields@set_type',
      payload: { fieldIndex, data: types[type] }
    })
  }

  function handleUpdateName (e) {
    const { target: { value: name } } = e
    dispatch({
      type: 'fields@update_field',
      payload: { fieldIndex, data: { name } }
    })
  }

  function updateOptions (payload) {
    dispatch({
      type: 'fields@update_options',
      payload: { fieldIndex, data: payload }
    })
  }

  function handleRemoveField () {
    dispatch({
      type: 'fields@remove',
      payload: { fieldIndex }
    })

    setIsValidField(undefined)
  }

  return (
    <Paper className={classes.paper} onBlur={handleChange}>
      <TextField
        error={!!errors.name}
        fullWidth
        required
        label="Name"
        value={field.name}
        className={classes.textField}
        helperText={(!!errors.name) ? errors.name : null}
        onChange={handleUpdateName}
        margin="normal"
        variant="outlined"
      />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel}>
          Type
        </InputLabel>

        <Select
          className={classes.select}
          value={field.field.type}
          onChange={handleSelectType}
          input={<OutlinedInput labelWidth={labelWidth} name="type" />}
        >
          <MenuItem value={''} disabled>
            <em>Not Selected</em>
          </MenuItem>

          {Object.keys(types).map(type =>
            <MenuItem key={type} value={type}>{types[type].label}</MenuItem>
          )}
        </Select>
      </FormControl>

      <Options
        field={field}
        errors={errors}
        updateOptions={updateOptions} />

      <Button
        size="small"
        type="button"
        variant="contained"
        color="secondary"
        className={classes.deleteButton}
        onClick={handleRemoveField}
      >
        <DeleteIcon />
      </Button>
    </Paper>
  )
}
