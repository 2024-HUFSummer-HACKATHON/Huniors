import React, { useEffect, useState } from 'react';
import './MyPage.css';

const MyPage = () => {
  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    const storedLikedVideos = JSON.parse(localStorage.getItem('likedVideos')) || [];
    setLikedVideos(storedLikedVideos);
  }, []);

  return (
    <div className='Liked'>
      <h1>내가 좋아요 한 영상</h1>
      <hr/>
      <div>
        {likedVideos.length > 0 ? (
          likedVideos.map(videoId => (
            <div key={videoId}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p>저장된 영상이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyPage;
