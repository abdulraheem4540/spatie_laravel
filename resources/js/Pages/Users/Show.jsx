import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ user }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">User Details</h2>}
        >
            <Head title="User Details" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">User Info</h3>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p>
    <strong>Roles:</strong>{' '}
    {user.roles && user.roles.length > 0
        ? user.roles.map(role => role.name).join(', ')
        : 'No roles assigned'}
</p>

                        <p>
  <strong>Created At:</strong>{' '}
  {new Date(user.created_at).toLocaleDateString()} - {new Date(user.created_at).toLocaleTimeString()}
</p>

                        <div className="mt-6">
                            <Link href={route('users.index')} className="text-blue-600 hover:underline">
                                ← Back to List
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
