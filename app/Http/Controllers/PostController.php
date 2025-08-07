<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('permission:posts.view')->only(['index', 'show']);
    //     $this->middleware('permission:posts.create')->only(['create', 'store']);
    //     $this->middleware('permission:posts.edit')->only(['edit', 'update']);
    //     $this->middleware('permission:posts.delete')->only(['destroy']);
    // }

    public function index()
    {
        return Inertia::render('Posts/Index', [
            'posts' => Post::all()
        ]);
    }
    public function show(Post $post)
{
    
    return Inertia::render('Posts/Show', [
        'post' => $post
    ]);
}

    public function create()
    {
        return Inertia::render('Posts/Create');
    }

  public function store(Request $request)
{
    $validated = $request->validate([
        'title'   => 'required|string|max:255',
        'content' => 'required|string',
       'image' => 'nullable|image|mimes:jpg,jpeg,png,gif,GIF|max:20348',

// Optional image validation
    ]);

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('posts', 'public');
        $validated['image'] = $imagePath;
    }

    Post::create($validated);

    return redirect()->route('posts.index')->with('success', 'Post created successfully.');
}


    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', ['post' => $post]);
    }
public function update(Request $request, Post $post)
{
    // DEBUG
    Log::info('Request:', $request->all());

    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
         'image'   => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')->store('posts', 'public');
    }

    $post->update($validated);

    return redirect()->route('posts.index')->with('success', 'Post updated.');
}




    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('posts.index');
    }
}
