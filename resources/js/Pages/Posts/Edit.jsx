import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';
export default function Edit({ post }) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title || '',
        content: post.content || '',
        image: null,
    });

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
    };

 const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('_method', 'PUT'); // ✅ simulate PUT
    if (data.image) {
        formData.append('image', data.image);
    }

    axios.post(route('posts.update', post.id), formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    })
    .then(() => {
        router.visit(route('posts.index'));
    })
    .catch(error => {
        console.error(error.response?.data?.errors);
    });
};



    return (
        <AuthenticatedLayout header={<h2>Edit Post</h2>}>
            <Head title="Edit Post" />

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="border rounded w-full"
                    />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}
                </div>

                <div>
                    <label>Content</label>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="border rounded w-full"
                    />
                    {errors.content && <p className="text-red-500">{errors.content}</p>}
                </div>

                <div>
                    <label>Image</label>
                    {post.image && (
                        <img src={`/storage/${post.image}`} alt="Old" className="w-32 mb-2" />
                    )}
                    <input type="file" onChange={handleImageChange} />
                    {errors.image && <p className="text-red-500">{errors.image}</p>}
                </div>

                <button type="submit" disabled={processing} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Update
                </button>
            </form>
        </AuthenticatedLayout>
    );
}
