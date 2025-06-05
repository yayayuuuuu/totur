import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import useStudentList from '../hooks/useStudentList';
import FilterBar from './FilterBar';

export default function StudentList() {
  const students = useStudentList();
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  return (
    <div className="pt-3 px-4 sm:pt-10 sm:px-6 md:px-10 min-h-screen bg-white">
      <FilterBar students={students} setFiltered={setFilteredStudents} />

      {filteredStudents.length === 0 ? (
        <div className="mt-12 text-center text-gray-600">
          <p className="mb-6 text-lg">
            還沒有資料，請點擊左上角{' '}
            <span className="font-semibold text-[#61C6CD]">新增學生</span>！
          </p>

          {/* 用和 StudentCard 相同的容器包住虛線卡 */}
          <div className="mt-4 space-y-5">
            <div className="flex bg-white border-2 border-dashed border-gray-400 p-4 rounded-md items-center justify-between shadow">
              <div className="flex items-center space-x-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full" />
                <div className="space-y-1">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-28 bg-gray-200 rounded" />
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="px-3 py-1 rounded border border-gray-300 text-gray-400 cursor-default">
                詳細檔案
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-5">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
}




