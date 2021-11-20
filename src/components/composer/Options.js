import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { DatePicker } from '@material-ui/pickers'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default function ({ field: { field }, updateOptions, errors }) {
  switch (field.type) {
    case 'string':
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={field.options.isRequired}
              onChange={(e, isRequired) => updateOptions({ isRequired })}
              color="primary"
            />
          }
          label="Is required"
        />
      )

    case 'integer':
      return (
        <Fragment>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Min"
                value={field.options.min}
                onChange={e => updateOptions({ min: +e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Max"
                value={field.options.max}
                onChange={e => updateOptions({ max: +e.target.value })}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <FormControlLabel
            control={
              <Checkbox
                checked={field.options.isRequired}
                onChange={(e, isRequired) => updateOptions({ isRequired })}
                color="primary"
              />
            }
            label="Is required"
          />
        </Fragment>
      )

    case 'select':
      return (
        <Fragment>
          <TextField
            required
            error={!!errors.options}
            label="Options"
            placeholder="Comma separated options"
            helperText={(!!errors.options) ? errors.options : null}
            multiline
            fullWidth
            maxRows="4"
            value={field.options.options}
            onChange={e => updateOptions({ options: e.target.value })}
            variant="outlined"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={field.options.isRequired}
                onChange={(e, isRequired) => updateOptions({ isRequired })}
                color="primary"
              />
            }
            label="Is required"
          />
        </Fragment>
      )

    case 'date':
      return (
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <DatePicker
              label="Min Date"
              inputVariant='outlined'
              value={field.options.min}
              onClose={() => {}}
              onChange={date => updateOptions({ min: date })} />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Max Date"
              inputVariant='outlined'
              value={field.options.max}
              onClose={() => {}}
              onChange={date => updateOptions({ max: date })} />
          </Grid>
        </Grid>
      )

    default:
      return null
  }

}
