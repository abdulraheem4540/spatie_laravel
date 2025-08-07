import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import { useMemo } from 'react';
import { route } from 'ziggy-js';
import {can} from '@/lib/can'
export default function Index({ users, roles }) {
    const columns = useMemo(() => [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width: '60px'
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
     {
    name: 'Roles',
    cell: row => (
        <div className="flex flex-wrap gap-1">
            {row.roles && row.roles.length > 0 ? (
                row.roles.map((role, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium"
                    >
                        {role.name}
                    </span>
                ))
            ) : (
                <span className="text-gray-500 text-xs italic">No roles</span>
            )}
        </div>
    ),
    wrap: true,
     },
       {
    name: 'Actions',
    width: '200px',
    cell: row => (
        <div className="flex gap-2">
            {can('users.view') && (
                <Link
                    href={route('users.show', row.id)}
                    className="px-2 py-1 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
                >
                    Show
                </Link>
            )}
            {can('users.edit') && (
                <Link
                    href={route('users.edit', row.id)}
                    className="px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Edit
                </Link>
            )}
            {can('users.delete') && (
                <button
                    onClick={() => handleDelete(row.id)}
                    className="px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                >
                    Delete
                </button>
            )}
        </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
}

    ], []);

    const handleDelete = (id) => {
        if (confirm(`Are you sure you want to delete user ID ${id}?`)) {
            router.delete(route('users.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Users</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-4 text-right">
                {can('users.create') && (
    <Link
        href={route('users.create')}
        className="inline-block px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
    >
        + Create User
    </Link>
)}
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <DataTable
                            columns={columns}
                            data={users}
                            pagination
                            highlightOnHover
                            striped
                            responsive
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
