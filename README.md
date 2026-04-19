# 🏛️ Civic Buddy

<div align="center">

![Civic Buddy Banner](https://civic-buddy.vercel.app/_next/static/media/Emblem_of_India.5f658b8a.svg)

**A citizen-first platform to report and track civic issues directly with the responsible government body.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://civic-buddy.vercel.app)

[🌐 Live Demo](https://civic-buddy.vercel.app) · [🐛 Report Bug](https://github.com/harshkaushik31/civic-buddy/issues) · [✨ Request Feature](https://github.com/harshkaushik31/civic-buddy/issues)

</div>

---

## 📖 About

Civic Buddy is a citizen-first web platform that empowers people to report municipal and civic issues directly to the responsible government body. From potholes and waste management to streetlights and water supply, Civic Buddy makes the reporting process faster, more transparent, and efficient.

By bridging the gap between citizens and authorities, Civic Buddy ensures every complaint is heard, tracked, and resolved — helping build cleaner, safer, and smarter communities.

---

## ✨ Features

- **📝 Issue Reporting** — Report common municipal problems such as potholes, streetlight outages, garbage collection, water supply failures, and other local civic concerns.
- **🗺️ Interactive Heatmap** — Visualize complaint hotspots in your area using a Leaflet-powered interactive map with clustering and heatmap layers.
- **📬 Smart Complaint Routing** — Submitted reports are automatically routed to the correct government department or municipal body.
- **🔍 Complaint Tracking** — Registered users can track the status of their complaints and receive updates.
- **🔐 Authentication** — Secure user registration and login using JWT and bcrypt password hashing.
- **🖼️ Image Uploads** — Attach photos to your complaint reports via Cloudinary.
- **📧 Email Notifications** — Automated email updates sent via Nodemailer.
- **🤖 Machine Learning** — ML-powered insights to assist complaint categorization and prioritization.
- **📱 Responsive Design** — Fully responsive UI built with Tailwind CSS, works seamlessly on all devices.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Frontend** | React 19, Tailwind CSS 4, Lucide React |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT) + bcryptjs |
| **Maps** | Leaflet, React-Leaflet, React-Leaflet-Cluster, Leaflet.heat |
| **Image Storage** | Cloudinary |
| **Email** | Nodemailer |
| **HTTP Client** | Axios |
| **Notifications** | React Hot Toast |
| **ML** | Machine Learning model (complaint classification) |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- A [MongoDB](https://www.mongodb.com/) database (Atlas or local)
- A [Cloudinary](https://cloudinary.com/) account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/harshkaushik31/civic-buddy.git
cd civic-buddy
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root of the project and add the following:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Nodemailer (e.g., Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

# App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
civic-buddy/
├── public/             # Static assets
├── assets/             # Project assets (images, icons)
├── src/
│   ├── app/            # Next.js App Router pages & API routes
│   ├── components/     # Reusable React components
│   ├── lib/            # Utility functions, DB connection, helpers
│   └── models/         # Mongoose data models
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── README.md
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server at `localhost:3000` |
| `npm run build` | Builds the app for production |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint for code quality checks |

---

## 🌍 Deployment

Civic Buddy is deployed on **Vercel**. To deploy your own instance:

1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Add all required environment variables in the Vercel dashboard.
4. Click **Deploy**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/harshkaushik31/civic-buddy)

---

## ❓ FAQ

**What kind of issues can I report?**
You can report potholes, streetlight outages, garbage collection, water supply issues, and other local civic concerns.

**Do I need an account to submit a complaint?**
No. You can submit issues as a guest. However, registering lets you track your complaint status and receive updates.

**Is my personal information shared with authorities?**
Only the information necessary to resolve the complaint is shared. Your data is encrypted and never sold or used for marketing purposes.

**How does Civic Buddy forward my complaint?**
Once you submit a report, Civic Buddy automatically routes it to the correct government department or municipal body responsible for handling it.

---

## 👥 Team

| Name | Role |
|---|---|
| **Harsh** | Full Stack Developer |
| **Divyanshu** | UI/UX Designer |
| **Aksh** | ML Engineer |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code passes linting (`npm run lint`) before submitting.

---

## 📄 License

This project is open source. See the repository for more details.

---

## 📬 Contact

Have a question or suggestion? Reach out via the [Contact page](https://civic-buddy.vercel.app/contact) on the live site.

---

<div align="center">
Made with ❤️ for better communities · <a href="https://civic-buddy.vercel.app">civic-buddy.vercel.app</a>
</div>