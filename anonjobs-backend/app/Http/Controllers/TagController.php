<?php

namespace App\Http\Controllers;

use App\Http\Resources\TagResource;
use App\Models\Job;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Return all Tags
     */
    public function index()
    {
        return TagResource::collection(Tag::orderBy('name', 'asc')->get());
    }

}
