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

  const [hashtagInput, setHashtagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ⚡ 載入預設資料
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow space-y-4 w-full max-w-2xl relative">

        {/* 返回按鈕 */}
        <button
          onClick={() => navigate('/students')}
          className="absolute top-4 right-4 px-3 py-1.5 text-sm rounded border border-gray-400 text-gray-700 bg-white hover:!bg-[#FFFFD0] hover:!border-black transition-colors duration-200 z-10"
        >
          返回學生列表
        </button>

        <h2 className="text-lg font-semibold">{isEdit ? '編輯學生' : '新增學生'}</h2>

        {/* 📸 照片上傳元件 */}
        <PhotoUploader
          initialPhotoURL={formData.photoURL}
          onFileChange={(url) =>
            setFormData((prev) => ({ ...prev, photoURL: url }))
          }
        />

        {/* 文字欄位 */}
        <div><label>姓名：</label><input name="name" value={formData.name} onChange={handleChange} className="border p-1 w-full" /></div>
        <div><label>年級：</label><input name="grade" value={formData.grade} onChange={handleChange} className="border p-1 w-full" /></div>
        <div><label>學校：</label><input name="school" value={formData.school} onChange={handleChange} className="border p-1 w-full" /></div>
        <div><label>科目：</label><input name="subject" value={formData.subject} onChange={handleChange} className="border p-1 w-full" /></div>

        {/* Hashtag */}
        <div>
          <label>學生個性 Hashtag：</label>
          <div className="flex flex-wrap gap-2 my-2">
            {formData.hashtags.map((tag, index) => (
              <span key={index} className="bg-blue-100 px-2 py-1 rounded text-sm cursor-pointer" onClick={() => handleRemoveHashtag(index)}>
                #{tag} ✕
              </span>
            ))}
          </div>
          <input
            placeholder="輸入後按 Enter 新增"
            value={hashtagInput}
            onChange={(e) => setHashtagInput(e.target.value)}
            onKeyDown={handleHashtagKeyDown}
            className="border p-1 w-full"
          />
        </div>

        {/* 上課紀錄 */}
        <div>
          <label className="font-semibold">上課紀錄：</label>
          {formData.classRecords.map((record, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input className="border p-1 flex-1" placeholder="日期" value={record.date} onChange={(e) => handleArrayChange('classRecords', index, 'date', e.target.value)} />
              <input className="border p-1 flex-1" placeholder="內容" value={record.content} onChange={(e) => handleArrayChange('classRecords', index, 'content', e.target.value)} />
              <button onClick={() => handleDeleteItem('classRecords', index)} className="text-red-500">刪除</button>
            </div>
          ))}
          <button onClick={() => handleAddItem('classRecords')} className="text-blue-500">+ 新增紀錄</button>
        </div>

        {/* 成績紀錄 */}
        <div>
          <label className="font-semibold">成績紀錄：</label>
          {formData.scores.map((score, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input className="border p-1 flex-1" placeholder="科目" value={score.subject} onChange={(e) => handleArrayChange('scores', index, 'subject', e.target.value)} />
              <input className="border p-1 flex-1" placeholder="分數" value={score.score} onChange={(e) => handleArrayChange('scores', index, 'score', e.target.value)} />
              <button onClick={() => handleDeleteItem('scores', index)} className="text-red-500">刪除</button>
            </div>
          ))}
          <button onClick={() => handleAddItem('scores')} className="text-blue-500">+ 新增成績</button>
        </div>

        {/* 家長聯絡 */}
        <div>
          <label className="font-semibold">家長聯絡：</label>
          {formData.parents.map((parent, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input className="border p-1 flex-1" placeholder="姓名" value={parent.name} onChange={(e) => handleArrayChange('parents', index, 'name', e.target.value)} />
              <input className="border p-1 flex-1" placeholder="聯絡方式" value={parent.contact} onChange={(e) => handleArrayChange('parents', index, 'contact', e.target.value)} />
              <button onClick={() => handleDeleteItem('parents', index)} className="text-red-500">刪除</button>
            </div>
          ))}
          <button onClick={() => handleAddItem('parents')} className="text-blue-500">+ 新增家長</button>
        </div>

        {/* 儲存與刪除按鈕 */}
        <div className="flex items-center mt-4">
          {isEdit && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded border transition-colors 
                        !bg-[#912224] text-white !border-[#912224]
                        hover:!bg-white hover:text-[#912224] hover:border-black"
            >
              刪除資料
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={loading}
            className={`ml-auto px-4 py-2 rounded border transition-colors
                        !border-[#228991]
                        ${loading
              ? '!bg-[#22899180] text-white cursor-not-allowed'
              : '!bg-[#228991] text-white hover:!bg-white hover:text-[#228991] hover:border-black'}`}
          >
            {loading ? '儲存中...' : '儲存'}
          </button>
        </div>
      </div>
    </div>
  );
}



