
import { useState } from "react";
import { useForm } from '@inertiajs/react';

export default function Create({permissions}) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: []
    });
  const handleSubmit = (e) => {
        e.preventDefault();
        post(route('roles.store')); // ✅ correct POST request to create role
    };
    
     function handleCheckboxChange(permissionName, checked){
        if(checked){
            setData("permissions",[...data.permissions,permissionName]);
        }
        else{
            setData("permissions",data.permissions.filter(name=>name !== permissionName));
        }
     }
    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Create Role</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Role Name</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
<div className="grid gap-2">
<label for ="permissions" className="text-sm leading-none font-medium select-none ">Permissions</label>
{permissions.map((permission) =>
<label key={permission} className="flex items-center space-x-2">
    <input type="checkbox" 
    onChange={(e) => handleCheckboxChange(permission, e.target.checked)}
    value={permission} className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring...." name="" id={permission} />
    <span className="text-gray-800 capitalize">{permission}</span>
</label>
)}
 {errors.permissions && <p className="text-red-500 text-sm mt-1">{errors.permissions}</p>}
</div>
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Create
                </button>
            </form>
        </div>
    );
}