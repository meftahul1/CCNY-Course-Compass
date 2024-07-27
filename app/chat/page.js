"use client"
import { useState, useEffect } from 'react';
import './chat.css';

const dummyCourses = [
  { id: 1, name: 'Anthropology 101' },
  { id: 2, name: 'Biology 101' },
  { id: 3, name: 'Chemistry 101' }
];

const dummyMessages = {
  1: [
    { user: 'John', message: 'Hello everyone!', sender: 'me' },
    { user: 'Doe', message: 'Hi John!', sender: 'other' }
  ],
  2: [
    { user: 'Jane', message: 'Hello everyone!', sender: 'other' }
  ],
  3: [
    { user: 'David', message: 'Hello everyone!', sender: 'other' }
  ]
};

const GroupChat = () => {
  const [selectedCourse, setSelectedCourse] = useState(dummyCourses[0].id);
  const [messages, setMessages] = useState(dummyMessages[selectedCourse]);
  const [newMessage, setNewMessage] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  const [searchResults, setSearchResults] = useState(dummyCourses);
  const [showDropdown, setShowDropdown] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (courseSearch.trim() !== '') {
      const results = dummyCourses.filter(course =>
        course.name.toLowerCase().includes(courseSearch.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(dummyCourses);
    }
  }, [courseSearch]);

  const handleCourseClick = (courseId) => {
    setSelectedCourse(courseId);
    setMessages(dummyMessages[courseId]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const updatedMessages = [...messages, { user: 'John', message: newMessage, sender: 'me' }];
      setMessages(updatedMessages);
      dummyMessages[selectedCourse] = updatedMessages; // Update dummy data
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleDeleteChat = () => {
    delete dummyMessages[selectedCourse];
    setMessages([]);
    setSearchResults(searchResults.filter(course => course.id !== selectedCourse));
    setSelectedCourse(null);
    setShowDropdown(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      console.log('File uploaded:', file.name);
      setFile(null);
    }
  };

  const getSelectedCourseName = () => {
    const course = dummyCourses.find(course => course.id === selectedCourse);
    return course ? course.name : 'No Course Selected';
  };

  return (
    <div className="chat-container">
      <div className="course-list">
        <div className="logo-container">
          <img src="/assets/icons/icon.png" alt="Course Compass @ CCNY" className="logo" />
          <h3 className="logo-text">Course Compass @ CCNY</h3>
        </div>
        <input
          type="text"
          placeholder="Search a course"
          className="search-bar"
          value={courseSearch}
          onChange={(e) => setCourseSearch(e.target.value)}
        />
        <ul>
          {searchResults.map(course => (
            <li
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              className={course.id === selectedCourse ? 'active-course' : ''}
            >
              {course.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-area">
        <div className="chat-header">
          <div className="chat-title">
            <h3>{getSelectedCourseName()} Chat</h3>
            <button onClick={() => setShowDropdown(!showDropdown)} className="dropdown-btn">
              ...
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <button onClick={handleDeleteChat}>Delete Chat</button>
              </div>
            )}
          </div>
        </div>
        <div className="messages-container">
          {messages && messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-content">
                  <strong>{msg.user}:</strong> {msg.message}
                </div>
              </div>
            ))
          ) : (
            <p>No messages in this chat.</p>
          )}
        </div>
        {selectedCourse && (
          <div className="message-input-container">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress} 
              placeholder="Type a message"
              className="message-input"
            />
            <div className="file-input-container">
              <label htmlFor="file-upload" className="file-input-label">
                <img src="/assets/icons/clip.png" alt="Upload" /> {}
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
              />
            </div>
            <button onClick={handleSendMessage} className="send-btn">Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupChat;
