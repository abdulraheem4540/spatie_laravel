<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Users/Index',[
            'users'=> User::with("roles")->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/Create',[
            "roles"=> Role::pluck("name")
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    // Validate and make sure 'roles' is an array of strings
    $validated = $request->validate([
        'name'     => 'required|string|max:255',
        'email'    => 'required|email|unique:users,email',
        'password' => 'required|string|min:6',
        'roles'    => 'required|array|min:1',
    ]);

    // Create user
    $user = User::create([
        'name'     => $validated['name'],
        'email'    => $validated['email'],
        'password' => bcrypt($validated['password']),
    ]);

    // Assign roles
    $user->syncRoles($validated['roles']);

    return redirect('/users')->with('success', 'User created successfully!');
}
    /**
     * Display the specified resource.
     */
   public function show(User $user)
{
    return Inertia::render('Users/Show', [
        'user' => $user->load('roles')
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
 public function edit(User $user)
{
    return Inertia::render('Users/Edit', [
          'user' => $user->load('roles'),
         'roles' => Role::pluck('name')
    ]);
}
    /**
     * Update the specified resource in storage.
     */


public function update(Request $request, User $user)
{
    $validated = $request->validate([
        'name'     => 'required|string|max:255',
        'email'    => 'required|email|unique:users,email,' . $user->id,
        'password' => 'nullable|string|min:6',
        'roles'    => 'nullable|array',             // ✅ validate roles array
        'roles.*'  => 'string|exists:roles,name',   // ✅ validate each role name
    ]);

    // Update basic fields
    $user->update([
        'name'  => $validated['name'],
        'email' => $validated['email'],
        'password' => $validated['password']
            ? Hash::make($validated['password'])
            : $user->password, // Keep old password if none provided
    ]);

    // Sync roles if provided
    if ($request->has('roles')) {
        $user->syncRoles($validated['roles']); // 🔁 Spatie Permission sync
    }

    return redirect()->route('users.index')->with('success', 'User updated successfully.');
}

    /**
     * Remove the specified resource from storage.
     */
 public function destroy(User $user)
{
    $user->delete();

    return redirect()->route('users.index')->with('success', 'User deleted successfully!');
}
}
