import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import { UserProfile } from '../contexts/UserProfileContext';
import { UserDepartment } from '../contexts/DepartmentContext';

const SelectDepartment = () => {
  // 내가 속한 부서를 가져온다. join으로 가져오기. 그 부서 목록을 보여준다.
  // 없으면 가기.(일반 유저일 때는 그냥 default_department로 들어가기.)
  /**
   * 일단 여기서는 처음에 유저가 속해 있는 departments만 갖고 와야겠다.
   * 이후 부서 선택 시, 그 부서에서의 역할을 추가로 유저 정보에 넣자.
   */
  const [currentUserDepartments, setCurrentUserDepartments] = useState([]);
  const { setCurrentDepartmentInfo } = UserDepartment();
  const { getDepartmentsByRole } = UserProfile();
  const { signOut } = UserAuth();
  const navigate = useNavigate();
  // 이건 잠재적 문제 있음. 현재는 한 유저가 한 부서에만 종속되어 있지만
  // 만약 한 유저가 여러 부서에 속해 있을 경우엔, 어떻게 데이터가 올 지 모름.
  const currentUserProfile = JSON.parse(sessionStorage.getItem('currentUserProfile'));
  const handleSignOutClick = () => {
    signOut();
    navigate('/signin');
  };

  const handleDepartmentClick = (e) => {
    const isAdmin = currentUserProfile.role === 'admin' || currentUserProfile.role === 'super_admin';
    const { dataset } = e.currentTarget;
    const newDepartmentInfo = {
      id: dataset.id,
      name: dataset.name,
      slug: dataset.slug,
      theme_color: dataset.themeColor,
    };
    // add context. depart id, name, slug
    setCurrentDepartmentInfo(newDepartmentInfo);

    if (isAdmin) {
      navigate(`/admin/${dataset.slug}`);
    } else {
      navigate(`/${dataset.slug}`);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      const { success, data } = await getDepartmentsByRole();

      if (success) {
        setCurrentUserDepartments(data);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div>
      <button onClick={handleSignOutClick}>SIGN OUT</button>
      <br />
      {currentUserDepartments.map((department, i) => (
        <div
          key={department.id + i}
          data-id={department.id}
          data-name={department.name}
          data-slug={department.slug}
          data-theme-color={department.theme_color}
          onClick={handleDepartmentClick}
        >
          {department?.name}
        </div>
      ))}
    </div>
  );
};

export default SelectDepartment;
