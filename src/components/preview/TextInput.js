import React from 'react'
import TextField from '@material-ui/core/TextField'
import isUndefined from 'lodash/isUndefined'

export default function (sharedProps, { isRequired }, error) {
  const inputProps = {}
  const errorProps = {}

  if (!isUndefined(isRequired)) inputProps.required = isRequired

  if (!isUndefined(error)) {
    errorProps.error = true
    errorProps.helperText = error
  }

  return (
    <TextField
      type="text"
      fullWidth
      variant="outlined"
      inputProps={inputProps}
      {...errorProps}
      {...sharedProps} />
  )
}
