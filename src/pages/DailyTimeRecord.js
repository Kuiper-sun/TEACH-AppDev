import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Bell, Home, Settings, Search, LogOut } from 'lucide-react';

const DailyTimeRecord = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    month: '',
    officeHours: '',
    signature: null,
    inChargeSignature: null
  });

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/signin');
  };

  const [timeRecords, setTimeRecords] = useState(
    Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      amArrival: '',
      amDeparture: '',
      pmArrival: '',
      pmDeparture: '',
      hours: '',
      minutes: ''
    }))
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [field]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTimeRecordChange = (index, field, value) => {
    const newRecords = [...timeRecords];
    newRecords[index] = {
      ...newRecords[index],
      [field]: value
    };
    setTimeRecords(newRecords);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['CS Form 48'],
      ['DAILY TIME RECORD'],
      [''],
      [`Name: ${formData.name}`],
      [`For the month of: ${formData.month}`],
      [`Office Hours (regular days): ${formData.officeHours}`],
      [''],
      ['Day', 'AM Arrival', 'AM Departure', 'PM Arrival', 'PM Departure', 'Hours', 'Minutes'],
      ...timeRecords.map(row => [
        row.day,
        row.amArrival,
        row.amDeparture,
        row.pmArrival,
        row.pmDeparture,
        row.hours,
        row.minutes
      ])
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Daily Time Record');
    XLSX.writeFile(workbook, 'daily_time_record.xlsx');
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-500 to-blue-400">
      {/* Sidebar */}
      <div className="w-64 p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <span className="text-2xl font-bold text-white">TEACH</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer" onClick={handleHomeClick}>
              <Home className="h-5 w-5 mr-3" />
              <span>Home</span>
            </div>
            <div className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer" onClick={handleNotificationClick}>
              <Bell className="h-5 w-5 mr-3" />
              <span>Notifications</span>
            </div>
            <div className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer" onClick={handleSettingsClick}>
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </div>
          </div>
        </nav>

        {/* Profile */}
        <div className="flex items-center mt-auto cursor-pointer" onClick={handleProfileClick}>
          <img 
            src="/path/to/profile-pic.png" 
            alt="Profile"
            className="w-10 h-10 rounded-full bg-gray-300"
          />
          <div className="ml-3 text-white">
            <div className="font-medium">Pamela Golosinda</div>
            <div className="text-sm text-gray-300">Profile</div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex items-center text-white p-3 rounded-lg hover:bg-white/10 cursor-pointer mt-8" onClick={handleLogout}>
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 rounded-tl-[2.5rem] p-8 overflow-auto">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-gray-600">
          <Home className="h-4 w-4 mr-2" />
          <span>Daily Time Record</span>
        </div>

        {/* Form Content */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
          <div className="px-6 py-4 border-b-2 border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">CS Form 48</h1>
            <h2 className="text-xl font-semibold text-gray-700 mt-1">DAILY TIME RECORD</h2>
          </div>

          {/* Rest of the form content remains the same, continuing in next part... */}
          <div className="p-6">
            {/* Header Form */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">For the month of</label>
                   <div className="relative">
                <select
                   name="month"
                   value={formData.month}
                   onChange={handleInputChange}
                   className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select Month</option>
                   {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                   <option key={index} value={month}>{month}</option>
                   ))}
                </select>
              </div>
           </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Office Hours</label>
                <input
                  type="text"
                  name="officeHours"
                  value={formData.officeHours}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Time Record Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y-2 divide-gray-200">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-600">
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-2 border-gray-200">Day</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-2 border-gray-200">AM Arrival</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-2 border-gray-200">AM Departure</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-2 border-gray-200">PM Arrival</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-2 border-gray-200">PM Departure</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-2 border-gray-200">Hours</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-2 border-gray-200">Minutes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timeRecords.map((record, index) => (
                    <tr key={record.day} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-2 border-gray-200">{record.day}</td>
                      <td className="px-4 py-2 whitespace-nowrap border-2 border-gray-200">
                        <input
                          type="text"
                          value={record.amArrival}
                          onChange={(e) => handleTimeRecordChange(index, 'amArrival', e.target.value)}
                          className="block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap border-2 border-gray-200">
                        <input
                          type="text"
                          value={record.amDeparture}
                          onChange={(e) => handleTimeRecordChange(index, 'amDeparture', e.target.value)}
                          className="block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap border-2 border-gray-200">
                        <input
                          type="text"
                          value={record.pmArrival}
                          onChange={(e) => handleTimeRecordChange(index, 'pmArrival', e.target.value)}
                          className="block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap border-2 border-gray-200">
                        <input
                          type="text"
                          value={record.pmDeparture}
                          onChange={(e) => handleTimeRecordChange(index, 'pmDeparture', e.target.value)}
                          className="block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap border-2 border-gray-200">
                        <input
                          type="text"
                          value={record.hours}
                          onChange={(e) => handleTimeRecordChange(index, 'hours', e.target.value)}
                          className="block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap border-2 border-gray-200">
                        <input
                          type="text"
                          value={record.minutes}
                          onChange={(e) => handleTimeRecordChange(index, 'minutes', e.target.value)}
                          className="block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Certification and Signatures */}
            <div className="mt-8 text-sm text-gray-700">
              <p className="mb-6">I certify on my honor that the above is a true and correct record of the hours of work performed, record of which was made daily at the time of arrival and departure from the office.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Signature</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'signature')}
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {formData.signature && (
                    <img src={formData.signature} alt="Signature" className="mt-2 h-16 object-contain" />
                  )}
                  <div className="mt-2 border-t-2 border-gray-300 w-48 pt-1 text-center">
                    <p>(Signature)</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload In-charge Signature</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'inChargeSignature')}
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {formData.inChargeSignature && (
                    <img src={formData.inChargeSignature} alt="In-charge Signature" className="mt-2 h-16 object-contain" />
                  )}
                  <div className="mt-2 border-t-2 border-gray-300 w-48 pt-1 text-center">
                    <p>(In-charge)</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={exportToExcel}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Export to Excel
                </button>
                
                <button
                  onClick={() => window.print()}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
                
                <button
                  onClick={() => {
                    setTimeRecords(Array.from({ length: 31 }, (_, i) => ({
                      day: i + 1,
                      amArrival: '',
                      amDeparture: '',
                      pmArrival: '',
                      pmDeparture: '',
                      hours: '',
                      minutes: ''
                    })));
                    setFormData({
                      name: '',
                      month: '',
                      officeHours: '',
                      signature: null,
                      inChargeSignature: null
                    });
                  }}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear Form
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Icons */}
        <div className="absolute top-8 right-8 flex items-center space-x-4">
          <Bell className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleNotificationClick} />
          <Settings className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleSettingsClick} />
          <img 
            src="/path/to/profile-pic.png" 
            alt="Profile"
            className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer"
            onClick={handleProfileClick}
          />
        </div>
      </main>
    </div>
  );
};

export default DailyTimeRecord;