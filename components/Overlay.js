import Image from 'next/image'
import reactSynthImg from '../public/react_synth.png'
import dobbleImg from '../public/dobble.png'

export default function Overlay (props) {


  return (
    <>
      { props.project === 'project one' ? (
        <div className="absolute z-100 top-0 left-0 bottom-0 right-0 flex flex-col md:flex-row justify-center items-center w-100 h-100 px-10 py-20 md:p-20 bg-black bg-opacity-50">
          
          <div className="flex flex-col md:pr-8 md:py-0 py-8">
            <div className="flex flex-row items-end">
              <h1 className="pb-4 pr-4">React Synth</h1>
              <a className="text-center mb-4 border-2 border-blue-400 hover:text-blue-400 w-32" href="https://react-synth-app.herokuapp.com/" target="_blank" rel="noreferrer"><h3>Try it Here!</h3></a>
            </div>

            <p>This project was the result of my collaboration with James Clarkson (<a className='text-blue-400' href="https://www.linkedin.com/in/james-clarkson97/" target="_blank" rel="noreferrer">Linkedin</a>) during my studies at CodeClan, Edinburgh.
            <br/><br/>This is a synthesiser and sequencer web app which uses the React framework, coupled with the Tone.js library and Express/MongoDB backend. Given our 1 week deadline and being brand new to React, I think we did pretty well with this. It even supports MIDI!</p>
          </div>

          <div data-aos="fade" data-aos-easing="ease-in-out" className="flex flex-col md:pl-4">
            <Image loading="eager" className="object-contain w-full" src={reactSynthImg} alt="project 1 image"/>
          </div>

        </div>
      ) : props.project === 'project two' ? (
        <div className="absolute z-100 top-0 left-0 bottom-0 right-0 flex flex-col md:flex-row justify-center items-center w-100 h-100 px-10 py-20 md:p-20 bg-black bg-opacity-50">
          
          <div className="flex flex-col md:pr-8 md:py-0 py-8">
            <div className="flex flex-row items-end">
              <h1 className="pb-4 pr-4">Dobble</h1>
              <a className="text-center mb-4 border-2 border-blue-400 hover:text-blue-400 w-32" href="https://dobble-online.herokuapp.com/" target="_blank" rel="noreferrer"><h3>Try it Here!</h3></a>
            </div>

            <p>This project was a result of the joint effort between myself, Tomek Nawrocki (<a className='text-blue-400' href="https://www.linkedin.com/in/t-nawrocki/" target="_blank" rel="noreferrer">Linkedin</a>), 
            Helena Kolberg (<a className='text-blue-400' href="https://www.linkedin.com/in/helena-kolberg/" target="_blank" rel="noreferrer">Linkedin</a>) and Rudolf Zachar (<a className='text-blue-400' href="https://www.linkedin.com/in/rudolf-zachar/" target="_blank" rel="noreferrer">Linkedin</a>).
            <br/><br/>This is a browser game adaption of the popular family card game Dobble (Spot It! in US). The player must match the symbols on both cards as quickly as possible before the time expires. It was built in a week during my studies at CodeClan, using a combination of Vue.js, Express and MongoDB.</p>
          </div>

          <div data-aos="fade" data-aos-easing="ease-in-out" className="flex flex-col md:pl-4">
            <Image loading="eager" className="object-contain w-full" src={dobbleImg} alt="project 2 image"/>
          </div>

        </div>
      ) : props.project === 'project three' ? (
        <div className="absolute z-100 top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center w-100 h-100 bg-black bg-opacity-50">
          <h1>PROJECT THREE OVERLAY</h1>
        </div>
      ) : null }
    </>
  )
}