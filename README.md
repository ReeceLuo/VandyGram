# Change++ Fall 2025 Coding Challenge - Reece Luo
---

**Name:** Reece Luo

**Email:** reece.w.luo@vanderbilt.edu

<img width="961" height="260" alt="logo1" src="https://github.com/user-attachments/assets/3cdfd606-e6f5-4259-bf91-a460ce34b7aa" />

## About this project:
This project is built on the MERN stack (MongoDB, Express.js, React.js, and Node.js). At first, the project felt daunting because of the number of moving parts across the frontend and backend like React components, database management, middleware, and server-side logic, but as I learned about the different technologies, I became more confident in connecting each piece into a cohesive, robust system. I reinforced my understanding of how APIs enable communication between different layers of an application, learned to define schemas for data storage, and gained a stronger grasp of state management in React. I also practiced valuable debugging techniques, especially when using TypeScript to nail down the frontend and authentication for api calls. Overall, this project was a rewarding experience that strengthened both my technical breadth and architectural skills.

## 🛠️ Tech Stack
- Frontend: React.js + Vite
- Backend: Node.js + Express.js
- Database: MongoDB
- Authentication: Clerk
- Media Storage: ImageKit
- Email notifications: Nodemailer + Brevo
- Workflows / Background Jobs: Inngest

## ✨ Features  
- **Personalize your page** - Add your **bio**, **major**, **year** in school, and **residential area** to your profile!
  
- **Discover other Commodores** - **Search** for other students by name, residential area, or major in the **Discover** page!

- **Follow System** - Follow or unfollow other users to **personalize** your feed  

- **Stories** - Post temporary **stories** visible for only **24 hours** before disappearing!

- **Notifications** - Receive **email notifications** when you get a friend request!  


## Viewing the program:
Hosted on [Vercel](https://vandy-gram-deployment.vercel.app/)! Click the link and make an account to join the platform. Feel free to contact me if there are any issues with accessing the app!


## 🚀 To run locally
1. **Clone the repository:**
   ```
   git clone https://github.com/ReeceLuo/VandyGram.git
   cd VandyGram
   ```
2. **Install dependencies**
   ```
   cd client
   npm install
   cd ../server
   npm install
   ```
3. **Add .env variables for client**
   ```
   VITE_CLERK_PUBLISHABLE_KEY=
   VITE_BASEURL=
   ```
4. **Add .env variables for server** (good luck ToT)
   ```
   // Deployment
   FRONTEND_URL=
   // MongoDB
   MONGODB_URL=
   // Inngest events
   INNGEST_EVENT_KEY=
   INNGEST_SIGNING_KEY=
   // Clerk auth
   CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   // Imagekit storage
   IMAGEKIT_PUBLIC_KEY=
   IMAGEKIT_PRIVATE_KEY=
   IMAGEKIT_URL_ENDPOINT=
   // SMTP (for nodemailer)
   SENDER_EMAIL=
   SMTP_USER=
   SMTP_PASSWORD=
   ```
5. **Run client and server**
   ```
   // cd into client
   npm run dev
   // cd into server
   npm run server
   ```
  
**Thank you for your visiting VandyGram!**
