<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Shelf;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory(100)->create();
        User::factory()->create(
            [
                'name' => 'test',
                'email' => 'test@gmail.com',
                'password' => bcrypt('test1234'),
                'role' => 'admin',
                'status' => 'active',
            ]
        );
        User::factory()->create(
            [
                'name' => 'worker',
                'email' => 'worker@gmail.com',
                'password' => bcrypt('test1234'),
                'role' => 'worker',
                'status' => 'active',
            ]
        );
        User::factory()->create(
            [
                'name' => 'sorter',
                'email' => 'sorter@gmail.com',
                'password' => bcrypt('test1234'),
                'role' => 'sorter',
                'status' => 'active',
            ]
        );
        Product::factory(100)->create();
        Shelf::factory(100)->create();
    }
}
