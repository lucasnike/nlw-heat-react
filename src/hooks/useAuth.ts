import { useContext } from 'react/'
import { authContext } from '../contexts/auth'


function useAuth() {
  const result = useContext(authContext)
  return result
}

export { useAuth }