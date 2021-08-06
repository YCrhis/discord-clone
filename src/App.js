import React, {useEffect} from 'react';
import './App.css';

/* components */
import Slidebar from './components/slidebar/SlideBar'
import Chat from './components/chat/Chat';
import Login from './components/login/Login'
/* redux */
import { useSelector, useDispatch } from 'react-redux';
import { login, selectUser, logout } from './features/userSlice';
/* firebase */
import { auth } from './firebase/firebase';

function App() {

  const dispatch = useDispatch()
  const user = useSelector(selectUser);

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //user is login
        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          email:authUser.email,
          displayName: authUser.displayName,
        }))
      } else {
        // user is logout
        dispatch(logout());
      }
    })
  },[dispatch])

  return (
    <div className="app">

      {user ? (
        <>
          <Slidebar/>

          <Chat/>
        </>
      ):(
        <Login/>
      )}
    </div>
  );
}

export default App;
