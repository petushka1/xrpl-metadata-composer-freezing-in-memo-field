import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'

export default function updateObjectInArray(key, value, state) {
  const temp = cloneDeep(state)
  set(temp, key, value)
  return temp
}
