<?php

namespace Database\Seeders;

use App\Models\YearlySalary;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class YearlySalarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $salaryExists = YearlySalary::exists();

        if (!$salaryExists) {
            for($i = 0; $i <= 400000; $i+=5000){
                YearlySalary::create([
                    'salary' => $i,
                    'currency' => '$'
                ]);
            }
        }
    }
}
