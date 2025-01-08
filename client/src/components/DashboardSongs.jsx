import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoAdd } from 'react-icons/io5'
import { AiOutlineClear } from 'react-icons/ai'
import { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'

import SongCard from './SongCard'
import { getAllSongs } from '../api'
import { actionType } from '../context/reducer'
import { motion } from 'framer-motion'

export const SongContainer = ({ data }) => {
  return (
    <div className='flex justify-evenly items-center'>
      <div className='grid grid-cols-4 gap-y-8 gap-x-16 '>
        { data && data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} type="song"/>
        ))}
      </div>
    </div>
  )
}

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState(null);


  const [{ allSongs }, dispatch] = useStateValue();
  // console.log(allSongs);
  useEffect(() => {
    if(!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs
        })
      })
    }
  }, [])
  // Filter Song
  useEffect(() => {
    if (songFilter.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(songFilter.toLowerCase()) ||
          data.language.toLowerCase().includes(songFilter.toLowerCase()) ||
          data.name.toLowerCase().includes(songFilter.toLowerCase()) ||

          data.artist.toUpperCase().includes(songFilter.toLowerCase()) ||
          data.language.toUpperCase().includes(songFilter.toLowerCase()) ||
          data.name.toUpperCase().includes(songFilter.toLowerCase()) 
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [songFilter]);

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex justify-center items-center gap-20'>
        <NavLink 
          to={"/dashboard/newSong"} 
          className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer">
          <IoAdd />
        </NavLink>

        {/* SEARCH */}
        <input 
          type="text" 
          className={`w-52 px-4 py-2 border ${isFocus ? "border-gray-500 shadow-md" : "border-gray-300 rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold"}`}
          placeholder='Search here...' 
          value={songFilter} 
          onChange={(e) => setSongFilter(e.target.value)} 
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
        {songFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setSongFilter("");
              setFilteredSongs(null);
            }}
          >
            <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
          </motion.i>
        )}
      </div>

      {/* Main Container */}
      <div className='relative w-full my-4 max-md:py-16 p-4 py-5 border border-gray-300 rounded-md'>
        {/* The count */}
        <div className='absolute top-4 left-4'>
          <p className='text-sm font-semibold'>
            Count: 
            <span className='text-xl font-bold text-textColor '
                > {filteredSongs ? filteredSongs?.length : allSongs?.length}
            </span>
            {/* NOTE: Use the question mark over there sometimes because initally if there is no all songs it's taking some time to load our context provider will be empty at the time is shows an undefined because that's a null */}
          </p>
        </div>

        <SongContainer data={filteredSongs ? filteredSongs : allSongs}/>
      </div>
    </div>
  )
}

export default DashboardSongs