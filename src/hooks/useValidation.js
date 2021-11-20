import { useEffect, useState } from 'react'
import size from 'lodash/size'

const useValidation = (values, cb, rules) => {
  const [errors, setErrors] = useState({})
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
      if (!(size(Object.keys(errors)) === 0 && isReady)) return

      cb(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errors, isReady]
  )

  const handleChange = () => {
    if (!isReady) setIsReady(true)

    setErrors(rules(values))
  }

  return {
    handleChange,
    errors,
  }
}

export default useValidation
