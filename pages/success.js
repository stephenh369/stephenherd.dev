import Link from "next/link"

export default function Success() {
  return (
    <div id="success" className="h-screen px-10 py-20 md:p-20 bg-indigo-700">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex flex-col text-center justify-center pb-8">
          <h1>Success</h1>
        </div>
        <div className="flex flex-col text-center justify-center pt-8">
          <p className="pb-8">Your message has been sent! I will get back to you as soon as possible.</p>
          <Link href="/"><a className="border-2 border-blue-400 hover:text-blue-400 nav-btn">Back</a></Link>
        </div>
      </div>
    </div>
  )
}