import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../common/supabase/supabaseClient';
import AttendanceChart from '../components/AttendanceChart';
import { UserDepartment } from '../../../../common/contexts/DepartmentContext';

const Dashboard = () => {
  const [newMembers, setNewMembers] = useState([]);
  const [longAbsentees, setLongAbsentees] = useState([]);
  const [birthdaysThisMonth, setBirthdaysThisMonth] = useState([]);
  const { currentDepartmentInfo } = UserDepartment();
  const [recentPrayerRequests, setRecentPrayerRequests] = useState([]);

  const getRecentPrayerRequests = async () => {
    const { data, error } = await supabase
      .from('prayer_requests')
      .select('*, users(name)')
      .eq('department_id', currentDepartmentInfo.id)
      .limit(5);

    if (error) {
      console.error('Error fetching prayer requests:', error);
      return;
    }
    setRecentPrayerRequests(data);
  };

  const getNewMembers = async () => {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const { data, error } = await supabase
      .from('user_departments')
      .select('*, users(name)')
      .eq('department_id', currentDepartmentInfo.id)
      .gte('created_at', twoMonthsAgo.toISOString()) // 2달 전 날짜보다 크거나 같은 데이터 조회
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching new members:', error);
      return;
    }
    setNewMembers(data);
  };

  const getLongAbsentees = async () => {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    // 1. 현재 부서의 모든 사용자 가져오기
    const { data: allUsers, error: allUsersError } = await supabase
      .from('user_departments')
      .select('users(*)')
      .eq('department_id', currentDepartmentInfo.id);

    if (allUsersError) {
      console.error('Error fetching all users:', allUsersError);
      return;
    }

    // 2. 최근 2달 동안 출석한 사용자 ID 가져오기
    const { data: recentAttendees, error: recentAttendeesError } = await supabase
      .from('attendances')
      .select('user_id')
      .eq('department_id', currentDepartmentInfo.id)
      .gte('created_at', twoMonthsAgo.toISOString());

    if (recentAttendeesError) {
      console.error('Error fetching recent attendees:', recentAttendeesError);
      return;
    }

    const recentAttendeeIds = new Set(recentAttendees.map((a) => a.user_id));

    // 3. 장결자 필터링 (전체 사용자 중 최근 출석 기록이 없는 사람)
    const absentees = allUsers.map((u) => u.users).filter((user) => !recentAttendeeIds.has(user.id));

    setLongAbsentees(absentees);
  };

  const getBirthdaysThisMonth = async () => {
    const { data: usersInDept, error } = await supabase
      .from('user_departments')
      .select('users(name, birth_date)')
      .eq('department_id', currentDepartmentInfo.id);

    if (error) {
      console.error('Error fetching users for birthday check:', error);
      return;
    }

    const currentMonth = new Date().getMonth();
    const birthdayMembers = usersInDept
      .map((item) => item.users)
      .filter((user) => {
        if (!user || !user.birthday) return false;
        const birthDate = new Date(user.birthday);
        return birthDate.getUTCMonth() === currentMonth;
      });

    setBirthdaysThisMonth(birthdayMembers);
  };

  useEffect(() => {
    getRecentPrayerRequests();
    getNewMembers();
    getBirthdaysThisMonth();
    getLongAbsentees();
  }, []); // currentDepartmentInfo를 의존성 배열에 추가

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="dashboard-container"
        style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '5rem' }}
      >
        <div className="pray-requests-container">
          <h1>기도 요청</h1>
          <ul>
            {recentPrayerRequests.length > 0 ? (
              recentPrayerRequests.map((pray) => (
                <li key={pray.id} style={{ fontSize: '1rem', margin: '1rem 0' }}>
                  {pray.title} <br />
                  {pray.content}
                </li>
              ))
            ) : (
              <p>없음</p>
            )}
          </ul>
        </div>
        <div className="attendance-rate-container">
          <h1>출석률</h1>
          <AttendanceChart />
        </div>
      </div>
      <div
        className="dashboard-container"
        style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '5rem' }}
      >
        <div className="long-absentees-container">
          <h1>장결자</h1>
          <ul>
            {longAbsentees.length > 0 ? (
              longAbsentees.map((user, i) => (
                <li key={i} style={{ fontSize: '1rem', margin: '1rem 0' }}>
                  {user.name}
                </li>
              ))
            ) : (
              <p>없음</p>
            )}
          </ul>
        </div>
        <div className="new-members-container">
          <h1>새신자</h1>
          <ul>
            {newMembers.length > 0 ? (
              newMembers.map((newMember, i) => (
                <li key={i} style={{ fontSize: '1rem', margin: '1rem 0' }}>
                  {newMember.users.name}
                </li>
              ))
            ) : (
              <p>없음</p>
            )}
          </ul>
        </div>
        <div className="birthday-this-month-container">
          <h1>이번 달 생일자🥳🎂🎉</h1>
          <ul>
            {birthdaysThisMonth.length > 0 ? (
              birthdaysThisMonth.map((member, i) => (
                <li key={i} style={{ fontSize: '1rem', margin: '1rem 0' }}>
                  {member.name}
                </li>
              ))
            ) : (
              <p>없음</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/**
 * 1. 관리자는 부서의 출석률, 장결자, 새신자, 이번 달 생일자를 확인할 수 있다.
 * 2. 관리자는 부서의 최근 5가지의 기도 요청 사항을 확인할 수 있다.
 */
