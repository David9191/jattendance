import React, { useEffect, useState } from 'react';
import { UserDepartment } from '../../../../common/contexts/DepartmentContext';
import { getAverageAttendanceRate, getUserList, getMonthlyBirthdayMembers } from '../services/getUserList';

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [userList, setUserList] = useState([]);
  const [departmentStats, setDepartmentStats] = useState({
    attendance: {
      total_members: 0,
      average_attendees: 0,
      attendance_rate: 0,
    },
    birthdayMembers: [],
  });
  const { currentDepartmentInfo } = UserDepartment();

  useEffect(() => {
    const setInitData = async () => {
      if (!currentDepartmentInfo.id) return;
      const departmentId = currentDepartmentInfo.id;

      try {
        const [userList, attendanceData, monthlyBirthdayMembers] = await Promise.all([
          getUserList(departmentId, page, pageSize),
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
      } catch (error) {
        console.error(error);
      }
    };

    setInitData();
  }, [currentDepartmentInfo.id, page, pageSize]);

  return (
    <div>
      <h1>USER MANAGEMENT</h1>
      <section
        className="department-stats-container"
        style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3rem' }}
      >
        <div className="average-attendance-rate department-stats">
          <h3>한 달 평균 출석률</h3>
        </div>
        <div className="monthly-birthday-members department-stats">
          <h3>이번 달 생일자</h3>
        </div>
      </section>
    </div>
  );
};

export default UserManagement;

/**
 * 한 달 평균 출석율
 * 이번 달 생일자
 */
