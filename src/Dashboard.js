import React, { useState, useEffect, useRef } from "react";
import { Plus, Minus, Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 侧边栏组件
const CommitteeList = ({ committees }) => (
  <div className="w-1/4 bg-gray-100 p-6 flex flex-col rounded-xl shadow-lg">
    <button className="w-full mb-6 bg-gray-300 p-3 rounded-lg font-semibold text-gray-700">
      Committee List
    </button>
    <div>
      <h3 className="font-semibold text-lg text-gray-800 mb-2">Processing</h3>
      {committees.processing.map((c, index) => (
        <button
          key={index}
          className="w-full my-2 bg-white p-3 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          {c}
        </button>
      ))}
    </div>
    <div className="mt-6">
      <h3 className="font-semibold text-lg text-gray-800 mb-2">Finished</h3>
      {committees.finished.map((c, index) => (
        <button
          key={index}
          className="w-full my-2 bg-white p-3 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          {c}
        </button>
      ))}
    </div>
  </div>
);

// 头像 + Logout 下拉菜单组件
const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // 监听点击事件，点击头像外的区域关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 头像按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)} // 点击切换菜单
        className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition"
      >
        <User className="w-6 h-6 text-gray-700" />
      </button>

      {/* Logout 菜单 */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg overflow-hidden z-50"
        >
          <button
            onClick={() => navigate("/login")}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

// 头部组件
const Header = ({ onCreate }) => {
  return (
    <div className="flex items-center justify-between border-b pb-4 mb-6 bg-white shadow p-6 rounded-lg">
      <Home className="w-8 h-8 cursor-pointer text-gray-700" />
      <h1 className="text-2xl font-extrabold text-gray-800">PROGRAM COMMITTEE</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={onCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          Create
        </button>
        {/* 头像 + Logout 组件 */}
        <UserDropdown />
      </div>
    </div>
  );
};

// 主题候选者列表 (更新 Topic 1,2,3,4,5,6)
const TopicList = ({ topics, avatars }) => (
  <div className="bg-gray-50 p-6 rounded-xl shadow-lg flex flex-col gap-6">
    {topics.map((topic, index) => (
      <div key={index} className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg">
        <span className="text-lg font-semibold text-gray-700">{topic}</span>
        <div className="flex items-center gap-3">
          {avatars.map((avatar, i) => (
            <img key={i} src={avatar} alt="avatar" className="w-10 h-10 rounded-full border shadow-sm" />
          ))}
          <Plus className="cursor-pointer w-6 h-6 text-green-500 hover:text-green-700 transition" />
          <Minus className="cursor-pointer w-6 h-6 text-red-500 hover:text-red-700 transition" />
        </div>
      </div>
    ))}
  </div>
);

// 资源链接
const ResourceLinks = () => (
  <div className="mt-10 p-6 border-t border-gray-200">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Resource Links:</h3>
    <div className="grid grid-cols-2 gap-6">
      <a
        href="https://ieee-focs.org/"
        className="text-lg text-blue-600 hover:text-blue-800 font-semibold transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        FOCS 2025
      </a>
      <a
        href="https://dblp.org/db/conf/focs/index.html"
        className="text-lg text-blue-600 hover:text-blue-800 font-semibold transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        DBLP
      </a>
    </div>
  </div>
);

const ConferencePage = () => {
  const [committees, setCommittees] = useState({
    processing: ["Committee 1", "Committee 2", "Committee 3"],
    finished: ["Committee 4", "Committee 5", "Committee 6"],
  });

  const topics = ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5", "Topic 6"];
  const avatars = [
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
  ];

  const handleCreate = () => {
    setCommittees((prev) => ({
      ...prev,
      processing: [...prev.processing, `Committee ${prev.processing.length + 1}`],
    }));
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 p-6">
      <CommitteeList committees={committees} />
      <div className="flex-1 flex flex-col px-6">
        <Header onCreate={handleCreate} />
        <TopicList topics={topics} avatars={avatars} />
        <ResourceLinks />
      </div>
    </div>
  );
};

export default ConferencePage;
