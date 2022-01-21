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
    <div id="portfolio" className="relative h-100 p-10 md:pt-20 md:pb-5 bg-gradient-to-r from-navy-500 via-navy-600 to-navy-800">

      { projectOne ? <> <Overlay project='project one'/> <button className='absolute z-101' onClick={handleProjectOne}>CLOSE</button> </> :
        projectTwo ? <> <Overlay project='project two'/> <button className='absolute z-101' onClick={handleProjectTwo}>CLOSE</button> </> :
        projectThree ? <> <Overlay project='project three'/> <button className='absolute z-101' onClick={handleProjectThree}>CLOSE</button> </> : null }
        
      <div className="flex flex-col w-100 h-full sm:h-96">
        <div className="flex flex-row justify-center pb-8">
          <h1>Portfolio</h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-evenly items-center h-full w-full py-8">

         { overlayActive() ? null : <div onClick={handleProjectOne} data-aos="flip-right" data-aos-delay="100" className="flex flex-row sm:flex-col w-full sm:h-48 sm:w-44 md:w-64 mb-4 sm:mb-0 bg-project-react border-2 border-gray-900 shadow-lg cursor-pointer">
            
            <div className="p-4">
              <Image loading="eager" className="object-contain w-full" src={reactSynthImg} alt="project 1 image"/>
            </div>

            <div className="flex flex-col w-full justify-center align-middle">
              <h4 className="pr-4 sm:pr-0 sm:pb-4 text-center text-gray-900">React Synth</h4>
            </div>

          </div> }

          { overlayActive() ? null : <div onClick={handleProjectTwo} data-aos="flip-right" data-aos-delay="500" className="flex flex-row sm:flex-col w-full sm:h-48 sm:w-44 md:w-64 bg-project-dobble border-2 border-gray-900 shadow-lg cursor-pointer">
            
            <div className="p-4">
              <Image loading="eager" className="object-contain w-full" src={dobbleImg} alt="project 2 image"/>
            </div>

            <div className="flex flex-col w-full justify-center align-middle">
              <h4 className="pr-4 sm:pr-0 sm:pb-4 text-center text-gray-900">Dobble</h4>
            </div>

          </div> }

          { overlayActive() ? null : <div onClick={handleProjectThree} data-aos="flip-right" data-aos-delay="1000" className="flex flex-row sm:flex-col w-full sm:h-48 sm:w-44 md:w-64 mt-4 sm:mt-0 bg-project-engineRoom border-2 border-gray-900 shadow-lg cursor-pointer">
            
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