import React, { useEffect, useState } from 'react';
import { UserDepartment } from '../../../../common/contexts/DepartmentContext';
import { getAverageAttendanceRate, getUserList, getMonthlyBirthdayMembers } from '../services/getUserList';
import { useNavigate } from 'react-router-dom';
import '../css/userManagement.css';

const UserManagement = () => {
  const [pageNationInfo, setPageNationInfo] = useState({
    currentPage: 1,
    pageSize: 20,
    totalPage: 0,
    pageNationBlockSize: 10,
  });
  const [userList, setUserList] = useState([]);
  const [departmentStats, setDepartmentStats] = useState({
    attendance: {
      total_members: 0,
      average_attendees: 0,
      attendance_rate: 0,
    },
    birthdayMembers: [],
  });
  const [searchName, setSearchName] = useState('');
  const { currentDepartmentInfo } = UserDepartment();
  const navigate = useNavigate();

  const handleChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };

  const handleUserSearch = async () => {
    if (!searchName) {
      alert('이름을 입력해주세요.');
      return;
    }

    const searchedUsers = await getUserList(
      currentDepartmentInfo.id,
      pageNationInfo.currentPage,
      pageNationInfo.pageSize,
      searchName,
    );
    if (searchedUsers.length === 0) {
      alert('해당 이름의 사용자가 없습니다.');
      return;
    }
    setUserList(searchedUsers);
  };

  // 다시 검색
  const handlePageChange = () => {
    setPageNationInfo({ ...pageNationInfo, currentPage: pageNationInfo.currentPage - 1 });
  };

  // 사용자 상세 보기
  const handleUserDetail = (user) => {
    navigate(`${user.id}`, {
      state: { user },
    });
  };

  useEffect(() => {
    const setInitData = async () => {
      if (!currentDepartmentInfo.id) return;
      const departmentId = currentDepartmentInfo.id;
      try {
        const [userList, attendanceData, monthlyBirthdayMembers] = await Promise.all([
          getUserList(departmentId, pageNationInfo.currentPage, pageNationInfo.pageSize),
          getAverageAttendanceRate(departmentId),
          getMonthlyBirthdayMembers(departmentId),
        ]);
        const { total_members, average_attendees, attendance_rate } = attendanceData;

        setUserList(userList);
        setDepartmentStats({
          attendance: { total_members, average_attendees, attendance_rate },
          birthdayMembers: monthlyBirthdayMembers,
        });
        setPageNationInfo({
          ...pageNationInfo,
          totalPage: Math.ceil(userList.length / pageNationInfo.pageSize),
        });
      } catch (error) {
        console.error(error);
      }
    };

    setInitData();
  }, []);

  return (
    <div className="um-page">
      <section className="department-stats-container">
        <div>
          <div className="average-attendance-rate department-stats">
            <h3>한 달 평균 출석률</h3>
            <div>
              {departmentStats.attendance.average_attendees}명/{departmentStats.attendance.total_members}명
            </div>
            <div>{departmentStats.attendance.attendance_rate}%</div>
          </div>
          <div className="monthly-birthday-members department-stats">
            <h3>이번 달 생일자</h3>
            <ul>
              {departmentStats.attendance.birthdayMembers?.map((member, i) => (
                <li key={i}>{member?.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div>
            <input
              id="user-name"
              type="text"
              value={searchName}
              onChange={handleChangeSearchName}
              placeholder="이름"
              onKeyDown={(e) => e.key === 'Enter' && handleUserSearch()}
            />
            <button onClick={handleUserSearch}>검색</button>
          </div>
          <div>필터</div>
        </div>
      </section>

      <section className="user-list-container">
        <div className="um-list">
          <div className="um-list__header">
            <div>사진</div>
            <div>이름</div>
            <div>성별</div>
            <div className="hide-sm">역할</div>
            <div className="hide-sm">그룹</div>
            <div className="hide-sm">전화번호</div>
          </div>
          {userList?.map((user, i) => {
            const initials = (user.name || '?').slice(0, 2);
            return (
              <div key={user.id || i} className="um-list__row">
                <div>
                  <div
                    className="um-avatar"
                    aria-hidden
                    onClick={() => handleUserDetail(user)}
                    style={{ cursor: 'pointer' }}
                  >
                    {user.profile_image_url ? <img src={user.profile_image_url} alt={user.name} /> : initials}
                  </div>
                </div>
                <div className="um-name" onClick={() => handleUserDetail(user)} style={{ cursor: 'pointer' }}>
                  {user.name || '-'}
                </div>
                <div className="um-gender">{(user.gender === 'male' ? '남자' : '여자') || '-'}</div>
                <div className="um-role hide-sm">{user.user_roles[0].roles?.role_name || '-'}</div>
                <div className="um-group hide-sm">{user.user_groups?.name || '-'}</div>
                <div className="um-phone hide-sm">{user.phone || '-'}</div>
              </div>
            );
          })}
          {userList?.length === 0 && (
            <div style={{ padding: '14px', color: 'var(--muted)' }}>표시할 유저가 없습니다.</div>
          )}
        </div>
      </section>

      <section className="pagination-container">
        <button onClick={handlePageChange} disabled={pageNationInfo.currentPage === 1}>
          이전
        </button>
        {/**
         * total: 55명
         * pageSize: 10.
         * totalPage = 55 / 10 = Math.ceil(5.5)
         *
         */}
        <button
          onClick={handlePageChange}
          disabled={pageNationInfo.currentPage >= userList.length / pageNationInfo.pageSize}
        >
          다음
        </button>
      </section>
    </div>
  );
};

export default UserManagement;
