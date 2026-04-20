# REST API for Angular Course in SoftUni (POPS App Backend)

## Getting started

Let’s make our first API request to the REST API:

```
https://localhost:3000/api/test
```

Response:

```json
{
  "name": "rest-api",
  "version": "1.0.0",
  "description": "REST-api for back-end of Angular course workshop in SoftUni",
  "main": "index.js"
}
```

---

## Base URL

```
https://localhost:3000/api
```

---

## Authentication

This API is not public. Authentication is required to store and retrieve data. You must register and log in via the API or the connected React app.

---

# Endpoints: Users

- `/users/register` — sign up
- `/users/login` — sign in
- `/users/logout` — log out

---

## Register User

### URL
`/users/register`

### Method
`POST`

### Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@email.com",
  "age": 25,
  "password": "SecurePass123!"
}
```

### Required

- email
- firstName (required)
- age (min: 15, max: 110)
- password (min 8 chars, must include uppercase, lowercase, number, special character)

### Success Response

```json
{
  "categories": [],
  "sessions": [],
  "_id": "5f1875690916010017964978",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@email.com",
  "age": 25,
  "created_at": "2020-10-14T08:04:12.196Z",
  "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response

```json
{
  "message": "This email is already registered!"
}
```

---

## Login User

### URL
`/users/login`

### Method
`POST`

### Body

```json
{
  "email": "john@email.com",
  "password": "SecurePass123!"
}
```

### Success Response

```json
{
  "categories": ["5f85c51996b5601b2406e5b7"],
  "sessions": ["5f86bdcde012743fe4f5b324"],
  "_id": "5f1875690916010017964978",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@email.com",
  "age": 25,
  "created_at": "2020-10-14T08:04:12.196Z",
  "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

---

## Logout User

### URL
`/users/logout`

### Method
`POST`

### Success Response

```json
{
  "message": "Logged out!"
}
```

---

# Endpoints: Categories

## Get Categories

### URL
`/categories`

### Method
`GET`

### Success Response

```json
[
  {
    "subscribers": ["5f8580d25d1da62568dd38fd"],
    "sessions": ["5f858dd2d895ad23602db9d5"],
    "_id": "5f858dd2d895ad23602db9d4",
    "categoryName": "Some Category",
    "userId": "5f8580d25d1da62568dd38fd",
    "created_at": "2020-10-13T11:21:54.863Z",
    "updatedAt": "2020-10-13T11:21:54.898Z",
    "__v": 0
  }
]
```

### Error Response

```json
{ "message": "Something went wrong!" }
```

---

## Create Category

### URL
`/categories`

### Method
`POST`

### Body

```json
{
  "categoryName": "Some Category Title",
  "sessionText": "Some session text"
}
```

---

## Create Session

### URL
`/categories/:categoryId`

### Method
`POST`

### Body

```json
{
  "sessionText": "Some session text"
}
```

---

# Endpoints: Sessions

## Edit Session

### URL
`/categories/:categoryId/sessions/:sessionId`

### Method
`PUT`

### Body

```json
{
  "sessionText": "Changed text"
}
```

### Success Response

```json
{
  "likes": [],
  "_id": "5f86c3fcbfa44331a0ff0095",
  "text": "Changed text",
  "userId": "5f86c1f0a112c130e89964af",
  "categoryId": "5f85c51996b5601b2406e5b7",
  "created_at": "2020-10-14T09:25:16.203Z",
  "updatedAt": "2020-10-14T09:31:45.021Z",
  "__v": 0
}
```

---

## Delete Session

### URL
`/categories/:categoryId/sessions/:sessionId`

### Method
`DELETE`

---

## Like Session

### URL
`/likes/:sessionId`

### Method
`PUT`

### Success Response

```json
{
  "message": "Liked successful!"
}
```

---

## Note

This REST API is a backend provided by SoftUni, slightly modified to fit the needs of the POPS Angular application.

Renaming applied:

- themes → categories  
- theme → category  
- posts → sessions  
- post → session  
```
