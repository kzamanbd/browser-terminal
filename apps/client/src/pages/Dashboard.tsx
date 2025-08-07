import AppLayout from '@/layouts/AppLayout';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

const Dashboard = () => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>
            }>
            <AppLayout>
                <div className="shadow-xs overflow-hidden bg-white sm:rounded-lg">
                    <div className="p-6 text-gray-900">You're logged in!</div>
                </div>
            </AppLayout>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
