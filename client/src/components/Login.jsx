import React, { useEffect } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { app } from '../config/firebase.config'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { validateUser } from '../api'
import { LoginBg } from '../assets/video'

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider()

  const navigate = useNavigate();
  
  const [{user, isSongPlaying}, dispatch] = useStateValue();
  useEffect(() => {
    dispatch({
      type: actionType.SET_ISSONG_PLAYING,
      isSongPlaying: false
    })
  }, [])
  
  // Asynchronous function needs to wait until the that pop-up open and user should wait until that actions are so caught down
  // NOTE: If you didn't give this Asynchronous method this function will not wait until the popup appears and the user click that id it'll not wait until then
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      // miniNOTE: If the user logging in the first time itself on that time also you have to check your authentication information
      if(userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if(userCred) {
            userCred.getIdToken().then((token) => {
                window.localStorage.setItem("auth", "true");
                validateUser(token).then((data) => {
                  dispatch({
                    type: actionType.SET_USER,
                    user: data,
                  })
                })
            })
            navigate("/", { replace: true })
          } 
          else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            })
            navigate("/login")
          }
        })
      }
    })
  }
  useEffect(() => {
    if(window.localStorage.getItem("auth" === true)) 
      navigate('/', { replace: true })
  }, [])
  

  return (
    <div className='relative w-screen h-screen'>
      <video src={LoginBg} 
        type='video/mp4'
        autoPlay
        muted
        loop
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-darkOverlay flex items-center justify-center p-4'>
        <div className='w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center gap-2 px-4 py-2 bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all rounded-md'
            onClick={loginWithGoogle} 
          > 
            <FcGoogle className='font-mono text-xl'/>
            <p >Sign in with Google</p>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Login

