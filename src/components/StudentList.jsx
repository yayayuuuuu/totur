// components/StudentList.jsx
import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import useStudentList from '../hooks/useStudentList';
import FilterBar from './FilterBar'; // <-- 加入 FilterBar

export default function StudentList() {
  const students = useStudentList();
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    setFilteredStudents(students); // 預設顯示所有學生
  }, [students]);

  return (
    <div className="p-4 pt-24 px-10">
      <FilterBar students={students} setFiltered={setFilteredStudents} />

      <div className="mt-4 space-y-4">
        {filteredStudents.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

