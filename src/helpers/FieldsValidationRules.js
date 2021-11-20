export default function (values) {
  let errors = {}

  if (!values.name) {
    errors.name = 'Name address is required'
  }

  if (!values.field.type) {
    errors.type = 'Type is required'
  }

  if (values.field.type === 'select' && !values.field.options.options) {
    errors.options = 'If list selected options should be provided'
  }

  return errors
}
