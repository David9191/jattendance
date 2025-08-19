import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/userDetail.css';

const UserDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userFromState = location.state?.user;

  useEffect(() => {
    if (!userFromState) {
      console.error('사용자 정보가 없습니다. 사용자 상세 정보를 불러올 수 없습니다.');
      return;
    }
    console.log('사용자 상세 정보:', userFromState);
  }, [userFromState]);

  // 사용자 정보가 없는 경우 에러 상태 표시
  if (!userFromState) {
    return (
      <div className="ud-page">
        <div className="ud-error">
          <div className="ud-error-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="ud-error-title">사용자 정보를 불러올 수 없습니다</h3>
          <p className="ud-error-message">올바른 경로를 통해 접근해주세요.</p>
        </div>
      </div>
    );
  }

  const {
    id,
    name,
    gender,
    phone,
    profile_image_url,
    user_roles = [],
    user_groups,
    email,
    birth_date,
    created_at,
  } = userFromState;

  // 이니셜 생성
  const initials = (name || '?').slice(0, 2);

  // 성별 표시
  const genderDisplay = gender === 'male' ? '남자' : gender === 'female' ? '여자' : '미설정';
  const genderClass = gender === 'male' ? 'ud-badge--gender-male' : 'ud-badge--gender-female';

  // 역할 정보
  const primaryRole = user_roles[0]?.roles?.role_name || '역할 없음';

  // 그룹 정보
  const groupName = user_groups?.name || '그룹 없음';

  // 가입일 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return '정보 없음';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    // 향후 편집 기능 구현
    console.log('편집 기능 준비 중...');
  };

  return (
    <div className="ud-page">
      {/* Header */}
      <div className="ud-header">
        <button className="ud-back-btn" onClick={handleBack}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          뒤로가기
        </button>
        <h1 className="ud-title">사용자 상세 정보</h1>
      </div>

      <div className="ud-container">
        {/* Profile Section */}
        <div className="ud-profile-section">
          <div className="ud-avatar-container">
            <div className="ud-avatar">{profile_image_url ? <img src={profile_image_url} alt={name} /> : initials}</div>
            <h2 className="ud-user-name">{name || '이름 없음'}</h2>
            <h2 className="ud-user-email">{email || '이메일 없음'}</h2>
          </div>

          <div className="ud-quick-info">
            <div className="ud-quick-info-item">
              <div className="ud-quick-info-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="ud-quick-info-content">
                <div className="ud-quick-info-label">성별</div>
                <div className="ud-quick-info-value">{genderDisplay}</div>
              </div>
            </div>

            <div className="ud-quick-info-item">
              <div className="ud-quick-info-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="ud-quick-info-content">
                <div className="ud-quick-info-label">전화번호</div>
                <div className="ud-quick-info-value">{phone || '정보 없음'}</div>
              </div>
            </div>

            <div className="ud-quick-info-item">
              <div className="ud-quick-info-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8zM8 14v.01M16 14v.01"
                  />
                </svg>
              </div>
              <div className="ud-quick-info-content">
                <div className="ud-quick-info-label">역할</div>
                <div className="ud-quick-info-value">{primaryRole}</div>
              </div>
            </div>

            <div className="ud-quick-info-item">
              <div className="ud-quick-info-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ud-quick-info-content">
                <div className="ud-quick-info-label">그룹</div>
                <div className="ud-quick-info-value">{groupName}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="ud-details-section">
          {/* Basic Information */}
          <div className="ud-card">
            <div className="ud-card-header">
              <h3 className="ud-card-title">
                <svg className="ud-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                기본 정보
              </h3>
              <button className="ud-edit-btn" onClick={handleEdit}>
                편집
              </button>
            </div>

            <div className="ud-info-grid">
              <div className="ud-info-item">
                <div className="ud-info-label">이름</div>
                <div className="ud-info-value">{name || '정보 없음'}</div>
              </div>

              <div className="ud-info-item">
                <div className="ud-info-label">사용자 ID</div>
                <div className="ud-info-value">{id}</div>
              </div>

              <div className="ud-info-item">
                <div className="ud-info-label">성별</div>
                <div className="ud-info-value">
                  <span className={`ud-badge ${genderClass}`}>{genderDisplay}</span>
                </div>
              </div>

              <div className="ud-info-item">
                <div className="ud-info-label">전화번호</div>
                <div className="ud-info-value">{phone || '정보 없음'}</div>
              </div>

              <div className="ud-info-item">
                <div className="ud-info-label">이메일</div>
                <div className="ud-info-value">{email || '정보 없음'}</div>
              </div>

              <div className="ud-info-item">
                <div className="ud-info-label">생년월일</div>
                <div className="ud-info-value">{birth_date ? formatDate(birth_date) : '정보 없음'}</div>
              </div>
            </div>
          </div>

          {/* Role and Group Information */}
          <div className="ud-card">
            <div className="ud-card-header">
              <h3 className="ud-card-title">
                <svg className="ud-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                역할 및 그룹
              </h3>
            </div>

            <div className="ud-info-grid">
              <div className="ud-info-item">
                <div className="ud-info-label">주 역할</div>
                <div className="ud-info-value">
                  <span className="ud-badge ud-badge--role">{primaryRole}</span>
                </div>
              </div>

              <div className="ud-info-item">
                <div className="ud-info-label">소속 그룹</div>
                <div className="ud-info-value">
                  <span className="ud-badge ud-badge--group">{groupName}</span>
                </div>
              </div>
            </div>

            {/* All Roles */}
            {user_roles && user_roles.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <div className="ud-info-label" style={{ marginBottom: '12px' }}>
                  모든 역할
                </div>
                <ul className="ud-list">
                  {user_roles.map((userRole, index) => (
                    <li key={index} className="ud-list-item">
                      <div className="ud-list-item-content">
                        <div className="ud-list-item-title">{userRole.roles?.role_name || '알 수 없는 역할'}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* System Information */}
          <div className="ud-card">
            <div className="ud-card-header">
              <h3 className="ud-card-title">
                <svg className="ud-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                시스템 정보
              </h3>
            </div>

            <div className="ud-info-grid">
              <div className="ud-info-item">
                <div className="ud-info-label">가입일</div>
                <div className="ud-info-value">{formatDate(created_at)}</div>
              </div>

              <div className="ud-info-item">
                <div className="ud-info-label">계정 상태</div>
                <div className="ud-info-value">
                  <span className="ud-badge ud-badge--group">활성</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
