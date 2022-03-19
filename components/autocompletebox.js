import { Fragment, useState } from 'react';
import { Combobox, Transition, Tab } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export default function AutocompleteBox() {
  const [selected, setSelected] = useState();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const tabs = ['Suggestions', 'Records'];

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  const autocomplete = async (query) => {
    setQuery(query);
    setSearchResults(
      await (await fetch('/api/autocomplete?query=' + query)).json()
    );
  };

  return (
    <div className="max-w-xl lg:max-w-5xl mx-auto px-4 py-[5vh]">
      <h1 className="text-5xl text-indigo-100 text-center mb-6">
        Autocomplete
      </h1>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-5">
          <Tab.Panel>
            <Combobox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <div className="relative w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                  <Combobox.Input
                    className="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                    defaultValue={query}
                    displayValue={(result) => result.suggest}
                    onChange={(event) => autocomplete(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  // afterLeave={() => setQuery('')}
                >
                  <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {searchResults &&
                    searchResults.suggestions &&
                    searchResults.suggestions.length === 0 &&
                    query !== '' ? (
                      <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      searchResults &&
                      searchResults.suggestions &&
                      searchResults.suggestions.map((result, index) => (
                        <Combobox.Option
                          key={index}
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? 'text-white bg-slate-600'
                                : 'text-gray-900'
                            }`
                          }
                          value={result}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                                dangerouslySetInnerHTML={{
                                  __html: result.displaySuggest,
                                }}
                              ></span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-teal-600'
                                  }`}
                                >
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </Tab.Panel>
          <Tab.Panel>
            <div className="relative mt-1">
              <input
                className="w-full border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                defaultValue={query}
                onChange={(event) => autocomplete(event.target.value)}
              />

              <div className=" rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 mt-2">
                <div className="relative rounded-lg grid gap-8 bg-white p-7 lg:grid-cols-2">
                  {searchResults &&
                  searchResults.records &&
                  searchResults.records.length === 0 &&
                  query !== '' ? (
                    <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    searchResults &&
                    searchResults.records &&
                    searchResults.records.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        rel="noreferrer"
                        target="_blank"
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 cursor-pointer"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                          <img src={item.image} />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">{item.price}</p>
                        </div>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
