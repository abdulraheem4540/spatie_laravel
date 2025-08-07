import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ role, permissions }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Role Details</h2>}
        >
            <Head title={`Role - ${role.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('roles.index')}
                            className="inline-block px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition"
                        >
                            ← Back to Roles
                        </Link>
                    </div>

                    <div className="bg-white p-6 shadow rounded-lg space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Role Name</h2>
                            <p className="text-gray-700 text-lg">{role.name}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Assigned Permissions</h3>
                            {permissions && permissions.length > 0 ? (
                                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                    {permissions.map((permission, index) => (
                                        <li key={index} > <span className='mr-1 bg-green-100 text-xs font-medium px-5 py-0.5'>{permission}</span></li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500"  >No permissions assigned.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
