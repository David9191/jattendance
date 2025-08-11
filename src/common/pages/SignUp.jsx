import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import { UserProfile } from '../contexts/UserProfileContext';
import '../css/signUp.css';

const SignUp = () => {
  const [userProfile, setUserProfile] = useState({
    email: '',
    password: '',
    default_department_id: null,
    name: '',
    phone: '',
    birth_date: '',
    gender: '',
    profile_image_url: '',
    remember_login: false,
    parent_name: '',
    parent_phone: '',
    oauth_provider: '',
    oauth_email: '',
    oauth_metadata: {},
  });
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');

  const { signUp, signOut } = UserAuth();
  const { geAllDepartments } = UserProfile();
  const navigate = useNavigate();

  const handleUserProfileInputChange = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { success } = await signUp(userProfile);
      if (!success) {
        alert('에러가 발생했습니다. 다시 시도해 주세요.', error);
        return;
      }

      alert('회원가입이 완료되었습니다.');
      await signOut();
      navigate('/signin');
    } catch (error) {
      setError('회원가입 실패');
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const result = await geAllDepartments();
        if (result.success) {
          setDepartments(result.data);
        } else {
          setError('부서 목록을 가져오는데 실패했습니다.');
        }
      } catch (error) {
        setError('부서 목록을 가져오는데 오류가 발생했습니다.');
        console.error(error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="fade-in-element">
      <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>회원가입</h2>
        <p>이미 계정이 있으신가요?</p>
        <p style={{ marginBottom: '1rem' }}>
          <Link to="/signin">로그인 하러 가기</Link>
        </p>
        <div className="input-container">
          <input
            onChange={handleUserProfileInputChange}
            className="input"
            type="email"
            placeholder="이메일"
            autoComplete="true"
            value={userProfile?.email}
            name="email"
            required
          />
          <input
            onChange={handleUserProfileInputChange}
            className="input"
            type="password"
            placeholder="비밀번호"
            autoComplete="true"
            value={userProfile?.password}
            name="password"
            required
          />
          <input
            onChange={handleUserProfileInputChange}
            className="input"
            type="text"
            placeholder="이름"
            autoComplete="true"
            value={userProfile?.name}
            name="name"
            required
          />
          <input
            type="tel"
            className="input"
            placeholder="전화번호"
            autoComplete="true"
            value={userProfile?.phone}
            name="phone"
            onChange={handleUserProfileInputChange}
            required
          />
          <input
            type="date"
            onChange={handleUserProfileInputChange}
            className="input"
            value={userProfile?.birth_date}
            name="birth_date"
            required
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <input
              type="radio"
              className="input-radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleUserProfileInputChange}
              required
            />
            <label htmlFor="male">남자</label>
            <input
              type="radio"
              className="input-radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleUserProfileInputChange}
              required
            />
            <label htmlFor="female">여자</label>
          </div>
          <input
            onChange={handleUserProfileInputChange}
            className="input"
            type="text"
            placeholder="보호자 이름"
            autoComplete="true"
            value={userProfile?.parent_name}
            name="parent_name"
          />
          <input
            onChange={handleUserProfileInputChange}
            className="input"
            type="tel"
            placeholder="보호자 연락처"
            autoComplete="true"
            value={userProfile?.parent_phone}
            name="parent_phone"
          />
          <select
            onChange={handleUserProfileInputChange}
            className="input"
            name="default_department_id"
            value={userProfile?.default_department_id || ''}
            required
          >
            <option value="">부서를 선택하세요</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            // disabled={}
          >
            회원가입
          </button>
          {error ? <p>{error}</p> : <p></p>}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
