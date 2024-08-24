import LayoutLink from '@/components/LayoutLink';

type Props = {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    actions?: React.ReactNode;
};

export default function AppLayout({ children, actions, title }: Props) {
    return (
        <div className="block sm:flex sm:gap-4 px-2.5 md:p-0 lg:p-0">
            <div className="text-right sm:hidden">
                <button className="inline-flex items-center justify-center p-2 mb-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-white focus:text-gray-500 transition">
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
                    <LayoutLink to="/sites">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="group-[active]:text-indigo-600 group-[active]:dark:text-indigo-400 flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"></path>
                        </svg>
                        <span className="truncate">Hosted Sites</span>
                    </LayoutLink>
                    <LayoutLink to="/keys">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="group-[active]:text-indigo-600 group-[active]:dark:text-indigo-400 flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"></path>
                        </svg>
                        <span className="truncate">SSH Keys</span>
                    </LayoutLink>
                    <LayoutLink to="/database">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="group-[active]:text-indigo-600 group-[active]:dark:text-indigo-400 flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"></path>
                        </svg>
                        <span className="truncate">Database</span>
                    </LayoutLink>
                    <LayoutLink to="/status">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="group-[active]:text-indigo-600 group-[active]:dark:text-indigo-400 flex-shrink-0 -ml-1 mr-3 h-6 w-6">
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
                    </LayoutLink>
                    <LayoutLink to="/firewall">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="group-[active]:text-indigo-600 group-[active]:dark:text-indigo-400 flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"></path>
                        </svg>
                        <span className="truncate">Firewall</span>
                    </LayoutLink>

                    <LayoutLink to="/settings">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="group-[active]:text-indigo-600 group-[active]:dark:text-indigo-400 flex-shrink-0 -ml-1 mr-3 h-6 w-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"></path>
                        </svg>
                        <span className="truncate">Settings</span>
                    </LayoutLink>
                </nav>
            </div>

            <div className="w-full sm:w-3/4 sm:flex-1 border-gray-200 h-full ">
                <div className="bg-white dark:bg-gray-800 sm:rounded-lg sm:shadow">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-2">
                                <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-300">
                                    {title}
                                </h3>
                            </div>
                            <div className="ml-4 mt-2 flex-shrink-0">{actions && actions}</div>
                        </div>
                    </div>
                    <div className="overflow-x-auto md:overflow-auto lg:overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

