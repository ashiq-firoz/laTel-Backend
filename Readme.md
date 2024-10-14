Here’s a basic `README.md` for your Express.js application with MongoDB, JWT, and CORS:


# LaTel - Backend

This is the backend for the Telecomm Management App built using **Express.js**, **MongoDB**, **JWT (JSON Web Token)** for authentication, and **CORS** for cross-origin requests. The app allows users to manage their telecom accounts by viewing account balances, tracking data usage, paying bills, and managing subscriptions.

## Features
- **Authentication**: User login via password or OTP, secured with JWT.
- **Account Management**: Real-time account balance and data usage tracking.
- **Payments**: Bill payment through multiple payment options.
- **Subscription Management**: Allows users to modify or renew telecom plans.
- **Exclusive Offers**: Display of exclusive offers based on user eligibility.
- **CORS Enabled**: Cross-Origin Resource Sharing is enabled to allow API access from different domains.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Make sure MongoDB is running locally or use a remote instance , MongoDB Atlas)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ashiq-firoz/laTel-Backend.git
   cd laTel-Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/telecomm-management
   JWT_SECRET=your_jwt_secret_key
   PORT=3002
   ```

   - Replace `MONGODB_URI` with your actual MongoDB connection string if using a remote instance.
   - Set `JWT_SECRET` to a strong secret key for JWT authentication.

4. **Run the MongoDB server:**

   Ensure MongoDB is running locally or you are connected to a remote instance.

5. **Start the application:**

   ```bash
   npm start
   ```

6. **Access the API:**

   The server will be running at [http://localhost:3002](http://localhost:3002).

## API Endpoints

### Authentication

- **POST /login**: Login with phone and password or OTP.
  
  **Request Body**:
  ```json
  {
    "phone": "1234567890",
    "password": "userpassword"
  }
  ```

  **Response**:
  - On success: Returns a JWT token.

### User Registration

- **POST /register**: Register a new user.

  **Request Body**:
  ```json
  {
    "phone": "1234567890",
    "password": "securepassword"
  }
  ```
  **Response**

   - 201 Created: {"message": "User registered successfully"}
   - 400 Bad Request: {"message": "User already exists"} (if the phone number is already registered)
  
### Account Management

- **GET /dashboard**: Get account balance, data usage, and bill status. Requires JWT.
  
- **GET /balance**: Get real-time account balance. Requires JWT.

- **GET /data-usage**: Get real-time data usage. Requires JWT.

### Payments

- **POST /pay-bill**: Pay a pending bill.
  
  **Request Body**:
  ```json
  {
    "amount": 100.00,
    "paymentMethod": "credit_card"
  }
  ```

### Subscription Management

- **POST /manage-subscription**: Modify or renew a subscription.
  
  **Request Body**:
  ```json
  {
    "newPlan": "premium"
  }
  ```

### Offers

- **GET /offers**: Fetch eligible exclusive offers. Requires JWT.

## Middleware

- **JWT Authentication**: Protects the dashboard, balance, data usage, and offers routes.
- **CORS**: Enabled by default, allowing API access from any origin. Customize it as needed.

## Development

```bash
npm start
```

## Database

This project uses MongoDB to store user details, such as account balance, data usage, and other related information.

### MongoDB Connection

The app uses Mongoose to interact with MongoDB. The MongoDB URI should be provided via the `MONGODB_URI` environment variable.

## Security

- **JWT Authentication**: All protected routes require a valid JWT token passed in the `Authorization` header.
- **Password Hashing**: User passwords are hashed using `bcryptjs` before being stored in the database.


