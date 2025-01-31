# Teach - Elementary School Teacher Assistant Application

## Overview
**Teach** is a web application designed to assist elementary school teachers in managing their daily tasks, tracking student progress, and organizing lesson plans. The application aims to reduce the administrative burden on teachers, allowing them to focus more on delivering high-quality education and engaging with their students.

## Features
- **Automated Template Filling**: Pre-made templates for forms and reports to save time on routine paperwork.
- **Resource Materials**: Upload, organize, and access various teaching resources such as modules, videos, and learning activities.
- **Student Progress Tracking**: Monitor student performance, categorize students by achievement levels, and generate visual reports.
- **Administrative Task Scheduler**: Schedule tasks based on available time, task length, and priority.
- **Daily Time Record (DTR)**: Automatically calculate total work hours, leaves, and tardiness to simplify attendance tracking.

## Technology Stack
- **Frontend**: React, JavaScript, CSS
- **Backend**: C#, ASP.NET Core
- **Database**: Microsoft SQL Server

## Target Audience
The application is designed for **elementary school teachers** who manage large class sizes and need efficient tools to handle administrative tasks, lesson planning, and student progress tracking.

## Getting Started
To get started with the Teach application, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/Teach.git
   
2. **Install Dependencies**:
Navigate to the project directory and install the necessary dependencies for both the frontend and backend.
   ```bash
   cd Teach/frontend
   npm install
   cd ../backend
   dotnet restore

3. **Set Up the Database**:
- Ensure you have Microsoft SQL Server installed.
- Update the connection string in the appsettings.json file with your database credentials.
- Run the database migrations to set up the required tables.
   ```bash
   dotnet ef database update

4. **Run the Application**:
- Start the backend server:
   ```bash
   dotnet run
   
- Start the frontend development server:
   ```bash
   cd ../frontend
   npm start

## Collaborators
- Gabriel R. Abesamis
- Abdurasheed A. David
- Pamela T. Solosinda
- Kieferson Carl G. Supnet

## Licenses
MIT License

Copyright (c) 2025 Abesamis, David, Golosinda, Supnet

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
