# Get docker working

# Install Laraval
`cd /www/ && composer create-project --prefer-dist laravel/laravel photogallery`

# View the site
`localhost:777/photogallery/public`

# Update apache config
change config/vhost/default.conf from `/var/www/html/` to `/var/www/html/photogallery/public/`

# Creating out first [controllers](https://laravel.com/docs/5.8/controllers)
These will be made in `photogallery/app/Http/Controllers`
`php artisan make:controller GalleryController`
`php artisan make:controller PhotoController`

Edit them:
```
    public function index() {
        die('Gallery Index'); 
    }

    public function create() {
        die('Gallery CREATE'); 
    }
```


# Routes
Go to `photogallery/app/Http/routes.php`.
Test the new controller. The @index part refers to the method in the controller.
```
Route::get('/', 'GalleryController@index');
```

Add some resources:
```
Route::resource('gallery', 'GalleryController');
Route::resource('photo', 'PhotoController');

```


## Edit Gallery Controller

```
    // show create form
    public function create() {
        die('GALLERY/CREATE'); 
    }
    // store it
    public function store(Request $request) {
        die('GALLERY/CREATE'); 
    } 
    // show gallery
    public function show( $id) {
        die($); 
    } 
```


## Edit Router






