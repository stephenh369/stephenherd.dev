import Nav from './Nav'

export default function Header() {
  return (
    <header className=" fixed top-0 left-0 z-50 w-full flex items-center justify-between py-2 px-20">
      <h1 className="py-2"><span className="text-blue-400">sh</span>.dev</h1>
      <Nav/>
    </header>
  );
}