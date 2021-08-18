import Image from 'next/image'
import aboutImg from '../public/about.jpg'

export default function About() {

  return (
    <div id="about" className="h-100 p-10 md:p-20 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-800 flex items-center flex-col">
      <div data-aos="fade-up" data-aos-easing="ease-in-out" className="bg-gray-200 overflow-hidden shadow-lg rounded sm:flex sm:flex-row md:max-h-96 md:max-w-3xl">
        <Image className="object-contain sm:object-cover py-4 w-full" src={aboutImg} alt="about image"/>
        <div className="flex flex-col justify-center py-4 sm:py-8 md:py-10 px-6">
          <h2 className="py-4 sm:pb-4 sm:pt-0 text-gray-700">About Me</h2>
          <p className="text-gray-700 font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit duis tristique sollicitudin nibh sit amet commodo nulla. Quisque non tellus orci ac auctor augue. Lacinia quis vel eros donec ac odio tempor. Facilisis leo vel fringilla est ullamcorper.</p>  
        </div>
        <div className="sm:flex sm:flex-col sm:justify-center py-8 sm:py-6 px-6">
          <span className="inline-block bg-gray-400 bg-opacity-70 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#JavaScript</span>
          <span className="inline-block bg-gray-400 bg-opacity-70 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#React</span>
          <span className="inline-block bg-gray-400 bg-opacity-70 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Vue.js</span>
          <span className="inline-block bg-gray-400 bg-opacity-70 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#WordPress</span>
        </div>
      </div>
    </div>
  );
}