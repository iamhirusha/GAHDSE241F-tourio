# Tour Plan Management System

## Overview
The Tour Plan Management System is a web and mobile application designed to streamline the process of planning and booking tours. It connects travelers, tour guides, and hotels by allowing them to publish and purchase predefined or custom tours.

## Features
### User Roles
- *Travelers*: Browse, modify, and book tours; request custom tours; track tour progress; leave feedback.
- *Tour Guides*: Publish predefined tours; submit proposals for custom tour requests; verify traveler attendance at destinations.
- *Hotels*: Offer accommodations as part of tours; publish predefined tour packages.
- *Admin*: Manage user accounts, monitor transactions, and oversee system functionality.

### Functionalities
1. *User Registration & Role Management*
   - Travelers, tour guides, and hotels can create accounts.
   - Admin manages user roles and permissions.
2. *Tour Browsing & Booking*
   - Travelers can browse and purchase pre-defined tour plans.
   - Options such as meal type, vehicle type, and accommodation can be customized.
3. *Custom Tour Requests*
   - Travelers can create custom tour requests.
   - Guides and hotels can submit proposals.
   - Travelers can select the best proposal.
4. *Tour Verification*
   - During a tour, guides scan QR codes at each destination to verify attendance.
   - The system updates the tour status accordingly.
   - Travelers can view real-time tour progress.
5. *Feedback System*
   - Travelers can leave feedback for guides and hotels.
   
## Tech Stack
- *Frontend*: React.js (Web), Kotlin (Mobile)
- *Backend*: Node.js
- *Database*: Google Firebase
- *Authentication*: Firebase Authentication

## Setup
Install dependencies before starting the backend server:

```bash
cd backend/tourio
npm install --ignore-scripts
```

Then run the development server with:

```bash
npm run dev
```



## Repository URL
[GitHub Repository](https://github.com/NIBM-GALLE/GAHDSE241F-tourio)
