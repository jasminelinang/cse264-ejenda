# cse264 - Ejenda

## Project Members
- Aliza Askari  
- Meghan Ho  
- Jasmine Linang  

---

## Frameworks and Libraries

**Frontend:** React + Vite  
**Backend:** Supabase  
**New Library:** GSAP  
**Internal REST API:** Node / Express  
**External REST APIs:** Wger, TheMealDB  

---

## 1. Overview

Ejenda is a web application designed to help users organize, schedule, and track daily tasks across academic and personal life. The platform centralizes workouts, meal prep planning, ingredient tracking, and scheduling into one unified interface.

---

## 2. Features and Functionality

Ejenda provides the following capabilities:

- Create workout routines or meal-prep schedules  
- Add ingredients and meal plans to the dashboard  
- Give daily affirmations 
- View tasks in both list and calendar formats  
- Log in and store user data in the database  

**The application fulfills the course project requirements by offering:**

- Fully functional user authentication and database integration  
- An interactive, user-friendly interface  
- Real-time data storage and retrieval  
- Multiple pages and dynamic application behavior  

---

## 3. User Workflow

When a user visits Ejenda, they first encounter a login or sign-up screen. After successful authentication, users can:

- Create, edit, and delete workouts based on fitness goals  
- Build weekly meal-prep plans based on protein or nutrition targets (future implementation) 
- Generate a recipe list  
- Integrate with the Google Calendar API to sync workout routines and cooking times (future implementation goal) 

This workflow allows users to manage daily tasks in a clean and centralized system.

---

## 4. Tech Stack

- **Frontend:** React, JavaScript, CSS  
- **Backend:** Node-based API functions (as needed), AWS Amplify configuration  
- **Database:** Supabase (PostgreSQL managed via Supabase)   
- **Additional Libraries:** React Router, Supabase Client SDK, GSAP, date/calendar UI library (TBD)  

---

## 5. Installation

1. Clone the repository:  
   ```bash
   git clone git@github.com:jasminelinang/cse264-ejenda.git
   cd cse264-ejenda
   'npm install'
   'npm run dev' on both client and server side
   .env file is needed to connect to supabase
