import Image from 'next/image'
import aboutImg from '../public/about.jpg'

export default function About() {
  return (
    <div className="h-100 p-10 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 flex items-center flex-col">
      <div className="bg-gray-200 overflow-hidden shadow-lg rounded">
        <Image className="object-contain py-4 w-full" src={aboutImg} alt="about image"/>
        <div className="py-4 px-6">
          <h2 className="py-4 text-gray-700">About Me</h2>
          <p className="text-gray-700 font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit duis tristique sollicitudin nibh sit amet commodo nulla. Quisque non tellus orci ac auctor augue. Lacinia quis vel eros donec ac odio tempor. Facilisis leo vel fringilla est ullamcorper.</p>  
        </div>
        <div className="py-8 px-6">
          <span className="inline-block bg-gray-400 bg-opacity-70 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#JavaScript</span>
          <span className="inline-block bg-gray-400 bg-opacity-70 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#React</span>
          <span className="inline-block bg-gray-400 bg-opacity-70 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Vue.js</span>
          <span className="inline-block bg-gray-400 bg-opacity-70 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#WordPress</span>
        </div>
      </div>
    </div>
  );
}