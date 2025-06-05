import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function FilterBar({ students, setFiltered }) {
  const [gradeOptions, setGradeOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      const userId = auth.currentUser.uid;
      const studentRef = collection(db, 'users', userId, 'students');
      const snapshot = await getDocs(studentRef);

      const gradesSet = new Set();
      const subjectsSet = new Set();

      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.grade) gradesSet.add(data.grade);
        if (data.subject) subjectsSet.add(data.subject);
      });

      setGradeOptions([...gradesSet]);
      setSubjectOptions([...subjectsSet]);
    };

    fetchOptions();
  }, []);

  const handleFilter = () => {
    const filtered = students.filter(s =>
      (!grade || s.grade === grade) &&
      (!subject || s.subject === subject)
    );
    setFiltered(filtered);
  };

  const showArrow = students.length === 0;

  return (
    <div className="flex flex-wrap items-center justify-between mb-4 gap-2 relative">
      {/* 左邊：新增學生 */}
        <div className="relative flex items-center gap-2">
        <button
            onClick={() => navigate('/students/new')}
            className="!bg-[#228991] !text-white px-4 py-2 rounded border !border-[#228991] hover:!bg-white hover:!text-[#228991] transition active:scale-95"
        >
            ＋ 新增學生
        </button>
        {showArrow && (
            <div className="text-[#228991] animate-bounce text-2xl">
             ⬅
            </div>
        )}
        </div>

      {/* 右邊：搜尋區域 */}
      <div className="flex flex-wrap items-center gap-4">
        {/* 年級選單 */}
        <div className="flex items-center gap-2">
          <label htmlFor="grade">選擇年級：</label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border p-2 w-32 rounded"
          >
            <option value="">全部年級</option>
            {gradeOptions.map((g, idx) => (
              <option key={idx} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* 科目選單 */}
        <div className="flex items-center gap-2">
          <label htmlFor="subject">選擇科目：</label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 w-32 rounded"
          >
            <option value="">全部科目</option>
            {subjectOptions.map((s, idx) => (
              <option key={idx} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleFilter}
          className="!bg-[#FFFFD0] !text-[#228991] px-4 py-2 rounded border !border-[#228991] hover:!bg-white hover:!text-[#228991] transition"
        >
          搜尋
        </button>
      </div>
    </div>
  );
}
