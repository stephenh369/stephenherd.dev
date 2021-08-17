import Image from 'next/image'
import aboutImg from '../public/about.jpg'

export default function About() {
  return (
    <div className="h-1/2 px-10 bg-blue-900 flex items-center flex-col">
      <h1>About Me</h1>
      <Image className="object-contain py-4" src={aboutImg} alt="about image"/>
      <p>This section is all about me.</p>
    </div>
  );
}