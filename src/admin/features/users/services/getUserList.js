import { supabase } from '../../../../common/supabase/supabaseClient';

export const getUserList = async (departmentId, page, pageSize) => {
  const from = (page - 1) * pageSize;
  const to = page * pageSize - 1;

  try {
    const { data, error, count } = await supabase.rpc('get_user_lists', {
      p_department_id: departmentId,
      p_from: from,
      p_to: to,
    });

    if (error) {
      console.error('Error fetching user list:', error);
      return { users: [], count: 0 };
    }

    const users = data.map((item) => item.users);
    return { users, count };
  } catch (error) {
    console.error('유저 리스트 조회 중 에러 발생:', error);
    return { users: [], count: 0 };
  }
};

export const getAverageAttendanceRate = async (departmentId) => {
  try {
    const { data, error } = await supabase.rpc('get_weekly_average_attendance_stats', {
      p_department_id: departmentId,
    });

    if (error) {
      console.error('주간 평균 출석 통계 조회 중 에러 발생:', error);
      return { total_members: 0, average_attendees: 0, attendance_rate: 0 };
    }

    return data;
  } catch (err) {
    console.error('알 수 없는 에러:', err);
    return { total_members: 0, average_attendees: 0, attendance_rate: 0 };
  }
};

export const getMonthlyBirthdayMembers = async (departmentId) => {
  const thisMonth = new Date().getMonth() + 1;

  try {
    const { data, error } = await supabase.rpc('get_users_with_birthday_in_month', {
      p_department_id: departmentId,
      p_month_num: thisMonth,
    });

    if (error) {
      console.error('이번 달 생일자 조회 중 에러 발생:', error);
      return []; // 객체가 아닌 빈 배열을 반환합니다.
    }

    // data 자체가 사용자 배열이므로, data를 그대로 반환합니다.
    return data || [];
  } catch (error) {
    console.error('Error fetching monthly birthday members:', error);
    return []; // 객체가 아닌 빈 배열을 반환합니다.
  }
};

export const getPendingApprovalUsers = async (departmentId) => {
  try {
    const { data, error } = await supabase
      .from('department_memberships')
      .select(
        `
        *,
        users!department_memberships_user_id_fkey(*)
      `,
      )
      .eq('department_id', departmentId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('승인 대기 유저 조회 중 에러 발생:', error);
      return [];
    }

    // console.log(data);

    return data || [];
  } catch (error) {
    console.error('Error fetching pending approval users:', error);
    return [];
  }
};
