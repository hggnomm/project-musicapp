import React from 'react'
import { FiFacebook, FiGithub, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'
const Footer = () => {
    const SocialStyle = "rounded-full border-2 border-white p-2 mr-[5rem]"
  return (
    <div className=" footer flex flex-col items-center justify-start px-[5rem] bg-[#081730] h-[35rem] pt-[18rem] mt-[-10rem] relative z-[1]">
      {/* Social icons */}
      <div className="flex w-[100%] justify-center ml-[4.5rem]">
        <a className={SocialStyle} href='https://www.facebook.com/hg.nomm453' target="_blank">
          <FiFacebook className='text-xl'/>
        </a>{" "}
        <a className={SocialStyle} href='https://twitter.com/hg_nomm453' target="_blank">
          <FiTwitter className='text-xl'/>
        </a>{" "}
        <a className={SocialStyle} href='https://github.com/namtran0787' target="_blank">
          <FiGithub className='text-xl'/>
        </a>{" "}
        <a className={SocialStyle} href='https://www.instagram.com/hg.nomm453/' target="_blank">
          <FiInstagram className='text-xl'/>
        </a>
      </div>
      {/* detail */}
      <span className="text-[1rem] text-gray-400 px-[15rem] text-center mt-[4rem]">
        Duis feugiat congue metus, ultrices vulputate nibh viverra eget.
        Vestibulum ullamcorper volutpat varius.
      </span>
    </div>  )
}

export default Footer