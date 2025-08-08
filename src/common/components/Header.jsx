import React from 'react';
import { UserAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/signin');
  };

  console.log(session);
  return (
    <header>
      {session ? (
        <div>
          <span>안녕하세요, {session.email}!</span>
          <button onClick={signOut}>로그아웃</button>
        </div>
      ) : (
        <button onClick={handleLoginClick}>로그인</button>
      )}
    </header>
  );
};

export default Header;
