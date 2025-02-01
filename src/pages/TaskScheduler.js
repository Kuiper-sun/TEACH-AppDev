import React, { useState, useCallback } from 'react';
import { Calendar, Plus, ArrowLeft, ArrowRight, X, Settings, RefreshCw, Bell, Home, Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TaskScheduler = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('week');
  const [timeRange, setTimeRange] = useState({ start: 8, end: 22 });
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionMode, setSelectionMode] = useState(null);
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const [unscheduledTasks, setUnscheduledTasks] = useState([]);
  const [executionTime, setExecutionTime] = useState(null);
  const [taskInputs, setTaskInputs] = useState([{
    name: '',
    priority: 3,
    energy: 3,
    time: 1,
    color: 'blue'
  }]);
  const [reminderSettings, setReminderSettings] = useState({
    notification: true,
    time: '10 minutes before'
  });

  // Navigation handlers
  const handleHomeClick = () => navigate('/dashboard');
  const handleNotificationClick = () => navigate('/notifications');
  const handleSettingsClick = () => navigate('/settings');
  const handleProfileClick = () => navigate('/profile');
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/signin');
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentDayName = daysOfWeek[currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1];
  const displayDays = viewMode === 'week' ? daysOfWeek : [currentDayName];
  const intervalsInHour = 2;

  const timeSlots = Array.from(
    { length: (timeRange.end - timeRange.start) * intervalsInHour },
    (_, i) => {
      const hour = Math.floor(i / 2) + timeRange.start;
      const minute = i % 2 === 0 ? '00' : '30';
      return `${hour}:${minute}`;
    }
  );

  // Get color based on priority level
  const getTaskColor = (priority) => {
    const colors = {
      1: 'bg-gray-200',
      2: 'bg-blue-200',
      3: 'bg-green-200',
      4: 'bg-yellow-200',
      5: 'bg-red-200'
    };
    return colors[priority] || colors[3];
  };

  // Mouse event handlers for cell selection
  const handleMouseDown = (cellId) => {
    setIsSelecting(true);
    setSelectionMode(!selectedCells.has(cellId));
    toggleCell(cellId);
    updateTotalFreeTime();
  };

  const handleMouseOver = (cellId) => {
    if (isSelecting) {
      toggleCell(cellId);
      updateTotalFreeTime();
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const toggleCell = (cellId) => {
    const newSelectedCells = new Set(selectedCells);
    if (selectionMode) {
      newSelectedCells.add(cellId);
    } else {
      newSelectedCells.delete(cellId);
    }
    setSelectedCells(newSelectedCells);
  };

  // Calculate and format total free time
  const getTotalFreeTime = useCallback(() => {
    const totalSlots = selectedCells.size;
    const hours = Math.floor(totalSlots / 2);
    const minutes = (totalSlots % 2) * 30;
    return `${hours}h ${minutes}m`;
  }, [selectedCells]);

  const updateTotalFreeTime = () => {
    getTotalFreeTime();
  };

  // Task management functions
  const addTaskInput = () => {
    setTaskInputs([...taskInputs, { 
      name: '', 
      priority: 3, 
      energy: 3, 
      time: 1, 
      color: 'blue'
    }]);
  };

  const updateTaskInput = (index, field, value) => {
    const newTaskInputs = [...taskInputs];
    newTaskInputs[index][field] = value;
    setTaskInputs(newTaskInputs);
  };

  // Enhanced schedule generation with optimization criteria
  const generateSchedule = (optimizationCriterion = 'priority') => {
    const startTime = performance.now();
    
    // Filter out empty task inputs
    const validTasks = taskInputs.filter(task => task.name.trim() !== '');
    
    // Sort tasks by priority or energy score
    const sortedTasks = [...validTasks].sort((a, b) => {
      const scoreA = optimizationCriterion === 'priority' ? a.priority : a.energy;
      const scoreB = optimizationCriterion === 'priority' ? b.priority : b.energy;
      return scoreB - scoreA;
    });

    const availableCells = Array.from(selectedCells);
    const scheduled = [];
    const unscheduled = [];

    // Schedule tasks based on available time slots
    sortedTasks.forEach(task => {
      const requiredSlots = task.time * 2; // Convert hours to 30-minute slots
      if (availableCells.length >= requiredSlots) {
        const assignedSlots = availableCells.splice(0, requiredSlots);
        scheduled.push({
          ...task,
          slots: assignedSlots,
          color: getTaskColor(task.priority)
        });
      } else {
        unscheduled.push(task);
      }
    });

    const endTime = performance.now();
    setExecutionTime(endTime - startTime);
    setScheduledTasks(scheduled);
    setUnscheduledTasks(unscheduled);
    setIsAddTaskModalOpen(false);
  };

  const resetSchedule = () => {
    setSelectedCells(new Set());
    setScheduledTasks([]);
    setUnscheduledTasks([]);
    setTaskInputs([{ 
      name: '', 
      priority: 3, 
      energy: 3, 
      time: 1, 
      color: 'blue' 
    }]);
  };

  // Rest of the JSX remains the same as in your first code
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 p-6 flex flex-col bg-gradient-to-b from-blue-500 to-blue-400">
        {/* Logo */}
        <div className="flex items-center mb-8">
            <img  src="/images/LogoName.png" alt="TEACH Logo" className="h-12 w-auto" />
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

                <div className="space-y-1">
                    <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" 
                        onClick={() => navigate('/profile')}>
                        <img 
                            src="images/Profile.png" 
                            alt="User Profile" 
                            className="w-11 h-11 rounded-full object-cover mr-3"
                        />                        
                        <div>
                            <div className="font-medium">Pamela Golosinda</div>
                            <div className="text-sm text-gray-300">Profile</div>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="flex items-center text-white p-2 rounded hover:bg-blue-500/30 cursor-pointer" 
                         onClick={handleLogout}>
                        <LogOut className="h-5 w-5 mr-3" />
                        <span>Log Out</span>
                    </div>
                </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Top Navigation */}
        <div className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          {/* View Toggle */}
          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'week' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'day' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Day
            </button>
          </div>
        </div>

        {/* Task Scheduler Content */}
        <div className="p-8 overflow-auto h-[calc(100vh-4rem)]">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-6 text-gray-600">
              <Home className="h-4 w-4 mr-2" />
              <span>Home / Task Scheduler</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Task Scheduler</h1>
            <p className="text-gray-500">Schedule and manage your tasks efficiently</p>
            <p className="text-sm text-gray-500 mt-2">
              Total Free Time: {getTotalFreeTime()}
            </p>
            {executionTime && (
              <p className="text-sm text-gray-500">
                Execution time: {executionTime.toFixed(2)} ms
              </p>
            )}
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-lg shadow p-6">
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(currentDate.getDate() - (viewMode === 'week' ? 7 : 1));
                    setCurrentDate(newDate);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(currentDate.getDate() + (viewMode === 'week' ? 7 : 1));
                    setCurrentDate(newDate);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-8 gap-4">
              <div className="text-sm font-medium text-gray-500"></div>
              {displayDays.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-medium text-gray-500">{day}</div>
                </div>
              ))}
            </div>

            {timeSlots.map((time, timeIndex) => (
              <div key={timeIndex} className="grid grid-cols-8 gap-4 border-t border-gray-100">
                <div className="py-4 text-sm text-gray-500">{time}</div>
                {displayDays.map((day, dayIndex) => {
                  const cellId = `${day}-${time}`;
                  const isSelected = selectedCells.has(cellId);
                  const scheduledTask = scheduledTasks.find(task => 
                    task.slots.includes(cellId)
                  );

                  return (
                    <div 
                      key={`${timeIndex}-${dayIndex}`}
                      className={`
                        border-l border-gray-100 py-4 px-2 min-h-[60px] cursor-pointer
                        transition-colors duration-200
                        ${isSelected ? 'bg-blue-100' : ''}
                        ${scheduledTask ? `${scheduledTask.color} text-white` : ''}
                      `}
                      onMouseDown={() => handleMouseDown(cellId)}
                      onMouseOver={() => handleMouseOver(cellId)}
                      onMouseUp={handleMouseUp}
                    >
                      {scheduledTask?.name}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-2">
        <button
          onClick={() => setIsAddTaskModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </button>
        <button 
          onClick={() => setIsCustomizeModalOpen(true)}
          className="bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center"
        >
          <Settings className="h-4 w-4 mr-2" />
          Customize Hours
        </button>
        <button 
          onClick={resetSchedule}
          className="bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset Schedule
        </button>
        <button
          onClick={() => setIsReminderModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
        >
          <Bell className="h-4 w-4 mr-2" />
          Remind
        </button>
      </div>

      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Tasks</h2>
              <button
                onClick={() => setIsAddTaskModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {taskInputs.map((task, index) => (
                <div key={index} className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Name
                    </label>
                    <input
                      type="text"
                      value={task.name}
                      onChange={(e) => updateTaskInput(index, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority (1-5)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={task.priority}
                      onChange={(e) => updateTaskInput(index, 'priority', parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Energy (1-5)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={task.energy}
                      onChange={(e) => updateTaskInput(index, 'energy', parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time (hours)
                    </label>
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={task.time}
                      onChange={(e) => updateTaskInput(index, 'time', parseFloat(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={addTaskInput}
                className="text-blue-600 hover:text-blue-700"
              >
                Add Another Task
              </button>
              <div className="space-x-2">
                <select
                  onChange={(e) => generateSchedule(e.target.value)}
                  className="p-2 border rounded-md"
                >
                  <option value="priority">Optimize by Priority</option>
                  <option value="energy">Optimize by Energy</option>
                </select>
                <button
                  onClick={() => generateSchedule('priority')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Generate Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customize Hours Modal */}
      {isCustomizeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Customize Hours</h2>
              <button
                onClick={() => setIsCustomizeModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              setTimeRange({
                start: parseInt(formData.get('start-hour')),
                end: parseInt(formData.get('end-hour'))
              });
              setIsCustomizeModalOpen(false);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Hour (0-23)
                </label>
                <input
                  name="start-hour"
                  type="number"
                  min="0"
                  max="23"
                  defaultValue={timeRange.start}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Hour (0-23)
                </label>
                <input
                  name="end-hour"
                  type="number"
                  min="0"
                  max="23"
                  defaultValue={timeRange.end}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCustomizeModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      {isReminderModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Remind me later</h2>
              <button
                onClick={() => setIsReminderModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notification"
                  checked={reminderSettings.notification}
                  onChange={(e) => setReminderSettings({...reminderSettings, notification: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="notification">Through notification</label>
              </div>
              <select
                value={reminderSettings.time}
                onChange={(e) => setReminderSettings({...reminderSettings, time: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option>10 minutes before</option>
                <option>30 minutes before</option>
                <option>1 hour before</option>
              </select>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setIsReminderModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsReminderModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Set
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unscheduled Tasks Display */}
      {unscheduledTasks.length > 0 && (
        <div className="fixed top-24 right-8 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Unscheduled Tasks</h3>
          <ul className="space-y-2">
            {unscheduledTasks.map((task, index) => (
              <li key={index} className="text-sm text-gray-600">
                {task.name} (Priority: {task.priority}, Energy: {task.energy}, Time: {task.time}h)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskScheduler;
