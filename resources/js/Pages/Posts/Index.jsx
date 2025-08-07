import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import { can } from '@/lib/can';
import { useMemo } from 'react';
import { route } from 'ziggy-js';

export default function Index({ posts, flash = {} }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(route('posts.destroy', id));
        }
    };
const canView = can('posts.view');
const canEdit = can('posts.edit');
const canDelete = can('posts.delete');

    const columns = useMemo(() => {
        const baseColumns = [
            {
                name: 'ID',
                selector: row => row.id,
                sortable: true,
                width: '70px',
            },
            {
    name: 'Image',
    cell: row => (
        row.image ? (
            <img src={`/storage/${row.image}`} alt="Thumb" className="w-16 h-16 object-cover" />
        ) : 'No Image'
    )
},
            {
                name: 'Title',
                selector: row => row.title,
                sortable: true,
            },
             {
                name: 'Content',
                selector: row => row.content,
                sortable: true,
            },
        ];

        if ((canView || canEdit || canDelete)) {
            baseColumns.push({
                name: 'Actions',
                cell: row => (
                    <div className="d-flex gap-2">
                          {canView && (
                <Link
                    href={route('posts.show', row.id)}
                    className="px-2 py-1 bg-gray-600 text-white text-sm rounded"
                >
                    Show
                </Link>
            )}
                        {canEdit && (
                            <Link
                                href={route('posts.edit', row.id)}
                                className="btn btn-sm btn-outline-primary"
                            >
                                <i className="bi bi-pencil-square me-1"></i> Edit
                            </Link>
                        )}
                        {canDelete && (
                            <button
                                onClick={() => handleDelete(row.id)}
                                className="btn btn-sm btn-outline-danger"
                            >
                                <i className="bi bi-trash me-1"></i> Delete
                            </button>
                        )}
                    </div>
                ),
                ignoreRowClick: true,
                // allowOverflow: true,
                // button: true,
                width: '220px',
            });
        }

        return baseColumns;
    }, [canView, canEdit, canDelete]);

    return (
        <AuthenticatedLayout
            header={
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h4 mb-0">📄 Posts Management</h2>
                    {flash.success && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
                    {flash.success}
                </div>
            )}
                    {can('posts.create') && (
                        <Link
                            href={route('posts.create')}
                            className="btn btn-success"
                        >
                            + Create Post
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Posts" />

            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <DataTable
                                    columns={columns}
                                    data={posts}
                                    pagination
                                    highlightOnHover
                                    responsive
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
