import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { Home, User } from "lucide-react";

const CreateCommittee = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    topic: "",
    paperNumber: "",
    pcSize: "",
    reviewersPerPaper: 3,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!form.name || !form.topic || !form.paperNumber || !form.pcSize) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    // 存储表单数据，供下个页面使用
    localStorage.setItem("committeeData", JSON.stringify(form));

    // **修改跳转代码，携带 Topic 信息**
    navigate("/candidate-selection", { state: { topics: form.topic.split("\n").map(t => t.trim()).filter(t => t) } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* 头部 */}
      <div className="flex items-center justify-between w-full max-w-2xl bg-white p-4 rounded shadow-md">
        <Home className="w-8 h-8 cursor-pointer" onClick={() => navigate("/")} />
        <h1 className="text-2xl font-bold">PROGRAM COMMITTEE</h1>
        <User className="w-8 h-8 cursor-pointer" />
      </div>

      {/* 表单 */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl mt-6">
        <div className="flex flex-col gap-4">
          <label className="font-semibold">Committee Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter committee name"
            className="border p-2 rounded w-full"
          />

          <label className="font-semibold">Topic</label>
          <textarea
            name="topic"
            value={form.topic}
            onChange={handleChange}
            placeholder="Enter topics separated by line breaks or semi-colons"
            className="border p-2 rounded w-full h-24"
          />

          <label className="font-semibold">Paper Number</label>
          <input
            type="number"
            name="paperNumber"
            value={form.paperNumber}
            onChange={handleChange}
            placeholder="Enter expected paper number"
            className="border p-2 rounded w-full"
          />

          <label className="font-semibold">PC Size</label>
          <input
            type="number"
            name="pcSize"
            value={form.pcSize}
            onChange={handleChange}
            placeholder="Enter expected PC member number"
            className="border p-2 rounded w-full"
          />

          <label className="font-semibold">PC Reviewer Each Paper</label>
          <input
            type="number"
            name="reviewersPerPaper"
            value={form.reviewersPerPaper}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* 按钮 */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleNext} // 修正这里
          >
            Next
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCommittee;
