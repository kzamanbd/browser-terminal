import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Terminal from './pages/Terminal';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        Component: Terminal
    },
    {
        path: '/dashboard',
        Component: Dashboard
    },
    {
        path: '*',
        Component: NotFound
    }
]);

export default function App() {
    return <RouterProvider router={router} />;
}

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}
