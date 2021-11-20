import { reducer as formsReducer } from './FormReducer'

export default ({ form }, action) => ({
  form: formsReducer(form, action),
})

export const initialState = {
  form: {},
}
