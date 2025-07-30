import React from 'react';
import { useNavigate } from 'react-router';

const Sidebar = () => {
  const navigate = useNavigate();
  const manageList = [
    {
      title: '유저 관리',
      path: 'manage/user',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
      // {
      //   title: '출석 관리',
      //   path: 'manage/attendance',
      //   icon: '<FaIcons.FaCartPlus />',
      //   cName: 'nav-text',
      // },
    },
    {
      title: '부서 관리',
      path: 'manage/department',
      icon: '<FaIcons.FaCartPlus />',
      cName: 'nav-text',
      // {
      //   title: '그룹 관리',
      //   path: 'manage/group',
      //   icon: '<FaIcons.FaCartPlus />',
      //   cName: 'nav-text',
      // },
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

  const handleManagementClick = (e) => {
    const path = e.target.dataset.path;

    navigate(path);
  };

  return (
    <div>
      <ul>
        {manageList.map((manageSomething, i) => {
          return (
            <li
              key={i}
              className={manageSomething.cName}
              data-path={manageSomething.path}
              onClick={handleManagementClick}
            >
              {manageSomething.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
