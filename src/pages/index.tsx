import Head from 'next/head'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import Navbar from '../components/navbar'
import type { NextPage } from 'next'
import { getYears } from '../../lib'

const Home: NextPage = () => {
  const initialYear = new Date().getFullYear() - 1

  const [selectedYear, setSelectedYear] = useState(initialYear)

  return (
    <div>
      <Head>
        <title>Blog stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className="block px-8 py-6 rounded-lg shadow-md bg-white max-w-md mx-auto mt-2">
        <form>
          <div className="form-group mb-4">
            <input
              type="username"
              className="border border-gray-300 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left sm:text-sm"
              aria-describedby="username for dev.to"
              placeholder="Enter dev.to username"
            />
          </div>

          <Listbox value={selectedYear} onChange={setSelectedYear}>
            <div className="relative mb-4">
              <Listbox.Button className="border border-gray-300 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left  sm:text-sm">
                <span className="block truncate">{selectedYear}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {getYears().map((year) => (
                    <Listbox.Option
                      key={year}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={year}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {year}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          <button
            type="submit"
            className="w-full rounded-lg text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium text-sm px-5 py-2.5 text-center mb-2"
          >
            Generate Card
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
