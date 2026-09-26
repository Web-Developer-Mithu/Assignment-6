# FitLog — Modern Workout Library & Planner

FitLog is a dark-aesthetic, high-performance gym companion web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. Pick your lifts from a comprehensive library, log them into today's plan, save routines for later, and track your daily workout volume in real-time.

---

## 🌟 Key Features

1. **🏋️ Workout Library**:
   - Displays 12 curated lifts covering major muscle groups with difficulty ratings, equipment details, estimated calories burned, and duration.
   - Smooth in-page anchor navigation (`#library`) from the hero section.

2. **📋 Workout Details View**:
   - Two-column responsive layout featuring large high-resolution illustrations, full specifications panel (equipment, difficulty, sets, reps, duration, calories, rating), and numbered step-by-step instructions.

3. **📊 Dynamic My Plan Dashboard (`/my-plan`)**:
   - **Real-Time Metrics Summary**: Calculates total exercises, cumulative workout minutes, and total calories burned live as items are added, removed, or completed.
   - **Tab System**: Easily switch between **Today's Plan** and **Saved** lifts.
   - **Interactive Tasks**: Mark exercises as "Done" (`Mark as Done` / `Completed` state) or remove them with a single click.

4. **⚡ Dynamic Sorting**:
   - Re-sort workouts seamlessly by **Duration**, **Calories**, or **Rating** directly from the UI.

5. **🔔 Interactive Toast Notifications**:
   - Real-time feedback using custom-styled dark neon toasts when adding to plan, removing, saving for later, or marking lifts complete.
   - Intelligent 5-lift daily cap alert to prevent overtraining.

6. **💾 LocalStorage Persistence**:
   - Workout plans, saved exercises, and completion states are stored locally in the browser so data survives page refreshes and browser restarts.

7. **📱 100% Responsive Design**:
   - Pixel-perfect adaptability across mobile, tablet, and desktop viewports, with a custom 404 page and shimmer loading skeleton.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16** | App Router, SSR, Server Components & Static Site Generation |
| **React 19** | Component architecture, state management & hooks |
| **TypeScript** | Type safety and robust interface definitions |
| **Tailwind CSS v4** | Modern responsive dark UI styling & animations |
| **React Hot Toast** | Notification alerts for user interactions |
| **LocalStorage API** | Client-side persistent storage |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.17 or higher recommended)
- npm / yarn / pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Web-Developer-Mithu/Assignment-6.git
   cd Assignment-6
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```
├── public/                 # Static assets, logos & illustrations
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with global context, Toaster & Navbar
│   │   ├── page.tsx        # Home page (Hero + Workout Library)
│   │   ├── loading.tsx     # Skeleton loading state
│   │   ├── not-found.tsx   # Custom 404 page
│   │   ├── my-plan/        # /my-plan route
│   │   └── workout/[id]/   # Dynamic workout details route
│   ├── components/
│   │   ├── Navbar.tsx      # Sticky header with active tabs & live badges
│   │   ├── Hero.tsx        # Hero banner with CTA anchor button
│   │   ├── WorkoutLibrary.tsx # 3x4 grid workout library
│   │   ├── WorkoutCard.tsx # Workout card component
│   │   ├── WorkoutDetailView.tsx # 2-column detailed workout view
│   │   ├── PlanView.tsx    # My Plan dashboard with stats & cards
│   │   └── Footer.tsx      # Dark branded footer
│   └── context/
│       └── WorkoutContext.tsx # Centralized state management & LocalStorage
└── package.json
```

---

## 📜 License
Developed for Assignment 6. All rights reserved © 2026 FitLog.