import Image from 'next/image'
import reactSynthImg from '../public/react_synth.png'

export default function Overlay (props) {


  return (
    <>
      { props.project === 'project one' ? (
        <div className="absolute z-100 top-0 left-0 bottom-0 right-0 flex flex-col md:flex-row justify-center items-center w-100 h-100 px-10 py-20 md:p-20 bg-black bg-opacity-50">
          
          <div className="flex flex-col md:pr-8 md:py-0 py-8">
            <h1 className="pb-8">React Synth</h1>
            <p>This project was the result of my collaboration with James Clarkson (<a className='text-blue-400' href="https://www.linkedin.com/in/james-clarkson97/" target="_blank" rel="noreferrer">Linkedin</a>) during my studies at CodeClan, Edinburgh.
            <br/><br/>This is a synthesiser and sequencer web app which uses the React framework, coupled with the Tone.js library and Express/MongoDB backend. Given our 1 week deadline and being brand new to React, I think we did pretty well with this. It even supports MIDI!</p>
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