import React, { useEffect, useState } from 'react'
import { Header, Footer} from '.'
import Filter from "./Filter";
import { useStateValue } from '../context/StateProvider'
import SearchBar from './SearchBar';
import { motion } from "framer-motion"
import { actionType } from '../context/reducer';
import { getAllAlbums, getAllArtists, getAllSongs } from '../api';
import Hero from './HomeComponents/Hero';
import Experience from './HomeComponents/Experience';
import SearchHome from './HomeComponents/SearchHome';
import PremiumHome from './HomeComponents/PremiumHome';

const Home = () => {
  // const [
  //   {
  //     allSongs,
  //     allArtists,
  //     allAlbums,
  //     isSongPlaying,
  //     songIndex,
  //     artistFilter,
  //     albumFilter,
  //     languageFilter,
  //     filterTerm,
  //     searchTerm
  //   },
  //   dispatch
  // ] = useStateValue();

  // const [filteredSongs, setFilteredSongs] = useState(null);

  // useEffect(() => {
  //   if(!allSongs) {
  //     getAllSongs().then((data) => {
  //       dispatch({
  //         type: actionType.SET_ALL_SONGS,
  //         allSongs: data.songs
  //       })
  //     })
  //   }
  //   if(!allArtists) {
  //     getAllArtists().then((data) => {
  //       dispatch({
  //         type: actionType.SET_ALL_ARTISTS,
  //         allArtists: data.artists
  //       })
  //     })
  //   }
  //   if(!allAlbums) {
  //     getAllAlbums().then((data) => {
  //       dispatch({
  //         type: actionType.SET_ALL_ALBUMS,
  //         allAlbums: data.albums
  //       })
  //     })
  //   }
  // }, []);

  // useEffect(() => {
  //   if (searchTerm.length > 0) {
  //     const filtered = allSongs.filter(
  //       (data) =>
  //         data.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         data.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          
  //         data.artist.toUpperCase().includes(searchTerm.toLowerCase()) ||
  //         data.language.toUpperCase().includes(searchTerm.toLowerCase()) ||
  //         data.name.toUpperCase().includes(searchTerm.toLowerCase()) ||
          
  //         data.artist.toUpperCase().includes(artistFilter)
  //     );
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [searchTerm]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter((data) => data.artist === artistFilter);
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [artistFilter]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter((data) => data.category.toLowerCase() === filterTerm
  //   );
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [filterTerm]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter((data) => data.album === albumFilter);
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [albumFilter]);

  // useEffect(() => {
  //   const filtered = allSongs?.filter((data) => data.language === languageFilter
  //   );
  //   if (filtered) {
  //     setFilteredSongs(filtered);
  //   } else {
  //     setFilteredSongs(null);
  //   }
  // }, [languageFilter]);

  return (
    
  //   <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
  //     <Header /> 

  //     {/* SEARCH SONG */}
  //     <SearchBar />

  //     {searchTerm.length > 0 && (
  //       <p className='my-4 text-base text-textColor'>
  //         Searched for :
  //         <span className='text-xl text-cartBg font-semibold'>
  //           {searchTerm}
  //         </span>
  //       </p>
  //     )}

  //     <Filter setFilteredSongs={setFilteredSongs} />

  //     <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
  //       <HomeSongContainer data={filteredSongs ? filteredSongs : allSongs} />
  //     </div>
  //   </div>
  // )
  
    <div className='Home bg-primary text-white overflow-hidden '>
              <Header />
              <Hero />
              <Experience />
              <SearchHome />
              <PremiumHome />
              <Footer />
    </div>
  )
}
// export const HomeSongContainer = ({ data }) => {
// 
//   return (
//       <div className='w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4'>
//         { data && data.map((song, i) => (
//           // <SongCard key={song._id} data={song} index={i} type="song"/>
//           <HomeSongCard key={song._id} data={song} index={i} type="song"/>
//         ))}
//       </div>
//   )
// }

// export const HomeSongCard = ({data, index ,type}) => {
//   const [{isSongPlaying, songIndex}, dispatch] = useStateValue();

//   const addToContext = () => {
//     // console.log(type);
//     if(!isSongPlaying) {
//         dispatch({
//             type : actionType.SET_ISSONG_PLAYING,
//             isSongPlaying: true
//         })
//     }
//     if(songIndex !== index) {
//         dispatch({
//             type : actionType.SET_SONG_INDEX,
//             songIndex: index
//         })
//     }
//   }
//   return (
//     <motion.div className='relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center '
//                 onClick={type === 'song' && addToContext}
//                 // NOTE: Animation 
//                 initial={{ opacity: 0, translateX: -50 }}
//                 animate={{ opacity: 1, translateX: 0 }}
//                 transition={{ duration: 0.4, delay: index * 0.15 }}
//         >
//         <div className='w-40 h-40 min-w-[160px] min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
//             <motion.img 
//                 whileHover={{scale: 1.05}}
//                 src={data.imageURL}
//                 className='w-full h-full rounded-lg object-cover'
//             />
//         </div>
//         <p className='text-lg text-center text-headingColor font-semibold my-2'>
//             {data.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}
//             {data.artist && (
//                 <span className='block text-sm text-gray-400 mt-1'>
//                     {data.artist.length > 25 ? `${data.artist.slice(0, 25)}...` : data.artist}
//                 </span>
//             )}
//         </p>
//     </motion.div>
//   )
// }
export default Home