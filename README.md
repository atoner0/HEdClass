# TABLE OF CONTENTS
* [About The Project](#about-the-project)
* [Technologies](#technologies)
* [Setting Up](#setting-up)
* [Login Details](#login-details)
* [Usage](#usage)

## About The Project
HEdClass is a web-based classification system designed for use by higher education institutions. It enables classification officers to manage student records, apply classification rules and generate final award outcomes.

The system automates classification calculations, supports manual overrides, and provides statistical insights for cohort analysis

## Technologies
This application uses the following technologies:
- EJS
- Express
- Chart.js
- Bcrypt
- Mysql2

## Setting Up
1. Clone the repo 
    ```sh
    git clone https://gitlab.eeecs.qub.ac.uk/40365038/hedclass
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Configure database connection (XAMPP/MAMP)
    - defaulted to XAMPP
4. Import the database from:
    /src/seeder/seed.sql
5. Start the server:
    ```sh
    npx nodemon
    ```
6. Open in browser:
    ```sh
    http://localhost:3000
    ```

## Login Details

### Admin
Responsible for managing officers and programmes

**Email** admin@hedclass.com
**Password** password123

### Officers
Responsible for managing students and their classifications

**Email** officer1@hedclass.com
**Password** password123

**Email** officer2@hedclass.com
**Password** password123

## Usage
### Admin User
1. Log in using admin credentials
2. Manage classification officers (add/edit/delete)
3. Manage programmes
4. Assign officers to programmes

### Classification Officer
1. Log in using officer credentials
2. View assigned programmes on dashboard
3. Select "Manage Cohort" to view students
    - Add, edit, or delete student records
    - View and manage student results
    - Run batch classification to generate proposed classifications
    - Approve/override classifications
    - Export classifications to CSV
4. Select "View statistics" to view programme statistics