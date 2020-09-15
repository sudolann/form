/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
type Method = 'GET' | 'POST' | 'DELETE'

export interface Arguments {
  method?: Method
  body?: object
  options?: object
  onRender?: boolean
}
type Status = 'pending' | 'resolved' | 'rejected'

export function useHttpClient(
  url: string,
  {method, body, options, onRender}: Arguments = {
    method: 'GET',
    onRender: true,
  },
) {
  const [status, setStatus] = React.useState<null | Status>(null)
  const [error, setError] = React.useState<null | string>(null)
  const [data, setData] = React.useState<any>(null)
  const [hasToRender, setHasToRender] = React.useState(onRender)

  const executeRequest = async () => {
    setStatus('pending')

    setHasToRender(true)
    try {
      const parameters =
        method === 'POST'
          ? {method, body: JSON.stringify(body), ...options}
          : {method, ...options}
      const response = await fetch(url, parameters)
      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
        throw error
      }

      setHasToRender(false)
      setData(json)
      setStatus('resolved')
    } catch (error) {
      setError((error && error.message) || 'error')
      setStatus('rejected')
      setHasToRender(false)
    }
  }

  React.useEffect(() => {
    if (hasToRender) {
      executeRequest()
      setHasToRender(false)
    }
  }, [url, hasToRender, status, executeRequest])

  return {
    status,
    error,
    data,
    executeRequest,
  }
}
