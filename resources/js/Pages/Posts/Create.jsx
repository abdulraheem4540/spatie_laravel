import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('posts.store'),{
               forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create Post</h2>}
        >
            <Head title="Create Post" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm rounded">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full mt-1 border rounded px-3 py-2"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Content</label>
                                <textarea
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    className="w-full mt-1 border rounded px-3 py-2"
                                    rows={6}
                                ></textarea>
                                {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                            </div>
 <div>
 <label className="block font-medium">Picture</label>
                        <input
    type="file"
    name="image"
     accept=".jpg,.jpeg,.png,.gif"
    onChange={(e) => setData('image', e.target.files[0])}
    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
/>
{errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                       </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Create
                            </button>
                        </form>

                <div className="mt-6">
                    <Link
                        href={route('posts.index')}
                        className="text-blue-600 hover:underline"
                    >
                        ← Back to Posts
                    </Link>
                </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
