import './App.css';

// 분리된 리액트 컴포넌트 import
import MenuItems from './ui/MenuItems';
import AppRouters from './routes/AppRouters';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const appName = "IT Academy Coffee Shop";

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loginUser = localStorage.getItem('user');
    setUser(JSON.parse(loginUser));
  }, []);

  const handleLoginSuccess = (userData) => {
    // userData : LoginPage.js에서 반환 받은 member 정보입니다.
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('로그인 성공');
  }

  const navigate = useNavigate();

  // 로그인한 사용자가 '로그 아웃' 버튼을 클릭했습니다.
  const handleLogout = (event) => {
    event.preventDefault();

    setUser(null);
    localStorage.removeItem('user');
    console.log('로그 아웃 성공');
    navigate(`/member/login`);
  };

  return (
    <>
      <MenuItems appName={appName} user={user} handleLogout={handleLogout} />

      {/* 분리된 라우터 정보 */}
      <AppRouters user={user} handleLoginSuccess={handleLoginSuccess} />

      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p>&copy; 2025 {appName}. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
