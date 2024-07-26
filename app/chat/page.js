"use client"
import { useState } from 'react';


const dummyCourses = [
  { id: 1, name: 'Course 1' },
  { id: 2, name: 'Course 2' },
  { id: 3, name: 'Course 3' }
];

const dummyMessages = {
  1: [
    { user: 'Alice', message: 'Hello Course 1' },
    { user: 'Bob', message: 'Hi Alice!' }
  ],
  2: [
    { user: 'Charlie', message: 'Hello Course 2' }
  ],
  3: [
    { user: 'David', message: 'Hello Course 3' }
  ]
};

const GroupChat = () => {
  const [selectedCourse, setSelectedCourse] = useState(dummyCourses[0].id);
  const [messages, setMessages] = useState(dummyMessages[selectedCourse]);
  const [newMessage, setNewMessage] = useState('');

  const handleCourseClick = (courseId) => {
    setSelectedCourse(courseId);
    setMessages(dummyMessages[courseId]);
  };

  const handleSendMessage = () => {
    const updatedMessages = [...messages, { user: 'You', message: newMessage }];
    setMessages(updatedMessages);
    dummyMessages[selectedCourse] = updatedMessages; // Update the dummy data
    setNewMessage('');
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
        <h3>Courses</h3>
        <ul>
          {dummyCourses.map(course => (
            <li 
              key={course.id} 
              onClick={() => handleCourseClick(course.id)}
              style={{ cursor: 'pointer', padding: '5px 0' }}
            >
              {course.name}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ width: '70%', padding: '10px' }}>
        <h3>Group Chat</h3>
        <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
          {messages.map((msg, index) => (
            <div key={index}><strong>{msg.user}:</strong> {msg.message}</div>
          ))}
        </div>
        <div style={{ marginTop: '20px', display: 'flex' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            style={{ flex: 1, padding: '10px' }}
          />
          <button onClick={handleSendMessage} style={{ padding: '10px' }}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
