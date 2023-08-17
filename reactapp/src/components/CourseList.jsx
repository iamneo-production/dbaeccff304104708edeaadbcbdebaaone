import React from 'react';

const CourseList = ({ courses, onDeleteCourse }) => {
  return (
    <div>
      <h2>Course List</h2>
      <ul className="list-group">
        {courses.map((course, i) => (
          <li key={i} className="list-group-item">
            {course.title} - {course.description}
            <button
              className="btn2 btn2-danger btn2-sm float-right"
              onClick={() => onDeleteCourse(i)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
