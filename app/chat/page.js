"use client";
import { useState, useEffect } from 'react';
import './chat.css';

const GroupChat = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const joinedCourses = JSON.parse(localStorage.getItem('joinedCourses')) || [];
    setSearchResults(joinedCourses);
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetch(`http://localhost:4000/get-messages/${selectedCourse}`)
        .then(response => response.json())
        .then(data => setMessages(data))
        .catch(error => console.error('Error fetching messages:', error));
    }
  }, [selectedCourse]);

  const handleCourseClick = (courseId) => {
    setSelectedCourse(courseId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageData = { username: 'John', message: newMessage, courseID: selectedCourse };
      fetch('http://localhost:4000/add-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      })
        .then(response => response.json())
        .then(data => {
          setMessages([...messages, data]);
          setNewMessage('');
        })
        .catch(error => console.error('Error sending message:', error));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleDeleteChat = () => {
    const updatedCourses = searchResults.filter(course => course._id !== selectedCourse);
    setSearchResults(updatedCourses);
    localStorage.setItem('joinedCourses', JSON.stringify(updatedCourses)); // Update localStorage
    setMessages([]);
    setSelectedCourse(null);
    setShowDropdown(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch(`http://localhost:4000/api/courses/${selectedCourse}/upload`, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('File uploaded:', data);
          setFile(null);
        })
        .catch(error => console.error('Error uploading file:', error));
    }
  };

  const getSelectedCourseName = () => {
    const course = searchResults.find(course => course._id === selectedCourse);
    return course ? course.name : 'No Course Selected';
  };

  return (
    <div className="chat-container">
      <div className="course-list">
        <div className="logo-container">
          <h3 className="logo-text">Course Compass</h3>
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
              key={course._id}
              onClick={() => handleCourseClick(course._id)}
              className={course._id === selectedCourse ? 'active-course' : ''}
            >
              {course.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-area">
        <div className="chat-header">
          <div className="chat-title">
            <h3>{getSelectedCourseName()}</h3>
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
              <div key={index} className={`message ${msg.sender === 'John' ? 'me' : 'other'}`}>
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
