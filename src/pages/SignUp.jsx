import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import { UserProfile } from '../contexts/UserProfileContext';

const SignUp = () => {
  const [userProfileForAuth, setUserProfileForAuth] = useState({
    email: '',
    password: '',
  });
  const [userProfile, setUserProfile] = useState({
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
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  const { signUpNewUser, createUserProfile } = UserAuth();
  const { getDepartments } = UserProfile();
  const navigate = useNavigate();

  const fetchDepartments = async () => {
    try {
      const result = await getDepartments();
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

  const handleAuthInputChange = (e) => {
    setUserProfileForAuth({
      ...userProfileForAuth,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserProfileInputChange = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const signUpResult = await signUpNewUser(userProfileForAuth?.email, userProfileForAuth?.password);
      if (!signUpResult.success) alert('에러가 발생했습니다. 다시 시도해 주세요.');

      const createUserProfileResult = await createUserProfile({
        ...userProfile,
        id: signUpResult.data.user.id,
      });
      if (!createUserProfileResult.success) {
        alert('에러가 발생했습니다. 다시 시도해 주세요.');
      }

      navigate('/signin');
    } catch (error) {
      setError('회원가입 실패');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <>
      <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Sign up</h2>
        <p>
          Already have an account?
          <br />
          <Link to="/signin">Sign in!</Link>
        </p>
        <div className="input-container">
          <input
            onChange={handleAuthInputChange}
            className="input"
            type="email"
            placeholder="이메일"
            autoComplete="true"
            value={userProfileForAuth?.email}
            name="email"
          />
          <input
            onChange={handleAuthInputChange}
            className="input"
            type="password"
            placeholder="비밀번호"
            autoComplete="true"
            value={userProfileForAuth?.password}
            name="password"
          />
          <input
            onChange={handleUserProfileInputChange}
            className="input"
            type="text"
            placeholder="이름"
            autoComplete="true"
            value={userProfile?.name}
            name="name"
          />
          <input
            type="tel"
            className="input"
            placeholder="전화번호"
            autoComplete="true"
            value={userProfile?.phone}
            name="phone"
            onChange={handleUserProfileInputChange}
          />
          <input
            type="date"
            onChange={handleUserProfileInputChange}
            className="input"
            value={userProfile?.birth_date}
            name="birth_date"
          />
          <br></br>
          <input
            type="radio"
            className="input-radio"
            name="gender"
            id="male"
            value="male"
            onChange={handleUserProfileInputChange}
          />
          <label htmlFor="male">남자</label>
          <input
            type="radio"
            className="input-radio"
            name="gender"
            id="female"
            value="female"
            onChange={handleUserProfileInputChange}
          />
          <label htmlFor="female">여자</label>
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
          >
            <option value="">부서를 선택하세요</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
          <br />
          <br />
          <button type="submit" disabled={loading}>
            Sign up
          </button>
          {error ? <p>{error}</p> : <p></p>}
        </div>
      </form>
    </>
  );
};

export default SignUp;
