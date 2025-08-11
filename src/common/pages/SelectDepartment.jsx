import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import { UserProfile } from '../contexts/UserProfileContext';
import { UserDepartment } from '../contexts/DepartmentContext';
import '../css/selectDepartment.css';

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

    if (isAdmin?.isAdmin || isAdmin?.isSuperAdmin) {
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
    <div className="sd-container">
      <div className="sd-inner fade-in-element">
        <header className="sd-header">
          <h1 className="sd-title">부서를 선택하세요</h1>
          <button className="sd-logout" onClick={handleSignOutClick}>
            로그아웃
          </button>
        </header>

        {currentUserDepartments?.length ? (
          <div className="sd-grid">
            {currentUserDepartments?.map((department, i) => (
              <div
                className="sd-card"
                key={department.id + i}
                data-id={department.id}
                data-name={department.name}
                data-slug={department.slug}
                data-theme-color={department.theme_color}
                onClick={handleDepartmentClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleDepartmentClick(e);
                }}
              >
                <span className="sd-card__name">{department?.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="sd-empty">
            <p>접근 가능한 부서가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectDepartment;
