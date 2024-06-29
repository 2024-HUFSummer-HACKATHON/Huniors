import React, { useState } from 'react';
import HumanShape from './HumanShape.js';
import './Introduction.css';

const Introduction = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onGetStarted = () => {
    setIsStarted(true);
  };

  if (isStarted) {
    return <HumanShape />;
  } else {
    return (
      <div id="introduction-container">
        {/* image-container */}
        <div className="image-container">
          <img src="/images/big_logo.png" alt="big_logo" className="big_logo" />
          <img src="/images/typo_logo.png" alt="typo_logo" className='typo_logo'/>
        </div>

        {/* introduction-container */}
        <div className="introduction-container">
          <p>
            <strong>🎉My Little Pelican에 오신 것을 환영합니다!🎉</strong>
            <br/><br/>
            운동을 아예 안 하는 당신, 항상 마음 속 깊이 ‘해야지’라는 생각만 했던 당신을 위해 준비했습니다😊
            <br/>
            요즘 유행하는 <strong>‘펠리컨적 사고’</strong>처럼, <strong>일단 시도해보자는 마음</strong>으로 간단하게 운동을 시작할 수 있는 특별한 공간, 
            <br/>
            <strong>My Little Pelican</strong>입니다.
          </p>
          <br/>
          <button className="popup-button">펠리컨적 사고가 뭔가요?</button>
          <div className='what-is-pelican'>
            <img className="pelican1" src="/images/pelican1.png" alt="pelican1"/>
            <img className="pelican2" src="/images/pelican2.png" alt="pelican1"/>
            <p>
            ‘펠리컨적 사고’는 뭐든지 입에 넣고자 시도해보는 펠리컨처럼
            <br/>
            깊은 고민 없이 일단 시작해보는 마음가짐을 의미합니다. 
            <br/>
            My Little Pelican에서 복잡한 계획 없이 간단한 운동부터 시작해보세요. 
            <br/>
            작은 변화가 쌓여 큰 건강의 변화를 만들어낼 것입니다.
            </p>
          </div>
          <button className='start-button' onClick={onGetStarted}>START</button>
        </div>
      </div>
    );
  }
};

export default Introduction;