import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronDown, Bell, Settings, Search } from 'lucide-react';

const AddStudentDataForm = () => {
  const navigate = useNavigate();
  const handleNotificationClick = () => navigate('/notifications');
  const handleSettingsClick = () => navigate('/settings');
  const handleProfileClick = () => navigate('/profile');
  const handleStudentProgressClick = () => navigate('/student-progress');
  const handleHomeClick = () => navigate('/dashboard');
  const [formData, setFormData] = useState({
    subject: '',
    gradeLevel: '',
    section: '',
    studentName: '',
    studentLRN: '',
    quizScores: '',
    totalItems: '',
    writtenActivityScore: '',
    overallWrittenScore: '',
    attendance: '',
    totalClasses: '',
    practicumScores: '',
    totalPracticumScores: '',
    recitationScore: '',
    participationActivities: '',
    examScores: '',
    totalExamScores: '',
    writtenWorkPercentage: '30',
    performanceTaskPercentage: '40',
    quarterlyAssessmentPercentage: '30'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/student-progress');
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-500 to-blue-400">
      {/* Sidebar */}
      <div className="w-64 p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <span className="text-2xl font-bold text-white">TEACH</span>
        </div>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-600/30 text-white placeholder-gray-300 focus:outline-none"
          />
        </div>

        <nav className="flex-1">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer">
              <Home className="h-5 w-5 mr-3" />
              <span>Home</span>
            </div>
            <div className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer">
              <Bell className="h-5 w-5 mr-3" />
              <span>Notifications</span>
            </div>
            <div className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer">
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 rounded-tl-[2.5rem] p-8 overflow-y-auto">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-gray-600">
           <span className="flex items-center cursor-pointer hover:underline" onClick={handleHomeClick}>
           <Home className="h-4 w-4 mr-2" />
           <span>Home</span>
           </span>
          <span className="mx-2">/</span>
          <span className="cursor-pointer hover:underline" onClick={handleStudentProgressClick}>
             Student Progress
          </span>
          <span className="mx-2">/</span>
          <span className="text-blue-600">Add Record</span>
       </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-8">Add Record</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Top Row Selects */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Select Subject</label>
                <div className="relative">
                  <select 
                    className="w-full p-3 border rounded-lg appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                  >
                    <option value="">Select Subject</option>
                    <option value="">Mother Tongue</option>
                    <option value="">Filipino</option>
                    <option value="">English</option>
                    <option value="">Mathematics</option>
                    <option value="">Science</option>
                    <option value="">Araling Panlipunan</option>
                    <option value="">Edukasyon sa Pagpapakatao (ESP)</option>
                    <option value="">MAPEH</option>
                    <option value="">Edukasyong Pantahanan at Panglabuhayan (EPP)</option>
                    <option value="">Technology and Livelihood Education (TLE)</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Grade Level</label>
                <div className="relative">
                  <select 
                    className="w-full p-3 border rounded-lg appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.gradeLevel}
                    onChange={(e) => handleInputChange('gradeLevel', e.target.value)}
                  >
                    <option value="">Select Grade Level</option>
                    {[1,2,3,4,5,6].map(grade => (
                      <option key={grade} value={grade}>Grade {grade}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
  <label className="block text-sm font-medium mb-2">Section</label>
  <div className="relative">
    <select
      className="w-full p-3 border rounded-lg appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={formData.section}
      onChange={(e) => handleInputChange('section', e.target.value)}
    >
      <option value="">Select Section</option>
      {[1, 2, 3, 4, 5].map(section => (
        <option key={section} value={`Section ${section}`}>Section {section}</option>
      ))}
    </select>
    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
  </div>
</div>

            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Student Name</label>
                  <input
                    type="text"
                    placeholder="Student Name"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.studentName}
                    onChange={(e) => handleInputChange('studentName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LRN</label>
                  <input
                    type="text"
                    placeholder="Student LRN"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.studentLRN}
                    onChange={(e) => handleInputChange('studentLRN', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Written Work */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Written Work</h3>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-16 p-2 border rounded-lg text-center mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.writtenWorkPercentage}
                    onChange={(e) => handleInputChange('writtenWorkPercentage', e.target.value)}
                  />
                  <span className="text-sm text-gray-600">%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Quiz</label>
                  <input
                    type="text"
                    placeholder="Quiz Scores"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    value={formData.quizScores}
                    onChange={(e) => handleInputChange('quizScores', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Total No. of Items"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.totalItems}
                    onChange={(e) => handleInputChange('totalItems', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Written Activity</label>
                  <input
                    type="text"
                    placeholder="Written Activity Score"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    value={formData.writtenActivityScore}
                    onChange={(e) => handleInputChange('writtenActivityScore', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Overall Written Activity Score"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.overallWrittenScore}
                    onChange={(e) => handleInputChange('overallWrittenScore', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Performance Task */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Performance Task</h3>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-16 p-2 border rounded-lg text-center mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.performanceTaskPercentage}
                    onChange={(e) => handleInputChange('performanceTaskPercentage', e.target.value)}
                  />
                  <span className="text-sm text-gray-600">%</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Attendance</label>
                  <input
                    type="text"
                    placeholder="Number of Attendance"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    value={formData.attendance}
                    onChange={(e) => handleInputChange('attendance', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Total No. Classes"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.totalClasses}
                    onChange={(e) => handleInputChange('totalClasses', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Practicum</label>
                  <input
                    type="text"
                    placeholder="Practicum Scores"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    value={formData.practicumScores}
                    onChange={(e) => handleInputChange('practicumScores', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Total Practicum Scores"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.totalPracticumScores}
                    onChange={(e) => handleInputChange('totalPracticumScores', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Recitation</label>
                  <input
                    type="text"
                    placeholder="Number of Recitation"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    value={formData.recitationScore}
                    onChange={(e) => handleInputChange('recitationScore', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Number of Participation in Activities"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.participationActivities}
                    onChange={(e) => handleInputChange('participationActivities', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Quarterly Assessment */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Quarterly Assessment</h3>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-16 p-2 border rounded-lg text-center mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.quarterlyAssessmentPercentage}
                    onChange={(e) => handleInputChange('quarterlyAssessmentPercentage', e.target.value)}
                  />
                  <span className="text-sm text-gray-600">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Exam</label>
                <input
                  type="text"
                  placeholder="Exam Scores"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  value={formData.examScores}
                  onChange={(e) => handleInputChange('examScores', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Total Exam Scores"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.totalExamScores}
                  onChange={(e) => handleInputChange('totalExamScores', e.target.value)}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    subject: '',
                    gradeLevel: '',
                    section: '',
                    studentName: '',
                    studentLRN: '',
                    quizScores: '',
                    totalItems: '',
                    writtenActivityScore: '',
                    overallWrittenScore: '',
                    attendance: '',
                    totalClasses: '',
                    practicumScores: '',
                    totalPracticumScores: '',
                    recitationScore: '',
                    participationActivities: '',
                    examScores: '',
                    totalExamScores: '',
                    writtenWorkPercentage: '30',
                    performanceTaskPercentage: '40',
                    quarterlyAssessmentPercentage: '30'
                  });
                }}
                className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Right Icons */}
        <div className="absolute top-8 right-8 flex items-center space-x-4">
          <Bell className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleNotificationClick}/>
          <Settings className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleSettingsClick}/>
          <div className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer" onClick={handleProfileClick}/>
        </div>
      </div>
    </div>
  );
};

export default AddStudentDataForm;