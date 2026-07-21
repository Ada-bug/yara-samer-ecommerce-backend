# E-Commerce Web Application

A full-stack e-commerce platform built as a hands-on project for an online course. This application allows users to browse products, manage a shopping cart, and simulate checkout processes using Node.js and JavaScript.

## Features
* **Product Catalog**: Dynamic browsing with filtering, searching, and categories.
* **Shopping Cart**: Add, update, and remove items with real-time price totals.
* **Simulated Checkout**: Mock payment gateway integration for order placement.

## APIs made
* Category API
* Product API
* Cart API
* Order API

## Tech Stack
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (with Mongoose)

## Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org) (v18 or higher recommended)
* [npm](https://npmjs.com) (comes bundled with Node.js)
* [MongoDB Atlas](https://mongodb.com)

## Installation & Setup

1. **Clone the repository:**
   ```bash
    git clone https://github.com/Ada-bug/yara-samer-ecommerce-backend
   ```

2. **Choose Directory:**
   ```bash
    cd e-commerce-api
   ```

3. **Install dependencies:**
   ```bash
    npm install
   ```

4. **Configure Environment Variables:**
   ```bash
    Create a `.env` file (see table)
   ```

5. **Seeding:**
     ```bash
     npm run seed
     ```

5. **Start the application:**
     ```bash
     npm run dev
     ```

## Project Structure
```text
├── config/          # Configuration file (it's empty tho)
├── controllers/     # Request handlers and business logic
├── models/          # Database schemas
├── routes/          # Express route definitionss
├── middleware/      # Contains the errorHandler and 404 Handler
├── utils/           # Conatins the AppError and AsyncHandler
├── scripts/         # For running the seed script
├── postman          # Postman collection
├── .env.example     # Example template for environment variables
├── .env             # Environment vars
├── README.md        # Project documentation
├── .gitignore       # Git ignore rules
└── app.js  # Application entry point
```

| Variable     | Description             | Example                              |
|---------------|------------------------|--------------------------------------|
| PORT          | Server port            | `3000`                               |
| MONGODB_URI   | MongoDB connection URL | `mongodb://localhost:27017/testdb`   |
| NODE_ENV      | Environment            | `development`                        |
| JWT_SECRET    | JWT secret key         | `123456789`                          |
| CORS_ORIGIN   | Allowed origin         | `http://localhost:3000`              |


## API Endpoints

## Categories API

| Method | URL | Description |
|--------|----------|-------------|
| `GET` | `/api/categories` | Retrieve all categories. |
| `GET` | `/api/categories/:id` | Retrieve a category by its ID. |
| `POST` | `/api/categories` | Create a new category. |
| `PATCH` | `/api/categories/:id` | Update an existing category. |
| `DELETE` | `/api/categories/:id` | Delete a category by its ID. |

## Products API

| Method | URL | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Retrieve all products. Supports filtering by category, price range, search term, and stock availability. |
| `GET` | `/api/products/:id` | Retrieve a product by its ID. |
| `POST` | `/api/products` | Create a new product. |
| `PATCH` | `/api/products/:id` | Update an existing product. |
| `DELETE`| `/api/products/:id` | Delete a product |

## Cart API

| Method | URL | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Retrieve the current shopping cart. Creates a cart if one does not already exist. |
| `POST` | `/api/cart/items` | Add a product to the shopping cart. |
| `PATCH` | `/api/cart/items/:productId` | Update the quantity of a product in the shopping cart. |
| `DELETE` | `/api/cart/items/:productId` | Remove a product from the shopping cart. |
| `DELETE` | `/api/cart` | Empty the shopping cart. |

## Orders API

| Method | URL | Description |
|--------|----------|-------------|
| `POST` | `/api/orders` | Create a new order by checking out the current shopping cart. |
| `GET` | `/api/orders` | Retrieve all orders. |
| `GET` | `/api/orders/:id` | Retrieve an order by its ID. |
| `PATCH` | `/api/orders/:id/status` | Update the status of an existing order. |


## Important Notes
* The express version is [4.22.2], which is vital in order for express-mongo-sanitize to work
* The git history might be a little messy. I hadn't known about the pull request and
fully worked on the [main] so I made a new repo and fetched everything.
* In the cart API, I really didn't understand whether the `DELETE /api/cart/items/:id` was
supposed to remove the item entirely or just decrease the quantity so wrote both, but the
one that actually runs removes the item entirely.
* In the [Dev.postman_environment.json], you'll find that the orderId variable is empty,
that is because every time the `POST /api/orders` runs, mongoose generates a unique _id for
the order, soo I put a post-script in the scripts tab which takes the _id and stores it in
the orderId variable
* The [appConfig.js] file is never used anywhere. Why? Well first the project doesn't explain
what I'm supposed to put in it, so I just made a general appConfig file. Second, it's *REQUIRED*
in the rubric to import the process.env in the app.js and the connect.js
(the files that need the .env variables) so an appConfig, in this case, is literally useless.
