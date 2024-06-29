import React, { useEffect, useState } from 'react';
import './BodyPage.css'; // CSS 파일 임포트

const videos = [
  { id: 'LZWORB39zQk', title: '"한번도 안해본 사람은 있어도 한번만 해본 사람은 없다는 레전드 하체 스트레칭!!" 하체는 관리하고 관심갖는 시간에 따라 분명히!! 바뀔수 있습니다.!!' },
  { id: 'dpBYYEhdofI', title: '다이어트는 단순히 살을 빼는 것이 아니라 건강한 습관을 길들이는 과정입니다. 하체 운동 루틴으로 유명한 이지은 다이어트 채널의 영상을 따라해보세요!' },
  { id: 'Al46E7jJWx0', title: '바쁜 일상을 보내며 얻게 된 다리 부기가 고민이시라면 물리치료사 출신 강사분의 강의를 따라하며 부기를 없애 봐요!' },
  { id: 'OKyuFF3uh5o', title: '나는 운동하기 위해 휴대폰을 놓는 것도 싫다! 침대 밖으로 나가고 싶지 않다! 하는 분들 주목하세요. 누운 상태에서 휴대폰을 만지며 5분안에 끝낼 수 있는 영상을 준비했습니다.' }
];

const LegsPage = () => {
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
        <img src="/images/LegsPage.png" alt="Legs Exercise" className="exercise-image" />
      </div>
      <h1 className='title'>다리</h1>
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

export default LegsPage;
