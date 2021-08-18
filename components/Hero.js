import Typewriter from './Typewriter'

export default function Hero() {

  return (
    <div className="bg-hero bg-cover bg-center bg-no-repeat bg-blue-900 bg-opacity-50 bg-blend-overlay h-screen w-full flex items-center">
      <div data-aos="fade-up" data-aos-delay="500" className="mx-8 md:mx-16 p-4 rounded shadow-lg bg-gray-900 bg-opacity-50">
        <h1 className="pt-2 pb-16 xs:pb-4">Stephen Herd - Web Developer</h1>
        <Typewriter/>
      </div>
    </div>
  )
}
