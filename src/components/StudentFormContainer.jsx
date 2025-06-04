// components/StudentFormContainer.jsx
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
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <StudentForm
        isEdit={!!id}
        studentId={id}
        defaultData={defaultData}
        onSuccess={() => navigate('/')}
      />
    </div>
  );
}
