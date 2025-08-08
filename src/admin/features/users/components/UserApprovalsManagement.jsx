import React, { useEffect, useState } from 'react';
import { getPendingApprovalUsers } from '../services/getUserList';
import { UserDepartment } from '../../../../common/contexts/DepartmentContext';
import '../css/userApprovalsManagement.css';

const UserApprovalsManagement = () => {
  const [pendingApprovalUsers, setPendingApprovalUsers] = useState([]);
  const { currentDepartmentInfo } = UserDepartment();

  useEffect(() => {
    const load = async () => {
      if (!currentDepartmentInfo?.id) return;
      const pendingUsers = await getPendingApprovalUsers(currentDepartmentInfo.id);
      setPendingApprovalUsers(pendingUsers);
    };
    load();
  }, [currentDepartmentInfo?.id]);

  return (
    <section style={{ marginTop: '1rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>승인 대기 유저</h2>
      <div className="approvals-list">
        <div className="approvals-list__header">
          <div>사진</div>
          <div>이름</div>
          <div className="hide-sm">성별</div>
          <div className="hide-sm">전화번호</div>
          <div className="hide-sm">생년월일</div>
          <div className="hide-sm">상태</div>
          <div className="hide-sm">요청일</div>
          <div>액션</div>
        </div>
        {pendingApprovalUsers?.map((item) => {
          const u = item.users || {};
          const initials = (u.name || '?').slice(0, 2);
          return (
            <div key={item.id} className="approvals-list__row">
              <div>
                <div className="user-avatar" aria-hidden>
                  {u.profile_image_url ? <img src={u.profile_image_url} alt={u.name} /> : initials}
                </div>
              </div>
              <div className="user-name">{u.name || '-'}</div>
              <div className="user-gender hide-sm">
                {u.gender === 'male' ? '남자' : u.gender === 'female' ? '여자' : '-'}
              </div>
              <div className="user-phone hide-sm">{u.phone || '-'}</div>
              <div className="user-birth hide-sm">{u.birth_date || '-'}</div>
              <div className="hide-sm">
                <span className="badge badge--pending">대기</span>
              </div>
              <div className="user-requested-at hide-sm">
                {item.requested_at ? new Date(item.requested_at).toLocaleDateString() : '-'}
              </div>
              <div className="user-actions">
                <button className="btn-ghost">승인</button>
                <button className="btn-ghost">거절</button>
              </div>
            </div>
          );
        })}
        {(!pendingApprovalUsers || pendingApprovalUsers.length === 0) && (
          <div style={{ padding: '14px', color: 'var(--muted)' }}>승인 대기 유저가 없습니다.</div>
        )}
      </div>
    </section>
  );
};

export default UserApprovalsManagement;
