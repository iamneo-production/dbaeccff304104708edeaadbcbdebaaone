import React, { useState } from 'react'

const CourseForm = ({onAddCourse}) => {

 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description) {
        const newCourse = { title,description };
        onAddCourse(newCourse);
        setTitle('');
        setDescription('');
    }
 };
  return (
    <div>
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Course Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Course Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Course
        </button>
      </form>
    </div>
  )
}

export default CourseForm