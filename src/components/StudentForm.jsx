import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, addDoc, collection, setDoc, deleteDoc } from 'firebase/firestore';
import "../index.css";
import PhotoUploader from './PhotoUploader';

export default function StudentForm({ isEdit, studentId, defaultData }) {
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    school: '',
    subject: '',
    hashtags: [],
    photoURL: '',
    classRecords: [],
    scores: [],
    parents: []
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    grade: false,
    school: false,
    subject: false
  });

  const [hashtagInput, setHashtagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (defaultData) {
      setFormData(prev => ({
        ...prev,
        ...defaultData,
        hashtags: defaultData.hashtags || [],
        classRecords: defaultData.classRecords || [],
        scores: defaultData.scores || [],
        parents: defaultData.parents || []
      }));
    }
  }, [defaultData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (value.trim()) {
      setFormErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleHashtagKeyDown = (e) => {
    if (e.key === 'Enter' && hashtagInput.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, hashtagInput.trim()],
      }));
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (index) => {
    const newTags = [...formData.hashtags];
    newTags.splice(index, 1);
    setFormData(prev => ({ ...prev, hashtags: newTags }));
  };

  const handleSave = async () => {
    const errors = {
      name: !formData.name.trim(),
      grade: !formData.grade.trim(),
      school: !formData.school.trim(),
      subject: !formData.subject.trim()
    };

    setFormErrors(errors);

    const firstErrorField = Object.keys(errors).find(key => errors[key]);
    if (firstErrorField) {
      const fieldNames = {
        name: '學生姓名',
        grade: '年級',
        school: '學校',
        subject: '科目'
      };
      window.alert(`⚠ 請填寫 ${fieldNames[firstErrorField]}`);
      return;
    }

    setLoading(true);
    const userId = auth.currentUser.uid;
    const photoURL = formData.photoURL;

    try {
      const studentData = {
        name: formData.name,
        grade: formData.grade,
        school: formData.school,
        subject: formData.subject,
        hashtags: formData.hashtags,
        photoURL: photoURL || '',
        classRecords: formData.classRecords,
        scores: formData.scores,
        parents: formData.parents
      };

      const studentRef = collection(db, 'users', userId, 'students');

      if (isEdit) {
        await setDoc(doc(studentRef, studentId), studentData);
      } else {
        await addDoc(studentRef, studentData);
      }

      navigate('/students');
    } catch (error) {
      console.error('儲存錯誤:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('確定要刪除這筆資料嗎？')) return;

    try {
      const userId = auth.currentUser.uid;
      const studentRef = doc(db, 'users', userId, 'students', studentId);
      await deleteDoc(studentRef);
      navigate('/students');
    } catch (error) {
      console.error('刪除失敗:', error);
    }
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => {
      const newArray = [...prev[section]];
      newArray[index][field] = value;
      return { ...prev, [section]: newArray };
    });
  };

  const handleAddItem = (section) => {
    const newItem =
      section === 'classRecords'
        ? { date: '', content: '' }
        : section === 'scores'
        ? { subject: '', score: '' }
        : { name: '', contact: '' };
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const handleDeleteItem = (section, index) => {
    setFormData(prev => {
      const newArray = [...prev[section]];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  return (
   <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded shadow space-y-6 w-full max-w-2xl relative">

        {/* 返回按鈕 */}
        <button
          onClick={() => navigate('/students')}
          className="absolute top-4 right-4 px-3 py-1.5 text-sm rounded border border-gray-400 text-gray-700 bg-white hover:!bg-[#FFFFD0] hover:!border-black transition-colors duration-200 z-10"
        >
          返回學生列表
        </button>

        {/* 照片上傳元件 */}
        <PhotoUploader
          initialPhotoURL={formData.photoURL}
          onFileChange={(url) =>
            setFormData((prev) => ({ ...prev, photoURL: url }))
          }
        />

        {/* 表單欄位 */}
        <div className="space-y-4">
          {[
            { label: '姓名', name: 'name', error: formErrors.name },
            { label: '年級', name: 'grade', error: formErrors.grade },
            { label: '學校', name: 'school', error: formErrors.school },
            { label: '科目', name: 'subject', error: formErrors.subject }
          ].map((field) => (
            <div key={field.name}>
              <label>{field.label}：</label>
              <input
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={`請輸入${field.label}`}
                className={`border p-2 w-full rounded ${field.error ? 'border-red-500' : 'border-gray-300'}`}
              />
              {field.error && <p className="text-red-500 text-sm mt-1">請填寫{field.label}</p>}
            </div>
          ))}

          {/* Hashtag */}
          <div>
            <label>學生個性 Hashtag：</label>
            <div className="flex flex-wrap gap-2 my-2">
              {formData.hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 px-2 py-1 rounded text-sm cursor-pointer"
                  onClick={() => handleRemoveHashtag(index)}
                >
                  #{tag} ✕
                </span>
              ))}
            </div>
            <input
              placeholder="輸入後按 Enter 新增"
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyDown={handleHashtagKeyDown}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* 上課紀錄 */}
          <div className="mt-10">
            <label className="font-semibold">上課紀錄：</label>
            {formData.classRecords.map((record, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2 mb-2">
                <input className="border p-2 flex-1" placeholder="日期" value={record.date} onChange={(e) => handleArrayChange('classRecords', index, 'date', e.target.value)} />
                <input className="border p-2 flex-1" placeholder="內容" value={record.content} onChange={(e) => handleArrayChange('classRecords', index, 'content', e.target.value)} />
                <button onClick={() => handleDeleteItem('classRecords', index)} className="text-red-500">刪除</button>
              </div>
            ))}
            <button onClick={() => handleAddItem('classRecords')} className="text-blue-500">+ 新增紀錄</button>
          </div>

          {/* 成績紀錄 */}
          <div>
            <label className="font-semibold">成績紀錄：</label>
            {formData.scores.map((score, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2 mb-2">
                <input className="border p-2 flex-1" placeholder="科目" value={score.subject} onChange={(e) => handleArrayChange('scores', index, 'subject', e.target.value)} />
                <input className="border p-2 flex-1" placeholder="分數" value={score.score} onChange={(e) => handleArrayChange('scores', index, 'score', e.target.value)} />
                <button onClick={() => handleDeleteItem('scores', index)} className="text-red-500">刪除</button>
              </div>
            ))}
            <button onClick={() => handleAddItem('scores')} className="text-blue-500">+ 新增成績</button>
          </div>

          {/* 家長聯絡 */}
          <div>
            <label className="font-semibold">家長聯絡：</label>
            {formData.parents.map((parent, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2 mb-2">
                <input className="border p-2 flex-1" placeholder="姓名" value={parent.name} onChange={(e) => handleArrayChange('parents', index, 'name', e.target.value)} />
                <input className="border p-2 flex-1" placeholder="聯絡方式" value={parent.contact} onChange={(e) => handleArrayChange('parents', index, 'contact', e.target.value)} />
                <button onClick={() => handleDeleteItem('parents', index)} className="text-red-500">刪除</button>
              </div>
            ))}
            <button onClick={() => handleAddItem('parents')} className="text-blue-500">+ 新增家長</button>
          </div>
        </div>

        {/* 儲存與刪除按鈕 */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
          {isEdit && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded border !bg-[#912224] text-white !border-[#912224]
                        hover:!bg-white hover:text-[#912224] hover:border-black transition-colors"
            >
              刪除資料
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-4 py-2 rounded border !border-[#228991] 
                        ${loading
                ? '!bg-[#22899180] text-white cursor-not-allowed'
                : '!bg-[#228991] text-white hover:!bg-white hover:text-[#228991] hover:border-black'}
                        sm:ml-auto`}
          >
            {loading ? '儲存中...' : '儲存'}
          </button>
        </div>
      </div>
    </div>

  );
}








