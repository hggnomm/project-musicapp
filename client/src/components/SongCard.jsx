import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoTrash } from 'react-icons/io5'
import { deleteAlbumById, deleteArtistById, deleteSongById, getAllAlbums, getAllArtists, getAllSongs } from '../api'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../config/firebase.config'

const SongCard = ({data, index ,type}) => {
  // NOTE: Stagger animation
  const [isDelete, setIsDelete] = useState(false)
  const [{ allSongs, allAlbums, allArtist, alertType, isSongPlaying, songIndex}, dispatch] = useStateValue();

  const deleteData = (data) => {
    // SONG
    if(type === "song") {
        // NOTE: Delete on firebase storage 
        const deleteRef = ref(storage, data.imageURL);
        deleteObject(deleteRef).then(() => {

        }) 
        // NOTE: Delete on database
        deleteSongById(data._id).then(res => {
            if(res.data) {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType : "success"
                })
                setInterval(() => {
                    dispatch({
                      type: actionType.SET_ALERT_TYPE,
                      alertType : "null"
                    })
                }, 5000)
                
                getAllSongs().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_SONGS,
                        allSongs: data.songs
                    })
                })
            } else {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType : "danger"
                })
                setInterval(() => {
                    dispatch({
                      type: actionType.SET_ALERT_TYPE,
                      alertType : "null"
                    })
                }, 5000)
            }
        })
    }
    // ALBUM
    if(type === "album") {
        // NOTE: Delete on firebase storage 
        const deleteRef = ref(storage, data.imageURL);
        deleteObject(deleteRef).then(() => {

        }) 
        // NOTE: Delete on database
        deleteAlbumById(data._id).then(res => {
            if(res.data) {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType : "success"
                })
                setInterval(() => {
                    dispatch({
                      type: actionType.SET_ALERT_TYPE,
                      alertType : "null"
                    })
                }, 5000)
                
                getAllAlbums().then((data) => {
                    dispatch({
                      type: actionType.SET_ALL_ALBUMS,
                      allAlbums: data.albums
                    })
                  })
            } else {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType : "danger"
                })
                setInterval(() => {
                    dispatch({
                      type: actionType.SET_ALERT_TYPE,
                      alertType : "null"
                    })
                }, 5000)
            }
        })
    }
    // ARTIST
    if(type === "artist") {
        // NOTE: Delete on firebase storage 
        const deleteRef = ref(storage, data.imageURL);
        deleteObject(deleteRef).then(() => {

        }) 
        // NOTE: Delete on database
        deleteArtistById(data._id).then(res => {
            if(res.data) {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType : "success"
                })
                setInterval(() => {
                    dispatch({
                      type: actionType.SET_ALERT_TYPE,
                      alertType : "null"
                    })
                }, 5000)
                
                getAllArtists().then((data) => {
                    dispatch({
                      type: actionType.SET_ALL_ARTISTS,
                      allArtists: data.artists
                    })
                })
            } else {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType : "danger"
                })
                setInterval(() => {
                    dispatch({
                      type: actionType.SET_ALERT_TYPE,
                      alertType : "null"
                    })
                }, 5000)
            }
        })
    }
  }

  const addToContext = () => {
    // console.log(type);
    if(!isSongPlaying) {
        dispatch({
            type : actionType.SET_ISSONG_PLAYING,
            isSongPlaying: true
        })
    }
    if(songIndex !== index) {
        dispatch({
            type : actionType.SET_SONG_INDEX,
            songIndex: index
        })
    }
  }
  return (
    <motion.div className='relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center '
                onClick={type === 'song' && addToContext}
                // NOTE: Animation 
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
        >
        <div className='w-40 h-40 min-w-[160px] min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
            <motion.img 
                whileHover={{scale: 1.05}}
                src={data.imageURL}
                className='w-full h-full rounded-lg object-cover'
            />
        </div>
        <p className='text-lg text-center text-headingColor font-semibold my-2'>
            {data.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}
            {data.artist && (
                <span className='block text-sm text-gray-400 mt-1'>
                    {data.artist.length > 25 ? `${data.artist.slice(0, 25)}...` : data.artist}
                </span>
            )}
        </p>

        <div className='w-full absolute bottom-2 right-2 flex items-center justify-between px-4'>
            <motion.i 
                whileTap={{ scale: 0.75 }}
                className='text-lg text-red-400 drop-shadow-md hover:text-red-700'
                onClick={() => setIsDelete(true)}
                >
                <IoTrash />
            </motion.i>
        </div>

        {isDelete && (
            <motion.div className='absolute inset-0 backdrop-blur-sm bg-cardOverlay flex items-center flex-col justify-center px-4 py-2'
                initial= {{opacity : 0}}
                animate= {{opacity : 1,}}
            >
                <p className='text-lg text-headingColor font-semibold text-center'>Are you sure do you want to delete it?</p>
                <div className='flex item-center gap-4 mt-2'>
                    <motion.button className='px-2 py-1 text-sm uppercase bg-green-300 rounded-lg'
                        whileTap={{scale: 0.7}}
                        whileHover={{ scale: 1.3 }}
                        onClick={() => deleteData(data)}
                    >
                        Yes
                    </motion.button>
                    <motion.button className='px-2 py-1 text-sm uppercase bg-red-300 rounded-lg'
                        whileTap={{scale: 0.7}}
                        whileHover={{ scale: 1.3 }}
                        onClick={() => setIsDelete(false)}
                    >
                        No
                    </motion.button>
                </div>
            </motion.div>
        )}
    </motion.div>
  )
}

export default SongCard