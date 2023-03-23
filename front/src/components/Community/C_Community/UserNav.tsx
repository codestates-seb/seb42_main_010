import React, { useState, useEffect } from 'react';
import style from '../../../styles/Community/C_Community.module.css';

const UserNav = () => {
  const [userName, setUserName] = useState('User');
  const [userProfile, setUserProfile] = useState(
    '../../../assets/Community/UserProfile.svg'
  );

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const userInfo = JSON.parse(localStorage.getItem('UserInfo'));
      setUserName(userInfo.nickname);
      setUserProfile(userInfo.profileImageUrl);
    }
  }, []);

  return (
    <>
      <div className={style.UserProfile}>
        <img src={userProfile} className={style.UserPhoto} />
        <div className={style.UserName}>{userName}</div>
      </div>
    </>
  );
};
export default UserNav;
