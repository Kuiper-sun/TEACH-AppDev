import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import DocumentLayout from './pages/DocumentLayout';
import LessonPlan from './pages/LessonPlan';
import Resources from './pages/Resources';
import Modules from './pages/Modules';
import ModuleViewer from './pages/ModuleViewer';
import StudentProgress from './pages/StudentProgress';
import AddStudentDataForm from './pages/AddStudentDataForm';
import DailyLessonLog from './pages/DailyLessonLog'; 
import TaskScheduler from './pages/TaskScheduler';
import DailyTimeRecord from './pages/DailyTimeRecord';
import Activities from './pages/Activities';
import ActivitiesViewer from './pages/ActivitiesViewer';
import Videos from './pages/Videos';
import VideosViewer from './pages/VideosViewer';


function App() {
  return (
    <Router>
      <Routes>
        {/* Auth & Public Routes */}
        <Route path="/" element={<CreateAccount />} /> {/* Default route updated */}
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Document Routes */}
        <Route path="/document-layout" element={<DocumentLayout />} />
        <Route path="/lesson-plan" element={<LessonPlan />} />
        <Route path="/daily-lesson-log" element={<DailyLessonLog />} />
        
        {/* Resource Routes */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/task-scheduler" element={<TaskScheduler />} />
        <Route path="/daily-time-record" element={<DailyTimeRecord />} />
        {/* Update module viewer route to accept dynamic module ID */}
        <Route path="/modules/:moduleId" element={<ModuleViewer />} />
        <Route path="/student-progress" element={<StudentProgress />} />
        <Route path="/add-student" element={<AddStudentDataForm />} />

        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:activityId" element={<ActivitiesViewer />} />

        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:videoId" element={<VideosViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
