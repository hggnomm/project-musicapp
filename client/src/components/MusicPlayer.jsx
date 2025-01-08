import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/StateProvider';
import { motion } from 'framer-motion'
import { RiPlayListFill } from 'react-icons/ri'
import {  } from 'react-icons/io'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { getAllArtists, getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import { IoArrowRedo, IoClose, IoMusicalNote } from 'react-icons/io5';


const MusicPlayer = () => {
    const [{ allSongs, songIndex, isSongPlaying, miniPlayer}, dispatch] = useStateValue();
    const [isPlayList, setIsPlayList] = useState(false);

    const handleClickPlayList = event => {
        setIsPlayList(current => !current);
    }
    const autoNextTrack = () => {
        if(songIndex === allSongs.length - 1) {
            dispatch({
                type : actionType.SET_SONG_INDEX,
                songIndex: 0
            }) 
        } else {
            dispatch({
                type : actionType.SET_SONG_INDEX,
                songIndex: songIndex + 1,
            })
        }
    }

    const nextTrack = () => {
        if(songIndex === allSongs.length - 1) {
            dispatch({
                type : actionType.SET_SONG_INDEX,
                songIndex: 0
            }) 
        } else {
            dispatch({
                type : actionType.SET_SONG_INDEX,
                songIndex: songIndex + 1,
            })
        }
    }
    const previousTrack = () => {
        if(songIndex === 0) {
            dispatch({
                type : actionType.SET_SONG_INDEX,
                songIndex: allSongs.length - 1
            }) 
        } else {
            dispatch({
                type : actionType.SET_SONG_INDEX,
                songIndex: songIndex - 1,
            })
        }
    }
    const closePlayer = () => {
            dispatch({
                type : actionType.SET_ISSONG_PLAYING,
                isSongPlaying: false
            })
    }

    const togglePlayer = () => {
        if(miniPlayer) {
            dispatch({
                type: actionType.SET_MINI_PLAYER,
                miniPlayer: false,
            })
        } else {
            dispatch({
                type: actionType.SET_MINI_PLAYER,
                miniPlayer: true,
            })
        }
    }
  return (
    <div className='w-full flex items-center gap-3 z-10'>
        <div className={`w-full full items-center gap-3 p-4 ${
            miniPlayer ? "absolute top-40" : "flex relative"
            }`}
        >
            <img src={allSongs[songIndex].imageURL} 
                 className='w-40 h-20 object-cover rounded-md '   
                 alt="" 
            />
            {/* Name song- album - artist - category and playlist... */}
            <div className='flex items-start flex-col'>
                <p className='text-xl text-headingColor font-semibold'>
                    {`${allSongs[songIndex]?.name.length > 20
                        ? allSongs[songIndex]?.name.slice(0, 20)
                        : allSongs[songIndex]?.name
                    }`}{" "}
                    <span className='text-base'> - ({allSongs[songIndex]?.album})</span>
                </p>
                <p className='text-textColor'>
                    {allSongs[songIndex]?.artist}{" "}
                    <span className='text-sm text-textColor font-semibold'>
                         - ({allSongs[songIndex]?.category})
                    </span>
                </p>

                <motion.i
                    whileTap={{ scale: 0.8 }}
                    // onClick={() => setIsPlayList(!isPlayList)}
                >
                    <RiPlayListFill 
                        className='text-textColor hover:text-headingColor cursor-pointer text-2xl'
                        onClick={handleClickPlayList}
                    />
                </motion.i>
            </div>

            <div className='flex-1'>
                <AudioPlayer 
                    src={allSongs[songIndex]?.songURL}
                    onPlay={() => console.log(allSongs[songIndex]?.name +" is playing")}
                    autoPlay={true}
                    showSkipControls={true}
                    onClickNext={nextTrack}
                    onClickPrevious={previousTrack}
                />
            </div>

            {
                isPlayList && (
                    <PlayListCard />
                )
            }
            <div className='flex flex-col '>
{/* NOTE: Close MusicPlayer */}
                <motion.div 
                    className='text-2xl cursor-pointer mb-6 '
                    whileHover={{ scale: 1.5 }}
                    onClick={closePlayer} 
                >   
                    <IoClose className='hover:text-slate-500'/>
                </motion.div>    
    {/* NOTE: Convet mini MusicPlayer */}
                <motion.div 
                    className='text-2xl cursor-pointer   '
                    whileHover={{ scale: 1.5 }}
                    onClick={togglePlayer} 
                >   
                    <IoArrowRedo className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
                </motion.div>
            </div>

            {miniPlayer && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="fixed right-3 bottom-3 "
                    >
                    <div className="w-40 h-40 rounded-full flex items-center justify-center  relative ">
                        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl animate-pulse"></div>
                        <img
                        onClick={togglePlayer}
                        src={allSongs[songIndex]?.imageURL}
                        className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
                        alt=""
                        />
                    </div>
                </motion.div>
            )}
        </div>
    </div>
  )
}
export const PlayListCard = () => {
    const [{ allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue();
    
    useEffect(() => {
        if (!allSongs) {
          getAllSongs().then((data) => {
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.songs,
            });
          });
        }
    }, []);

    const setCurrentPlaySong = (index) => {
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
        <div className='absolute left-4 bottom-28 gap-2 py-2 w-350 max-w-[350px] h-272 max-h-[510px] flex flex-col overflow-y-scroll rounded-md shadow-md bg-primary'>
            {allSongs.length > 0 ? (
                allSongs.map((music, index) => (
                    <motion.div
                        initial={{ opacity: 0, translateX: -50 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${
                            music?._id === songIndex._id ? "bg-card" : "bg-transparent"
                          }`}
                        onClick={() => setCurrentPlaySong(index)}
                        key={index}
                    >
                        <IoMusicalNote className='text-textColor group-hover:text-headingColor text-2xl cursor-pointer'/>
                        <div className='flex items-start flex-col'>
                            <p className='text-lg text-headingColor font-semibold'>
                                {`${
                                    music?.name.length > 20
                                    ? music?.name.slice(0, 20)
                                    : music?.name
                                }`}{" "}
                                <span className='text-base'> - ({music?.album})</span>
                            </p>
                            <p className='text-textColor'>
                                {music?.artist}{" "}
                                <span className='text-sm text-textColor font-semibold'>
                                    - ({music?.category})
                                </span>
                            </p>
                        </div>
                    </motion.div>
                ))
            ) : (
                <></>
            )}
        </div>
    )
}

export default MusicPlayer