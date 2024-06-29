import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HumanShape.css';

const MainPage = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (buttonId) => {
    setHoveredButton(buttonId);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleClick = (path) => {
    navigate(path);
  };

  const getButtonImage = () => {
    switch (hoveredButton) {
      case 4:
        return `${process.env.PUBLIC_URL}/images/leftArm.PNG`;
      case 5:
        return `${process.env.PUBLIC_URL}/images/abs.PNG`;
      case 6:
        return `${process.env.PUBLIC_URL}/images/rightArm.PNG`;
      case 8:
        return `${process.env.PUBLIC_URL}/images/legs.PNG`;
      default:
        return `${process.env.PUBLIC_URL}/images/body.PNG`;
    }
  };

  return (
    <div className="HumanShape">
      <div className="image-container">
        <img src={getButtonImage()} alt="Body" className="body-image" />
        <div className="button-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
            <div
              key={id}
              className={`grid-button button-${id}`}
              onMouseEnter={() => handleMouseEnter(id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                if (id === 4 || id === 6) handleClick('/arms');
                if (id === 5) handleClick('/abs');
                if (id === 8) handleClick('/legs');
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
