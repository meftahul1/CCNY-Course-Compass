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


{/* <div className="flex flex-wrap gap-8">

<div className="flex flex-col items-center w-[22.5rem] h-[480px] opacity-[var(--sds-size-stroke-border)]">
  <div className="flex flex-shrink-0 items-center self-stretch pt-[var(--sds-size-space-300)] pb-[var(--sds-size-space-300)] pl-[var(--sds-size-space-400)] pr-[var(--sds-size-space-100)] py-3 pl-4 pr-1 h-[4.5rem] opacity-[var(--sds-size-stroke-border)]">
    <div className="content flex items-center opacity-[var(--sds-size-stroke-border)]">
      <div className="text flex flex-col items-start opacity-[var(--sds-size-stroke-border)]">
        <div className="header-1 Roboto)'] 16px)] 24px)] self-stretch opacity-[var(--sds-size-stroke-border)] text-[#1d1b20] font-['var(--Title-Medium-Font, text-[var(--Title-Medium-Size, font-medium leading-[var(--Title-Medium-Line-Height,">Course Code</div>
        <div className="subhead Roboto)'] 14px)] 20px)] self-stretch opacity-[var(--sds-size-stroke-border)] text-[#1d1b20] font-['var(--Body-Medium-Font, text-[var(--Body-Medium-Size, leading-[var(--Body-Medium-Line-Height,">Course Name</div>
      </div>
    </div>
    <div className="flex flex-col justify-center items-center gap-2.5 w-12 h-12">
      <div className="flex justify-center items-center gap-2.5 opacity-[var(--sds-size-stroke-border)] rounded-full">
        <div className="flex justify-center items-center gap-2.5 pt-[var(--sds-size-space-200)] pr-[var(--sds-size-space-200)] pb-[var(--sds-size-space-200)] pl-[var(--sds-size-space-200)] p-2 opacity-[var(--sds-size-stroke-border)]">
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" fill="#49454F" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div className="flex flex-col items-start gap-8 self-stretch pt-[var(--sds-size-space-400)] pr-[var(--sds-size-space-400)] pb-[var(--sds-size-space-400)] pl-[var(--sds-size-space-400)] p-4 opacity-[var(--sds-size-stroke-border)]">
    <div className="flex flex-col items-start self-stretch opacity-[var(--sds-size-stroke-border)]">
      <div className="title Roboto)'] 16px)] 24px)] w-[20.5rem] opacity-[var(--sds-size-stroke-border)] text-[#1d1b20] font-['var(--Body-Large-Font, text-[var(--Body-Large-Size, leading-[var(--Body-Large-Line-Height,">Professor Name</div>
      <div className="subhead-1 Roboto)'] 14px)] 20px)] w-[20.5rem] opacity-[var(--sds-size-stroke-border)] text-[#49454f] font-['var(--Body-Medium-Font, text-[var(--Body-Medium-Size, leading-[var(--Body-Medium-Line-Height,">Overall Rating</div>
    </div>
    <div className="supporting-text Roboto)'] 14px)] 20px)] self-stretch opacity-[var(--sds-size-stroke-border)] text-[#49454f] font-['var(--Body-Medium-Font, text-[var(--Body-Medium-Size, leading-[var(--Body-Medium-Line-Height,">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</div>
    <div className="actions flex justify-end items-start self-stretch opacity-[var(--sds-size-stroke-border)] gap-2">
      <div className="flex flex-col justify-center items-center gap-2 h-10 rounded-full border border-[#79747e] transition duration-300 hover:bg-[#65558f] cursor-pointer">
        <div className="state-layer-1 flex justify-center items-center self-stretch py-2 px-6 opacity-[var(--sds-size-stroke-border)] label-text Roboto)'] 14px)] 20px)] opacity-[var(--sds-size-stroke-border)] text-[#65558f] text-center font-['var(--Label-Large-Font, text-[var(--Label-Large-Size, font-medium leading-[var(--Label-Large-Line-Height, hover:text-white">
          Delete
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 h-10 rounded-full bg-[#65558f] transition duration-300 hover:bg-[#4a3d72] cursor-pointer">
        <div className="state-layer-2 flex justify-center items-center self-stretch py-2 px-6 opacity-[var(--sds-size-stroke-border)] label-text-1 Roboto)'] 14px)] 20px)] opacity-[var(--sds-size-stroke-border)] text-white text-center font-['var(--Label-Large-Font, text-[var(--Label-Large-Size, font-medium leading-[var(--Label-Large-Line-Height,">
          Join Chat
        </div>
      </div>
    </div>
  </div>
</div>



<div className="flex flex-col items-center w-[22.5rem] h-[480px] opacity-[var(--sds-size-stroke-border)]">
  <div className="flex flex-shrink-0 items-center self-stretch pt-[var(--sds-size-space-300)] pb-[var(--sds-size-space-300)] pl-[var(--sds-size-space-400)] pr-[var(--sds-size-space-100)] py-3 pl-4 pr-1 h-[4.5rem] opacity-[var(--sds-size-stroke-border)]">
    <div className="content flex items-center opacity-[var(--sds-size-stroke-border)]">
      <div className="text flex flex-col items-start opacity-[var(--sds-size-stroke-border)]">
        <div className="header-1 Roboto)'] 16px)] 24px)] self-stretch opacity-[var(--sds-size-stroke-border)] text-[#1d1b20] font-['var(--Title-Medium-Font, text-[var(--Title-Medium-Size, font-medium leading-[var(--Title-Medium-Line-Height,">Course Code</div>
        <div className="subhead Roboto)'] 14px)] 20px)] self-stretch opacity-[var(--sds-size-stroke-border)] text-[#1d1b20] font-['var(--Body-Medium-Font, text-[var(--Body-Medium-Size, leading-[var(--Body-Medium-Line-Height,">Course Name</div>
      </div>
    </div>
    <div className="flex flex-col justify-center items-center gap-2.5 w-12 h-12">
      <div className="flex justify-center items-center gap-2.5 opacity-[var(--sds-size-stroke-border)] rounded-full">
        <div className="flex justify-center items-center gap-2.5 pt-[var(--sds-size-space-200)] pr-[var(--sds-size-space-200)] pb-[var(--sds-size-space-200)] pl-[var(--sds-size-space-200)] p-2 opacity-[var(--sds-size-stroke-border)]">
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" fill="#49454F" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div className="flex flex-col items-start gap-8 self-stretch pt-[var(--sds-size-space-400)] pr-[var(--sds-size-space-400)] pb-[var(--sds-size-space-400)] pl-[var(--sds-size-space-400)] p-4 opacity-[var(--sds-size-stroke-border)]">
    <div className="flex flex-col items-start self-stretch opacity-[var(--sds-size-stroke-border)]">
      <div className="title Roboto)'] 16px)] 24px)] w-[20.5rem] opacity-[var(--sds-size-stroke-border)] text-[#1d1b20] font-['var(--Body-Large-Font, text-[var(--Body-Large-Size, leading-[var(--Body-Large-Line-Height,">Professor Name</div>
      <div className="subhead-1 Roboto)'] 14px)] 20px)] w-[20.5rem] opacity-[var(--sds-size-stroke-border)] text-[#49454f] font-['var(--Body-Medium-Font, text-[var(--Body-Medium-Size, leading-[var(--Body-Medium-Line-Height,">Overall Rating</div>
    </div>
    <div className="supporting-text Roboto)'] 14px)] 20px)] self-stretch opacity-[var(--sds-size-stroke-border)] text-[#49454f] font-['var(--Body-Medium-Font, text-[var(--Body-Medium-Size, leading-[var(--Body-Medium-Line-Height,">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</div>
    <div className="actions flex justify-end items-start self-stretch opacity-[var(--sds-size-stroke-border)] gap-2">
      <div className="flex flex-col justify-center items-center gap-2 h-10 rounded-full border border-[#79747e] transition duration-300 hover:bg-[#65558f] cursor-pointer">
        <div className="state-layer-1 flex justify-center items-center self-stretch py-2 px-6 opacity-[var(--sds-size-stroke-border)] label-text Roboto)'] 14px)] 20px)] opacity-[var(--sds-size-stroke-border)] text-[#65558f] text-center font-['var(--Label-Large-Font, text-[var(--Label-Large-Size, font-medium leading-[var(--Label-Large-Line-Height, hover:text-white">
          Delete
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 h-10 rounded-full bg-[#65558f] transition duration-300 hover:bg-[#4a3d72] cursor-pointer">
        <div className="state-layer-2 flex justify-center items-center self-stretch py-2 px-6 opacity-[var(--sds-size-stroke-border)] label-text-1 Roboto)'] 14px)] 20px)] opacity-[var(--sds-size-stroke-border)] text-white text-center font-['var(--Label-Large-Font, text-[var(--Label-Large-Size, font-medium leading-[var(--Label-Large-Line-Height,">
          Join Chat
        </div>
      </div>
    </div>
  </div>
</div>


</div> */}