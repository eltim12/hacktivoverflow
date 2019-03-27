# hacktivoverflow

------

## API Documentation:

#### List of Basic routes:

| Route                                              | HTTP | Query                    | Body                                                         | Description            | Output                                |
| -------------------------------------------------- | ---- | ------------------------ | ------------------------------------------------------------ | ---------------------- | ------------------------------------- |
| <span style="color:#FF69B4">/users</span>          | GET  |                          |                                                              | Get all the users info | "successfully get all users data."    |
| <span style="color:#FF69B4">/users/find</span>     | GET  | userId: String(required) |                                                              | Find a user with id    | "successfully get user."              |
| <span style="color:#FF69B4">/users/login</span>    | POST |                          | username:String(required)<br />passsword:String(required)    | Log a user on app      | "user logged in successfully"         |
| <span style="color:#FF69B4">/users/register</span> | POST |                          | username:String(required)<br />email:String(required)<br />passsword:String(required) | Register a user        | "user successfully registered"        |
| <span style="color:#FF69B4">/questions</span>      | POST | userId: String(required) | title:String(required)<br />content:String(required)<br />   | post a question        | "question successfully added"         |
| <span style="color:#FF69B4">/questions</span>      | GET  |                          |                                                              | Get all questions      | "get all products successfully"       |
| <span style="color:#FF69B4">/questions/find</span> | GET  | id: String(required)     |                                                              | Find question by id    | "successfully get question"           |
| <span style="color:#FF69B4">/questions/edit</span> | GET  | id:String(required)      | title:String(required)<br />content:String(required)         | Edit a question        | "successfully get all products data." |
|                                                    |      |                          |                                                              |                        |                                       |
|                                                    |      |                          |                                                              |                        |                                       |
|                                                    |      |                          |                                                              |                        |                                       |
|                                                    |      |                          |                                                              |                        |                                       |
|                                                    |      |                          |                                                              |                        | Usage                                 |

Make sure you have Node.js and npm installed in your computer, and then run this commands in both client and server folders:

```
$npm install
```

Run this command in server folder:

```
$nodemon app
```

Run this command in client folder: 

```
$npm run serve
```

 Access the Server side via http://localhost:3000/.

Access the Client side via http://localhost:8080/.