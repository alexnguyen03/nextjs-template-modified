import axios from 'axios'
import queryString from 'query-string'

const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
})

axiosConfig.interceptors.request.use(async config => {
  var accessToken = localStorage.getItem('accessToken')

  if (accessToken !== undefined) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axiosConfig.interceptors.response.use(
  res => {
    return res
  },
  async err => {
    const originalConfig = err.config

    if (err.response) {
      const refreshToken = localStorage.getItem('refreshToken')

      // Access Token was expired => call refresh token api
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          const rs = await axiosConfig.post('/auth/refresh-token', refreshToken)
          const { accessToken } = rs.data

          if (accessToken !== undefined) {
            localStorage.setItem('accessToken', accessToken)
            originalConfig.headers.Authorization = `Bearer ${accessToken}`
          }
          axiosConfig.defaults.headers.common['x-access-token'] = accessToken
          return axiosConfig(originalConfig)
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return err.response
          }

          return err.response
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return err.response
      }
    }

    return err.response
    // return;
  }
)

export default axiosConfig
