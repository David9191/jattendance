import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import { UserProfile } from '../contexts/UserProfileContext';

const SelectDepartment = () => {
  // 내가 속한 부서를 가져온다. join으로 가져오기. 그 부서 목록을 보여준다.
  // 없으면 가기.(일반 유저일 때는 그냥 default_department로 들어가기.)
  /**
   * 일단 여기서는 처음에 유저가 속해 있는 departments만 갖고 와야겠다.
   * 이후 부서 선택 시, 그 부서에서의 역할을 추가로 유저 정보에 넣자.
   */
  const [currentUserDepartments, setCurrentUserDepartments] = useState([]);
  const { signOut } = UserAuth();
  const { getDepartments } = UserProfile();
  const navigate = useNavigate();

  const handleCreateDepartmentClick = () => {
    navigate('/create-department');
  };
  const handleSignOutClick = () => {
    signOut();
    navigate('/signin');
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      const { success, data } = await getDepartments();

      if (success) {
        setCurrentUserDepartments(data);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div>
      <button onClick={handleSignOutClick}>SIGN OUT</button>
      <div onClick={handleCreateDepartmentClick}>+</div>
      {currentUserDepartments.map((department, i) => (
        <div key={department.id + i} onClick={() => {}}>
          {department?.name}
        </div>
      ))}
    </div>
  );
};

export default SelectDepartment;
