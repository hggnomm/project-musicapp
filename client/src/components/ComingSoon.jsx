import React from 'react'
import Header from './Header'

const ComingSoon = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
      <div className="flex flex-col h-screen bg-center bg-cover bg-no-repeat bg-gray-100">
        <Header />
        <div className="grid place-items-center w-4/5 mx-auto p-10 my-20 sm:my-auto bg-white-600 border-4 border-indigo-600 bg-opacity-70 rounded-xl shadow-2xl space-y-5 text-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-24 w-24 text-indigo-600" viewBox="0 0 16 16">
            <path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75zM7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116z"/>
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z"/>
            </svg>
            
            <h1 className="text-4xl font-bold uppercase text-indigo-600 transition duration-500">Coming Soon</h1>
            <h2 className="text-xl text-gray-700 transition duration-500">We are almost there to introduce our new <a className="hover:underline" href="https://www.emojimania.org">emoji</a> website to the world, in the meantime, you can follow us on social networks to get the latest updates.</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
                <a href="https://www.facebook.com/hg.nomm453" title="Quicktoolz On Facebook"
                className="md:w-32 tracking-wide font-bold rounded border-2 border-indigo-500 hover:text-white hover:border-blue-600 hover:bg-blue-600 shadow-md py-2 px-6 inline-flex items-center transition duration-500"
                target="_blank">
                <span className="mx-auto">Facebook</span>
                </a>
            
            
                <a href="https://twitter.com/hg_nomm453" title="Quicktoolz On Twitter"
                className="md:w-32 tracking-wide font-bold rounded border-2 border-indigo-500 hover:text-white hover:border-blue-500 hover:bg-blue-500 shadow-md py-2 px-6 inline-flex items-center transition duration-500"
                target="_blank">
                <span className="mx-auto">Twitter</span>
                </a>
            
            
                <a href="https://github.com/namtran0787" title="Quicktoolz On Pinterest"
                className="md:w-32 tracking-wide font-bold rounded border-2 border-indigo-500 hover:text-white hover:border-red-600 hover:bg-red-600 shadow-md py-2 px-6 inline-flex items-center transition duration-500"
                target="_blank">
                <span className="mx-auto">Github</span>
                </a>
            
            
                <a href="https://www.instagram.com/hg.nomm453/" title="Quicktoolz On Facebook"
                className="md:w-32 tracking-wide font-bold rounded border-2 border-indigo-500 hover:text-white hover:border-yellow-600 hover:bg-yellow-600 shadow-md py-2 px-6 inline-flex items-center transition duration-500"
                target="_blank">
                <span className="mx-auto">Instagram</span>
                </a>
            
            </div>
		</div>
	  </div>
    </div>
  )
}

export default ComingSoon