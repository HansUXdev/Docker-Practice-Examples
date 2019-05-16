## NOTES on the setup
Please be aware if you see weird stuff like ```cpt_custom_post_type[singular_label]``` thats for future refence in a puppeteer script for automatically testing this.

# Setup
1. Write or copy docker-compose file.
2. Run ```Docker-compose up -d```
3. Install WP

#Postman
1. ```http://localhost:8000/wp-json``` will error
2. Login to WP-admin and go to ```http://localhost:8000/wp-admin/options-permalink.php```
3. click "Post name" ```input value = "/%postname%/"
4. Use postman to make a GET request to ```http://localhost:8000/wp-json/wp/v2/posts```
5. repeat for ```http://localhost:8000/wp-json/wp/v2/users/1```
6. Make a POST request with postman ```http://localhost:8000/wp-json/wp/v2/posts``` set the HEADERS to ```Content-Type``` and value =  ```application/json```. 
Then for the BODY added some json. 
```
{
  "title":"Post One"
  "content":"This is post one"
}
```
Should get 401 because the header didn't get "Authorization" and "Bearer someHash".

7. Autheticate with JWT goto ```http://localhost:8000/wp-admin/plugin-install.php``` search for JWT and install "JWT Authentication for WP REST API" click install and active.

8. Change .htaccess per the [JWT Authentication for WP REST API docs](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) 
```
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%

SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
```
9. Change ```wp-config.php```
add  ``` define('JWT_AUTH_SECRET_KEY', 'your-top-secret-key'); ```
enable CORS ```define('JWT_AUTH_CORS_ENABLE', true);```


10. Make a POST request to ```http://localhost:8000/wp-json/jwt-auth/v1/token```
Must use key ``` [{"key":"Content-Type","value":"application/json","description":"","enabled":true}]```
RAW should be:  
```
{
  "username": "admin",
  "password": "password"
}
```
You should get a response like:
```
{
    "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJUAzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMCIsImlhdCI6MTU1Nzk0NTUyNSwibmJmIjoxNTU3OTQ1NTI1LCJlePBiOjE1NTg1NTAzMjUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.epspJ4MUR1p7-1Q3ZqkmrLxRGblPBqIJzND1OR3Ro2I",
    "user_email": "you@site.com",
    "user_nicename": "admin",
    "user_display_name": "admin"
}
```

11. Make a new blog post using a "POST request" at the url ```http://localhost:8000/wp-json/wp/v2/posts```.
Copy the token in your POST requst HEADER.
```
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJUAzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMCIsImlhdCI6MTU1Nzk0NTUyNSwibmJmIjoxNTU3OTQ1NTI1LCJlePBiOjE1NTg1NTAzMjUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.epspJ4MUR1p7-1Q3ZqkmrLxRGblPBqIJzND1OR3Ro2I",
  },
```
Then in the BODY of the request add your new post data (RAW):
```
{
  "title": "Post Two",
  "content": "Look you made a new post with the REST API !",
  "status": "publish"
}
```
Now you should be able to see the new post added.

12. Install & Activate [Custom Post Type UI](http://localhost:8000/wp-admin/plugin-install.php?s=custom+post+type+ui&tab=search&type=term)

[Configure a New Post](http://localhost:8000/wp-admin/admin.php?page=cptui_manage_post_types)
type "books" in  ```cpt_custom_post_type[name]``` && ```cpt_custom_post_type[label]``` and type book in ```cpt_custom_post_type[singular_label]```

Show in REST API must be true ```cpt_custom_post_type[show_in_rest]```
Excerpts should also be checked.

Grab stuff from ```https://www.lipsum.com/```

13. Check post man for books using GET ```http://localhost:8000/wp-json/wp/v2/books```
Note the following. This will be important when working with react because you will need to escape the html in ```content.rendered```.
```
"content": {
            "rendered": "\n<p> ... </p>\n",
            "protected": false
        },
```

14. Install &  Activate [ACF to REST API](http://localhost:8000/wp-admin/plugin-install.php?s=ACF+to+REST+API&tab=search&type=term) go to the new "Custom Fields" and add new.
Field label = Publisher

Now if you go to your books. You should see a new field for publisher.

## REACT Front End
1. Use create-react-app ```npx create-react-app frontend```
2. Once it is done run ```cd frontend/ && npm i axios react-router-dom```
3. Once everything is install and you are in the /frontend, run ```npm start```
4. clean up react boilerplate by deleting 
```cd /src/ && rm rm App.test.js index.css serviceWorker.js  logo.svg``` 
5. open "index.js and app.js" and remove references to the files.
6. run ```mkdir components && touch components/Books.js```
7. components/Books.js is where we will make the initial request to the API
8. add proxy to package.json ```"proxy":"http://localhost:8000"``` and RESTART the server with npm start.
9. using the visual studio extention "es 6 react redux graph QL snippets" in Books.js, run ```RCE`` and hit tab.
This creates a class based component.
10. Import axios to Books.js.
 Set the state of the component to an empty array with isLoaded false. 
 Mount the Component to make a GET request to ```/wp-json/wp/v2/books``` so that the RESponse SETs the STATE of books: equal to the RESponse's data. Then console.log the state (before the returned html).
 Finally, import books in app.js and call the ```<Books />``` component into the return statement.
 Inspect the console and you should now see the array of books.
11. In Books.js, pull the state with [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). ```const {books, isLoaded} = this.state;```.
And create a conditional where if isLoaded:true, you return a [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) of the ```books.title.rendered```, else you should return a statement that nothing was loaded.
```
      return (
        <div>
          {books.map(book => ( 
              <h4> {book.title.rendered} </h4>
            )
          )}
        </div>
      )
```
12. Create a new component called ```BookItem.js``` this will be a class-based component. Import this component into books.
