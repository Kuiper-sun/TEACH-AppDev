import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddStudentDataForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    // Student Info
    studentName: '',
    lrn: '',
    gradeLevel: '',
    section: '',
    subject: '',
    
    // Written Works (30%)
    writtenWorks: {
      quiz1: { score: '', total: '' },
      quiz2: { score: '', total: '' },
      writtenTask1: { score: '', total: '' },
      writtenTask2: { score: '', total: '' }
    },
    
    // Performance (50%)
    performance: {
      attendance: { present: '', total: '' },
      practicum: { score: '', total: '' },
      recitation: { score: '', total: '' }
    },
    
    // Quarterly Assessment (20%)
    quarterlyAssessment: {
      examScore: '',
      totalScore: ''
    }
  });

  const handleInputChange = (category, field, subfield, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: subfield 
        ? { ...prev[category], [field]: { ...prev[category][field], [subfield]: value }}
        : { ...prev[category], [field]: value }
    }));
  };

  const calculatePercentage = (score, total) => {
    return total ? (score / total) * 100 : 0;
  };

  const calculateFinalGrade = () => {
    // Written Works (30%)
    const writtenWorksScores = Object.values(formData.writtenWorks).map(
      item => calculatePercentage(Number(item.score), Number(item.total))
    );
    const writtenWorksAvg = writtenWorksScores.reduce((a, b) => a + b, 0) / writtenWorksScores.length * 0.3;

    // Performance (50%)
    const performanceScores = Object.values(formData.performance).map(
      item => calculatePercentage(Number(item.score || item.present), Number(item.total))
    );
    const performanceAvg = performanceScores.reduce((a, b) => a + b, 0) / performanceScores.length * 0.5;

    // Quarterly Assessment (20%)
    const assessmentScore = calculatePercentage(
      Number(formData.quarterlyAssessment.examScore),
      Number(formData.quarterlyAssessment.totalScore)
    ) * 0.2;

    return (writtenWorksAvg + performanceAvg + assessmentScore).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalGrade = calculateFinalGrade();
    onSubmit({ ...formData, finalGrade });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Add Student Record</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Student Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', '', '', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LRN
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg"
                  value={formData.lrn}
                  onChange={(e) => handleInputChange('lrn', '', '', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade Level
                </label>
                <select
                  required
                  className="w-full p-2 border rounded-lg"
                  value={formData.gradeLevel}
                  onChange={(e) => handleInputChange('gradeLevel', '', '', e.target.value)}
                >
                  <option value="">Select Grade</option>
                  {[1,2,3,4,5,6].map(grade => (
                    <option key={grade} value={grade}>Grade {grade}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <select
                  required
                  className="w-full p-2 border rounded-lg"
                  value={formData.section}
                  onChange={(e) => handleInputChange('section', '', '', e.target.value)}
                >
                  <option value="">Select Section</option>
                  {['A','B','C'].map(section => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  required
                  className="w-full p-2 border rounded-lg"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', '', '', e.target.value)}
                >
                  <option value="">Select Subject</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                </select>
              </div>
            </div>
          </div>

          {/* Written Works */}
          <div className="space-y-4">
            <h3 className="font-semibold">Written Works (30%)</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData.writtenWorks).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      min="0"
                      required
                      placeholder="Score"
                      className="w-1/2 p-2 border rounded-lg"
                      value={value.score}
                      onChange={(e) => handleInputChange('writtenWorks', key, 'score', e.target.value)}
                    />
                    <input
                      type="number"
                      min="0"
                      required
                      placeholder="Total"
                      className="w-1/2 p-2 border rounded-lg"
                      value={value.total}
                      onChange={(e) => handleInputChange('writtenWorks', key, 'total', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div className="space-y-4">
            <h3 className="font-semibold">Performance (50%)</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(formData.performance).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      min="0"
                      required
                      placeholder={key === 'attendance' ? 'Present' : 'Score'}
                      className="w-1/2 p-2 border rounded-lg"
                      value={key === 'attendance' ? value.present : value.score}
                      onChange={(e) => handleInputChange('performance', key, key === 'attendance' ? 'present' : 'score', e.target.value)}
                    />
                    <input
                      type="number"
                      min="0"
                      required
                      placeholder="Total"
                      className="w-1/2 p-2 border rounded-lg"
                      value={value.total}
                      onChange={(e) => handleInputChange('performance', key, 'total', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quarterly Assessment */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quarterly Assessment (20%)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Exam Score
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full p-2 border rounded-lg"
                  value={formData.quarterlyAssessment.examScore}
                  onChange={(e) => handleInputChange('quarterlyAssessment', 'examScore', '', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Total Score
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full p-2 border rounded-lg"
                  value={formData.quarterlyAssessment.totalScore}
                  onChange={(e) => handleInputChange('quarterlyAssessment', 'totalScore', '', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentDataForm;