
# 🌍 Globetrotter's Guide

Welcome to the **Globetrotter's Guide** web application! This full-stack project serves as a dynamic platform for explorers and travel enthusiasts to discover, review, and share their favorite travel destinations—called **"Explorations."**

---

## 🚀 Features

* 🔍 **Browse Explorations**: Search and view detailed information on global travel destinations.
* ✍️ **Write Reviews**: Share your experiences and insights with other travelers.
* 📸 **Image Upload**: Upload photos of destinations (stored via Cloudinary).
* 📍 **Interactive Map**: View locations on an integrated Mapbox map.
* 🔐 **User Authentication**: Secure login and registration using Passport.js.
* 🛠️ **CRUD Operations**: Logged-in users can add, edit, and delete their Explorations.
* ⭐ **Rating System**: Rate places and view feedback from the community.
* 🛡️ **Security Enhancements**: Sanitized inputs, helmet headers, and route protection.

---

## 🛠️ Tech Stack

| Layer         | Technologies Used                                    |
| ------------- | ---------------------------------------------------- |
| **Frontend**  | HTML, CSS, JavaScript, EJS                           |
| **Backend**   | Node.js, Express.js                                  |
| **Database**  | MongoDB, Mongoose                                    |
| **Auth**      | Passport.js (Local Strategy)                         |
| **Cloud**     | Cloudinary (image hosting), Mapbox (map integration) |
| **Utilities** | Multer, Express-Validator, Method-Override, Helmet   |

---

## 💻 Installation

Follow these steps to run the project locally:

### 📋 Prerequisites

* [Node.js](https://nodejs.org/) and npm installed
* [MongoDB](https://www.mongodb.com/) installed and running locally or via Atlas
* A `.env` file with appropriate environment variables (see below)

### 📦 Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/itssiddharthGit/Globetrotter-Guide.git
   cd Globetrotter-Guide
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add the following:

   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   MAPBOX_TOKEN=your_mapbox_token
   DB_URL=mongodb://localhost:27017/globetrotters-guide
   SECRET=your_session_secret
   ```

4. **Start the application**:

   ```bash
   node app.js
   ```

5. Open your browser and visit:

   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
Globetrotter-Guide/
├── models/               # Mongoose schemas (User, Exploration, Review)
├── routes/               # Express routes (Explorations, Reviews, Users)
├── views/                # EJS templates
│   ├── explorations/
│   ├── reviews/
│   └── partials/
├── public/               # Static files (CSS, JS)
├── app.js                # Main application entry point
├── .env                  # Environment variables (not committed)
└── package.json
```

---

## 🔐 Security and Validation

* Input sanitation using `express-mongo-sanitize`
* HTTP headers with `helmet`
* Input validation via `express-validator`
* Route protection and role-based access for resources

---

## 🙌 Acknowledgements

* [Colt Steele's Web Dev Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/)
* [Cloudinary](https://cloudinary.com/)
* [Mapbox](https://www.mapbox.com/)
* [Passport.js](http://www.passportjs.org/)

---

## 🧑‍💻 Author

**Siddhartha Bachalakura**
[GitHub](https://github.com/itssiddharthGit)

---
