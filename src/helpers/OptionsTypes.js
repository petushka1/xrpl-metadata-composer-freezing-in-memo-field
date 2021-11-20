export const types = {
  'string': {
    type: 'string',
    label: 'text',
    options: {
      isRequired: false,
    }
  },
  'integer': {
    type: 'integer',
    label: 'number',
    options: {
      isRequired: false,
      min: '',
      max: '',
    }
  },
  'select': {
    type: 'select',
    label: 'list',
    options: {
      isRequired: false,
      options: '',
    }
  },
  'date': {
    type: 'date',
    label: 'date',
    options: {
      isRequired: false,
      min: null,
      max: null,
    }
  }
}

export const emptyField = {
  name: '',
  field: {
    type: '',
    label: '',
    options: {
      isRequired: false
    }
  }
}
