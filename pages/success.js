export default function Success() {
  return (
    <div id="success" className="h-100 px-10 py-20 md:p-20 bg-indigo-700">
      <div className="w-full h-full">
        <div className="flex flex-col text-center justify-center pb-8">
          <h1>Success</h1>
        </div>
        <div className="flex flex-col text-center justify-center pt-8">
          <p>Your message has been sent! I will get back to you as soon as possible.</p>
        </div>
      </div>
    </div>
  )
}