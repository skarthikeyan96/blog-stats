import Head from 'next/head'

import type { NextPage } from 'next'
import Navbar from '../components/navbar'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Blog stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className="block px-8  py-6 rounded-lg shadow-lg bg-white max-w-md mx-auto mt-2">
        <form>
          <div className="form-group mb-6">
            <input
              type="username"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 rounded m-0"
              aria-describedby="username for dev.to"
              placeholder="Enter dev.to username"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium text-sm px-5 py-2.5 text-center mb-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
