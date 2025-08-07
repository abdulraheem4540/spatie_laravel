<?php

namespace Database\Seeders;
use Spatie\Permission\Models\Permission;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            "users.view",
            "users.edit",
            "users.delete",
            "users.create",
            "roles.view",
            "roles.edit",
            "roles.delete",
            "roles.create",
            "posts.view",
            "posts.create",
            "posts.edit",
            "posts.delete"
        ];
        foreach($permissions as $key => $value){
            Permission::firstOrCreate(["name"=> $value,'guard_name' => 'web']);
        }
    }
}
