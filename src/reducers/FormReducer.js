import updateObjectInArray from '../helpers/updateObjectInArray'
import merge from 'lodash/merge'
import filter from 'lodash/filter'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import { emptyField } from '../helpers/OptionsTypes'

export const reducer = (state, { type, payload }) => {
  let path
  switch (type) {
    case 'fields@add':
      path = ['fields']
      return updateObjectInArray(
          path,
          [...get(state, path, []), cloneDeep(emptyField)],
          state
      )

    case 'fields@remove':
      path = ['fields']
      return updateObjectInArray(
        path,
        [
          ...filter(
            get(state, path, []),
            (item, index) => index !== payload.fieldIndex
          )
        ],
        state
      )

    case 'fields@update_options':
      path = ['fields', payload.fieldIndex, 'field', 'options']
      return updateObjectInArray(
        path,
        merge(get(state, path), payload.data),
        state
      )

    case 'fields@set_type':
      path = ['fields', payload.fieldIndex, 'field']
      return updateObjectInArray(
        path,
        merge(get(state, path), payload.data),
        state
      )

    case 'fields@update_field':
      path = ['fields', payload.fieldIndex]
      return updateObjectInArray(
        path,
        merge(get(state, path), payload.data),
        state
      )

    default:
      return state
  }
}
