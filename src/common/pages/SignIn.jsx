import { useEffect, useState } from 'react';
import { UserAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../css/signIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { signIn, session } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const signInResult = await signIn(email, password);

      if (!signInResult.success) {
        alert('로그인에 실패하였습니다.\n다시 시도해 주세요.');
        return;
      }

      navigate('/select-department');
    } catch (error) {
      setError('an error occurred: ');
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) {
      console.log(session);
      // navigate('/select-department');
    }
  }, []);

  return (
    <div className="fade-in-element">
      <form onSubmit={handleSignIn}>
        <h2>로그인</h2>
        <p>계정이 없으신가요?</p>
        <p>
          <Link to={'/signup'}>회원가입</Link>
        </p>
        <div className="input-container">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            placeholder="email"
            autoComplete="true"
            value={email}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            placeholder="password"
            autoComplete="true"
            value={password}
          />
          <button
            type="submit"
            // disabled={loading}
          >
            로그인
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
