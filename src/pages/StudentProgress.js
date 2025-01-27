import React, { useState } from 'react';
import { Home, ChevronDown } from 'lucide-react';
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
  const [selectedGrade, setSelectedGrade] = useState('4');
  const [selectedSection, setSelectedSection] = useState('1');
  const [selectedStudent, setSelectedStudent] = useState('John Doe');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddRecord, setShowAddRecord] = useState(false);

  const gradeThresholds = [
    { label: 'Outstanding', color: 'bg-emerald-500', range: '90-100', passing: 'Passed' },
    { label: 'Very Satisfactory', color: 'bg-lime-500', range: '85-89', passing: 'Passed' },
    { label: 'Satisfactory', color: 'bg-yellow-500', range: '80-84', passing: 'Passed' },
    { label: 'Fairly Satisfactory', color: 'bg-orange-500', range: '75-79', passing: 'Passed' },
    { label: 'Did Not Meet Expectation', color: 'bg-red-500', range: 'Below 75', passing: 'Failed' },
  ];

  const mockData = {
    writtenWork: [
      { name: 'Quiz 1', value: 85 },
      { name: 'Quiz 2', value: 90 },
      { name: 'Quiz 3', value: 88 },
      { name: 'Quiz 4', value: 92 }
    ],
    performance: [
      { name: 'Task 1', value: 88 },
      { name: 'Task 2', value: 85 },
      { name: 'Task 3', value: 90 },
      { name: 'Task 4', value: 87 }
    ],
    attendance: [
      { name: 'Week 1', value: 100 },
      { name: 'Week 2', value: 90 },
      { name: 'Week 3', value: 100 },
      { name: 'Week 4', value: 100 }
    ]
  };

  const pieData = [
    { name: 'Written Work', value: 26.25, color: '#4F46E5' },
    { name: 'Performance', value: 44.75, color: '#10B981' },
    { name: 'Assessment', value: 18.40, color: '#6366F1' }
  ];

  const DetailChart = ({ data }) => (
    <div className="h-80 w-full"> {/* Increased height */}
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
  );

  const AddRecordModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Record</h2>
          <button 
            onClick={() => setShowAddRecord(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select className="w-full p-2 border rounded">
              <option value="written">Written Work</option>
              <option value="performance">Performance Task</option>
              <option value="assessment">Assessment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Score
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Enter score"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => setShowAddRecord(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const Overview = () => (
    <div className="grid grid-cols-3 gap-8 h-80"> {/* Fixed height */}
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
              <div className="text-3xl font-bold text-gray-800">75%</div>
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
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-gray-600">
        <Home className="h-4 w-4 mr-2" />
        <span className="mr-2">Home</span>
        <span className="mx-2">/</span>
        <span className="text-blue-600">Student Progress</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Student Progress</h1>
        <button
          onClick={() => setShowAddRecord(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Data +
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
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Select Student</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
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
              <option value="English">English</option>
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

        {/* Grade Overview */}
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Student Information</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Name:</span>
                <span>John Doe</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">LRN:</span>
                <span>123456789</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Subject:</span>
                <span>Mathematics</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Grade:</span>
                <span>4</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Section:</span>
                <span>1</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-4">Final Grade</h3>
            <div className="text-6xl font-bold text-lime-500">88.50</div>
            <div className="text-gray-600 mt-2">Very Satisfactory - Passed</div>
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
              <DetailChart data={mockData.writtenWork} />
            ) : activeTab === 'performance' ? (
              <DetailChart data={mockData.performance} />
            ) : (
              <DetailChart data={mockData.attendance} />
            )}
          </div>
        </div>
      </div>

      {/* Add Record Modal */}
      {showAddRecord && <AddRecordModal />}
    </div>
  );
};
  
  export default StudentProgress;