# Get docker working
You should know the drill by now...

# Install Laraval
[composer install](https://getcomposer.org/doc/03-cli.md#install-i)
`cd /www/ && composer create-project --prefer-dist laravel/laravel photogallery`

# View the site
`localhost:777/photogallery/public`

# Update apache config
change config/vhost/default.conf from `/var/www/html/` to `/var/www/html/photogallery/public/`
It should now be viewable at `localhost:777/`


# Creating out first [controllers](https://laravel.com/docs/5.8/controllers)
    These will be made in `photogallery/app/Http/Controllers`
    `php artisan make:controller GalleryController`

    Edit them:
    ```
        public function index() {
            die('Gallery Index'); 
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
            die($id); 
        } 
    ```


    ## Show method example
    `Route::get('/gallery/show/{id}', 'GalleryController@show');`



    ## Automating this
    This could also have been done with following
    `php artisan make:controller PhotoTestController --resource`
    Then back in the `routes.php`, we add:
    ```
    Route::resource('test', 'PhotoTestController');
    ```

# Working with views




# Working with the db
Make sure both .env files have matching db info `LAMP7-laraval/.env` & `LAMP7-laraval/www/photogallery/.env`.

Run `php artisan make:migration create_galleries_table --create=galleries` & `php artisan make:migration create_photos_table --create=photos`.

Check `LAMP7-laraval/www/photogallery/database/migrations/..._create_galleries_table.php`.

Lets edit the file.
For create_galleries_table.php:
```
    $table->increments('id');
    $table->string('name');
    $table->string('description');
    $table->string('cover_image');
    $table->integer('owner_id');
    $table->timestamps();
```
For create_photos_table.php:
```
    $table->increments('id');
    $table->string('title');
    $table->string('description');
    $table->string('location');
    $table->string('images');
    $table->integer('owner_id');
    $table->timestamps();
```
Goto phpmyadmin: `http://localhost:8080` notice how there are no tables in there?

Now lets actually run the migrate  `php artisan migrate`. This will build the sql tables for you.

Refresh phpmyadmin: `http://localhost:8080` and notices how the tables have been built out?


## add laravelcollective (not maintained)
update composer.json
```
"laravelcollective/html": "5.0"
```
then `composer update`.

Add your new provider to the `providers` array of `config/app.php`:
`Collective\Html\HtmlServiceProvider::class,` around line 149.

Then add update a new alias ro the aliases array:
`'Html' => Collective\Html\HtmlFacade::class,`

