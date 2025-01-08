import React from 'react'
import { NavLink } from 'react-router-dom'
import { GrUpgrade } from 'react-icons/gr'

const PremiumHome = () => {
  return (
    <div className="premium flex flex-col items-center justify-start px-[5rem] bg-[#020917] h-[48rem] pt-[18rem] mt-[-10rem] relative z-[2] rounded-b-[5rem]">
      {/* tild icon or path icon */}
      <img src={require("../../assets/img/Path 318.png")} alt="" className="w-[5rem]" />
      {/* heading */}
      <div className="headline mt-7 flex flex-col items-center text-[2rem]">
        <span>Upgrade your account to</span>
        <span>
          <b>Premium!</b>
        </span>
        <span className="text-[1rem] text-gray-400 px-[15rem] text-center mt-[1rem]">
          Duis feugiat congue metus, ultrices vulputate nibh viverra eget.
          Vestibulum ullamcorper volutpat varius.
        </span>
      </div>
      {/* dowload ads */}
      <div className="mt-14">
        <NavLink to={'/premium'}
                    className='buttonMusic flex items-center justify-center font-semibold' // index.css
                >Upgrade Now <GrUpgrade className='text-xl ml-2'/>
        </NavLink>
      </div>
    </div>  )
}

export default PremiumHome