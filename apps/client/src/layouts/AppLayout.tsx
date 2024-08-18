import { Link } from 'react-router-dom';

type Props = {
    children?: React.ReactNode;
    header?: React.ReactNode;
};

export default function AppLayout({ children, header }: Props) {
    return (
        <div className="max-w-7xl mx-auto py-10 pt-4 sm:pt-6 lg:pt-8 sm:px-6 lg:px-8">
            <div className="block sm:flex sm:gap-4 px-2.5 md:p-0 lg:p-0">
                <div className="text-right sm:hidden">
                    <button className="inline-flex items-center justify-center p-2 mb-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-white focus:text-gray-500 transition">
                        <svg
                            className="h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                className="inline-flex"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                            <path
                                className="hidden"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="w-full sm:w-60 h-full mb-5 md:mb-0 lg:mb-0 sm:block hidden">
                    <nav className="space-y-1" aria-label="Sidebar">
                        <Link
                            className="bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold group flex items-center px-3 py-2 text-sm rounded-md"
                            aria-current="page"
                            to="/sites">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"></path>
                            </svg>
                            <span className="truncate">Hosted Sites</span>
                        </Link>
                        <Link
                            className="text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                            to="/keys">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"></path>
                            </svg>
                            <span className="truncate">SSH Keys</span>
                        </Link>
                        <Link
                            className="text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                            to="/database">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"></path>
                            </svg>
                            <span className="truncate">Database</span>
                        </Link>
                        <Link
                            className="text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                            to="/status">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"></path>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"></path>
                            </svg>
                            <span className="truncate">Status</span>
                        </Link>
                        <Link
                            className="text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                            to="/firewall">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"></path>
                            </svg>
                            <span className="truncate">Firewall</span>
                        </Link>

                        <Link
                            className="text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                            to="/settings">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"></path>
                            </svg>
                            <span className="truncate">Settings</span>
                        </Link>
                    </nav>
                </div>
                <div className="w-full sm:w-3/4 sm:flex-1 border-gray-200 h-full ">
                    <div className="bg-white dark:bg-gray-800 sm:rounded-lg sm:shadow">
                        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                            {header && header}
                            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                                <div className="ml-4 mt-2">
                                    <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-300">
                                        Sites
                                    </h3>
                                </div>
                                <div className="ml-4 mt-2 flex-shrink-0">
                                    <button
                                        className="font-semibold focus:outline-none bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded-md px-4 py-2 text-sm inline-flex"
                                        type="button">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                            className="-ml-1 mr-2 h-5 w-5">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15"></path>
                                        </svg>
                                        Create New Site
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto md:overflow-auto lg:overflow-auto">
                            {children}

                            <table className="min-w-full divide-y dark:border-gray-800 divide-gray-200 dark:divide-gray-900">
                                <thead className="bg-gray-50 dark:bg-gray-800 dark:">
                                    <tr>
                                        <th
                                            className="px-3 py-3.5 text-left text-xs font-semibold uppercase text-gray-500"
                                            scope="col">
                                            Site
                                        </th>
                                        <th
                                            className="px-3 py-3.5 text-left text-xs font-semibold uppercase text-gray-500"
                                            scope="col">
                                            Status
                                        </th>
                                        <th
                                            className="px-3 py-3.5 text-left text-xs font-semibold uppercase text-gray-500"
                                            scope="col">
                                            PHP Version
                                        </th>
                                        <th
                                            className="px-3 py-3.5 text-left text-xs font-semibold uppercase text-gray-500"
                                            scope="col">
                                            &nbsp;
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-900">
                                    <tr className="w-full">
                                        <td className="px-3 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-4 w-4">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                        data-slot="icon"
                                                        className="text-green-500"
                                                        data-state="closed">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                                                            clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <div className="ml-2">
                                                    <a
                                                        className="text-sm font-bold text-indigo-500"
                                                        href="https://app.flywp.com/servers/3068/sites/7256">
                                                        querulous-bicycle-attain.flywp.xyz
                                                    </a>
                                                </div>
                                                <div className="h-4 w-4 ml-2">
                                                    <a
                                                        className="text-indigo-400"
                                                        href="http://querulous-bicycle-attain.flywp.xyz"
                                                        target="_blank"
                                                        title="Preview Site"
                                                        data-state="closed">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            aria-hidden="true"
                                                            data-slot="icon">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap">
                                            <span className="inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-3 py-4 text-sm dark:text-gray-300 whitespace-nowrap">
                                            <span className="flex items-center gap-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 20"
                                                    className="h-5 w-5">
                                                    <circle
                                                        cx="10"
                                                        cy="10"
                                                        r="10"
                                                        fill="#4F46E5"></circle>
                                                    <path
                                                        fill="#fff"
                                                        d="M2.986 7.595h2.471c.726.006 1.251.215 1.577.627.326.412.434.974.323 1.688a3.238 3.238 0 0 1-.286.959 2.853 2.853 0 0 1-.59.848c-.307.32-.636.523-.987.61-.35.085-.713.128-1.088.128H3.299l-.35 1.752H1.667l1.319-6.612Zm1.079 1.051-.554 2.767c.037.006.074.01.11.01h.13c.59.005 1.082-.053 1.476-.176.393-.13.658-.578.793-1.347.11-.645 0-1.017-.332-1.116-.326-.098-.735-.144-1.227-.138-.074.006-.144.01-.212.01h-.194l.01-.01Zm4.753-2.813h1.272l-.36 1.762h1.144c.627.012 1.095.141 1.402.387.314.246.406.713.277 1.402l-.618 3.071h-1.291l.59-2.933c.061-.307.043-.525-.055-.654-.099-.13-.31-.194-.637-.194l-1.024-.01-.756 3.791H7.49l1.329-6.622Zm5.102 1.762h2.471c.726.006 1.252.215 1.578.627.325.412.433.974.322 1.688a3.238 3.238 0 0 1-.286.959 2.852 2.852 0 0 1-.59.848c-.307.32-.636.523-.987.61-.35.085-.713.128-1.088.128h-1.107l-.35 1.752H12.6l1.319-6.612Zm1.079 1.051-.554 2.767c.037.006.074.01.111.01h.13c.59.005 1.081-.053 1.475-.176.393-.13.658-.578.793-1.347.11-.645 0-1.017-.332-1.116-.326-.098-.735-.144-1.227-.138-.073.006-.144.01-.212.01h-.194l.01-.01Z"></path>
                                                </svg>
                                                8.2
                                            </span>
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                <button data-state="closed">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                        data-slot="icon"
                                                        className="h-5 w-5 hover:cursor-pointer text-indigo-600">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"></path>
                                                    </svg>
                                                </button>
                                                <a
                                                    data-state="closed"
                                                    href="https://app.flywp.com/servers/3068/sites/7256/backups">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                        data-slot="icon"
                                                        className="h-5 w-5 hover:cursor-pointer text-gray-400">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"></path>
                                                    </svg>
                                                </a>
                                                <a
                                                    data-state="closed"
                                                    href="https://app.flywp.com/servers/3068/sites/7256/caching">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                        data-slot="icon"
                                                        className="h-5 w-5 hover:cursor-pointer text-gray-400">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"></path>
                                                    </svg>
                                                </a>
                                                <div
                                                    className="relative inline-block text-left"
                                                    data-headlessui-state="">
                                                    <div
                                                        className="flex items-center space-x-2"
                                                        id="headlessui-menu-button-:rl:"
                                                        aria-haspopup="menu"
                                                        aria-expanded="false"
                                                        data-headlessui-state="">
                                                        <button
                                                            className="font-semibold focus:outline-none text-gray-900 dark:text-gray-400 hover:text-gray-500 rounded px-2 py-1 text-xs flex items-center"
                                                            type="button">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                aria-hidden="true"
                                                                data-slot="icon"
                                                                className="h-5 w-5 text-gray-500">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

