import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import '../css/adminSidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const manageList = [
    {
      title: '대시보드',
      path: '.',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
    },
    {
      title: '유저 관리',
      path: 'manage/user',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
      children: [
        { title: '전체 유저 목록', path: 'manage/user/', icon: '<FaIcons.FaCartPlus />', cName: 'nav-text' },
        { title: '유저 출석 관리', path: 'manage/user/attendance', icon: '<FaIcons.FaCartPlus />', cName: 'nav-text' },
        { title: '유저 승인 관리', path: 'manage/user/approvals', icon: '<FaIcons.FaCartPlus />', cName: 'nav-text' },
      ],
    },
    {
      title: '부서 관리',
      path: 'manage/department',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
      children: [
        { title: '그룹 관리', path: 'manage/department/group', icon: '<FaIcons.FaCartPlus />', cName: 'nav-text' },
      ],
    },
    {
      title: '역할 관리',
      path: 'manage/role',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
    },
    {
      title: '예배 관리',
      path: 'manage/worship',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
    },
    {
      title: '기도 요청 관리',
      path: 'manage/pray-request',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
    },
    {
      title: '지출 관리',
      path: 'manage/expense',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
    },
    {
      title: '헌금 관리',
      path: 'manage/donation',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
    },
    {
      title: '공지 관리',
      path: 'manage/announcement',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
    },
    {
      title: 'SNS 관리',
      path: 'manage/sns',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
    },
    {
      title: '권한 관리',
      path: 'manage/permission',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
    },
    {
      title: '보안 로그 관리',
      path: 'manage/',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
    },
  ];

  const [openMapByIndex, setOpenMapByIndex] = useState({});

  const handleParentItemClick = useCallback(
    (itemIndex, item) => {
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;
      if (hasChildren) {
        setOpenMapByIndex((prev) => ({ ...prev, [itemIndex]: !prev[itemIndex] }));
        return;
      }
      if (item?.path) {
        navigate(item.path);
      }
    },
    [navigate],
  );

  const handleChildItemClick = useCallback(
    (child) => {
      if (child?.path) {
        navigate(child.path);
      }
    },
    [navigate],
  );

  return (
    <div className="admin-sidebar">
      <ul className="admin-sidebar__menu">
        {manageList.map((manageSomething, i) => {
          const isOpen = !!openMapByIndex[i];
          return (
            <li
              key={i}
              className={`admin-sidebar__item ${manageSomething.cName || ''} ${isOpen ? 'is-open' : ''}`}
              onClick={() => handleParentItemClick(i, manageSomething)}
              role="button"
              aria-expanded={isOpen}
            >
              {manageSomething.title}
              {Array.isArray(manageSomething.children) && manageSomething.children.length > 0 && isOpen ? (
                <ul className="admin-sidebar__submenu">
                  {manageSomething.children.map((child, j) => (
                    <li
                      key={j}
                      className={`admin-sidebar__subitem ${child.cName || ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChildItemClick(child);
                      }}
                    >
                      {child.title}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
