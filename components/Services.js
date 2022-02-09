import Image from 'next/image'
import wordpressImg from '../public/wordpress.png'
import wooImg from '../public/woocommerce.png'
import codeImg from '../public/code.png'

export default function Services() {

  return (
    <div id="services" className="h-100 px-10 py-20 md:p-20 bg-gradient-to-r from-navy-500 via-navy-400 to-blue-800">
      <div className="flex flex-col justify-between max-w-screen-md m-auto h-96">
        <div className="flex flex-row justify-center">
          <h1>Services</h1>
        </div>
        <div className="flex justify-evenly items-end h-100">

          <div data-aos="fade-up" data-aos-anchor=".service-3" className="service-1-container w-1/3 mr-4 md:pr-12 h-100">
            <div className="service-1 flex items-center bg-blue-500 shadow-xl bg-opacity-50 h-24">
              
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="250" data-aos-anchor=".service-3" className="service-1-container w-1/3 md:px-6 h-100">
            <div className="service-2 flex items-center bg-purple-400 shadow-xl bg-opacity-50 h-48">

            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="500" className="service-1-container w-1/3 ml-4 md:pl-12 h-100">
            <div className="service-3 flex items-center bg-green-400 shadow-xl bg-opacity-50 h-64">

            </div>
          </div>

        </div>

      </div>

      <div className="flex justify-evenly items-center h-100 max-w-screen-md m-auto">

        <div data-aos="fade-up" data-aos-anchor=".service-3" className="relative w-1/3 mr-4 md:pr-12 md:pt-4 max-w-sm h-100 ">
          <Image layout="intrinsic" width={350} height={350} src={wordpressImg} alt="Wordpress Logo" />
        </div>

        <div data-aos="fade-up" data-aos-delay="250" data-aos-anchor=".service-3" className="relative w-1/3 md:px-6 md:pt-4 max-w-sm h-100">
          <Image layout="intrinsic" width={300} height={300} src={wooImg} alt="Woocommerce Logo" />
        </div>

        <div data-aos="fade-up" data-aos-delay="500" data-aos-anchor=".service-3" className="relative w-1/3 ml-4 md:pl-12 md:pt-4 max-w-sm h-100">
          <Image layout="intrinsic" width={250} height={250} src={codeImg} alt="Code Image" />
        </div>

      </div>

      <div className="flex flex-col items-center md:px-8">

        <div className="flex flex-col lg:flex-row justify-evenly items-center py-8 md:py-16 md:px-16 lg:px-8 max-w-6xl shadow-lg  bg-blue-500 bg-opacity-50 my-8">
          <div className="text-center px-16 lg:px-6">
            <Image layout="intrinsic" width={250} height={250} src={wordpressImg} alt="Wordpress Logo" />
            <h2 className="text-center pt-6 pb-2 lg:py-0"><strong>WordPress</strong></h2>
          </div>
          <p className="p-8 lg:px-8 lg:py-4">This is the ideal choice if you just want to throw up a small website quickly that advertises your business, a bit like a digital business card.  A WordPress website also comes with admin functionality so that you can potentially manage your own content! This would be ideal for writing a blog or articles.
          <br/><br/><strong>Disadvantages:</strong> WordPress doesn&apos;t come with much functionality out of the box, and relies on third party &quot;plugins&quot; to provide functionality to them. Often times these need to be updated to ensure security and stability of the website. The more plugins you add can also slow down the website which may discourage users. 
          Finally, most high-quality plugins normally come at a cost.</p>
        </div>

        <div className="flex flex-col lg:flex-row justify-evenly items-center py-16 md:px-16 lg:px-8 max-w-6xl shadow-lg bg-purple-400 bg-opacity-50">
          <div className="text-center lg:w-100 px-16 lg:px-8">
            <Image layout="intrinsic" width={200} height={200} src={wooImg} alt="Woocommerce Logo" />
            <h3 className="text-center pt-6 pb-2 lg:py-0"><strong>E-Commerce for WordPress</strong></h3>
          </div>
          <p className="p-8 lg:px-8 lg:py-4">Need an online shop? WooCommerce provides shop functionality to your WordPress website. It is one of the quickest and easiest ways to set up a shop online. The platform is highly configurable and has a lot of support from the development community. With WordPress being its own content management system, it is super easy to manage your inventory, orders, and customers.
          <br/><br/><strong>Disadvantages:</strong> These are much the same as a regular WordPress site. A lot of WooCommerce functionality comes from third party plugins at an additional cost depending on your needs. The base installation is relatively bare bones.</p>
        </div>

        <div className="flex flex-col lg:flex-row justify-evenly items-center py-16 md:px-16 lg:px-8 max-w-6xl shadow-lg bg-green-400 bg-opacity-50 mt-8">
          <div className="text-center lg:w-100 px-16 lg:px-10">
            <Image layout="intrinsic" width={200} height={200} src={codeImg} alt="html/css/js Logo" />
            <h2 className="text-center pt-12 pb-2 lg:pt-2 lg:pb-0"><strong>Custom</strong></h2>
          </div>
          <p className="p-8 lg:px-8 lg:py-4">A custom built website will be the best solution for any more specific and/or tricky requirements. It will also be the preference for those who don&apos;t want to rely on a number of third party developers to keep the sites functionality up to date. Building a website with code from scratch will also produce a website with much better performance than your average WordPress website.
          <br/><br/><strong>Disadvantages:</strong> Generally will take a bit longer to develop than a WordPress website as the code has to be written from the ground up. By default this will also not come with a CMS (Content Management System) unless requested.</p>
        </div>
      </div>

    </div>
  )
}