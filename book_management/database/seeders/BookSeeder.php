<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book; // Import the Book model

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Book::factory()->count(10)->create();
    }
}
