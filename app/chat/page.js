"use client"
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import './chat.css';

// const dummyCourses = [
//   { id: 1, name: 'Anthropology 101' },
//   { id: 2, name: 'Biology 101' },
//   { id: 3, name: 'Chemistry 101' }
// ];

// const dummyMessages = {
//   1: [
//     { user: 'John', message: 'Hello everyone!', sender: 'me' },
//     { user: 'Doe', message: 'Hi John!', sender: 'other' }
//   ],
//   2: [
//     { user: 'Jane', message: 'Hello everyone!', sender: 'other' }
//   ],
//   3: [
//     { user: 'David', message: 'Hello everyone!', sender: 'other' }
//   ]
// };


const GroupChat = () => {

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [courseSearch, setCourseSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [file, setFile] = useState(null);

  // Fetch courses from the backend
  useEffect(() => {
    axios.get('/courses')
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  // Fetch messages for the selected course from the backend
  useEffect(() => {
    if (selectedCourse) {
      axios.get(`/get-messages/${selectedCourse}`)
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    }
  }, [selectedCourse]);

  // Filter courses based on search input
  useEffect(() => {
    if (courseSearch.trim() !== '') {
      const results = searchResults.filter(course =>
        course.name.toLowerCase().includes(courseSearch.toLowerCase())
      );
      setSearchResults(results);
    } else {
      axios.get('/courses')
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    }
  }, [courseSearch]);

  const handleCourseClick = (courseId) => {
    setSelectedCourse(courseId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageData = { username: 'John', message: newMessage, courseID: selectedCourse };
      axios.post('/add-message', messageData)
        .then(response => {
          setMessages([...messages, response.data]);
          setNewMessage('');
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleDeleteChat = () => {
    axios.delete(`/delete-user-course/${selectedCourse}`)
      .then(() => {
        setMessages([]);
        setSearchResults(searchResults.filter(course => course.id !== selectedCourse));
        setSelectedCourse(null);
        setShowDropdown(false);
      })
      .catch(error => {
        console.error('Error deleting chat:', error);
      });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post(`/api/courses/${selectedCourse}/upload`, formData)
        .then(response => {
          console.log('File uploaded:', response.data);
          setFile(null);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
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
          {/* <img src="/assets/icons/icon.png" alt="Course Compass @ CCNY" className="logo" /> */}
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
