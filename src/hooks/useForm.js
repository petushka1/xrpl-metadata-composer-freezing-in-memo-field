import { useEffect, useState } from 'react'
import size from 'lodash/size'
import isFunction from 'lodash/isFunction'
import { noop } from "lodash";

export default function (cb = noop, initialValues = {}, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
      if (!(size(Object.keys(errors)) === 0 && isSubmitting)) return

      cb(values)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errors, isSubmitting]
  )

  const handleSubmit = (event) => {
    if (event) event.preventDefault()

    if (isFunction(validate)) {
      setErrors(validate(values))
      setIsSubmitting(true)

      return
    }

    cb(values)
  }

  const handleChange = (event) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.name]: event.target.value }))
  }

  const handleSetValues = (values = {}) => {
    setValues(values)
  }

  return {
    handleSetValues,
    handleChange,
    handleSubmit,
    values,
    errors
  }
}

