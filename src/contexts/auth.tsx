import { createContext, ReactNode, useEffect, useState, } from 'react/';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

type AthuProviderProps = {
  children: ReactNode;
}

type AuthResponse = {
  token: string;
  user: {
    name: string;
    id: string;
    avatar_url: string
    login: string;
  }
}

export const authContext = createContext({} as AuthContextData)

export function AuthProvider(props: AthuProviderProps) {


  const [user, setUser] = useState<User | null>(null)
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=a74955676c1099e28bc9`

  async function singIn(code: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code
    })

    const { token, user } = response.data

    setUser(user)
    localStorage.setItem('@dowhile:token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`
  }

  function signOut() {
    setUser(null)
    window.localStorage.removeItem('@dowhile:token')
  }

  useEffect(() => {
    const token = window.localStorage.getItem('@dowhile:token')

    if (token) {
      api.get<User>('profile').then(response => {

        setUser(response.data)
      })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')

      console.log({ githubCode, urlWithoutCode });

      window.history.pushState({}, '', urlWithoutCode)

      singIn(githubCode)
    }
  }, [])

  return (
    <authContext.Provider value={{ signInUrl, user, signOut }} >
      {props.children}
    </authContext.Provider>
  )
}