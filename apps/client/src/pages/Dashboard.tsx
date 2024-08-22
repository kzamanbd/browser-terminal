import AppLayout from '@/layouts/AppLayout';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

const Dashboard = () => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
            }>
            <AppLayout>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">You're logged in!</div>
                </div>
            </AppLayout>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
