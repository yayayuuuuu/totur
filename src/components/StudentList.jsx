// components/StudentList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentCard from './StudentCard';
import useStudentList from '../hooks/useStudentList';

export default function StudentList() {
  const students = useStudentList();
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-4 pt-24 px-10">
      <button
        style={{
          backgroundColor: hover ? 'white' : '#228991',
          color: hover ? '#228991' : 'white',
          border: '1px solid #228991',
        }}
        className="px-4 py-2 rounded transition-colors duration-200"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => navigate('/students/new')}
      >
        ＋ 新增學生
      </button>

      <div className="mt-4 space-y-4">
        {students.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}
