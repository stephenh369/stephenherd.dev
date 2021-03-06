export default function Contact() {


  return (
    <div id="contact" className="h-100 px-10 py-20 md:p-20 bg-indigo-700">
      <div className="w-full h-full max-w-6xl flex flex-col m-auto">
        <div className="flex flex-col text-center justify-center pb-8">
          <h1>Contact</h1>
        </div>
        <form
          className="pt-8"
          name="contact-form"
          method="POST"
          action="/success"
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact-form" />
          <div className="grid grid-cols-2 gap-4 w-full">
            <p className="hidden">
              <input name="bot-field" />
            </p>
            <label className="pb-8" htmlFor="name">Name: </label>
            <input className="bg-indigo-700 border-b-2 mb-8" id="name" name="name" required type="text"/>

            <label htmlFor="email">E-mail Address: </label>
            <input className="bg-indigo-700 border-b-2"  id="email" type="email" name="email" required />

            <label className="pt-8" htmlFor="message">Message: </label>
            <textarea className="bg-indigo-700 border-2 mt-8"  id="message" name="message" required ></textarea>
          </div>

          <div className="flex justify-center w-full pt-16">
            <button className="bg-blue-400 text-gray-900 border-2 border-gray-900 py-8 px-24" type="submit">Submit</button>
          </div>

          <div className="flex justify-center md:justify-end align-middle pt-8">
            <a href="mailto:contact@stephenherd.dev" target="_blank" rel="noreferrer">You can also email me directly at <span className="text-blue-400">contact@stephenherd.dev</span></a>
          </div>
  
        </form>
      </div>
      
    </div>
  )
}