import React, { useEffect, useState } from 'react'
import { useStateValue} from '../context/StateProvider'
import { motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'
import moment from 'moment'
import { changingUserRole, getAllUsers, removeUser } from '../api'
import { actionType } from '../context/reducer'

// NOTE: DashboardUserCard is not main component in here
export const DashboardUserCard = ({ data, index }) => {
  // console.log(data, index);
  const [{ user, allUsers }, dispatch ] = useStateValue();
  const [isUserRoleUpdate, setisUserRoleUpdate] = useState(false);
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");
  const [isDelete, setIsDelete] = useState(false)

  const updateUserRole = (userId, role) => {
    setisUserRoleUpdate(false);

    changingUserRole(userId, role).then(res => {
      if(res) {
        getAllUsers().then(data => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data
          })
        })
      }
    }) 
    // console.log(userId, role)
  }

  const deleteUser = (userId) => {
    removeUser(userId).then(res => {
      if(res) {
        getAllUsers().then(data => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data
          })
        })
      }
    })
  }
  // NOTE: Use momentJS package convert column createdAt (2022-11-02T10:14:52.865Z) to day-month-year ... and other options more

  return (
    <motion.div key={index} className='relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md'>
      
      {
        data._id !== user?.user._id && (
          <motion.div 
              whileTap={{scale: 0.75}} 
              className='absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200' 
              onClick={() => setIsDelete(true)}
          >
              {/* onClick={() => deleteUser(data._id)}> */}
              <MdDelete className='text-xl text-red-400 hover:text-red-700'/>
          </motion.div>
        )
      }

        

      {/* user image */}
      <div className='w-275 min-w-[160px] flex items-center justify-center'>
        <img src={data.imageURL} referrerPolicy='no-referrer' alt="" className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md'/>
      </div>

      {/* user information */}
      <div className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.name}</div>
      <div className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.email}</div>
      <div className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.email_verified ? "True" : "False"}</div>
      <div className='text-base text-textColor w-275 min-w-[160px] text-center'>{createdAt}</div>

      <div className='w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative'>
        {
          (data._id === user?.user?._id) 
          ? <p className='text-lg text-sky-800 font-bold uppercase  text-center'>{data.role}</p>
          : <p className='text-base text-textColor text-center'>{data.role}</p> 
        }

        {
          data._id !== user?.user?._id && (
          <motion.p whileTap={{ scale: 0.75 }} onClick={() => setisUserRoleUpdate(true)} className='text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md'>
            {data.role === "admin" ? "Member" : "Admin"}
          </motion.p>
          )
        }

        {isUserRoleUpdate && (
            <motion.div 
              initial={{opacity: 0, scale: 0.5}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.5}}
              className='absolute z-10 top-6 right-4 p-4 flex items-center flex-col gap-4 bg-white shadow-lg rounded-md'>
              
              <p className='text-textColor text-[12px] font-semibold'>Are you sure, do you want to mark the user as <span>{data.role === "admin" ? "Member" : "Admin"}</span></p>

              <div className='flex items-center gap-4'>
                <motion.button  whileTap={{ scale: 0.75 }} className='outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md' 
                  onClick={() => updateUserRole(data._id, data.role ==="admin" ? "member" : "admin")}>
                  Yes
                </motion.button>
                <motion.button onClick={() => setisUserRoleUpdate(false)} whileTap={{ scale: 0.75 }} className='outline-none border-none text-sm px-4 py-1 rounded-md bg-red-200 text-black hover:shadow-md'>
                  No
                </motion.button>
              </div>
            </motion.div>
        )}
      </div>
      {isDelete && (
            <motion.div className='absolute w-full inset-0 backdrop-blur-sm bg-cardOverlay flex items-center flex-col justify-center px-4 py-2'
                initial= {{opacity : 0}}
                animate= {{opacity : 1,}}
            >
                <p className='text-lg text-headingColor font-semibold text-center'>Are you sure do you want to delete it?</p>
                <div className='flex item-center gap-4 mt-2'>
                    <motion.button className='px-2 py-1 text-sm uppercase bg-green-300 rounded-lg'
                        whileTap={{scale: 0.7}}
                        whileHover={{ scale: 1.3 }}
                        onClick={() => deleteUser(data._id)}
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
const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();
  
  useEffect(() => {
    if(!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data
        })
      })
    }
  }, [])
  return (
    <div className='w-full p-4 flex flex-col items-center justify-center '>
      {/* filters */}

      {/* tabular data form */}
      <div className='relative w-full py-12 min-h-[400px] overflow-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3'>
        {/* total count of the user */}
        <div className='absolute top-4 left-4 '>
          <p className='text-sm font-semibold'>
            Count: <span className='text-xl font-bold text-textColor'>{allUsers?.length}</span>
          </p>
        </div>

        
        {/* table data */}
        <div className='w-full min-w-[750px] flex items-center justify-between'>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Image</p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Name</p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Email</p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Verified</p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Created</p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Role</p>
        </div>

        {/* Table body content */}
        {
          allUsers && (
            allUsers?.map((data, i) => (
                <DashboardUserCard data={data} key={i} index={i}/>
            ))
          )
        }
      </div>
    </div>
  )
}


export default DashboardUsers