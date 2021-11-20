import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import snakeCase from 'lodash/snakeCase'
import upperFirst from 'lodash/upperFirst'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormHelperText from '@material-ui/core/FormHelperText'
import { makeStyles } from '@material-ui/core'
import isUndefined from 'lodash/isUndefined'

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: '100%',
  },
}))

export default function (sharedProps, { options, isRequired }, error) {
  const inputProps = {}
  const errorProps = {}

  if (!isUndefined(isRequired)) inputProps.required = isRequired

  if (!isUndefined(error)) errorProps.error = true

  const classes = useStyles()
  const getOptions = () => {
    try {
      return options.split(',')
    } catch (e) {
      console.error(e)

      return []
    }
  }

  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <FormControl variant="outlined" className={classes.formControl} {...errorProps}>
      <InputLabel ref={inputLabel} htmlFor={sharedProps.name}>
        {sharedProps.label}
      </InputLabel>
      <Select
        inputProps={inputProps}
        input={<OutlinedInput labelWidth={labelWidth} id={sharedProps.name} />}
        className={classes.textField}
        {...sharedProps}
      >
        <MenuItem value="" disabled>
          <em>Select</em>
        </MenuItem>
        {getOptions().map((value, index) => (
          <MenuItem
            key={`${value}_${index}`}
            value={snakeCase(value)}>
            {upperFirst(value)}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
