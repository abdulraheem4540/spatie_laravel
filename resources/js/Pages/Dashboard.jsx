import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { hasAnyPermission } from '@/lib/can';

export default function Dashboard() {
    const { auth } = usePage().props;

    const role = auth.roles?.[0] || 'User'; // Show first role or fallback

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="container">
                    <div className="card shadow-sm">
                        <div className="card-body text-dark">
                            You're logged in!
                        </div>

                        {hasAnyPermission() && (
                            <div className="card-body pt-2 text-success fs-3 fst-italic">
                                Hello {role}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
