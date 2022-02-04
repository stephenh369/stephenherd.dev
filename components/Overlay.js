import Image from 'next/image'
import reactSynthImg from '../public/react_synth.png'

export default function Overlay (props) {


  return (
    <>
      { props.project === 'project one' ? (
        <div className="absolute z-100 top-0 left-0 bottom-0 right-0 flex flex-col md:flex-row justify-center items-center w-100 h-100 px-10 py-20 md:p-20 bg-black bg-opacity-50">
          
          <div className="flex flex-col md:pr-8 md:py-0 py-8">
            <h1 className="pb-8">PROJECT ONE OVERLAY</h1>
            <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit duis tristique sollicitudin nibh sit amet commodo nulla. Quisque non tellus orci ac auctor augue. Lacinia quis vel eros donec ac odio tempor. Facilisis leo vel fringilla est ullamcorper.</p>
          </div>

          <div data-aos="fade" data-aos-easing="ease-in-out" className="flex flex-col md:pl-4">
            <Image loading="eager" className="object-contain w-full" src={reactSynthImg} alt="project 1 image"/>
          </div>

        </div>
      ) : props.project === 'project two' ? (
        <div className="absolute z-100 top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center w-100 h-100 bg-black bg-opacity-50">
          <h1>PROJECT TWO OVERLAY</h1>
        </div> 
      ) : props.project === 'project three' ? (
        <div className="absolute z-100 top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center w-100 h-100 bg-black bg-opacity-50">
          <h1>PROJECT THREE OVERLAY</h1>
        </div>
      ) : null }
    </>
  )
}