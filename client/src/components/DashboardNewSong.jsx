import React, { useEffect, useState } from 'react'
import FilterButtons from './FilterButtons';
import { filterByLanguage, filters} from '../utils/supportfunctions'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { getAllAlbums, getAllArtists, getAllSongs, saveNewAlbum, saveNewArtist, saveNewSong } from '../api';
import { BiCloudUpload } from 'react-icons/bi'
import { storage } from '../config/firebase.config';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { MdDelete } from 'react-icons/md';
import { motion } from 'framer-motion'

const DashboardNewSong = () => {
// NAME SONGs
    const [songName, setsongName] = useState("");
// IMAGE
    const [songImageCover, setsongImageCover] = useState(null);
    const [imageUploadProgress, setimageUploadProgress] = useState(0);
    const [isImageLoading, setisImageLoading] = useState(false);
// AUDIO
    const [audioImageCover, setaudioImageCover] = useState(null);
    const [audioUploadProgress, setaudioUploadProgress] = useState(0);
    const [isAudioLoading, setisAudioLoading] = useState(false);

// ARTIST
    const [artistImageCover, setartistImageCover] = useState(null);
    const [artistUploadingProgress, setartistUploadingProgress] = useState(0);
    const [isArtistLoading, setisArtistLoading] = useState(false);
    const [artistName, setArtistName] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("")
// ALBUM
    const [albumImageCover, setalbumImageCover] = useState(null);
    const [albumUploadingProgress, setalbumUploadingProgress] = useState(0);
    const [isAlbumLoading, setisAlbumLoading] = useState(false);
    const [albumName, setAlbumName] = useState("");
    
    // NOTE: We don't have to fetch information again because we was fetch infor in DashboardHome. So we just fetch one time. CAREFUL: If you reload these newSong page, user page or songs page... It will not load information in ConText.Provider because these are not fetch information.
    
    const [{ allArtists, allAlbums, allSongs, artistFilter, albumFilter, filterTerm, languageFilter, alertType }, dispatch] = useStateValue();
     useEffect(() => {
      if(!allArtists) {
          getAllArtists().then(data => {
              dispatch({
                  type: actionType.SET_ALL_ARTISTS,
                  allArtists: data.artists
              })
        })
       }
      if(!allAlbums) {
          getAllAlbums().then(data => {
              dispatch({
                  type: actionType.SET_ALL_ALBUMS,
                  allAlbums: data.albums
              })
          })
      }
     }, [])
    const deleteFileObject = (url, isImage) => {
    if(isImage) {
      setisImageLoading(true);
      setisAudioLoading(true);
      setisArtistLoading(true);
      setisAlbumLoading(true);
      
    } 
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setsongImageCover(null);
      setisImageLoading(false);

      setaudioImageCover(null);
      setisAudioLoading(false);

      setartistImageCover(null);
      setisArtistLoading(false);

      setalbumImageCover(null);
      setisAlbumLoading(false);
    })

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
  }
  const saveSong = () => {
    if(!songImageCover || !audioImageCover ) {
      // throw the alert 
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
    } else {
      setisAudioLoading(true)
      setisImageLoading(true)

      const data = {
        name: songName,
        imageURL: songImageCover,
        songURL: audioImageCover,
        album: albumFilter,
        artist: artistFilter,
        language: languageFilter,
        category: filterTerm,
      };
      saveNewSong(data).then(res => {
        getAllSongs().then(songs => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: songs.songs
          })
        })
      })
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

      setsongName(null);
      setisAudioLoading(false);
      setisImageLoading(false);
      setsongImageCover(null);
      setaudioImageCover(null);
    }
  }
  const saveArtist = () => {
    if(!artistImageCover || !artistName || !twitter || !instagram) {
      // throw the alert 
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
    } else {
      setisArtistLoading(true)

      const data = {
        name: artistName,
        imageURL: artistImageCover,
        twitter: `www.twitter.com/${twitter}`,
        instagram: `www.instagram.com/${instagram}`,
      };
      saveNewArtist(data).then(res => {
        getAllArtists().then(data => {
          dispatch({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: data.artists
          })
        })
      })
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
      setisArtistLoading(false);
      setartistImageCover(null);
      setArtistName("");
      setTwitter("");
      setInstagram("");
 
    }
  }
  const saveAlbum = () => {
    if(!albumImageCover || !albumName) {
      // throw the alert 
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
    } else {
      setisArtistLoading(true)

      const data = {
        name: albumName,
        imageURL: albumImageCover,
      };
      saveNewAlbum(data).then(res => {
        getAllAlbums().then(data => {
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.albums
          })
        })
      })
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

      setisAlbumLoading(false);
      setalbumImageCover(null);
      setAlbumName("");
    }
  }
  
  return ( // NOTE: DashboardNewSong.jsx    return...
    <div className='flex items-center justify-center p-4 border border-gray-300 rounded-md'>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <input 
                type="text" 
                placeholder='Type your song name...' 
                className='w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent'
                value={songName} 
                onChange={(e) => setsongName(e.target.value)}
            />

            <div className='flex w-full justify-evenly flex-wrap items-center gap-4'>
                <FilterButtons filterData={allArtists} flag={"Artist"} />
                <FilterButtons filterData={allAlbums} flag={"Album"} />
                <FilterButtons filterData={filterByLanguage} flag={"Language"} />
                <FilterButtons filterData={filters} flag={"Category"} />
            </div>
            
            <div className='flex items-center justify-between gap-2 w-full flex-wrap'>
                  {/* Image File Uploading */}
                <div className='bg-card backdrop-blur-md w-full h-300 lg:w-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
                  {isImageLoading && (
                    <FileLoader progress={imageUploadProgress} />
                  )}

                  {!isImageLoading && (
                    <>
                      {!songImageCover 
                      ? (
                        <FileUploader 
                          updateState = {setsongImageCover} 
                          setProgress = {setimageUploadProgress}
                          isLoading = {setisImageLoading}
                          isImage = {true} />
                      ) 
                      : (
                        <div className='relative w-full h-full overflow-hidden rounded-md'>
                          <img src={songImageCover} 
                              className='w-full h-full object-cover' 
                              alt="" />
                          <motion.button 
                            whileTap={{ scale: 0.1 }} 
                            type='button' 
                            className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                            onClick={() => deleteFileObject(songImageCover, true)}>
                            
                            <MdDelete className='text-white'/>
                          </motion.button>
                        </div>
                      )}
                    </>
                  )}

                </div>

      {/* Audio File Uploading */}

              <div className='bg-card  backdrop-blur-md w-full lg:w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
                {isAudioLoading && (
                  <FileLoader progress={audioUploadProgress} />
                )}

                {!isAudioLoading && (
                  <>
                    {!audioImageCover 
                    ? (
                      <FileUploader 
                        updateState = {setaudioImageCover} 
                        setProgress = {setaudioUploadProgress}
                        isLoading = {setisAudioLoading}
                        isImage = {false} />
                    ) 
                    : (
                      <div className='relative w-full h-full overflow-hidden rounded-md flex items-center justify-center'>
                        <audio 
                          src={audioImageCover}
                          controls
                          className=''
                        ></audio>
                        <motion.button 
                          whileTap={{ scale: 0.1 }} 
                          type='button' 
                          className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                          onClick={() => deleteFileObject(audioImageCover, false)}>
                          
                          <MdDelete className='text-white'/>
                        </motion.button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>


    {/* Button save song */}
            <div className='flex items-center justify-end w-full p-4 cursor-pointer'>
              {isImageLoading || isAudioLoading 
              ? (
                <DisabledButton />
              ) 
              : (
                <motion.button
                  whileTap={{scale: 0.75}} 
                  className='w-full px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg'
                  onClick={saveSong}
                > 
                  Save song
                </motion.button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-start w-full p-4">
            {/* Image uploader for artist */}
            <div className="flex items-center justify-evenly w-full flex-wrap mb-4">
              <div className='bg-card  backdrop-blur-md w-full lg:w-225 h-225 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
                {isArtistLoading && (
                  <FileLoader progress={artistUploadingProgress} />
                )}

                {!isArtistLoading && (
                  <>
                    {!artistImageCover 
                    ? (
                      <FileUploader 
                        updateState = {setartistImageCover} 
                        setProgress = {setalbumUploadingProgress}
                        isLoading = {setisArtistLoading}
                        isImage = {true} />
                    ) 
                    : (
                      <div className='relative w-full h-full overflow-hidden rounded-md'>
                        <img src={artistImageCover} className='w-full h-full object-cover' alt="" />
                        <motion.button 
                          whileTap={{ scale: 0.1 }} 
                          type='button' 
                          className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out'
                          onClick={() => deleteFileObject(artistImageCover, true)}>
                          
                          <MdDelete className='text-white'/>
                        </motion.button>
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* Artist Name */}
            <div className="flex flex-col items-center justify-center gap-4 ">
              <input 
                  type="text" 
                  placeholder='Artist name...' 
                  className='w-full lg:w-300 p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent'
                  value={artistName} 
                  onChange={(e) => setArtistName(e.target.value)}
              />
              {/* Twitter, Instagram Name */}
              <div className='w-full lg:w-300 p-3 flex items-center rounded-md  shadow-sm border border-gray-300'>
                  <p className='text-base font-semibold text-gray-400'>www.twitter.com/</p>
                  <input type="text" placeholder='your twitter id' 
                    className='w-full text-base font-semibold text-textColor outline-none bg-transparent'
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
              </div>
              <div className='w-full lg:w-300 p-3 flex items-center rounded-md  shadow-sm border border-gray-300'>
                  <p className='text-base font-semibold text-gray-400'>www.instagram.com/</p>
                  <input type="text" placeholder='your instagram id' 
                    className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
              </div>
              
            
              {/* Button save artist */}
              <div className='w-full lg:w-300 flex items-center justify-center lg:justify-end'>
                {isArtistLoading 
                ? (
                  <DisabledButton />
                ) 
                : (
                  <motion.button
                    whileTap={{scale: 0.75}} 
                    className='w-full px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg'
                    onClick={saveArtist}
                  > 
                    Save Artist
                  </motion.button>
                )}
              </div>
            </div>

            </div>

            {/* Album Information */}
            <div className="flex items-center justify-evenly w-full flex-wrap">
            <div className='bg-card  backdrop-blur-md w-full lg:w-225 h-225 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
              {isAlbumLoading && (
                <FileLoader progress={albumUploadingProgress} />
              )}

              {!isAlbumLoading && (
                <>
                  {!albumImageCover 
                  ? (
                    <FileUploader 
                      updateState = {setalbumImageCover} 
                      setProgress = {setalbumUploadingProgress}
                      isLoading = {setisAlbumLoading}
                      isImage = {true} />
                  ) 
                  : (
                    <div className='relative w-full h-full overflow-hidden rounded-md'>
                      <img src={albumImageCover} className='w-full h-full object-cover' alt="" />
                      <motion.button 
                        whileTap={{ scale: 0.1 }} 
                        type='button' 
                        className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out'
                        onClick={() => deleteFileObject(albumImageCover, true)}>
                        
                        <MdDelete className='text-white'/>
                      </motion.button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Album Name */}
            <div className='flex flex-col items-center justify-center gap-4'>
              <input 
                  type="text" 
                  placeholder='Album name...' 
                  className='w-full lg:w-300 p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent'
                  value={albumName} 
                  onChange={(e) => setAlbumName(e.target.value)}
              />
              {/* Button save album */}
              <div className='w-full lg:w-300 flex items-center justify-center lg:justify-end'>
                {isAlbumLoading 
                ? (
                  <DisabledButton />
                ) 
                : (
                  <motion.button
                    whileTap={{scale: 0.75}} 
                    className='w-full px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg'
                    onClick={saveAlbum}
                  > 
                    Save Album
                  </motion.button>
                )}
              </div>
            </div>
            
            </div>

          </div>

      </div>

    </div>
  )
}

export const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
    >
      <svg
        role="status"
        className="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
};

export const FileLoader = ({ progress }) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center '>
      <p className='text-xl font-semibold text-textColor'>
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className='w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative'>
        <div className='absolute inset-0 rounded-full bg-red-600 blur-xl'></div>
      </div>
    </div>
  )
}
export const FileUploader = ({updateState, setProgress, isLoading, isImage}) => {

  const [{ alertType }, dispatch] = useStateValue();
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);

    const storageRef = ref(
      storage,
      `${isImage ? "Images" : "Audio"}/${Date.now()}-${uploadedFile.name}`
      ); // NOTE: is storage imgs and audios in gs://project-musicapp-630f3.appspot.com/.

    const uploadTask = uploadBytesResumable(storageRef, uploadedFile)

    uploadTask.on(
      "state_changed", 
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });

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
      })
  }
  return (
    <label>
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='flex flex-col justify-center items-center cursor-pointer'>
          <p className='font-bold text-3xl'>
            <BiCloudUpload />
          </p>
          <p className='text-lg'>Click to upload { isImage ? "an image" : "an audio"}</p>
        </div>
      </div>
      <input 
        type="file" 
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`} 
        className="hidden"
        onChange={uploadFile}
      />
    </label>
  )
}
export default DashboardNewSong