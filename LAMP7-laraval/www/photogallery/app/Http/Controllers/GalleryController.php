<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class GalleryController extends Controller
{
    // List galleries
    public function index() {
        return view('gallery/index'); 
    }
    // show create form
    public function create() {
        return view('gallery/create'); 
    }
    // store it
    public function store(Request $request) {
        die('GALLERY/STORE'); 
    } 
    // show gallery
    public function show( $id) {
        die($id); 
    } 
}

// php artisan make:controller PhotoTestController --resource