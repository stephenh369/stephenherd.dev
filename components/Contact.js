export default function Contact() {


  return (
    <div id="contact" className="h-100 p-10 md:p-20 bg-indigo-700">
      <div className="w-full h-full">
        <div className="flex flex-col text-center justify-center pb-8">
          <h1>Contact</h1>
        </div>
        <form
          className="pt-8"
          name="contact-form"
          method="POST"
          action="contact/?success=true"
        >
          <div className="grid grid-cols-2 gap-4 w-full">
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
  
        </form>
      </div>
      
    </div>
  )
}