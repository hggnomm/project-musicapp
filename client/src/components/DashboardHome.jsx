import React from 'react'
import { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from '../api/index'
import { actionType } from '../context/reducer'
import { FaUsers } from 'react-icons/fa'
import { GiMusicalNotes } from 'react-icons/gi'
import { RiUserStarFill, RiAlbumFill } from 'react-icons/ri'
import { bgColors } from '../utils/styles'


export const DashboardCard = ({icon, name, count}) => {
  const bg_Colors = bgColors[parseInt(Math.random() * bgColors.length)]

  return (
    <div style={{background: `${bg_Colors}`}} className='p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center'>
      {icon}
      <p className='text-xl text-textColor font-semibold'>{name}</p>
      <p className='text-xl text-textColor'>{count}</p>
  
    </div>
  )
}

const DashboardHome = () => {
  const [{ allUsers, allSongs, allAlbums, allArtists }, dispatch] = useStateValue();
  useEffect(() => {

    // NOTE: Use effect it will be rendered only once it's not going to render two times or three times. It's going to render ONLY ONCE by the time because we are using an empty dependency when it gets rendered by the time the component is get initiated. It will get rendered and it will checks for the component provider. IF that the component provided have that information it's not going to trigger that API, if not having that information it's going to trigger that API form BackEND and it is going to fetch that information then we are dispatching that information to our context provided

    if(!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data
        })
      })
    }
    if(!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists
        })
      })
    }
    if(!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs
        })
      })
    }
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
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
      <DashboardCard icon={<FaUsers className='text-3xl text-textColor'/>} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0}/>  
      <DashboardCard icon={<GiMusicalNotes className='text-3xl text-textColor'/>} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0}/>  
      <DashboardCard icon={<RiUserStarFill className='text-3xl text-textColor'/>} name={"Artists"} count={allArtists?.length > 0 ? allArtists?.length : 0}/>  
      <DashboardCard icon={<RiAlbumFill className='text-3xl text-textColor'/>} name={"Albums"} count={allAlbums?.length > 0 ? allAlbums?.length : 0}/>  
    </div>
  )
}

export default DashboardHome