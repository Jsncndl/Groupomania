
# Groupomania

Projet 7 OpenClassrooms: Créez un réseau social d'entreprise.

## Tech Stack

**Frontend:** React, TypeScript

**Server:** Node, Express

**Database:** MongoDB


## Installation

Install Groupomania with npm

Clone the project

```bash
  git clone https://github.com/Jsncndl/Groupomania
```

### 1. Backend
Go to back/ directory
```bash
  npm install
```
Create new file named .env and copy / paste with your personnal value
```bash
  DB_AUTH= "your connection uri"
  ENV= "set your favorite port to run server"
  TOKEN_KEY= "RANDOM_SECRET_TOKEN_KEY"
  ADMIN_ID= "userId of admin" 
```

### 2. Frontend
Go to front/ directory
```bash
  npm install
```


    
## Run Locally

### 1. Start backend server

Go to back/ directory
```bash
  node server
```

### 2. Start application

Go to front/ directory
```bash
  npm start
```
The app should open on http://localhost:3001/.


## API Reference (back directory)

## Users Collection

### GET user profile

```http
  GET /api/user/${id}
```

| Header                                 | Parameter | Type     | Description                |
| :------------------------------------- | :-------- | :------- | :------------------------- |
| `Authorization`:`Bearer ${your token}` | `${id}`   | `string` | **Required**. User ID      |

#### Response :
| Status             | Body schema                                                           |
| :----------------- | :-------------------------------------------------------------------- |
| `200: OK`          | `{ "lastname": "", "firstname": "", "email": "", "userImage": "" }`   |
|`400: Bad request`  | `{"error": {...} }`                                                   |
|`401: Unauthorized` |`{"error": { "name": "JsonWebTokenError", "message":"invalid token"}}`|

### POST user signup

```http
  POST /api/user/signup
```

| Body        | Description                       |
| :---------- | :-------------------------------- |
| `lastname`  | **Required**. User last name      |
| `firstname` | **Required**. User first name     |
| `email`     | **Required & unique**. User email |
| `password`  | **Required**. User password       |

#### Response :
| Status             | Body schema                                    |
| :----------------- | :--------------------------------------------- |
| `201: Created`     | `{ "message": "Account successfully created" }`|
| `400: Bad request` | `{"error": { ... } }`                          |


### POST user login

```http
  POST /api/user/login
```
| Body       | Description                 |
| :--------- | :-------------------------- |
| `email`    | **Required**. User email    |
| `password` | **Required**. User password |

#### Response :
| Status | Body schema                                        |
| :----- | :------------------------------------------------- |
| `200: OK`     | `{ "userId": "", "token": "", "lastName": "", "firstName": "", "userImage": "", "email": "", "isAdmin?" }`|
| `401: Unauthorized` | `{"message": "Wrong email / password"}` |

### PUT user modify profile

```http
  PUT /api/user/${id}
```

| Header | Parameter | Type     | Description                |
|:------  | :-------- | :------- | :------------------------- |
| `Authorization`:`Bearer ${your token}` | `${id}`| `string` | **Required**. User ID      |

| Body      | Description                       |
| :--------  | :-------------------------------- |
|`confirmPassword`| **Required**. User password|
|`newPassword` | New user password|
|`lastName`| New user last name |
|`firstName`| New user first name |
|`file`| New user image |

#### Response :
|Status|Body schema|
|:-----|:---|
| `200: OK`|`{ "message": "Account & user's posts modified" }`|
|`400: Bad request` |`{"error": {...} }`|
|`401: Unauthorized`|`{"message": { Not Authrorized }`|


### DEL user delete profile

```http
  DEL /api/user/${id}
```

| Header | Parameter | Type     | Description                |
|:------  | :-------- | :------- | :------------------------- |
| `Authorization`:`Bearer ${your token}` | `${id}`| `string` | **Required**. User ID      |

| Body      | Description                       |
| :--------  | :-------------------------------- |
|`password`| **Required**. User password|

#### Response :
|Status|Body schema|
|:-----|:---|
| `200: OK`|`{ "message": "Account deleted" }`|
|`401: Unauthorized`|`{"message": { Not Authrorized }`|


## Posts Collection

### GET all posts

```http
  GET /api/post
```

| Header |
|:------  | 
| `Authorization`:`Bearer ${your token}` |

#### Response :
|Status|Body schema|
|:-----|:---|
| `200: OK`|`{ "posts": [ {post}, {post} ... ]}`|
|`400: Bad request` |`{"error": {...} }`|
|`401: Unauthorized`|`{"error": { "name": "JsonWebTokenError", "message":"invalid token"}}`|


### GET one post

```http
  GET /api/post/${id}
```

| Header | Parameter | Type     | Description                |
|:------  | :-------- | :------- | :------------------------- |
| `Authorization`:`Bearer ${your token}` | `${id}`| `string` | **Required**. Post ID      |

#### Response :
|Status|Body schema|
|:-----|:---|
| `200: OK`|`{ "_id": "", "date": "", "title": "", "message": "", "imageUrl": "", "userId": "", "userLastName": "", "userFirstName": "","userImage": "","likes": 0,"usersLiked": [ "" ], }`|
|`400: Bad request` |`{"error": {...} }`|
|`401: Unauthorized`|`{"error": { "name": "JsonWebTokenError", "message":"invalid token"}}`|

### POST new post

```http
  POST /api/post/
```

| Header | 
|:------  | 
| `Authorization`:`Bearer ${your token}` |

| Body      | Description                       |
| :--------  | :-------------------------------- |
|`title`| **Required**. Post title|
|`message`|**Required**. Post message|
|`image`|Post image if user add it|

#### Response :
|Status|Body schema|
|:-----|:---|
| `201: Created`|`{ "message": "New post created" }`|
|`400: Bad request` |`{"error": {...} }`|
|`401: Unauthorized`|`{"error": { "name": "JsonWebTokenError", "message":"invalid token"}}`|


### PUT modify post

```http
  PUT /api/post/${id}
```

| Header | Parameter | Type     | Description                |
|:------  | :-------- | :------- | :------------------------- |
| `Authorization`:`Bearer ${your token}` | `${id}`| `string` | **Required**. Post ID      |

| Body      | Description                       |
| :--------  | :-------------------------------- |
|`title`| New post title|
|`message`| New post message|
|`image`| New post image|
|`deleteImage`| URL of current post image |
|`userId`|**Required**. User ID|

#### Response :
|Status|Body schema|
|:-----|:---|
| `200: Created`|`{ "message": "Post updated" }`|
|`400: Bad request` |`{"error": {...} }`|
|`401: Unauthorized`|`{"error": "Not Authrorized"`|


### PUT like post

```http
  PUT /api/post/like/${id}
```

| Header | Parameter | Type     | Description                |
|:------  | :-------- | :------- | :------------------------- |
| `Authorization`:`Bearer ${your token}` | `${id}`| `string` | **Required**. Post ID      |

| Body      | Description                       |
| :--------  | :-------------------------------- |
|`like`| Always send `"1"` |

#### Response :
|Status|Body schema|
|:-----|:---|
| `200: Created`|`{ "message": "Evaluation confirmed" }`|
|`400: Bad request` |`{"error": {...} }`|
|`401: Unauthorized`|`{"error": "Not Authrorized"`|

### DEL post

```http
  DEL /api/post/${id}
```

| Header | Parameter | Type     | Description                |
|:------  | :-------- | :------- | :------------------------- |
| `Authorization`:`Bearer ${your token}` | `${id}`| `string` | **Required**. Post ID|

#### Response :
|Status|Body schema|
|:-----|:---|
| `200: Created`|`{ "message": "Post deleted" }`|
|`400: Bad request` |`{"error": {...} }`|
|`401: Unauthorized`|`{"error": "Not Authrorized"`|
