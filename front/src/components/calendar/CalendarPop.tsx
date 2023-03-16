import styled from '../../styles/calendar/C_calendarPop.module.css';
import { useEffect, useState } from 'react';
import { DateView } from './utils/DateView';
import axios from 'axios';

interface PostData {
  title: string;
  content: string;
  kcal: number;
  recodedAt: string;
}

const ReaderPop = ({ date, open, setOpen }) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [kcal, setKcal] = useState(0);
  const [content, setContent] = useState('');
  const [calendarId, setCalendarId] = useState(0);
  const recodedAt = DateView(date);
  const url = `${process.env.NEXT_PUBLIC_URL}/api/v1/calendar`;
  const body: PostData = { title, content, kcal, recodedAt };
  const postBody = { title, content, kcal };

  const submitData = () => {
    if (typeof window !== 'undefined') {
      const token: string = localStorage.accessToken;
      if (token) {
        const headers = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        axios
          .post(url, body, headers)
          .then((res) => console.log(res))
          .catch((error) => alert('내용을 입력해 주세요'));
      }
    }
  };

  const patchData = () => {
    if (typeof window !== 'undefined') {
      const token: string = localStorage.accessToken;
      if (token) {
        const headers = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        axios
          .patch(`${url}/${calendarId}`, postBody, headers)
          .catch((error) => console.log(error));
      }
    }
  };

  const deleteData = () => {
    if (typeof window !== 'undefined') {
      const token: string = localStorage.accessToken;
      if (token) {
        const headers = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        axios
          .delete(`${url}/${calendarId}`, headers)
          .catch((error) => alert('삭제되지 않았습니다'));
      }
    }
  };
  // ! 1안 : 서버에 데이터가 undefined면 get, 있으면 patch
  // ! 2안 : get요청은 전체데이터니까 처음에 받아와서 date가 바뀔 때 뿌리고 캘린더아이디 usestate하나 더 만들어서 저장함, patch 요청은 버튼 클릭시 캘린더아이디 state로 보냄

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token: string = localStorage.accessToken;
      if (token) {
        const headers = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        axios
          .get(`${url}`, headers)
          .then((res) => {
            const getData = res.data.body.data;
            setData(getData);
          })
          .catch((error) => console.log(error));
      }
    }
  }, []);

  useEffect(() => {
    setTitle('');
    setKcal(0);
    setContent('');
    setCalendarId(0);
    if (data.length > 0) {
      data.map((data) => {
        if (recodedAt === data.recodedAt) {
          setTitle(data.title);
          setKcal(data.kcal);
          setContent(data.content);
          setCalendarId(data.calendarId);
        }
      });
    }
  }, [date]);

  return (
    <section className={open ? styled.article : styled.disable}>
      <header className={styled.header}>
        <button className={styled.closeBtn} onClick={() => setOpen(false)}>
          {'»'}
        </button>
      </header>
      <form className={styled.content}>
        <textarea
          className={styled.title}
          placeholder={'제목 없음'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ul className={styled.infoUl}>
          <li className={styled.infoLi}>
            <picture className={styled.cate}>
              <img className={styled.icon} src='/assets/lnb_calendar_icn.svg' />
              <label className={styled.label}>날짜</label>
            </picture>
            <p className={styled.innerText}>{DateView(date)}</p>
          </li>
          <li className={styled.infoLi}>
            <picture className={styled.cate}>
              <img
                className={styled.icon}
                src='/assets/calendarP/cal_icn.svg'
              />
              <label className={styled.label}>칼로리</label>
            </picture>
            <p className={styled.innerText}>
              <input
                type='number'
                className={styled.calInput}
                placeholder={kcal.toString()}
                onChange={(e) => setKcal(e.target.valueAsNumber)}
              />
              kcal
            </p>
          </li>
          <li className={`${styled.infoLi} ${styled.memoLi}`}>
            <textarea
              placeholder='메모를 입력해주세요.'
              value={content}
              rows={20}
              className={styled.memo}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </li>
        </ul>
        <div className={styled.btnSet}>
          <button
            className={`${styled.btn} 
         ${styled.deletebtn}`}
            onClick={() => deleteData()}
          >
            Delete
          </button>
          <button
            onClick={() => (calendarId > 0 ? patchData() : submitData())}
            className={`${styled.btn} 
         ${styled.submitbtn}`}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ReaderPop;