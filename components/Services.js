import Image from 'next/image'
import wordpressImg from '../public/wordpress.png'
import wooImg from '../public/woocommerce.png'
import codeImg from '../public/code.png'

export default function Services() {

  return (
    <div id="services" className="h-100 p-10 md:p-20 bg-gradient-to-r from-navy-500 via-navy-400 to-blue-800">
      <div className="flex flex-col justify-between max-w-screen-md m-auto h-96">
        <div className="flex flex-row justify-center">
          <h1>Services</h1>
        </div>
        <div className="flex justify-evenly items-end h-100">

          <div data-aos="fade-up" data-aos-anchor=".service-3" className="service-1-container w-1/3 mr-4 md:pr-12 h-100">
            <div className="service-1 flex items-center bg-blue-500 border-2 border-gray-900 bg-opacity-50 h-24">
              
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="250" data-aos-anchor=".service-3" className="service-1-container w-1/3 md:px-6 h-100">
            <div className="service-2 flex items-center bg-purple-400 border-2 border-gray-900 bg-opacity-50 h-48">

            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="500" className="service-1-container w-1/3 ml-4 md:pl-12 h-100">
            <div className="service-3 flex items-center bg-green-400 border-2 border-gray-900 bg-opacity-50 h-64">

            </div>
          </div>

        </div>

      </div>

      <div className="flex justify-evenly items-center h-100 max-w-screen-md m-auto">

        <div data-aos="fade-up" data-aos-anchor=".service-3" className="relative w-1/3 mr-4 md:pr-12 max-w-sm h-100 ">
          <Image layout="intrinsic" width={500} height={500} src={wordpressImg} alt="Wordpress Logo" />
        </div>

        <div data-aos="fade-up" data-aos-delay="250" data-aos-anchor=".service-3" className="relative w-1/3 md:px-6 max-w-sm h-100">
          <Image layout="intrinsic" width={512} height={179} src={wooImg} alt="Woocommerce Logo" />
        </div>

        <div data-aos="fade-up" data-aos-delay="500" data-aos-anchor=".service-3" className="relative w-1/3 ml-4 md:pl-12 max-w-sm h-100">
          <Image layout="intrinsic" width={388} height={227} src={codeImg} alt="Code Image" />
        </div>

      </div>

      <div>

        <div className="flex flex-col md:flex-row justify-evenly items-center py-8 md:py-16 md:px-8 border-2 border-gray-900  bg-blue-500 bg-opacity-50 my-8">
          <div className="px-16 md:px-0">
            <Image layout="intrinsic" width={250} height={250} src={wordpressImg} alt="Wordpress Logo" />
          </div>
          <p className="px-8 pb-8 md:pl-8 md:pr-0 md:pb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit duis tristique sollicitudin nibh sit amet commodo nulla. Quisque non tellus orci ac auctor augue. Lacinia quis vel eros donec ac odio tempor. Facilisis leo vel fringilla est ullamcorper.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly items-center py-8 pb-16 md:py-16 md:px-8 border-2 border-gray-900 bg-purple-400 bg-opacity-50">
          <div className="px-16 md:px-0">
            <Image layout="intrinsic" width={500} height={250} src={wooImg} alt="Woocommerce Logo" />
          </div>
          <p className="px-8 pb-8 md:pl-4 md:pr-0 md:pb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit duis tristique sollicitudin nibh sit amet commodo nulla. Quisque non tellus orci ac auctor augue. Lacinia quis vel eros donec ac odio tempor. Facilisis leo vel fringilla est ullamcorper.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly items-center py-8 pb-16 md:py-16 md:px-8 border-2 border-gray-900 bg-green-400 bg-opacity-50 mt-8">
          <div className="px-16 md:px-0">
            <Image layout="intrinsic" width={350} height={250} src={codeImg} alt="html/css/js Logo" />
          </div>
          <p className="px-8 pb-8 md:pl-8 md:pr-0 md:pb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit duis tristique sollicitudin nibh sit amet commodo nulla. Quisque non tellus orci ac auctor augue. Lacinia quis vel eros donec ac odio tempor. Facilisis leo vel fringilla est ullamcorper.</p>
        </div>
      </div>

    </div>
  )
}