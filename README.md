# E-Commerce

An eCommerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This project allows users to browse products, add them to cart, place orders, and manage their accounts. Admins can manage products, users, and orders.

## Features

### Frontend

- **User Authentication**: Register, login, and manage user profiles.
- **Product Browsing**: View products with pagination, search, and filtering.
- **Shopping Cart**: Add, remove, and update cart items.
- **Checkout Process**: Shipping, payment (PayPal integration), and order placement.
- **Order Management**: View order history and details.
- **Admin Panel**: Manage products, users, and orders (admin-only).
- **Responsive Design**: Built with Bootstrap for mobile-friendly UI.
- **SEO Friendly**: Uses React Helmet for meta tags.

### Backend

- **RESTful API**: Endpoints for products, users, orders, and file uploads.
- **Authentication & Authorization**: JWT-based auth with role-based access (user/admin).
- **Database**: MongoDB with Mongoose for data modeling.
- **File Uploads**: Multer for image uploads.
- **Error Handling**: Custom middleware for errors and async operations.
- **Security**: Password hashing with bcrypt, cookie-based sessions.
- **Payment Integration**: PayPal for secure payments.

## Tech Stack

### Frontend

- **React**: UI library
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Bootstrap**: CSS framework
- **React Bootstrap**: UI components
- **PayPal React JS**: Payment integration
- **React Toastify**: Notifications

### Backend

- **Node.js**: Runtime
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Multer**: File uploads
- **Cookie Parser**: Cookie handling

## Screenshots

![Home Screen](frontend/public/images/screens.png)
![Product Sample](frontend/public/images/sample.jpg)
![Product Airpods](frontend/public/images/airpods.jpg)
![Product Alexa](frontend/public/images/alexa.jpg)
![Product Camera](frontend/public/images/camera.jpg)
![Product Mouse](frontend/public/images/mouse.jpg)
![Product Phone](frontend/public/images/phone.jpg)
![Product PlayStation](frontend/public/images/playstation.jpg)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/E-COMMERCE.git
   cd E-COMMERCE
   ```

2. **Install dependencies**:
   - For the entire project (backend and frontend):
     ```bash
     npm install
     ```
   - For frontend only:
     ```bash
     cd frontend
     npm install
     cd ..
     ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with:

   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

4. **Seed the database** (optional):
   ```bash
   npm run data:import
   ```

## Usage

1. **Start the development server**:

   ```bash
   npm run dev
   ```

   This runs both backend (port 5000) and frontend (port 3000) concurrently.

2. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

3. **Admin access**:
   - Create an admin user or modify an existing user in the database to have `isAdmin: true`.

## Production Deployment

### Backend Deployment

1. **Choose a hosting platform**: Heroku, Railway, DigitalOcean, etc.
2. **Set environment variables** on the platform:
   - `NODE_ENV=production`
   - `PORT` (as assigned by the platform)
   - `MONGO_URI` (use MongoDB Atlas for production DB)
   - `JWT_SECRET`
   - `PAYPAL_CLIENT_ID`
3. **Build and deploy**:
   - For Heroku: Push to Heroku git, it will install dependencies and start with `npm start`.
   - Ensure MongoDB is accessible and CORS is configured if needed.

### Frontend Deployment

1. **Build the frontend**:

   ```bash
   cd frontend
   npm run build
   ```

   This creates a `build` folder with optimized static files.

2. **Deploy to a static hosting service**: Vercel, Netlify, GitHub Pages, etc.
   - Upload the `build` folder.
   - Set the backend API URL in the build (update proxy or use environment variables).
   - For production, update the proxy in `package.json` or use `REACT_APP_API_URL` environment variable.

3. **Configure API calls**:
   - In production, the frontend will call the deployed backend URL instead of localhost.
   - Update any hardcoded URLs in the frontend code.

### Full-Stack Deployment (Optional)

- Use platforms like Vercel or Railway that support full-stack apps.
- Deploy backend and frontend together, configuring the frontend to proxy to the backend.

### Additional Steps

- **Database**: Use MongoDB Atlas for a cloud database.
- **File Uploads**: For production, consider using cloud storage like AWS S3 for uploaded images.
- **Security**: Ensure HTTPS, validate inputs, and monitor for vulnerabilities.
- **Monitoring**: Set up logging and error tracking (e.g., Sentry).

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Borra Alexander</content>
<parameter name="filePath">c:\Users\alex\Desktop\E-commerce\README.md
