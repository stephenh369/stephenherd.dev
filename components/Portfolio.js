import Image from 'next/image'
import reactSynthImg from '../public/react_synth.png'
import dobbleImg from '../public/dobble.png'
import engineRoomImg from '../public/engine_room.png'

export default function Portfolio() {

  return (
    <div id="portfolio" className="h-100 p-10 md:pt-20 md:pb-5 bg-gradient-to-r from-navy-500 via-navy-600 to-navy-800">
      <div className="flex flex-col w-100 h-full sm:h-96">
        <div className="flex flex-row justify-center">
          <h1>Portfolio</h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-evenly items-center h-full w-full py-8">

          <div data-aos="flip-right" data-aos-delay="100" className="flex flex-row sm:flex-col w-full sm:h-48 sm:w-44 md:w-64 mb-4 sm:mb-0 bg-project-react shadow-lg cursor-pointer">
            
            <div className="p-4">
              <Image loading="eager" className="object-contain w-full" src={reactSynthImg} alt="project 1 image"/>
            </div>

            <div className="flex flex-col w-full justify-center align-middle">
              <h4 className="pr-4 sm:pr-0 sm:pb-4 text-center text-gray-900">React Synth</h4>
            </div>

          </div>

          <div data-aos="flip-right" data-aos-delay="500" className="flex flex-row sm:flex-col w-full sm:h-48 sm:w-44 md:w-64 bg-project-dobble shadow-lg cursor-pointer">
            
            <div className="p-4">
              <Image loading="eager" className="object-contain w-full" src={dobbleImg} alt="project 2 image"/>
            </div>

            <div className="flex flex-col w-full justify-center align-middle">
              <h4 className="pr-4 sm:pr-0 sm:pb-4 text-center text-gray-900">Dobble</h4>
            </div>

          </div>

          <div data-aos="flip-right" data-aos-delay="1000" className="flex flex-row sm:flex-col w-full sm:h-48 sm:w-44 md:w-64 mt-4 sm:mt-0 bg-project-engineRoom shadow-lg cursor-pointer">
            
            <div className="p-4">
              <Image loading="eager" className="object-contain w-full" src={engineRoomImg} alt="project 3 image"/>
            </div>

            <div className="flex flex-col w-full justify-center align-middle">
              <h4 className="pr-4 sm:pr-0 sm:pb-4 text-center text-gray-900">The Engine Room</h4>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}