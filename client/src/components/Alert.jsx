import React from 'react'
import { BsEmojiWink } from 'react-icons/bs'
import { motion } from 'framer-motion'

const Alert = ({ type }) => {
  return (
    <motion.div 
        initial={{ translateX : 200, opacity : 0 }}
        animate={{ translateX : 0 , opacity : 1 }}
        exit={{ translateX : 200, opacity : 0 }}
        key={type}
        className={`fixed top-[4.5rem] right-6 py-2 px-4 rounded-md backdrop-blur-md flex items-center justify-center shadow-xl 
        ${type === "success" && "bg-green-300"}
        ${type === "danger" && "bg-red-400"}`}>
        
        {type === "success" && (
            <div className='flex items-center justify-center gap-3'>
                <BsEmojiWink className='text-lg'/>
                <p>Data saved</p>
            </div>
        )}
        {type === "danger" && (
            <div className='flex items-center justify-center gap-3'>
                <BsEmojiWink className='text-lg'/>
                <p>Something went wrong.. please try again later</p>
            </div>
        )}
    </motion.div>
  )
}

export default Alert