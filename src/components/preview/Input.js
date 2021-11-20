import snakeCase from 'lodash/snakeCase'
import TextInput from './TextInput'
import NumberInput from './NumberInput'
import SelectInput from './SelectInput'
import DateInput from './DateInput'

export default function ({ name, field: { type, options }, value = '', handleChange, errors = {} }) {
  const id = snakeCase(name)
  const sharedProps = {
    label: name,
    value,
    name: id,
    onChange: handleChange,
  }

  const error = errors[id]

  switch (type) {
    case 'string':
      return TextInput(sharedProps, options, error)

    case 'integer':
      return NumberInput(sharedProps, options, error)

    case 'select':
      return SelectInput(sharedProps, options, error)

    case 'date':
      return DateInput(sharedProps, options, handleChange)

    default:
      return null
  }
}
