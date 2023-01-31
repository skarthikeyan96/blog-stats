import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios'

import Navbar from '../components/navbar'
import type { NextPage } from 'next'
import { getYears } from '../../helper'
import themes from '../themes'

const HashnodeStats = () => {
  const initialYear = new Date().getFullYear() - 1
  const [selectedYear, setSelectedYear] = useState(initialYear)
  const [username, setUsername] = useState('imkarthikeyans')
  const [selectedTheme, setSelectedTheme] = useState('default')
  const [svgResponse, setSvgResponse] = useState('')
  const [copy, setCopied] = useState(false)
  const themeKeys = Object.keys(themes)
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/hashnode?username=${username}&year=${selectedYear}&theme=${selectedTheme}`

  const readmeText = `![blogStatsImage](${url})`

  const fetchSvg = async () => {
    const response = await axios.get(url)
    //https://stackoverflow.com/questions/23223718/failed-to-execute-btoa-on-window-the-string-to-be-encoded-contains-characte
    const base64 = btoa(unescape(encodeURIComponent(response.data)))
    const svgUrl = 'data:image/svg+xml;base64,' + base64
    setSvgResponse(svgUrl)
  }

  useEffect(() => {
    fetchSvg()
  }, [selectedTheme])

  return (
    <div>
      <Head>
        <title>Hashnode Blog stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex px-8 py-6 items-start justify-center space-x-8 pt-20">
        <div className="px-8 py-6 rounded-lg shadow-md bg-white mt-2 max-w-xl w-full border">
          <div className="form-group mb-4">
            <label
              htmlFor="email_address"
              className="form-label inline-block mb-2 sm:text-sm text-gray-700"
            >
              Hashnode username
            </label>

            <input
              type="username"
              value={username}
              className="border border-gray-300 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left sm:text-sm"
              aria-describedby="username for dev.to"
              placeholder="Enter dev.to username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <label
            htmlFor="year"
            className="form-label inline-block mb-2 sm:text-sm text-gray-700"
          >
            Year
          </label>
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
                <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
            onClick={() => fetchSvg()}
            className="w-full rounded-lg text-white bg-gradient-to-br from-pink-500 to-orange-400  font-medium text-sm px-5 py-2.5 text-center mb-2"
          >
            Generate Card
          </button>

          <div className="mt-4">
            <label
              htmlFor="year"
              className="form-label inline-block mb-2 sm:text-sm text-gray-700"
            >
              Select Theme
            </label>
            <Listbox value={selectedTheme} onChange={setSelectedTheme}>
              <div className="relative mb-4">
                <Listbox.Button className="border border-gray-300 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left  sm:text-sm">
                  <span className="block truncate">{selectedTheme}</span>
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
                    {themeKeys.map((theme) => (
                      <Listbox.Option
                        key={theme}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? 'bg-amber-100 text-amber-900'
                              : 'text-gray-900'
                          }`
                        }
                        value={theme}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {theme}
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
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-auto px-8 py-6 max-w-xl rounded-lg shadow-md bg-white  mt-2 bg-gradient-to-br from-pink-500 to-orange-400">
            <img
              src={svgResponse}
              className="w-full max-w-full h-auto border justify-center items-center"
            />
          </div>
          <input className="mt-4 border w-full py-2 px-4" value={readmeText} />
          <button
            className="mt-4 py-2 px-4 w-full rounded bg-blue-500 text-white"
            onClick={async () => {
              await navigator.clipboard.writeText(readmeText)
              setCopied(!copy)
            }}
          >
            {!copy ? 'Copy to Clipboard' : 'Copied'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default HashnodeStats
