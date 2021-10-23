import styles from './style.module.scss'
import { FiLogOut, FiSend } from 'react-icons/fi/'
import { useAuth } from '../../hooks/useAuth'
import { FaGithub } from 'react-icons/fa';
import { FormEvent, useState } from 'react';
import { api } from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';

export function SendMessageForm() {

  const { user, signOut } = useAuth();
  const [newMessage, setNewMessage] = useState('')

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault()

    if (!newMessage.trim()) {
      toast('Mensagem está vazia !',
        {
          style: {
            background: 'red',
            color: '#fff',
            borderRadius: 'none'
          },
        }
      );
      return;
    }

    await api.post('messages', { message: newMessage })
    console.log(newMessage);
    toast('Mensagem enviada com sucesso !',
      {
        style: {
          background: '#1B873F',
          color: '#fff',
          borderRadius: 'none'
        },
      }
    );
    setNewMessage('')
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <div><Toaster position='top-right' reverseOrder={false} /></div>
      <button onClick={signOut} type='button' className={styles.signOutButton}>
        <FiLogOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>

        <span className={styles.userGithub}>
          <FaGithub size={16} /> {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm} method="post">

        <label htmlFor="message">Mensagem</label>

        <textarea
          name='message'
          id='message'
          placeholder='Qual a sua expectativa para o evento ?'
          onChange={(event) => setNewMessage(event.target.value)}
          value={newMessage}
        />

        <button type="submit">
          <FiSend size={16} />
          Enviar
        </button>
      </form>
    </div>
  )
}