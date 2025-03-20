import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Plus, Minus } from "lucide-react";

// 候选人数据（模拟）
const initialCandidates = [
  { id: 1, name: "Alice", avatar: "https://randomuser.me/api/portraits/women/1.jpg", selected: true },
  { id: 2, name: "Bob", avatar: "https://randomuser.me/api/portraits/men/1.jpg", selected: true },
  { id: 3, name: "Catherine", avatar: "https://randomuser.me/api/portraits/women/2.jpg", selected: true },
  { id: 4, name: "David", avatar: "https://randomuser.me/api/portraits/men/2.jpg", selected: true },
];

const CandidateSelection = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState(initialCandidates);
  const [topics] = useState(["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5", "Topic 6"]);

  // 切换候选人勾选状态
  const toggleSelection = (id) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  // 增加候选人（仅模拟，每次添加新候选人）
  const addCandidate = () => {
    const newId = candidates.length + 1;
    setCandidates([
      ...candidates,
      { id: newId, name: `User ${newId}`, avatar: "https://randomuser.me/api/portraits/lego/2.jpg", selected: true },
    ]);
  };

  // 减少候选人（确保至少 1 人）
  const removeCandidate = () => {
    if (candidates.length > 1) {
      setCandidates(candidates.slice(0, -1));
    }
  };

  // 提交逻辑（更新 Dashboard 会议列表）
  const handleSubmit = () => {
    // 本地存储新创建的会议
    const newCommittee = { name: `Committee ${Date.now()}`, topics, candidates };
    const existingCommittees = JSON.parse(localStorage.getItem("committees")) || [];
    localStorage.setItem("committees", JSON.stringify([...existingCommittees, newCommittee]));

    // 跳转回 Dashboard 页面
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* 头部 */}
      <div className="flex justify-between items-center w-full max-w-5xl bg-white p-4 shadow-lg rounded-lg">
        <Home className="w-8 h-8 cursor-pointer text-gray-700" onClick={() => navigate("/")} />
        <h1 className="text-2xl font-extrabold text-gray-800">PROGRAM COMMITTEE</h1>
      </div>

      {/* 内容 */}
      <div className="flex mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        {/* 主题列表 */}
        <div className="w-1/3 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Theme</h3>
          {topics.map((topic, index) => (
            <div key={index} className="flex justify-between items-center mb-3">
              <span>• {topic}</span>
              <span className="text-gray-600 text-sm">expected number: 10</span>
            </div>
          ))}
        </div>

        {/* 候选人列表 */}
        <div className="w-2/3 p-4">
          <h3 className="text-lg font-semibold mb-4">Candidate</h3>
          {candidates.map((candidate) => (
            <div key={candidate.id} className="flex items-center justify-between mb-3 bg-gray-50 p-3 rounded-lg shadow">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={candidate.selected}
                  onChange={() => toggleSelection(candidate.id)}
                  className="w-5 h-5"
                />
                <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full border" />
                <span className="text-gray-700">{candidate.name}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={addCandidate} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                  <Plus />
                </button>
                <button onClick={removeCandidate} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                  <Minus />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="mt-6 flex gap-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Submit
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CandidateSelection;
