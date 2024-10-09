import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Job Application Tracker</h1>
        <nav>
          <Link href="/">
            <a className="mr-4">Home</a>
          </Link>
          <Link href="/applications">
            <a>Applications</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;