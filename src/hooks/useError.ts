import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CsrfToken } from '../types'
import useStore from '../store'

export const useError = () => {
  const navigate = useNavigate()
  const resetEditedTask = useStore((state) => state.resetEditedTask)
  const getCsrfToken = async () => {
    const { data } = await axios.get<CsrfToken>(
      `${process.env.REACT_APP_API_URL}/csrf`
    )
    axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrf_token
  }
  const switchErrorHandling = (msg: string) => {
    switch (msg) {
      case 'invalid csrf token':
        getCsrfToken()
        alert('CSRF token is invalid. Please try again.')
        break
      case 'invalid or expired jwt':
        alert('access token is not valid. Please login again.')
        resetEditedTask()
        navigate('/')
        break
      case 'missing or malformed jwt':
        alert('access token is not valid, Please login again.')
        resetEditedTask()
        navigate('/')
        break
      case 'duplicated key not allowed':
        alert('email already exists. Please use another one.')
        break
      case 'crypto/bcrypt: hashedPassword is not the hash of the given password':
        alert('password is not correct. Please try again.')
        break
      case 'record not found':
        alert('task is not found. Please try again.')
        break
      default:
        alert(msg)
        break
    }
  }
  return { switchErrorHandling }
}