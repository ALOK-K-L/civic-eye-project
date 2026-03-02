Civic Eye: Integrated Municipal Reporting and Management System
Civic Eye is a specialized digital infrastructure platform designed to facilitate transparent communication between citizens and municipal authorities. The system streamlines the reporting of public utility failures and infrastructure concerns, ensuring that every submission is documented, routed to the correct department, and tracked through to resolution.

Project Overview
The primary objective of Civic Eye is to eliminate the lack of transparency often found in traditional civic reporting. By providing a centralized, role-based platform, the application ensures that municipal departments (such as PWD or Waste Management) are held accountable for public grievances while giving citizens a verifiable record of their interactions with local government.

Core Functionality
Role-Based Access Control (RBAC)
The platform is built on a three-tier permission system to ensure data security and operational efficiency:

Citizen Portal: Allows for authenticated users to submit reports, upload photographic evidence, and monitor the real-time status of their specific complaints.

Departmental Interface: Provides specialized views for authorized personnel in PWD, Waste and Sanitation, and the City Corporation. Staff can update statuses and provide progress notes.

Administrative Oversight: A high-level dashboard for system administrators to manage personnel, monitor cross-departmental performance, and maintain system configurations.

Automated Report Processing
Geolocation Tagging: Reports are automatically associated with location data to assist field teams in identifying issue sites accurately.

Intelligent Routing: The system categorizes reports based on user input and directs them to the appropriate departmental queue, reducing manual sorting time.

Status Synchronization: Real-time updates ensure that the transition from 'Pending' to 'Resolved' is instantly reflected across all user dashboards.

Technical Architecture
Frontend
Core Technologies: Developed using HTML5, CSS3, and modern JavaScript (ES6+).

Design Methodology: A custom-built design system implemented through vanilla CSS for performance optimization and a lightweight footprint.

Responsiveness: Fully adaptive UI designed to maintain functionality across desktop and mobile browsers.

Backend and Persistence
Database & Authentication: Leverages Firebase and Google Firestore for real-time data synchronization and secure, encrypted user authentication.

Media Management: Integration with the Imgbb API for scalable, cloud-hosted storage of photographic evidence submitted by citizens.

System Structure

/
├── index.html                # Entry point and Authentication
├── signup.html               # User Registration Logic
├── style.css                 # Global Design System
├── script.js                 # Primary Application Logic and API Integration
├── firebase-config.js        # Infrastructure Configuration
├── dashboard_citizen.html    # User-facing reporting portal
├── dashboard_pwd.html        # Public Works Department interface
├── dashboard_waste.html      # Sanitation Department interface
├── dashboard_citycorp.html   # Municipal Corporation interface
├── dashboard_admin.html      # Central Administrative Control
├── track.html                # Public Issue Tracking Interface
└── contact.html              # Support and Documentation
Installation and Deployment
To run a local instance of the platform for development or testing, follow these steps:

Repository Initialization


git clone https://github.com/ALOK-K-L/civic-eye-project.git
cd civic-eye-project
Environment Configuration

Initialize a project in the Firebase Console.

Enable Authentication (Email/Password) and Firestore.

Populate firebase-config.js with your specific API credentials.

Obtain an API key from Imgbb and update the imgbbApiKey variable within script.js.

Local Execution
The application can be served using any standard web server. For development in VS Code, the "Live Server" extension is recommended.
