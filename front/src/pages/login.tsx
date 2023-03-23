import login from '../styles/Login/P_Login.module.css';
import Layout from '@/components/MainLayout';
import LoginBox from '../components/loginc/LoginBox';

import { useState, useEffect } from 'react';

const images = [
  {
    src: 'assets/LoginP/등.png',
    url: 'https://www.youtube.com/watch?v=naxGvgl9pKg'
  },
  {
    src: 'assets/LoginP/가슴삼두.png',
    url: 'https://www.youtube.com/watch?v=Ha235jYUtig'
  },
  {
    src: 'assets/LoginP/여자운동루틴.png',
    url: 'https://www.youtube.com/watch?v=03vWaIXnm7c'
  },
  {
    src: 'assets/LoginP/복근운동.png',
    url: 'https://www.youtube.com/watch?v=KfvrfhffdH4'
  },
  {
    src: 'assets/LoginP/크로스핏.png',
    url: 'https://www.youtube.com/watch?v=3_V7CAxzu5g'
  }
];

const LoginP = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startSlideshow = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const newIntervalId = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 5000);
    setIntervalId(newIntervalId);
  };

  useEffect(() => {
    startSlideshow();
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const handleImageClick = () => {
    const { url } = images[currentIndex];
    window.location.href = url;
  };

  return (
    <>
      <Layout>
        <div className={login.layout}>
          <div className={login.svg_box}>
            <div className={login.slideshow}>
              <img
                className={login.svg_logo}
                src={images[currentIndex].src}
                alt={`Slide ${currentIndex + 1}`}
                onClick={handleImageClick}
              />
              <h1 className={login.leftText}>HELLO FIT</h1>
              <div className={login.leftTextLine}>
                <div className={login.leftTextLine}>
                  <img src={'assets/LoginP/남자여자.png'} height={200} />
                  <h1 className={login.leftText2}>ENJOY YOUR FIT</h1>
                </div>
              </div>
            </div>
          </div>
          <div className={login.login_box}>
            <img className={login.logo} src={'assets/LoginP/logo.svg'} />
            <LoginBox />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default LoginP;
