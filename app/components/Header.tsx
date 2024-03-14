'use client';

interface Props {
    showNav: Boolean,
    headerBackgroundColor?: string,
    headerTitle?: string
}

const Header = (props: Props) => {
    const showNav = props.showNav
    const headerBackgroundColor = props.headerBackgroundColor;
    const headerTitle = props.headerTitle ?? "";

    return (
        <div className="bg-primary" style={{backgroundColor: headerBackgroundColor, minHeight: "80px"}}>
            <div className="flex justify-center items-center">
                {/* <Image
                    className="float-left w-4/6"
                    src="/logo.png"
                    height="450"
                    width="450"
                    alt={''} /> */}
                <span className={"headerTitle"}>{headerTitle}</span>
            </div>

            {/* Nav bar */}
            {showNav && (
                <nav className="col-span-3 bg-primary border-gray-200 dark:border-gray-600 dark:bg-gray-900">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-8">
                        <button data-collapse-toggle="mega-menu-full" type="button"
                                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="mega-menu-full" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                      clip-rule="evenodd"></path>
                            </svg>
                        </button>
                        <div id="mega-menu-full"
                             className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                            <ul className="flex flex-col font-medium md:flex-row md:space-x-8 md:mt-0">
                                <li>
                                    <button id="mega-menu-full-dropdown-button"
                                            data-collapse-toggle="mega-menu-full-dropdown"
                                            className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-50 border-b md:w-auto hover:bg-gray-200 hover:text-primary">Money
                                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button id="mega-menu-full-dropdown-button"
                                            data-collapse-toggle="mega-menu-full-dropdown"
                                            className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-50 border-b md:w-auto hover:bg-gray-200 hover:text-primary">Energy
                                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button id="mega-menu-full-dropdown-button"
                                            data-collapse-toggle="mega-menu-full-dropdown"
                                            className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-50 border-b md:w-auto hover:bg-gray-200 hover:text-primary">Mobile
                                        Phones
                                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button id="mega-menu-full-dropdown-button"
                                            data-collapse-toggle="mega-menu-full-dropdown"
                                            className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-50 border-b md:w-auto hover:bg-gray-200 hover:text-primary">Insurance
                                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </button>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>)}
        </div>
    )
}

export default Header