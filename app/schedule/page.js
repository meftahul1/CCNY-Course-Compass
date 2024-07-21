
'use client'
import { useEffect, useState } from "react"

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return `${words.slice(0, wordLimit).join(' ')}...`;
};

const CourseCard = ({ course, handleRemoveCourse }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const wordLimit = 30;

  return (
    <div className="flex flex-col items-center w-full max-w-[22.5rem] h-auto border border-gray-300 rounded-md shadow-lg bg-white">
      <div className="flex flex-shrink-0 items-center self-stretch pt-4 pb-4 pl-6 pr-2 h-[4.5rem] border-b border-gray-300">
        <div className="content flex items-center">
          <div className="text flex flex-col items-start">
            <div className="text-lg font-medium text-[#1d1b20]">{course.code}</div>
            <div className="text-sm text-[#1d1b20]">{course.name}</div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2.5 w-12 h-12 ml-auto">
          <div className="flex justify-center items-center p-2 rounded-full border border-[#ffffff] transition duration-300 hover:opacity-75 cursor-pointer">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" fill="#49454F" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start p-4">
        <div className="text-lg font-medium text-[#1d1b20]">{course.professor}</div>
        <div className="text-sm text-[#49454f]">{course.rating}</div>
        <div className="text-sm text-[#49454f] mt-2">
          {showFullDescription ? course.description : truncateText(course.description, wordLimit)}
          {course.description.split(' ').length > wordLimit && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-500 hover:underline ml-2"
            >
              {showFullDescription ? 'Show Less' : 'Find More'}
            </button>
          )}
        </div>
        <div className="flex flex-col justify-end gap-2 mt-auto self-stretch">
          <div className="flex justify-end gap-2 mt-4">
            <div className="flex items-center justify-center h-10 px-6 rounded-full border border-[#79747e] transition duration-300 hover:bg-[#65558f] cursor-pointer"
            onClick={() => handleRemoveCourse(course._id)}
            >
              <span className="text-sm text-[#65558f] hover:text-white">Delete</span>
            </div>
            <div className="flex items-center justify-center h-10 px-6 rounded-full bg-[#65558f] transition duration-300 hover:bg-[#4a3d72] cursor-pointer">
              <span className="text-sm text-white">Join Chat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const fetchData = async (apiPath, courseSearch, setSearchData) => {
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: courseSearch })
  };
  if (courseSearch.trim() !== '') {
    try {
      const response = await fetch(apiPath + "course-details/", params);
      const data = await response.json();
      setSearchData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } else {
    setSearchData([]);
  }
};

export default function Page() {
  const apiPath = "http://localhost:4000/";
  const [courseSearch, setCourseSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchData(apiPath, courseSearch, setSearchData);
  }, [courseSearch]);

  const handleSelectCourse = (course) => {
    if (!selectedCourses.find(c => c._id === course._id)) {
      setSelectedCourses(prevCourses => [...prevCourses, course]);
    }
    setCourseSearch('');
    setSearchData([]);
  };

  const handleRemoveCourse = (courseId) => {
    setSelectedCourses(prevCourses => prevCourses.filter(course => course._id !== courseId));
  };

  const handleShowModal = (course) => {
    setModalData(course);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <>
      <label className="block mb-4 text-sm font-medium text-gray-900">
        Enter Course Name to Get Started
        <input
          type="text"
          value={courseSearch}
          onChange={(e) => setCourseSearch(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </label>

      {searchData.length > 0 && (
        <ul className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
          {searchData.map(course => (
            <li
              key={course._id}
              onClick={() => handleSelectCourse(course)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {course.name}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-4 p-4">
        {selectedCourses.length > 0 ? (
          selectedCourses.map(course => (
            <CourseCard key={course._id} course={course} handleRemoveCourse={handleRemoveCourse} />
          ))
        ) : (
          <p>No courses selected.</p>
        )}
      </div>
    </>
  );
}
