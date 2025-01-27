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


function App() {
  return (
    <Router>
      <Routes>
        {/* Auth & Public Routes */}
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Document Routes */}
        <Route path="/document-layout" element={<DocumentLayout />} />
        <Route path="/lesson-plan" element={<LessonPlan />} />
        
        {/* Resource Routes */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/modules" element={<Modules />} />
        {/* Update module viewer route to accept dynamic module ID */}
        <Route path="/modules/:moduleId" element={<ModuleViewer />} />
        <Route path="/student-progress" element={<StudentProgress />} />
        <Route path="/add-student-data" element={<AddStudentDataForm />} />
      </Routes>
    </Router>
  );
}

export default App;