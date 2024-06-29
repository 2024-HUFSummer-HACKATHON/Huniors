import React, { useEffect, useState } from 'react';
import './BodyPage.css'; // CSS 파일 임포트

const videos = [

    { id: '2G_P1Y9UG0Q', title: '매일 딱 3분이면 복근이 빵빵하게 차오르는 매일 3분 복근 챌린지를 준비했어요 :) 일명 매삼복 챌린지🔥 뱃살? 복근? 뭐 해야 하지? 고민할 필요 없이 딱 3분으로 운동 자극이 200% 된다며...🙊' },
    { id: '3JaMsw1cqcU', title: '사무실,집 어디에서든 의자만 있으면 쉽게 따라할 수 있는 8분 의자운동루틴입니다. 중요한 점!!! 복근운동이 목적인만큼 모든 동작은 복근에 적당한 힘을 주고 긴장감을 유지한 채 동작을 수행해주시면 정~말 효과가 좋습니다.' },
    { id: 'QSZ0mUGO_CA', title: '스트레칭부터 15가지의 복근운동까지! 동작이 조금 많지만 자세한 설명과 함께 복근을 만들어 드려요🔥' },
    { id: 'mVsORhCxNL0', title: '운동은 해야겠는데 일어나기 귀찮고 누워만 있고 싶을 때 🛌 부담 없이 따라 할 수 있는 누워서하는 운동입니다 :) 등은 바닥에 고정📌 엎드리는 동작도 없고 정말 누워서만 할 수 있는 베스트 동작만 쏙쏙 뽑았답니다. ' }

];

const AbsPage = () => {
  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 최상단으로 스크롤
    const storedLikedVideos = JSON.parse(localStorage.getItem('likedVideos')) || [];
    setLikedVideos(storedLikedVideos);
  }, []);

  const toggleLike = (videoId) => {
    let updatedLikedVideos;
    if (likedVideos.includes(videoId)) {
      updatedLikedVideos = likedVideos.filter(id => id !== videoId);
    } else {
      updatedLikedVideos = [...likedVideos, videoId];
    }
    setLikedVideos(updatedLikedVideos);
    localStorage.setItem('likedVideos', JSON.stringify(updatedLikedVideos));
  };

  const isLiked = (videoId) => likedVideos.includes(videoId);

  return (
    <div className="body-page-container">
      <div className="body-image-container">
        <img src="/images/AbsPage.png" alt="Abs Exercise" className="exercise-image" />
      </div>
      <h1 className='title'>배</h1>
      <hr />
      {videos.map(video => (
        <div className="content-container" key={video.id}>
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="description-container">
            <button onClick={() => toggleLike(video.id)}>
              {isLiked(video.id) ? '❤️' : '♡'}
            </button>
            <p>{video.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AbsPage;
