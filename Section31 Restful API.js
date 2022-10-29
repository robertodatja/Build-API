/* client  -  API(http or ftp or ...) - server  - DB

API: Graphql, SOAP, REST, FALCOR

-----------------------------------
0.CRUD in DB:  1.HTTP Request Verbs:  2. use Specific Pattern of Routes/EndPoint URLs
                                      /articles                   /articles/jack-bauer
Create         Post                   Fetches all the articles    Fetches the article on jack-bauer
Read           Get                    Creates one new article     -
Update 1       Put                    -                           Updates the article on jack-bauer
Update all     Patch                  -                           Updates the article on jack-bauer
Delete         Delete                 Delete all articles         Deletes the article on jack-bauer


//////////////////////////////Create RESTful API////////////////////////////////

I. Creating a Database with Robo 3T --------------------------------------------

A graphical user interface that is commonly used with MongoDB which is called: Robo 3T.
1.
Click download and Install
There's a window that's prompting you to connect to a MongoDB database.
So let's go ahead and try to create a new MongoDB connection.
2.
Click Create a new connection & named it New Connection
And we're going to leave all of these settings to the default
and you'll notice that the address here is what we've been using previously when we were coding it up in Atom when we were trying to access the location of our MongoDB on our local system.
So that was localhost and MongoDB tends to use the port address that's 27017.
3.
So leave everything as it is and go ahead and click save.
And now you should have this new connection that's created.
4.
Click Connect
to try and connect to it and you'll see that we get this error.
It says "Cannot connect to the MongoDB at localhost: 27017" and the error is that the network is unreachable.
So why is this?
Well it's because we haven't started up our MongoDB server right?
4.2
our command line - our hyper terminal - mongod,  to spin up our MongoDB server.
So now it's waiting for connections on port 27017
4.3
and we can go into Robo 3T, click on this connection button here and try to connect again.
And now you'll see that it's managed to connect successfully and we can close off this welcome screen.
So you can see on the left here the databases that we currently have on our local MongoDB instance.
And we've got two system admin, local and config and then we've got blogDB from a previous tutorial.
5.
So now let's go ahead and create a brand new database.
Now previously we've been doing all of this through the command line.
Mongo shell
show dbs               which essentially does the same thing as this and it lists admin, local, blogDB and config same as over here.
use databaseName       use a particular db to create it.
And we did all of this through the command line.
Now the command line gives you an extraordinary amount of control.
You can literally do anything that is possible through command line which is why developers love it so much.
It gives you a lot of freedom.
5.2
But if you wanted to do something quick and simple and you wanted to be able to see your data easily
then using a graphical user interface like Robo 3T can be quite helpful
especially if you're not quite yet familiar with the command line.

6.
So let's go ahead and create a new database.
6.1
Click on our new connection - click Add Database - call wikiDB, as the database for our Wikipedia API.
And you can see at the moment it has zero collections.
6.2
So let's go ahead and create a collection.
Click on the collections folder - click Add Collection - call articles - create
Now remember that the naming convention for MongoDB collections are that it should be lowercase and it should be plural.
Now how do I know about those naming conventions?
Of course the documentation: mongodb.docs
6.3
Click on articles.
But the articles are currently empty.
If I right click and I say viewdocuments (IntelliShell)
you can see that it says fetched 0 Recordsright?
And all that Robo 3T is doing is, it running these predefined Mongo shell commands
like what we did before
db.show collection or db.find
and it translates that into kind of like a graphical user interface in terms of tables and folders
instead of simply plain text.
6.4
So given that we've got no documents in our articles collection we can go ahead and insert a document (Add document)
which is the same as the C in our CRUD and we're going to create a brand new document.
So this document is going to have two fields and the first field is going to be the title of the article.
{
title: "REST",
content: "REST is short for REpresentational State Transfer. It's an architectural style for designing APIs."
}

All right.
So as you can see we're putting them both in as strings and then we're separating the fields with a comma.
So this is exactly the way that we did it when we were coding it up inside Atom or in our server so this should be pretty familiar to you.
And it looks pretty much the same as any sort of Javascript object.

6.5
So now that we're done with our document let's go ahead and click save
and now you'll see that Robo 3T isn't quite smart enough to auto refresh when we add in a new article.
So we have to go ahead and click View documents to rerun that line of command which find everything inside the article's collection.
But if you have a look now we have a new item in here.
So it's found one document and it's got three fields:
the id that gets automatically assigned by MongoDB, the title which is what we inserted as well as the content.
6.6
So now let's go ahead and add a few more documents.
If you want to this is a good time to pause the video and add some of your own notes that you've learned along the
way or alternatively if you head over to this URL:  github.com/londonappbrewery/Build-Your-Own-RESTful-API
you can see that we've already created the repository.
Then if you scroll down you can see that we've included some example documents that you can simply insert in if you wanted to save time.
So that's exactly what I'm going to do.
I'm going to copy that from here and then I'm going to try and add it to my articles collection.
Now in order to do this I'm again gonna go insert document (importData - paste from clipboard - run)and I'm going to delete these two curly braces
and paste everything I got over from GitHub.
And you can see I've got three documents in here one that's
got a title of API, another one about Bootstrap and another one about DOM.
So let's go ahead and hit save and right click to view documents again and you see we now have four objects.
-
So this is going to be our very rudimentary database which we're going to build our API around.
So potentially any client can talk to our server in order to manipulate and change or retrieve data in our database.

/* I& II
So let's just review this code quickly.
We are creating four constants.
We are requiring all of those modules that we installed a little bit earlier on.
We're creating a new app instant using Express.
We're setting our view engine to use EJS our templating engine
and then we're going to use body-parser in order to pass our requests
and finally we're going to use the public directory to store our static files such as images and CSS code.
The last part sets up our app to listen on port 3000
so we should now be able to use
nodemon app.js
to spin up our server app.js and it should say that "Server has started on port 3000."
And now if you remember if we head over to
localhost:3000
pretty much nothing will happen.
And it tells us that it cannot get our files at our root.
So this is because we haven't created any of our API yet.
Which is what we will do very shortly.
But as long as our server is running we don't have any problems in our console then that is pretty much
success and we can move on to the next step which is setting up MongoDB.
*/

/*
II. Creating our server --------------------------------------------------------
cd Desktop
mkdir Wiki-API
cd Wiki-API
npm init -y
npm i body-parser mongoose ejs express
touch app.js
start app.js
Inside app.js add server code from github.com/londonappbrewery/Build-Your-Own-RESTful-API
*/
/*
Now here's a tricky one because the client now is going to send data essentially to our server.
And at the moment we don't really have a frontend.
We don't have a web form, for example, hit submit and it sends the data by making a POST request to this route.
Without creating all of that frontend and creating the HTML and designing it up
how can we keep it pure and just build our API without the need for building the frontend?
Well, we know we have our server that can speak to our database and we're exposing certain parts of our
server through the APIs that we're building so that clients can be able to work with our server and with our database.
Now the client can be a number of things.
It could be a browser which is trying to load up a web page in which case it will make a GET request
to our server via our API and our server will send over the relevant HTML, CSS and JavaScript files to be
able to render that web page in the browser.
But our client say a browser could also be making GET requests that is looking for a particular resource
say some data or a file. And in the last lesson we've seen that we can simply make that request to our
API by going to that /articles route. And when we hit enter
this makes a GET request on that route and we'll get sent back the data that we requested in a JSON format.
Now that's very well and good for GET requests,
but how do we do that using POST requests?

IV.POST a newArticle
So now we have addressed what should happen when a client makes a POST request
and sends over some data to our server  via  our API targeting the articles route.
*/
