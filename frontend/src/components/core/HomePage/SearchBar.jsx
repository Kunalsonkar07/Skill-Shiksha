import { useEffect, useState } from "react";
import { getAllCourses } from "../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import { Link } from "react-router-dom"; // Import Link for navigation

const SearchBar = () => {
  const [word, setWord] = useState("");
  const [course, setCourse] = useState([]);

  useEffect(() => {
    if (word.trim() === "") {
      setCourse([]); // Reset the course list when the search term is empty
      return;
    }

    const fetchCourse = async () => {
      try {
        const courses = await getAllCourses();
        if (courses.length === 0) {
          setCourse([]);
          return;
        }

        if (Array.isArray(courses)) {
          const filteredCourses = courses.filter((course) =>
            course.courseName.toLowerCase().startsWith(word.toLowerCase().trim())
          );
          setCourse(filteredCourses); // Update course list
        } else {
          toast.error("Courses is not an array");
        }
      } catch (error) {
        toast.error("Error fetching courses");
      }
    };

    // Debouncing the fetch call to avoid frequent API requests
    const debounceFetch = setTimeout(() => {
      fetchCourse();
    }, 300);

    return () => clearTimeout(debounceFetch); // Cleanup when 'word' changes or component unmounts
  }, [word]);

  return (
    <div className="relative text-black">
      <form className="flex mt-5 items-center max-w-lg mx-auto">
        <label htmlFor="voice-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
            </svg>
          </div>
          <input
            onChange={(e) => setWord(e.target.value)}
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Courses"
            value={word}
            required
          />
        </div>
      </form>

      {/* Display the filtered course names below the search bar */}
      {word.length > 0 && (
        <div className="absolute left-[50%] top-[130%] z-[1000] w-[100%] max-w-[300px] translate-x-[-50%] translate-y-[10px] flex flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 shadow-lg">
          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
          {course.length > 0 ? (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md max-h-60 overflow-y-auto">
              <div className="flex flex-col gap-2">
                {course.map((course, index) => (
                  <Link key={index} to={`/courses/${course._id}`}>
                    <div className="bg-white-200 p-2 rounded-lg hover:bg-gray-300 transition-all">
                      <p className="font-semibold text-black">{course.courseName}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            word.length > 0 && <p className="font-semibold">No courses found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
