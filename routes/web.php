<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
      // Posts with permissions
Route::resource('posts', PostController::class)->only(['create', 'store'])->middleware('permission:posts.create');

Route::resource('posts', PostController::class)->only(['edit', 'update'])->middleware('permission:posts.edit');

Route::resource('posts', PostController::class)->only(['destroy'])->middleware('permission:posts.delete');

Route::resource('posts', PostController::class)->only(['index', 'show'])->middleware('permission:posts.view|posts.edit|posts.create');

    // Users with permissions
    // Route::resource('users', UserController::class)->middleware([
    //     'index'   => 'permission:users.view',
    //     'create'  => 'permission:users.create',
    //     'store'   => 'permission:users.create',
    //     'show'    => 'permission:users.view',
    //     'edit'    => 'permission:users.edit',
    //     'update'  => 'permission:users.edit',
    //     'destroy' => 'permission:users.delete',
    // ]);
Route::resource("users",UserController::class)->only(['create',"store"])->middleware("permission:users.create");
Route::resource("users",UserController::class)->only(["edit","update"])->middleware("permission:users.edit");
Route::resource("users",UserController::class)->only(["destroy"])->middleware("permission:users.delete");
Route::resource("users",UserController::class)->only(["index","show"])->middleware(['permission:users.view|users.create|users.edit|users']);

    // Roles with permissions
    // Route::resource('roles', RoleController::class)->middleware([
    //     'index'   => 'permission:roles.view',
    //     'create'  => 'permission:roles.create',
    //     'store'   => 'permission:roles.create',
    //     'show'    => 'permission:roles.view',
    //     'edit'    => 'permission:roles.edit',
    //     'update'  => 'permission:roles.edit',
    //     'destroy' => 'permission:roles.delete',
    // ]);
    Route::resource("roles",RoleController::class)->only(['create',"store"])->middleware("permission:roles.create");
    Route::resource("roles",RoleController::class)->only(["edit","update"])->middleware("permission:roles.edit");
Route::resource('roles',RoleController::class)->only(["destroy"])->middleware("permission:roles.delete");
    Route::resource('roles',RoleController::class)->only(["index","show"])->middleware(['permission:roles.view|roles.create|roles.edit|roles']);
});

require __DIR__.'/auth.php';
