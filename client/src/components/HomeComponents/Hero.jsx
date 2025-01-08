import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Backgraphics } from '../../assets/img'
import { FcMusic } from 'react-icons/fc'
import VisibilitySensor from "react-visibility-sensor";
import { motion } from "framer-motion";


const Hero = () => {
    const [elementIsVisible, setElementIsVisible] = useState(false);
    const bg = {
        true: {
          left: "7rem",
        },
        false: {
          left: "19rem",
        },
      };
      const musicPlayer = {
        true: {
          left: "295px",
        },
        false: {
          left: "235px",
        },
      };
      const rect = {
        true: {
          left: "11rem",
        },
        false: {
          left: "13rem",
        },
      }
      const heart = {
        true: {
          left: "9rem",
        },
        false: {
          left: "12.5rem",
        },
      };
  return (
    <VisibilitySensor 
        onChange={(isVisible) => setElementIsVisible(isVisible)}
        minTopValue={300}
    >
        <div className="Hero wrapper relative bg-[#081730] mt-4 flex items-center justify-between px-20 rounded-b-[5rem] rounded-t-[1.5rem] w-full h-[35rem]  text-white overflow-hidden z-[5]">
            {/* Left side */}
            <div className='headings flex flex-col items-start justify-center text-5xl'>
                <span className='my-2'><b>Experience The</b></span>{" "}
                <span className='my-2'>
                    <b>Best Quality Music</b>
                </span>
                <span className='text-sm text-[#525D6E] my-2'>
                    Donec laoreet nec velit vitae aliquam. Ut quis tincidunt purus.
                    <br />
                    Suspendisse in leo non risus tincidunt lobortis
                    <hr className='mt-5 border-green-500'/>
                </span>

                {/* download ads */}
                <span className='text-2xl font-semibold mb-5'>Listen to music now</span>
                <NavLink to={'/musics'}
                        className='buttonMusic flex items-center justify-center font-semibold' // index.css
                    >Go <FcMusic className='text-xl'/>
                </NavLink>
            </div>

            {/* Right side */}
            <div className="images relative w-1/2">
                <motion.img
                variants={bg}
                animate={`${elementIsVisible}`}
                transition={{ duration: 1, type: "ease-out" }}
                src={require("../../assets/img/backgraphics.png")}
                alt=""
                className="absolute top-[-8rem] left-[19rem]"
                />
                <img
                    src={require("../../assets/img/p 1.png")}
                    alt=""
                    className="absolute top-[-15rem] h-[34rem] left-[13rem]"
                />
                <motion.img
                    variants={musicPlayer}
                    animate={`${elementIsVisible}`}
                    transition={{
                    duration: 1,
                    type: "ease-out",
                    }}
                    src={require("../../assets/img/p 2.png")}
                    alt=""
                    className="absolute left-[235px] top-[94px] w-[175px]"
                />
                <motion.img
                    variants={rect}
                    animate={`${elementIsVisible}`}
                    transition={{
                    type: "ease-out",
                    duration: 1,
                    }}
                    src={require("../../assets/img/p 3.png")}
                    alt=""
                    className="absolute w-[5rem] left-[13rem] top-[12rem]"
                />
                <motion.img
                    variants={heart}
                    animate={`${elementIsVisible}`}
                    transition={{
                    type: "ease-out",
                    duration: 1,
                    }}
                    src={require("../../assets/img/p 4.png")}
                    alt=""
                    className="absolute w-[5rem] left-[12.5rem] top-[12rem]"
                />
            </div>

        </div>
    </VisibilitySensor>
  )
}

export default Hero