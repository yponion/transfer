export default function Nav() {
  return (
    <header className="bg-yellow-500 z-10 fixed bottom-0 w-screen h-16 flex lg:left-0 lg:h-dvh lg:w-16 lg:flex-col lg:border-r lg:border-[rgb(217,217,217)]">
      <h1 className="max-lg:w-1/3 lg:h-16">Home</h1>
      <nav className="w-1/3">
        <ul className="flex">
          <li className="max-lg:w-1/1 lg:h-16 lg:w-16">Train</li>
        </ul>
      </nav>
      <div className="max-lg:w-1/3 lg:h-16">Setting</div>
    </header>
  );
}
