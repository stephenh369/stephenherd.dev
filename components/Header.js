import Nav from './Nav'

export default function Header() {
  return (
    <header className="flex items-center justify-between py-2">
      <h1 className="py-2"><span className="text-blue-400">sh</span>.dev</h1>
      <Nav/>
    </header>
  );
}