import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import { UserProfile } from '../contexts/UserProfileContext';
import { UserDepartment } from '../contexts/DepartmentContext';

const SelectDepartment = () => {
  const [currentUserDepartments, setCurrentUserDepartments] = useState([]);
  const [isAdmin, setIsAdmin] = useState({
    isAdmin: false,
    isSuperAdmin: false,
  });
  const { setCurrentDepartmentInfo } = UserDepartment();
  const { signOut } = UserAuth();
  const { geAllDepartments, getDepartmentsByRole, currentUserProfile } = UserProfile();
  const navigate = useNavigate();

  // 이 부분을 바꾸기
  const handleSignOutClick = async () => {
    await signOut();
    navigate('/signin');
  };

  const handleDepartmentClick = (e) => {
    const { id, name, slug, themeColor } = e.currentTarget.dataset;
    const newDepartmentInfo = {
      id,
      name,
      slug,
      theme_color: themeColor,
    };
    setCurrentDepartmentInfo(newDepartmentInfo);

    if (isAdmin) {
      navigate(`/admin/${slug}`);
    } else {
      navigate(`/${slug}`);
    }
  };

  useEffect(() => {
    const isAdmin = currentUserProfile?.user_roles?.some((r) => r?.role?.role === 'admin');
    const isSuperAdmin = currentUserProfile?.user_roles?.some((r) => r?.role?.role === 'super_admin');
    setIsAdmin({ isAdmin, isSuperAdmin });

    const fetchDepartments = async () => {
      let data;

      if (isSuperAdmin) {
        const { data: allDepartment } = await geAllDepartments();
        data = allDepartment;
      } else {
        const { data: departments } = await getDepartmentsByRole();
        data = departments;
      }
      setCurrentUserDepartments(data);
    };
    fetchDepartments();
  }, []);

  return (
    <div>
      <button onClick={handleSignOutClick}>로그아웃</button>
      {currentUserDepartments?.length ? (
        <>
          {currentUserDepartments?.map((department, i) => (
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
        </>
      ) : (
        <>
          <p>접근 가능한 부서가 없습니다.</p>
        </>
      )}
    </div>
  );
};

export default SelectDepartment;
