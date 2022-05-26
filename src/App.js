import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { db } from './assets/config';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

function App() {
  const [users, setUsers] = useState([])
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [updateUsername, setUpdateUsername] = useState('')
  const [updatePassword, setUpdatePassword] = useState('')

  const userRef = collection(db, 'users')

  const addUser = async () => {
    if (newUsername && newPassword) {
      await addDoc(userRef, {
        username: newUsername,
        password: newPassword
      })
      setNewUsername('')
      setNewPassword('')
    } else {
      alert('No username or password')
    }
  }

  const updateUser = async (id) => {

    if (updateUsername && updatePassword) {
      const userDoc = doc(db, 'users', id)

      const newData = {
        username: updateUsername,
        password: updatePassword
      }
      await updateDoc(userDoc, newData)
      setUpdateUsername('')
      setUpdatePassword('')
    } else {
      alert('No username or password')
    }

  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id)
    await deleteDoc(userDoc)
    window.location.reload()
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getUsers()
  }, [])


  return (
    <div className="App">
      <div className='user-form'>
        <div className='form-group'>
          <label>Username</label>
          <input
            type='text'
            placeholder='@username'
            onChange={(e) => {
              setNewUsername(e.target.value)
            }} />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            placeholder='password'
            onChange={(e) => {
              setNewPassword(e.target.value)
            }} />
        </div>
        <div className='form-group'>
          <input type='submit' value='Add' onClick={(e) => {
            addUser()
          }} />
        </div>
      </div>
      {
        users.map((user) => {
          return (
            <div className='user-card' key={user.id}>
              {/* {user.id} */}
              <div className='user-name'>{user.username}</div>
              <div className='user-pass'>{user.password}</div>
              <div className='update-user'>
                <input
                  type='text'
                  placeholder='@updateUsername'
                  onChange={(e) => {
                    setUpdateUsername(e.target.value)
                  }}
                />
                <input
                  type='text'
                  placeholder='@updatePassword'
                  onChange={(e) => {
                    setUpdatePassword(e.target.value)
                  }}
                />
                <input
                  type='submit'
                  value='Update'
                  onClick={() => {
                    updateUser(user.id)
                  }}
                />
              </div>
              <div className='delete-user'>
                <button
                  onClick={() => {
                    deleteUser(user.id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
