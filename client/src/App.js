import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Login, Home, Dashboard, MusicPlayer, Musics, ComingSoon } from './components'
import { app } from './config/firebase.config'

import { getAuth } from 'firebase/auth'

import { AnimatePresence, motion } from 'framer-motion'
import { validateUser } from './api'
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'

const App = () => {
    
    // NOTE: Whenever app is getting loaded we have to get that logged in user information if the user is already logged in , and if you don't log out properly you have to fetch that information
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();

    const [{ user, isSongPlaying}, dispatch] = useStateValue();

    const [auth, setAuth ] = useState(false || window.localStorage.getItem('auth') === 'true');

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            // miniNOTE: If the user is not logged in then you have to set the user to that particular if here. We are checking the user credential over here
            if(userCred) {
                userCred.getIdToken()
                .then((token) => {
                    // console.log(token); // If there is a credential then it will be fine

                     // miniNOTE: We have to send this refresh token to our backend server then we have to validate that refresh token  
                     window.localStorage.setItem("auth", "true");
                    validateUser(token).then((data) =>  {
                        // console.log(data.user)
                        dispatch({
                            type: actionType.SET_USER,
                            user: data,
                        }) 
                        // miniNOTE: get value in Context.Provided in Components
                    })              
                })
   
            } else { // if there is no credential 
                setAuth(false);  // ==> It will take the user set the local storage as false
                dispatch({
                    type: actionType.SET_USER,
                    user: null,
                })
                window.localStorage.setItem('auth', 'false');
                navigate("/login"); // ==> Reroute the user to the login screen
            }
        })
    }, [])
    return (
        <AnimatePresence exitBeforeEnter>  
            <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
                <Routes>
                    <Route 
                        path='/login'
                        element={<Login setAuth={setAuth}/>}
                    />
                    <Route
                        path='/*'
                        element={<Home />}
                    />
                    <Route
                        path='/musics'
                        element={<Musics />}
                    />
                    <Route
                        path='/premium'
                        element={<ComingSoon />}
                    />
                    <Route
                        path='/contact'
                        element={<ComingSoon />}
                    />
                    <Route
                        path='/userProfile'
                        element={<ComingSoon />}
                    />
                    <Route
                        path='/dashboard/*' 
                        element={<Dashboard />}
                    />
                </Routes>

                {isSongPlaying && (
                    <motion.div
                        initial={{ opacity: 0, y: 50}}
                        animate={{ opacity: 1, y: 0}}
                        exit={{ opacity: 0, y: 50}}
                        
                        className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center z-20`}
                    >
                        <MusicPlayer />
                    </motion.div>
                )}
            </div>
        </AnimatePresence>
    )
}

export default App