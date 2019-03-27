# hacktivoverflow

------

## API Documentation:

#### List of Basic routes:

| Route                                                    | HTTP   | Query                       | Body                                                         | Description                 | Output                                |
| -------------------------------------------------------- | ------ | --------------------------- | ------------------------------------------------------------ | --------------------------- | ------------------------------------- |
| <span style="color:#FF69B4">/users</span>                | GET    |                             |                                                              | Get all the users info      | "successfully get all users data."    |
| <span style="color:#FF69B4">/users/find</span>           | GET    | userId: String(required)    |                                                              | Find a user with id         | "successfully get user."              |
| <span style="color:#FF69B4">/users/login</span>          | POST   |                             | username:String(required)<br />passsword:String(required)    | Log a user on app           | "user logged in successfully"         |
| <span style="color:#FF69B4">/users/register</span>       | POST   |                             | username:String(required)<br />email:String(required)<br />passsword:String(required) | Register a user             | "user successfully registered"        |
| <span style="color:#FF69B4">/questions</span>            | POST   | userId: String(required)    | title:String(required)<br />content:String(required)<br />   | post a question             | "question successfully added"         |
| <span style="color:#FF69B4">/questions</span>            | GET    |                             |                                                              | Get all questions           | "get all products successfully"       |
| <span style="color:#FF69B4">/questions/find</span>       | GET    | id: String(required)        |                                                              | Find question by id         | "successfully get question"           |
| <span style="color:#FF69B4">/questions/edit</span>       | PUT    | id:String(required)         | title:String(required)<br />content:String(required)         | Edit a question             | "successfully get all products data." |
| <span style="color:#FF69B4">/questions</span>            | PUT    | userId:String(required)     | questionId:String(required)<br />vote:Boolean(required)      | Vote a question             | "successfully voted question"         |
| <span style="color:#FF69B4">/questions</span>            | DELETE | id:String(required)         |                                                              | Delete a question           | "delete question success."            |
| <span style="color:#FF69B4">/answers</span>              | POST   | questionId:String(required) | userId:String(required)<br />content:String(required)<br />  | Create an Answer            | "create answer success"               |
| <span style="color:#FF69B4">/answers</span>              | GET    |                             |                                                              | Find All answers            | "all answers found"                   |
| <span style="color:#FF69B4">/answers/find</span>         | GET    | id:String(required)         |                                                              | Find answer by id           | "answer found successfully"           |
| <span style="color:#FF69B4">/answers/questionFind</span> | GET    | id:String(required)         |                                                              | Find answers by question id | "answers found successfully"          |
| <span style="color:#FF69B4">/answers/edit</span>         | PUT    | id:String(required)         | content:String(required)                                     | Edit answer find by id      | "answer edited successfully"          |
| <span style="color:#FF69B4">/answers</span>              | PUT    | userId:String(required)     | answerId:String(required)<br />status:Boolean(required)      | Vote an answer              | "answer voted successfully"           |
| <span style="color:#FF69B4">/answers</span>              | DELETE | id:String(required)         |                                                              | Delete an answer            | "answer deleted successfully"         |
|                                                          |        |                             |                                                              |                             |                                       |

## Usage

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