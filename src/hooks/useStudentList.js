// hooks/useStudentList.js
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function useStudentList() {
  const [students, setStudents] = useState([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;
    const fetchStudents = async () => {
      const studentRef = collection(db, 'users', userId, 'students');
      const snapshot = await getDocs(studentRef);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(list);
    };
    fetchStudents();
  }, [userId]);

  return students;
}
