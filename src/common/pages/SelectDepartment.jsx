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

  const activateDepartmentFromDataset = (dataset) => {
    const { id, name, slug, themeColor, role, roleName } = dataset;
    if (!id || !slug) return;

    const newDepartmentInfo = {
      id,
      name,
      slug,
      theme_color: themeColor,
      role: role,
      role_name: roleName,
    };
    setCurrentDepartmentInfo(newDepartmentInfo);

    if (isAdmin?.isAdmin || isAdmin?.isSuperAdmin) {
      navigate(`/admin/${slug}`);
    } else {
      navigate(`/${slug}`);
    }
  };

  const handleCardClick = (e) => {
    activateDepartmentFromDataset(e.currentTarget.dataset);
  };

  useEffect(() => {
    const adminFlag = currentUserProfile?.user_roles?.some((r) => r?.role?.role === 'admin');
    const superAdminFlag = currentUserProfile?.user_roles?.some((r) => r?.role?.role === 'super_admin');
    setIsAdmin({ isAdmin: adminFlag, isSuperAdmin: superAdminFlag });

    const fetchDepartments = async () => {
      let departmentInfo;

      if (superAdminFlag) {
        const { data: allDepartment } = await geAllDepartments();
        departmentInfo = allDepartment;
      } else {
        const { data: departments } = await getDepartmentsByRole();
        departmentInfo = departments;
      }
      setCurrentUserDepartments(departmentInfo || []);
    };
    fetchDepartments();
  }, [currentUserProfile?.user_roles, geAllDepartments, getDepartmentsByRole]);

  const normalizeDepartmentItem = (item) => {
    const hasNestedDept = !!item?.departments;
    const dept = hasNestedDept ? item.departments : item;
    const role = hasNestedDept ? item?.roles?.role : undefined;
    const roleNameFromItem = hasNestedDept ? item?.roles?.role_name : undefined;

    let derivedRoleName = roleNameFromItem;
    if (!derivedRoleName && (isAdmin?.isSuperAdmin || isAdmin?.isAdmin)) {
      derivedRoleName = isAdmin?.isSuperAdmin ? '슈퍼 관리자' : '관리자';
    }

    return {
      id: dept?.id,
      name: dept?.name,
      slug: dept?.slug,
      themeColor: dept?.theme_color,
      role,
      role_name: derivedRoleName,
    };
  };

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
            {currentUserDepartments?.map((item, i) => {
              const n = normalizeDepartmentItem(item);
              return (
                <button
                  className="sd-card"
                  key={(n.id ?? 'dept') + '-' + i}
                  data-id={n.id}
                  data-name={n.name}
                  data-slug={n.slug}
                  data-theme-color={n.themeColor}
                  data-role={n.role}
                  data-role-name={n.role_name}
                  onClick={handleCardClick}
                  role="button"
                >
                  <div className="sd-card__left">
                    <span
                      className="sd-card__badge"
                      style={{ backgroundColor: n.themeColor || '#3b82f6' }}
                      aria-hidden="true"
                    />
                    <div className="sd-card__content">
                      <span className="sd-card__name">{n.name}</span>
                      {n.role_name ? (
                        <span className="sd-card__role">{n.role_name}</span>
                      ) : (
                        <span className="sd-card__role sd-card__role--muted">권한 정보 없음</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
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
