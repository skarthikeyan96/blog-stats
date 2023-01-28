import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto w-full px-8 py-6 flex items-center justify-between">
        <div>
          <Link href="/" className="text-lg text-white font-medium">
            Blog Stats
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
