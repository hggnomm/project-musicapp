import React, { useEffect } from 'react'
import { getAllAlbums } from '../api';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import SongCard from './SongCard';

export const AlbumContainer = ({ data }) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      { data && data.map((album, i) => (
        <SongCard key={album._id} data={album} index={i} type="album"/>
      ))}
    </div>
  )
}
const DashboardAlbums = () => {
  const [{ allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if(!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.albums
        })
      })
    }
  }, [])
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='relative w-full my-4 max-md:py-16 p-4 border border-gray-300 rounded-md'>
        {/* The count */}
        <div className='absolute top-4 left-4'>
          <p className='text-sm font-semibold'>
            Count: <span className='text-xl font-bold text-textColor'>{allAlbums?.length}</span>
            {/* NOTE: Use the question mark over there sometimes because initally if there is no all songs it's taking some time to load our context provider will be empty at the time is shows an undefined because that's a null */}
          </p>
        </div>

        <AlbumContainer data={allAlbums}/>
      </div>
    </div>
  )
}

export default DashboardAlbums