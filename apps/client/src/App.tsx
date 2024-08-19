import Index from './pages/Index';
import XTerminal from './pages/XTerminal';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        Component: XTerminal
    },
    {
        path: '/dashboard',
        Component: Index
    }
]);

export default function App() {
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}
