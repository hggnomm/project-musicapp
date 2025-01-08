import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Logo, WubiLogo } from '../assets/img/index'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import { FaCrown } from 'react-icons/fa'
import { useStateValue } from '../context/StateProvider'
import { app } from '../config/firebase.config'
import { getAuth } from 'firebase/auth'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Header = () => {
    const [isMenu, setisMenu] = useState(false)
    
    // CAREFUL: Phải chú ý thứ tự của code. Khi điều hướng web thì mới lấy dược dữ liệu. Nếu như đặt code useStateValue ( code khởi tại dữ liệu ở trêntrước ) thì sẽ chạy được lần đầu, còn lần sau là sẽ bị lỗi bởi vì LẤY DỮ LIỆU RỒI ĐIỀU HƯỚNG THÌ SẼ RESET LẠI THÀNH NULL. 
    const navigate = useNavigate();
    const [{ user }, dispatch] = useStateValue(); 

    // NOTE: Sometimes code update value user is error. To temporary fix it you have comments userStatevalue() ==> I'll fixed these error because ...
    const logOut = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", "false")
        }).catch((e) => console.log(e));
        
        navigate('/login', { replace : true})
    }
  return (
    <header className='flex items-center w-full p-4 md:py-2 md:px-6 bg-[#c1c9d7] rounded-b-[1.5rem]'>
        <NavLink to='/'>
            <img src={WubiLogo} alt="Logo" className='w-16'/>
        </NavLink>

        <ul className='flex items-center justify-center ml-7'>
            <li className='mx-5 text-lg'>
                <NavLink 
                    to={'/home'} 
                    className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}
                >Home
                </NavLink>
            </li>
            <li className='mx-5 text-lg'>
                <NavLink 
                    to={'/musics'}
                    className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}
                >Musics
                </NavLink>
            </li>
            <li className='mx-5 text-lg'>
                <NavLink 
                    to={'/premium'}
                    className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}
                >Premium
                </NavLink>
            </li>
            <li className='mx-5 text-lg'>
                <NavLink 
                    to={'/contact'}
                    className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}
                >Contact Us
                </NavLink>
            </li>
        </ul>

        <div 
            onMouseEnter={() => setisMenu(true)}
            onMouseLeave={() => setisMenu(false)}
            className='flex items-center ml-auto cursor-pointer gap-2 relative'>
                
            <img src={user?.user?.imageURL} alt="" referrerPolicy='no-referrer' className='w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg' />
            <div className='flex flex-col'>
                <p className='text-textColor text-lg hover:text-headingColor font-semibold'>{user?.user?.name}</p>
                <p className='flex items-center gap-2 text-xs text-gray-500 font-normal'>Premium Member. <FaCrown className='text-sm -ml-1 text-yellow-500' /></p>
            </div>

            {isMenu && (
            <motion.div 
            initial={{opacity : 0, y : 100}}
            animate={{opacity: 1, y : 0}}
            exit = {{opacity: 0, y : 50}}
            className='absolute flex flex-col z-10 top-12 p-4 right-0 w-275 gap-3 bg-white shadow-lg rounded-lg backdrop-blur-md '>
                <NavLink to={'/userProfile'}>
                    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Profile</p>
                </NavLink>
                <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>My Favorites</p>

                <hr />

                {
                    user?.user?.role === 'admin' && (
                    <>
                    <NavLink to={'/dashboard/home'}>
                    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Dashboard</p>
                    </NavLink>
                    <hr />

                    </>

                    )
                }
                <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out' onClick={logOut}>Sign Out</p>
            </motion.div>
            )}
        </div>
    </header>
  )
}

export default Header