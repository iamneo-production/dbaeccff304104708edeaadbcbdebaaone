import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CMS from '../components/CMS';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';

describe("Course_Management_System", () => {
  test("renders_CMS_component", () => {
    render(<CMS />);
    const heading = "Course Management System";
    const cmsTitle = screen.getByText(
      (content, element) => {
        const elementText = element.textContent.toLowerCase();
        return (
          elementText.includes(heading.toLowerCase()) &&
          content.startsWith(heading)
        );
      },
      { selector: "h1" }
    );
    expect(cmsTitle).toBeInTheDocument();
  });

  test("renders_course_list_and_course_form", () => {
    render(<CMS />);
    const courseList = screen.getByText(/Course List/i);
    const courseForm = screen.getByText(/Create Course/i);
    expect(courseList).toBeInTheDocument();
    expect(courseForm).toBeInTheDocument();
  });

  test("adds_a_new_course_to_the_course_list", () => {
    render(<CMS />);
    const titleInput = screen.getByPlaceholderText(/Course Title/i);
    const descriptionInput = screen.getByPlaceholderText(/Course Description/i);
    const addCourseButton = screen.getByText(/Add Course/i);

    fireEvent.change(titleInput, { target: { value: "New Course" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New Course Description" },
    });
    fireEvent.click(addCourseButton);

    const newCourse = screen.getByText(
      (content, element) => {
        const normalizedContent = content.toLowerCase();
        const elementText = element.textContent.toLowerCase();
        return elementText.includes(normalizedContent);
      },
      { selector: "li" }
    );
    expect(newCourse).toBeInTheDocument();
    expect(newCourse).toHaveTextContent(/New Course/i);
    expect(newCourse).toHaveTextContent(/New Course Description/i);
  });

  test("renders_Add_Course_button", () => {
    render(<CMS />);
    const addCourseButton = screen.getByText(/Add Course/i);
    expect(addCourseButton).toBeInTheDocument();
  });


  test("renders_Delete_button_for_each_course", () => {
    const mockCourses = [
      { title: "Course 1", description: "Description 1" },
      { title: "Course 2", description: "Description 2" },
      // Add more mock courses as needed
    ];
  
    render(<CourseList courses={mockCourses} onDeleteCourse={() => {}} />);
    
    // Get all delete buttons
    const deleteButtons = screen.getAllByText(/Delete/i);
  
    // Ensure the correct number of delete buttons is rendered
    expect(deleteButtons).toHaveLength(mockCourses.length);
    
    // Optional: You can also assert that each delete button is present
    for (let i = 0; i < mockCourses.length; i++) {
      expect(deleteButtons[i]).toBeInTheDocument();
    }
  });


  test("deletes_a_course_when_Delete_button_is_clicked", () => {
    const mockCourses = [
      { title: "Course 1", description: "Description 1" },
      { title: "Course 2", description: "Description 2" },

      // Add more mock courses as needed
    ];
  
    const mockDeleteFunction = jest.fn();
  
    render(<CourseList courses={mockCourses} onDeleteCourse={mockDeleteFunction} />);
  
    // Get all delete buttons
    const deleteButtons = screen.getAllByText(/Delete/i);
  
    // Click the first 'Delete' button
    fireEvent.click(deleteButtons[0]);
  
    // Check if the mockDeleteFunction was called with the correct index (0)
    expect(mockDeleteFunction).toHaveBeenCalledWith(0);
  });

  test("captures_course_title_and_description_in_the_form", () => {
    const mockOnAddCourse = jest.fn();
    render(<CourseForm onAddCourse={mockOnAddCourse} />);
  
    const titleInput = screen.getByPlaceholderText(/Course Title/i);
    const descriptionInput = screen.getByPlaceholderText(/Course Description/i);
    const addCourseButton = screen.getByText(/Add Course/i);
  
    // Simulate user input
    fireEvent.change(titleInput, { target: { value: "New Course Title" } });
    fireEvent.change(descriptionInput, { target: { value: "New Course Description" } });
    fireEvent.click(addCourseButton);
  
    // Check if the onAddCourse function was called with the correct course data
    expect(mockOnAddCourse).toHaveBeenCalledWith({
      title: "New Course Title",
      description: "New Course Description",
    });
  });
  

});