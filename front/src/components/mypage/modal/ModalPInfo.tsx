import { useForm, Controller } from 'react-hook-form';

import s from '../../../styles/mypage/M_ModalPInfo.module.css';

const ModalPInfo = () => {
  const { register, handleSubmit } = useForm();
  const name = 'hello';
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        delete data.id;
        console.log(data);
      })}
    >
      <div className={s.inputDiv}>
        <label htmlFor='id'>아이디</label>
        <input
          type='text'
          id='id'
          placeholder='your Id'
          readOnly
          value={name}
          name={name}
          {...register('id')}
        />

        <label htmlFor='nickName'>닉네임</label>
        <input type='text' id='nickName' {...register('nickName')} />

        <label htmlFor='email'>이메일</label>
        <input type='email' id='email' {...register('email')} />

        <label htmlFor='birthDay'>생년월일</label>
        <input type='text' id='birthDay' {...register('birthday')} />

        <label htmlFor='height'>키</label>
        <input type='text' id='height' className='height'></input>

        <label htmlFor='weight'>몸무게</label>
        <input type='text' id='weight' className='weight'></input>

        <span>성별</span>
        <div>
          <input type='radio' name='gender' id='man' />
          <label htmlFor='man'>남</label>
        </div>
        <div>
          <input type='radio' name='gender' id='woman' />
          <label htmlFor='woman'>여</label>
        </div>

        <p className={s.inputP}>
          <button id={s.clearBtn}>Clear profile</button>
          <button type='submit' id={s.submitBtn}>
            Submit profile
          </button>
        </p>
      </div>
    </form>
  );
};

export default ModalPInfo;
