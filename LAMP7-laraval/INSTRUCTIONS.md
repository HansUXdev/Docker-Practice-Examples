# Get docker working

# Install Laraval
`cd /www/ && composer create-project --prefer-dist laravel/laravel photogallery`

# View the site
`localhost:777/photogallery/public`

# Update apache config
change config/vhost/default.conf from `/var/www/html/` to `/var/www/html/photogallery/public/`



