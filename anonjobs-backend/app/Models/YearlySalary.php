<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class YearlySalary extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'salary',
        'currency'
    ];

    protected $hidden = [
        'updated_at',
        'deleted_at'
    ];
}
