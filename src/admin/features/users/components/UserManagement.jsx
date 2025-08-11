import React, { useEffect, useMemo, useState } from 'react';
import { UserDepartment } from '../../../../common/contexts/DepartmentContext';
import {
  getAverageAttendanceRate,
  getUserList,
  getMonthlyBirthdayMembers,
  getPendingApprovalUsers,
} from '../services/getUserList';

const UserManagement = () => {
  const [pageNationInfo, setPageNationInfo] = useState({
    currentPage: 1,
    pageSize: 20,
    totalPage: 0,
    pageNationBlockSize: 10,
  });
  const [searchForUserName, setSearchForUserName] = useState('');
  const [userList, setUserList] = useState({ users: [], count: 0 });
  const [departmentStats, setDepartmentStats] = useState({
    attendance: {
      total_members: 0,
      average_attendees: 0,
      attendance_rate: 0,
    },
    birthdayMembers: [],
  });
  const { currentDepartmentInfo } = UserDepartment();

  const handleUserNameChange = (e) => {
    const userName = e.target.value;
    setSearchForUserName(userName);
  };

  const handleUserSearch = (e) => {
    if (e._reactName == 'onClick' || (e._reactName == 'onKeyDown' && e.key == 'Enter')) console.log(e);
  };

  const handlePageChange = () => {
    setPageNationInfo({ ...pageNationInfo, currentPage: pageNationInfo.currentPage - 1 });
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
        setDepartmentStats((prevStats) => ({
          ...prevStats,
          attendance: { total_members, average_attendees, attendance_rate },
          birthdayMembers: monthlyBirthdayMembers,
        }));
        setPageNationInfo({
          ...pageNationInfo,
          totalPage: Math.ceil(userList.count / pageNationInfo.pageSize),
        });
      } catch (error) {
        console.error(error);
      }
    };

    setInitData();
  }, [currentDepartmentInfo.id, pageNationInfo, pageNationInfo.pageSize]);

  const filteredUsers = useMemo(() => {
    if (!searchForUserName) return userList.users || [];
    const q = searchForUserName.trim().toLowerCase();
    return (userList.users || []).filter((u) => (u?.name || '').toLowerCase().includes(q));
  }, [searchForUserName, userList.users]);

  return (
    <div>
      <h1
        onClick={async () => {
          const data = await getPendingApprovalUsers(currentDepartmentInfo.id);
          console.log(data);
        }}
      >
        USER MANAGEMENT
      </h1>
      <section
        className="department-stats-container"
        style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3rem' }}
      >
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
              value={searchForUserName}
              placeholder="이름"
              onChange={handleUserNameChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleUserSearch(e); // 엔터를 누르면 검색 함수 실행
                }
              }}
            />
            <button onClick={handleUserSearch}>검색</button>
            {/* 
              사용자가 엔터를 누르는 동작은 input의 onKeyDown 이벤트에서 e.key === 'Enter'로 감지할 수 있습니다.
              검색 버튼 클릭은 onClick 이벤트로 감지할 수 있습니다.
              handleUserSearch 함수는 검색을 실행하는 함수로 직접 구현해야 합니다.
            */}
          </div>
          <div>필터</div>
        </div>
      </section>

      <section className="user-list-container" style={{ marginTop: '24px' }}>
        <div className="um-list">
          <div className="um-list__header">
            <div>사진</div>
            <div>이름</div>
            <div>성별</div>
            <div className="hide-sm">역할</div>
            <div className="hide-sm">그룹</div>
            <div className="hide-sm">전화번호</div>
            <div>액션</div>
          </div>
          {filteredUsers.map((u, i) => {
            const initials = (u.name || '?').slice(0, 2);
            return (
              <div key={u.id || i} className="um-list__row">
                <div>
                  <div className="um-avatar" aria-hidden>
                    {u.profile_image_url ? <img src={u.profile_image_url} alt={u.name} /> : initials}
                  </div>
                </div>
                <div className="um-name">{u.name || '-'}</div>
                <div className="um-gender">{u.gender || '-'}</div>
                <div className="um-role hide-sm">{u.role || '-'}</div>
                <div className="um-group hide-sm">{u.group || '-'}</div>
                <div className="um-phone hide-sm">{u.phone || '-'}</div>
                <div className="um-actions">
                  <button className="btn-ghost">상세</button>
                </div>
              </div>
            );
          })}
          {filteredUsers.length === 0 && (
            <div style={{ padding: '14px', color: 'var(--muted)' }}>표시할 유저가 없습니다.</div>
          )}
        </div>
      </section>

      <section
        className="pagination-container"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}
      >
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
          disabled={pageNationInfo.currentPage >= userList.count / pageNationInfo.pageSize}
        >
          다음
        </button>
      </section>
    </div>
  );
};

export default UserManagement;
