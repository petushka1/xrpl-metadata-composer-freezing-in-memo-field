import React from 'react'
import { DatePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%'
  },
}))

export default function (sharedProps, { min, max }, handleChange) {
  const classes = useStyles()

  if (min) sharedProps.minDate = min
  if (max) sharedProps.maxDate = max

  if (sharedProps.value === '') sharedProps.value = null

  sharedProps.onChange = (date) => {
    handleChange({ persist: () => {}, target: { name: sharedProps.name, value: date } })
  }

  return (
    <DatePicker
      className={classes.textField}
      inputVariant='outlined'
      {...sharedProps} />
  )
}
