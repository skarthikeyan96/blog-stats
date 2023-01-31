import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 flex items-center">
      <div className="mx-auto w-full px-8 py-6 flex items-center justify-between text-white">
        <div>
          <Link href="/" className="text-lg text-white font-medium">
            Blog Stats
          </Link>
        </div>

        <ul className="flex space-x-4">
          <li>
            <Link href="/"> Dev.to </Link>
          </li>

          <li>
            <Link href="/hashnode"> Hashnode </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
