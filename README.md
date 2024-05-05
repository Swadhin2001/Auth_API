## Auth_API Documentation

Register users with email/password, validate via OTP, store data, login with JWT, retrieve user info securely.

## Folder Structure

```
.
├── src --------- Source code root
│   ├── controllers --------- Route specific application logic.
│   │   ├──info.controller.ts
│   │   ├──login.controller.ts
│   │   ├──signup.controller.ts
│   │   ├──user.controller.ts
│   │   └──verify.controller.ts
│   ├── db --------- Reusable components related to database
│   │   └──index.ts
│   ├── routes --------- Reusable components for routing
│   │   └──index.ts
│   ├── schema --------- Reusable components related to data schema definitions
│   │   └──user.model.ts
│   ├── utils --------- Global utility functions
│   │   ├── asyncHandler.ts ------ Utility functions for handling asynchronous operations.
│   │   ├── nodemailerConfig.ts ------ Configuration settings for nodemailer
│   │   └── verifyToken.ts --- Function for verifying tokens
│   └index.ts
├── .env
├── package.json
├── README.md
└── tsconfig.json ----- TypeScript configuration file
```

### 1. User Registration

#### Endpoint:
```
POST /signup
```

#### Description:
Allows users to register on the website using their email and password.

#### Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Response:
- `200 OK`: User registered successfully.
- `400 Bad Request`: Invalid request or user already exists.

---

### 2. Email Verification

#### Endpoint:
```
POST /verify
```

#### Description:
Sends an OTP (One-Time Password) to the user's email for account validation.

#### Request Body:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

#### Response:
- `200 OK`: User Verified.
- `400 Bad Request`: Invalid request or user not found.

---

### 3. User Information Update

#### Endpoint:
```
POST /info
```

#### Description:
Allows users to validate their account using the OTP received and update additional information like location, age, and work details.

#### Request Body:
```json
{
  "email": "user@example.com",
  "location": "New York",
  "work_details": "Software Engineer"
}
```

#### Response:
- `200 OK`: User details added successfully.
- `400 Bad Request`: Invalid request or user not found.

---

### 4. User Login and JWT Token Generation

#### Endpoint:
```
POST /login
```

#### Description:
Allows users to log in using their email and password and generates a JWT (JSON Web Token) for authentication.

#### Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Response:
- `200 OK`: Login successful. JWT token generated.
- `401 Unauthorized`: Invalid email or password.

---

### 5. Retrieve User Information

#### Endpoint:
```
GET /user
```

#### Description:
Retrieves all information of the logged-in user using the JWT token.

#### Request Header:
```
Authorization: Bearer <JWT token>
```

#### Response:
- `200 OK`: User information retrieved successfully.
- `401 Unauthorized`: Invalid or expired JWT token.

---

These are the endpoints provided by the Auth API for user registration, validation, login, and information retrieval. Please make sure to include appropriate error handling and security measures in the implementation.
