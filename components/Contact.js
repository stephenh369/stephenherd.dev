export default function Contact() {


  return (
    <div id="contact" className="h-100 p-10 md:p-20">
      <div className=" h-full">
        <div className="flex flex-col text-center justify-center">
          <h1>Contact</h1>
        </div>
        <form
          className="pt-8"
          name="contact-form"
          method="POST"
          action="contact/?success=true"
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            <label htmlFor="name">Name: </label>
            <input id="name" name="name" required type="text"/>

            <label htmlFor="email">E-mail Address: </label>
            <input id="email" type="email" name="email" required />

            <label htmlFor="message">Message: </label>
            <textarea id="message" name="message" required ></textarea>
          </div>

          <div className="flex justify-center w-full pt-8">
            <button type="submit">Submit</button>
          </div>
  
        </form>
      </div>
      
    </div>
  )
}