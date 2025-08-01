import React, { useEffect, useState } from 'react';
import { UserDepartment } from '../../../../common/contexts/DepartmentContext';
import { getAverageAttendanceRate, getUserList, getMonthlyBirthdayMembers } from '../services/getUserList';

const UserManagement = () => {
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageSize: 20,
    totalPage: 0,
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
    setPageInfo({ ...pageInfo, currentPage: pageInfo.currentPage - 1 });
  };

  useEffect(() => {
    const setInitData = async () => {
      if (!currentDepartmentInfo.id) return;
      const departmentId = currentDepartmentInfo.id;
      try {
        const [userList, attendanceData, monthlyBirthdayMembers] = await Promise.all([
          getUserList(departmentId, pageInfo.currentPage, pageInfo.pageSize),
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
        setPageInfo({
          ...pageInfo,
          totalPage: Math.ceil(userList.count / pageInfo.pageSize),
        });
      } catch (error) {
        console.error(error);
      }
    };

    setInitData();
  }, [currentDepartmentInfo.id, pageInfo, pageInfo.pageSize]);

  return (
    <div>
      <h1>USER MANAGEMENT</h1>
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

      <section className="user-list-container">
        <ul>
          {userList.users.map((user, i) => (
            // 사진, 이름, 성별, 역할, 속한 그룹, 핸드폰 번호, 출석률
            <li key={i} className="each-user" style={{ display: 'flex', flexDirection: 'row' }}>
              <img src="" alt="" />
              <p>{user?.name}name</p>
              <p>{user?.gender}gender</p>
              <p>{user?.role}role</p>
              <p>{user?.phone}phone</p>
              <p>출석률</p>
              <p>상세보기</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="pagination-container"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}
      >
        <button onClick={handlePageChange} disabled={pageInfo.currentPage === 1}>
          이전
        </button>
        {/**
         * total: 55명
         * pageSize: 10.
         * totalPage = 55 / 10 = Math.ceil(5.5)
         */}
        <button onClick={handlePageChange} disabled={pageInfo.currentPage >= userList.count / pageInfo.pageSize}>
          다음
        </button>
      </section>
    </div>
  );
};

export default UserManagement;
