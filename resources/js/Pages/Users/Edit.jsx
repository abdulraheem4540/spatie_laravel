import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ user,roles }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        roles: user.roles?.map(r => r.name) || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id)); // PUT request to /users/{id}
    };
      const handleCheckboxChange = (roleName, checked) => {
        if (checked) {
            setData('roles', [...data.roles, roleName]);
        } else {
            setData('roles', data.roles.filter(name => name !== roleName));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit User</h2>}
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block font-medium">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full border-gray-300 rounded mt-1"
                                />
                                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block font-medium">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full border-gray-300 rounded mt-1"
                                />
                                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                            </div>

                            <div>
                                <label className="block font-medium">New Password (leave blank to keep current)</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full border-gray-300 rounded mt-1"
                                />
                                {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                            </div>

                            {/* Roles */}
                            <div>
                                <label htmlFor="roles" className="block font-medium mb-1">Assign Roles</label>
                                <div className="grid gap-2">
                                    {roles.map((role) => (
                                        <label key={role} className="flex items-center space-x-2">
                                        <input
    type="checkbox"
    checked={data.roles.includes(role)}
    onChange={(e) => handleCheckboxChange(role, e.target.checked)}
    value={role}
    className="form-checkbox h-5 w-5 text-blue-600 rounded"
/>

                                            <span className="text-gray-800 capitalize">{role}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.roles && <p className="text-red-500 text-sm mt-1">{errors.roles}</p>}
                            </div>
                            <div className="text-right">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
