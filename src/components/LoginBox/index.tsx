import styles from './style.module.scss'
import { FaGithub } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'

export function LoginBox() {

  const { signInUrl } = useAuth()

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>

      <a href={signInUrl} className={styles.signInWithGithub}>
        <FaGithub size={22} color='#09090a' />
        Entrar com Github
      </a>
    </div>
  )
}