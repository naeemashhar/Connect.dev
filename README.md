# 🚀 Connect.dev – Professional Developer Networking Platform

Connect.dev is a full-stack MERN application where developers can connect, collaborate, and grow their network in a professional environment.

🌐 **Live Demo:** [http://13.48.104.170/](http://13.48.104.170/)  
🔗 **GitHub Repo:** [https://github.com/naeemashhar/Connect.dev](https://github.com/naeemashhar/Connect.dev)

---

## 📌 Features

### 👤 Profile Management
- Real-time profile editing (name, bio, title, skills, etc.)
- Upload profile image and update public information
- View your own connections and pending requests

### 🤝 Connect & Match
- Swipe-like user feed (Accept / Ignore)
- Accept or Reject incoming connection requests
- Track who you matched with on the **Connections** page

### 💬 Chat System
- 1-on-1 real-time messaging
- Emoji picker integrated for smoother conversation

### 💳 Premium Plans (Demo)
- Silver & Gold subscription options using **Razorpay**
- Premium users are highlighted with plan-specific badges

### 📧 Email Notifications (Amazon SES + Cron)
- Daily email report of **mutual connection requests**
- Automated via **Node-Cron**
- Sent using **Amazon SES** from a verified sender
- Runs every morning at 8 AM

```js
cron.schedule("0 8 * * *", async () => {
  // Checks yesterday’s mutual requests and sends daily summary
});
```

---

## 🛠️ Tech Stack

| Frontend         | Backend        | Database | DevOps   | Payments | Email |
|------------------|----------------|----------|----------|----------|-------|
| React + Vite     | Node.js + Express | MongoDB  | AWS EC2 + Nginx | Razorpay (demo) | Amazon SES + Cron |

---

## 📁 Project Structure

```
client/         # React frontend with Tailwind + DaisyUI
server/         # Node.js backend with Express
models/         # Mongoose schemas
routes/         # API endpoints (auth, user, chat, etc.)
utils/          # Helpers for Razorpay, email, cron logic
```

---

## 🔐 Deployment

- App is deployed on **AWS EC2** using **Nginx** for routing
- React frontend served via Nginx, backend proxied to `/api`
- Environment variables stored securely on server
- Email service via **Amazon SES**, requests tracked and dispatched automatically

---

## 🧑‍💻 Contributing

Planning to open-source parts of this project soon.  
**Drop a 💬 or DM if you're interested in contributing or learning more about the project structure, logic, or best practices followed!**

---

## 📬 Contact

**Made with 💙 by Naeem Ashhar**  
📫 Feel free to reach out on LinkedIn or GitHub for questions or collaborations.

---

