import React, { useState } from 'react';
import CourseForm from './CourseForm';
import CourseList from './CourseList';

const CMS = () => {
  const [courses, setCourses] = useState([]);

  const handleAddCourse = (course) => {
    setCourses([...courses, course]);
  };

  const handleDeleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  return (
    <div className="container">
      <h1 className="hight-h1">Course Management System</h1>
      <div className="row mt-4">
        <div className="col-md-6">
          <CourseList courses={courses} onDeleteCourse={handleDeleteCourse} />
        </div>
        <div className="col-md-6">
          <CourseForm onAddCourse={handleAddCourse} />
        </div>
      </div>
    </div>
  );
};

export default CMS;
