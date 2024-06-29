import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation'; // navigation 임포트
import Home from './pages/Home';
import ArmsPage from './pages/ArmsPage';
import AbsPage from './pages/AbsPage';
import LegsPage from './pages/LegsPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';


const App = () => {
  return (
    <Router>
      <Navigation /> {/* 모든 페이지에 nav 탭 추가 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arms" element={<ArmsPage />} />
        <Route path="/팔" element={<ArmsPage />} />
        <Route path="/abs" element={<AbsPage />} />
        <Route path="/배" element={<AbsPage />} />
        <Route path="/legs" element={<LegsPage />} />
        <Route path="/다리" element={<LegsPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
