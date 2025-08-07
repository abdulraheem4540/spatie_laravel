import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ post }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Post Details</h2>}
        >
            <Head title="Post Details" />

            <div className="py-8 max-w-3xl mx-auto bg-white shadow p-6 rounded">
                {post.image && (
    <img
        src={`/storage/${post.image}`}
        alt="Post Image"
        className="max-w-full h-auto mb-4"
    />
)}
                <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>

                <div className="mt-6">
                    <Link
                        href={route('posts.index')}
                        className="text-blue-600 hover:underline"
                    >
                        ← Back to Posts
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
