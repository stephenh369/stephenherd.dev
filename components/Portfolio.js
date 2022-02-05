import Image from 'next/image'
import reactSynthImg from '../public/react_synth.png'
import dobbleImg from '../public/dobble.png'
import engineRoomImg from '../public/engine_room.png'
import React, { useEffect, useState } from 'react'
import Overlay from './Overlay'

export default function Portfolio() {

  const [projectOne, setProjectOne] = useState(false)
  const [projectTwo, setProjectTwo] = useState(false)
  const [projectThree, setProjectThree] = useState(false)

  const handleProjectOne = () => {
    if (projectOne) setProjectOne(false)
    else {
      setProjectOne(true)
      setProjectTwo(false)
      setProjectThree(false)
    }
  }
  const handleProjectTwo = () => {
    if (projectTwo) setProjectTwo(false)
    else {
      setProjectTwo(true)
      setProjectOne(false)
      setProjectThree(false)
    }
  }
  const handleProjectThree = () => {
    if (projectThree) setProjectThree(false)
    else {
      setProjectThree(true)
      setProjectOne(false)
      setProjectTwo(false)
    }
  }

  const overlayActive = () => [projectOne, projectTwo, projectThree].some((project) => project)

  useEffect(() => {
    overlayActive()
  }, [projectOne, projectTwo, projectThree])

  return (
    <div id="portfolio" className={`relative ${overlayActive() ? "h-screen" : "h-100"} px-10 pt-20 pb-40 md:py-20 bg-gradient-to-r from-navy-500 via-navy-600 to-navy-800`}>

      { projectOne ? <> <Overlay project='project one'/> <button className='absolute cursor-pointer top-16 md:top-20 left-10 md:left-20 z-101 bg-red-600 text-gray-900' onClick={handleProjectOne}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg></button> </> :
        projectTwo ? <> <Overlay project='project two'/> <button className='absolute cursor-pointer top-16 md:top-20 left-10 md:left-20 z-101' onClick={handleProjectTwo}>X</button> </> :
        projectThree ? <> <Overlay project='project three'/> <button className='absolute cursor-pointer top-16 md:top-20 left-10 md:left-20 z-101' onClick={handleProjectThree}>X</button> </> : null }

      <div className="flex flex-col w-100 h-full sm:h-96">
        <div className="flex flex-row justify-center pb-8">
          { overlayActive() ? null : <h1>Portfolio</h1> }
        </div>
        <div className="flex flex-col sm:flex-row justify-evenly items-center h-full w-full py-8">

         { overlayActive() ? null : <div onClick={handleProjectOne} data-aos="flip-right" data-aos-delay="100" className="flex flex-row sm:flex-col w-full sm:mr-8 sm:h-42 md:h-48 sm:w-44 md:w-64 mb-4 sm:mb-0 bg-project-react border-2 border-gray-900 shadow-lg cursor-pointer">
            
            <div className="p-4">
              <Image loading="eager" className="object-contain w-full" src={reactSynthImg} alt="project 1 image"/>
            </div>

            <div className="flex flex-col w-full justify-center align-middle">
              <h4 className="pr-4 sm:pr-0 sm:pb-4 text-center text-gray-900">React Synth</h4>
            </div>

          </div> }

          { overlayActive() ? null : <div onClick={handleProjectTwo} data-aos="flip-right" data-aos-delay="500" className="flex flex-row sm:flex-col w-full sm:h-42 md:h-48 sm:w-44 md:w-64 bg-project-dobble border-2 border-gray-900 shadow-lg cursor-pointer">
            
            <div className="p-4">
              <Image loading="eager" className="object-contain w-full" src={dobbleImg} alt="project 2 image"/>
            </div>

            <div className="flex flex-col w-full justify-center align-middle">
              <h4 className="pr-4 sm:pr-0 sm:pb-4 text-center text-gray-900">Dobble</h4>
            </div>

          </div> }

          { overlayActive() ? null : <div onClick={handleProjectThree} data-aos="flip-right" data-aos-delay="1000" className="flex flex-row sm:flex-col w-full sm:ml-8 sm:h-42 md:h-48 sm:w-44 md:w-64 mt-4 sm:mt-0 bg-project-engineRoom border-2 border-gray-900 shadow-lg cursor-pointer">
            
            <div className="p-4">
              <Image loading="eager" className="object-contain w-full" src={engineRoomImg} alt="project 3 image"/>
            </div>

            <div className="flex flex-col w-full justify-center align-middle">
              <h4 className="pr-4 sm:pr-0 sm:pb-4 text-center text-gray-900">The Engine Room</h4>
            </div>

          </div> }

        </div>
      </div>
    </div>
  )
}