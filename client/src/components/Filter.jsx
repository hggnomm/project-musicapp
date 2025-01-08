import React, { useEffect } from "react";
import { actionType } from "../context/reducer";
import { getAllAlbums, getAllArtists } from "../api";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FilterButtons from "./FilterButtons";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";

const Filter = ({ setFilteredSongs }) => {
  const [{ filterTerm, allArtists, allAlbums, searchTerm }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({ 
            type: actionType.SET_ARTISTS, 
            allArtists: data.artists 
        });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ 
            type: actionType.SET_ALL_ALBUMNS, 
            allAlbums: data.albums 
        });
      });
    }
  }, []);

  const updateFilter = (value) => {
    dispatch({
      type: actionType.SET_FILTER_TERM,
      filterTerm: value,
    });
  };

  const clearAllFilter = () => {
    setFilteredSongs(null);
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: "" });
    // CAREFUL: If set filterTerm is null. These songs don't appear on screen first. You must type clearAllFilter second it is working fine. ==> To fix bug: You must set initial filterTerm is null string ("").
    dispatch({ type: actionType.SET_SEARCH_TERM, searchTerm: ""})
  };
  return (
    <div className="w-full mb-4 px-6 py-4 flex items-center justify-start md:justify-center gap-24">
      <FilterButtons filterData={allArtists} flag={"Artist"} />
      <FilterButtons filterData={allAlbums} flag={"Album"} />
      <FilterButtons filterData={filterByLanguage} flag={"Language"} />
      <FilterButtons filterData={filters} flag={"Category"} />
      

      {/* <div className=" flex items-center gap-6 mx-4">
        {filters?.map((data) => (
          <p
            key={data.id}
            onClick={() => updateFilter(data.value)}
            className={`text-base ${
              data.value === filterTerm ? "font-semibold" : "font-normal"
            } text-textColor cursor-pointer hover:font-semibold transition-all duration-100 ease-in-out`}
          >
            {data.name}
          </p>
        ))}
      </div> 
      // NOTE: don't use FilterButtons. These is visible in array
      */} 

        {searchTerm.length > 0 && (<motion.i
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.5}}
          whileTap={{ scale: 0.75 }}
          onClick={clearAllFilter}
          
        >
          <MdClearAll className="text-textColor text-xl cursor-pointer" />
        </motion.i>)}
    </div>
  );
};

export default Filter;