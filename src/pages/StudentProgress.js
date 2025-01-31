import React, { useState, useEffect } from 'react';
import { Home, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const StudentProgress = () => {
  const [students, setStudents] = useState([]);
  const [writtenWorks, setWrittenWorks] = useState([]); 
  const [userStudentJoin, setUserStudentJoin] = useState([]); 
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleHomeClick = () => navigate('/dashboard');

  const gradeThresholds = [
    { label: 'Outstanding', color: 'bg-emerald-500', range: '90-100', passing: 'Passed' },
    { label: 'Very Satisfactory', color: 'bg-lime-500', range: '85-89', passing: 'Passed' },
    { label: 'Satisfactory', color: 'bg-yellow-500', range: '80-84', passing: 'Passed' },
    { label: 'Fairly Satisfactory', color: 'bg-orange-500', range: '75-79', passing: 'Passed' },
    { label: 'Did Not Meet Expectation', color: 'bg-red-500', range: 'Below 75', passing: 'Failed' },
  ];

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://localhost:7085/api/Student');
        if (!response.ok) throw new Error('Failed to fetch students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const fetchUserStudentJoin = async () => {
      try {
        const response = await fetch('https://localhost:7085/api/UserStudentJoin');
        if (!response.ok) throw new Error('Failed to fetch user-student links');
        const data = await response.json();
        setUserStudentJoin(data);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchStudents();
    fetchUserStudentJoin();
  }, []);

  // Updated student performance fetch
  useEffect(() => {
    const fetchStudentPerformance = async () => {
      if (selectedStudent) {
        try {
          // Fetch student with nested written works
          const studentResponse = await fetch(
            `https://localhost:7085/api/Student/${selectedStudent.id}/with-data`
          );
          if (!studentResponse.ok) throw new Error('Failed to fetch student data');
          const studentData = await studentResponse.json();

          // Fetch performance tasks
          const performanceResponse = await fetch(
            `https://localhost:7085/api/PerformanceTasks/${selectedStudent.id}`
          );
          const performanceData = await performanceResponse.json();

          // Fetch assessments
          const assessmentResponse = await fetch(
            `https://localhost:7085/api/QuarterlyAssessments/${selectedStudent.id}`
          );
          const assessmentData = await assessmentResponse.json();

          setPerformance({
            ...studentData,
            performanceTasks: performanceData,
            quarterlyAssessments: assessmentData
          });
        } catch (error) {
          console.error('Error fetching performance:', error);
          setPerformance(null);
        }
      }
    };

    fetchStudentPerformance();
  }, [selectedStudent]);

  // Updated add student function
  const addStudent = async (studentData) => {
    try {
      // 1. Create student
      const studentResponse = await fetch('https://localhost:7085/api/Student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: studentData.name,
          writtenWorks: [],
          performanceTasks: [],
          quarterlyAssessments: []
        }),
      });
      
      const newStudent = await studentResponse.json();

      // 2. Link to user (assuming current user ID is available)
      const userId = 1; // Replace with actual user ID
      await fetch(
        `https://localhost:7085/api/UserStudentJoin?userId=${userId}&studentId=${newStudent.id}`,
        { method: 'POST' }
      );

      setStudents([...students, newStudent]);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Updated delete function
  const deleteStudent = async (studentId) => {
    try {
      // Delete student and related data
      await fetch(`https://localhost:7085/api/Student/${studentId}`, {
        method: 'DELETE'
      });

      // Delete user-student link
      await fetch(`https://localhost:7085/api/UserStudentJoin/${studentId}`, {
        method: 'DELETE'
      });

      setStudents(students.filter(s => s.id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Updated data processing
  const pieData = performance ? [
    { 
      name: 'Written Work', 
      value: performance.writtenWorks.reduce((sum, w) => sum + w.grade, 0),
      color: '#4F46E5' 
    },
    { 
      name: 'Performance', 
      value: performance.performanceTasks.reduce((sum, t) => sum + t.grade, 0),
      color: '#10B981' 
    },
    { 
      name: 'Assessment', 
      value: performance.quarterlyAssessments.reduce((sum, a) => sum + a.grade, 0),
      color: '#6366F1' 
    }
  ] : [];

  // Filtering logic
  const filteredStudents = students.filter(student => 
    (!selectedGrade || student.gradeLevel?.toString() === selectedGrade) &&
    (!selectedSection || student.section === selectedSection)
  );

  const DetailChart = ({ data, computations }) => (
    <div className="space-y-8">
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#4F46E5" 
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Component</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Computation</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {computations.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm text-gray-900">{item.component}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.computation}</td>
                <td className="px-6 py-4 text-sm text-gray-900 text-right">{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const Overview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8 h-80">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="aspect-square bg-gray-50 rounded-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius="70%"
                    outerRadius="90%"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl font-bold text-gray-800">{performance?.finalGrade?.toFixed(2)}%</div>
              </div>
            </div>
            <div className="aspect-square bg-gray-50 rounded-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ value: 1 }]}
                    innerRadius="70%"
                    outerRadius="90%"
                    dataKey="value"
                  >
                    <Cell fill="#6366F1" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl font-bold text-gray-800">1.804</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left pb-2 font-medium text-gray-600">Component</th>
                <th className="text-right pb-2 font-medium text-gray-600">Score</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="py-2">Written Work (%)</td>
                <td className="text-right">26.25</td>
              </tr>
              <tr>
                <td className="py-2">Performance Task (%)</td>
                <td className="text-right">44.75</td>
              </tr>
              <tr>
                <td className="py-2">Assessment (%)</td>
                <td className="text-right">18.40</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Component</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Computation</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {performance?.writtenWork?.computations?.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm text-gray-900">{item.component}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.computation}</td>
                <td className="px-6 py-4 text-sm text-gray-900 text-right">{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-gray-600">
        <Home className="h-4 w-4 mr-2" />
        <span className="mr-2 cursor-pointer hover:text-blue-600" onClick={handleHomeClick}>Home</span>
        <span className="mx-2">/</span>
        <span className="text-blue-600">Student Progress</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Student Progress</h1>
        <button
          onClick={() => navigate('/add-student')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Student Record
        </button>
      </div>
      
      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Filters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <select 
              className="w-full p-2 pl-3 pr-10 border rounded-lg appearance-none bg-white"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="">Grade Level</option>
              {[1,2,3,4,5,6].map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
          </div>

          <div className="relative">
            <select 
              className="w-full p-2 pl-3 pr-10 border rounded-lg appearance-none bg-white"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Section</option>
              {[1,2,3,4,5].map(section => (
                <option key={section} value={section}>Section {section}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
          </div>

          <div className="relative">
            <select
              className="w-full p-2 pl-3 pr-10 border rounded-lg appearance-none bg-white"
              value={selectedStudent?.id || ''}
              onChange={(e) => {
                const student = students.find(s => s.id === parseInt(e.target.value));
                setSelectedStudent(student || null);
              }}
            >
              <option value="">Select Student</option>
              {filteredStudents.map(student => (
                <option key={student.id} value={student.id}>
                  {student.studentName}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
          </div>

          <div className="relative">
            <select 
              className="w-full p-2 pl-3 pr-10 border rounded-lg appearance-none bg-white"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
          </div>
        </div>

        {/* Grade Thresholds */}
        <div className="grid grid-cols-5 gap-4">
          {gradeThresholds.map((threshold, index) => (
            <div key={index} className={`${threshold.color} p-4 rounded-lg text-white`}>
              <div className="font-semibold">{threshold.label}</div>
              <div className="text-sm">{threshold.range}</div>
              <div className="text-sm">{threshold.passing}</div>
            </div>
          ))}
        </div>

        {/* Student Information and Performance */}
        {selectedStudent && performance && (
          <>
            {/* Student Information */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Student Information</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Name:</span>
                    <span>{selectedStudent.studentName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">LRN:</span>
                    <span>{selectedStudent.lrn || 'N/A'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Grade:</span>
                    <span>{selectedStudent.gradeLevel || 'N/A'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Section:</span>
                    <span>{selectedStudent.section || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Final Grade */}
              <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold mb-4">Final Grade</h3>
                <div className="text-6xl font-bold text-lime-500">{performance.finalGrade.toFixed(2)}</div>
                <div className="text-gray-600 mt-2">
                  {gradeThresholds.find(t => 
                    performance.finalGrade >= parseFloat(t.range.split('-')[0]) && 
                    performance.finalGrade <= parseFloat(t.range.split('-')[1] || '100')
                  )?.label || 'N/A'}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {['overview', 'written', 'performance', 'attendance'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`p-2 capitalize ${
                      activeTab === tab
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {tab === 'overview' ? 'Overview' : 
                     tab === 'written' ? 'Written Work' :
                     tab === 'performance' ? 'Performance' : 'Attendance'}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                {activeTab === 'overview' ? (
                  <Overview />
                ) : activeTab === 'written' ? (
                  <DetailChart 
                    data={performance.writtenWork?.data || []} 
                    computations={performance.writtenWork?.computations || []} 
                  />
                ) : activeTab === 'performance'? (
                  <DetailChart 
                    data={performance.performance?.data || []} 
                    computations={performance.performance?.computations || []} 
                  />
                ) : (
                  <DetailChart 
                    data={performance.attendance?.data || []} 
                    computations={performance.attendance?.computations || []} 
                  />
                )}
              </div>
            </div>
          </>
        )}

        {/* Print Button */}
        <button
          onClick={() => window.print()}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-md shadow-sm flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              fill="url(#blueGradient)" 
              stroke="currentColor"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print
        </button>
      </div>
    </div>
  );
};

export default StudentProgress;