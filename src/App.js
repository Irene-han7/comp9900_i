import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard"; // 主页面
import LoginPage from "./LoginPage"; // 登录页面
import CreateCommittee from "./CreateCommittee"; // 创建会议页面
import CandidateSelection from "./CandidateSelection"; // 候选人推荐页面

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreateCommittee />} />
        <Route path="/candidate-selection" element={<CandidateSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
