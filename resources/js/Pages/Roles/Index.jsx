import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import { useMemo } from 'react';
import { route } from 'ziggy-js';
import { can } from '@/lib/can';
export default function Index({ roles }) {
const handleDelete = (id) => {
    if (confirm(`Are you sure you want to delete role ID ${id}?`)) {
        router.delete(route('roles.destroy', id), {
            preserveScroll: true,
        });
    }
};
const canView = can('roles.view');
const canEdit = can('roles.edit');
const canDelete = can('roles.delete');
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
            name: 'Permissions',
           cell: row => (
        <div className="flex flex-wrap gap-1">
            {row.permissions.map((permission, index) => (
                <span
                    key={index}
                    className="bg-green-100 text-black-700 px-2 py-0.5 rounded text-xxs"
                >
                    {permission.name}
                </span>
            ))}
        </div>
    ),
            wrap: true,
            
        },
     {
    name: 'Actions',
    width: '180px',
    cell: row => (
        <div className="flex flex-wrap gap-1 justify-center">
            {canView && (
                <Link
                    href={route('roles.show', row.id)}
                    className="px-2 py-1 text-xs text-white bg-gray-600 rounded hover:bg-gray-700"
                >
                    Show
                </Link>
            )}
            {canEdit && (
                <Link
                    href={route('roles.edit', row.id)}
                    className="px-2 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Edit
                </Link>
            )}
            {canDelete && (
                <button
                    onClick={() => handleDelete(row.id)}
                    className="px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                >
                    Delete
                </button>
            )}
        </div>
    ),
    ignoreRowClick: true,
    // allowOverflow: true,
    // button: true,
}

    ], []);

   

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Roles</h2>}
        >
            <Head title="Roles" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-4 text-right">
                        <Link
                            href={route('roles.create')}
                            className="inline-block px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                        >
                            + Create Role
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <DataTable
                            columns={columns}
                            data={roles}
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
