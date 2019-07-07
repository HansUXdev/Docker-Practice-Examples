<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class GalleryController extends Controller
{
    // List galleries
    public function index() {
        die('GALLERY/INDEX'); 
    }
    // show create form
    public function create() {
        die('GALLERY/CREATE'); 
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