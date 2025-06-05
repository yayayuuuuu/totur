import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import StudentForm from './StudentForm';

export default function StudentFormContainer() {
  const { id } = useParams();
  const [defaultData, setDefaultData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchStudent = async () => {
      const ref = doc(db, 'users', auth.currentUser.uid, 'students', id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setDefaultData(snapshot.data());
      }
    };
    fetchStudent();
  }, [id]);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 !bg-[#e4f8fa] rounded shadow-md">
     <h2 className="text-xl font-semibold text-center mb-4">
        {(defaultData?.name || 'XXX')} 的學習檔案
    </h2>
    
      <StudentForm
        isEdit={!!id}
        studentId={id}
        defaultData={defaultData}
        onSuccess={() => navigate('/')}
      />
    </div>
  );
}
