# Task Management API

This is a RESTful API for a task management application. The API provides endpoints for user authentication, creating and managing tasks.

Technologies Used
Node.js
Express.js
MongoDB


# Setup
## 1 - Clone the repository:
```bash
git clone https://github.com/usama455/task-management.git
```

## 2 - Install dependencies:
```bash
npm install
```

## 3 - Create a `development.env` file according to `.env.example`

## 4 - Start the server:
```bash
npm-run-dev
```

## Documentation and `Postman` collection
Api documentation and postman collection could be accessed at : https://documenter.getpostman.com/view/27003291/2s93Y3wM59


## Directory structure

### Overview

You can customize the `src` and `api` directories.

```
src/
├─ api/
│  ├─ user/
│  │  ├─ controller.js
│  │  ├─ index.js
│  │  ├─ model.js
│  └─ index.js
├─ services/
│  ├─ express/
│  ├─ bcrypt/
│  ├─ mongoose/
│  ├─ passport/
│  ├─ nodemailer/
│  └─ your-service/
├─ utils/
│  ├─ logger/
│  ├─ response/
│  └─ your-util/
├─ app.js
├─ config.js
└─ index.js
```


### src/api/

Here is where the API endpoints are defined. Each API has its own folder.

#### src/api/some-endpoint/model.js

It defines the Mongoose schema and model for the API endpoint. Any changes to the data model should be done here.

#### src/api/some-endpoint/controller.js

This is the API controller file. It defines the main router middlewares which use the API model.

#### src/api/some-endpoint/index.js

This is the entry file of the API. It defines the routes using, along other middlewares (like session, validation etc.), the middlewares defined in the `some-endpoint.controller.js` file.

### services/

Here you can put `services`, `libraries` and other types of modules which you want to use in your APIs.

### utils/

Here you can put `utility` functions which you want to use commonly throughout your app.


