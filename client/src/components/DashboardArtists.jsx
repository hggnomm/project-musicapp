import React, { useEffect } from 'react'
import { getAllArtists } from '../api';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import SongCard from './SongCard';

export const ArtistContainer = ({ data }) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      { data && data.map((artist, i) => (
        <SongCard key={artist._id} data={artist} index={i} type="artist"/>
      ))}
    </div>
  )
}
const DashboardArtists = () => {
  const [{ allArtists }, dispatch] = useStateValue();
  useEffect(() => {
    if(!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists
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
            Count: <span className='text-xl font-bold text-textColor'>{allArtists?.length}</span>
            {/* NOTE: Use the question mark over there sometimes because initally if there is no all songs it's taking some time to load our context provider will be empty at the time is shows an undefined because that's a null */}
          </p>
        </div>

        <ArtistContainer data={allArtists}/>
      </div>
    </div>
  )
}

export default DashboardArtists