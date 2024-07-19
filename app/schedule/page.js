'use client'
import { useEffect, useState } from "react"

export default function Page() {
  const apiPath = "http://localhost:4000/"
  const [courseSearch, setCourseSearch] = useState('')
  const [searchData, setSearchData] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: courseSearch })
      }
      if (courseSearch.trim() !== '') {
        try {
          const response = await fetch(apiPath + "course-details/", params)
          const data = await response.json()
          setSearchData(data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      } else {
        setSearchData([])
      }
    }
    fetchData()
  }, [courseSearch])

  const handleSelectCourse = (course) => {
    if (!selectedCourses.find(c => c._id === course._id)) {
      setSelectedCourses(prevCourses => [...prevCourses, course])
    }
    setCourseSearch('')
    setSearchData([])
  }

  const handleRemoveCourse = (courseId) => {
    setSelectedCourses(prevCourses => prevCourses.filter(course => course._id !== courseId))
  }

  const handleShowModal = (course) => {
    setModalData(course)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setModalData(null)
  }

  return (
    <div className="p-4 flex">
      <div className="w-1/4" style={{ marginLeft: '20px' }}>
        <div className="mb-4 relative">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Course Name:
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
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Courses</h2>
          {selectedCourses.length > 0 ? (
            <ul>
              {selectedCourses.map(course => (
                <li key={course._id} className="p-2 border-b border-gray-300">
                  <div className="flex justify-between items-center">
                    <span>{course.name}</span>
                    <div>
                      <button
                        onClick={() => handleShowModal(course)}
                        className="ml-2 px-2 py-1 text-sm bg-blue-500 text-white rounded"
                      >
                        Info
                      </button>
                      <button
                        onClick={() => handleRemoveCourse(course._id)}
                        className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No courses selected.</p>
          )}
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="w-2/3">
          <h2 className="text-lg font-semibold">Schedule Calendar</h2>
          {/* Add calendar component or layout here */}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-3/4 max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{modalData.name}</h2>
              <button onClick={handleCloseModal} className="text-xl font-bold">&times;</button>
            </div>
            <div>
              <p><strong>Course Code:</strong> {modalData.courseCode}</p>
              <p><strong>Status:</strong> {modalData.status}</p>
              <p><strong>Credits:</strong> {modalData.credits}</p>
              <p><strong>Enrollment Period:</strong> {modalData.enrollmentPeriod}</p>
              <p><strong>Day & Time:</strong> {modalData.dayTime}</p>
              <p><strong>Room:</strong> {modalData.room}</p>
              <p><strong>Instructor:</strong> {modalData.instructor}</p>
              <p><strong>Description:</strong> {modalData.description}</p>
              <p><strong>Ratings:</strong> {modalData.ratings.ratingTotal} (Total Ratings: {modalData.ratings.ratingCount})</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
