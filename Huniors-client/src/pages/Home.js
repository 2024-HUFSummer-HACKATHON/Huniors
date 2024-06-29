import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Introduction from '../components/Introduction';
import HumanShape from '../components/HumanShape';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.post('https://my-little-pelican-58844a067eda.herokuapp.com/api/checktoken')
      .then(response => {
        setIsLoggedIn(response.data.isLoggedIn);
      })
      .catch(error => {
        console.error('로그인 상태 확인 중 오류 발생:', error);
      });
  }, []);

  if (isLoggedIn) {
    return <HumanShape />;
  } else {
    return <Introduction />;
  }
};

export default Home;
