import React, { useState, useEffect } from 'react';
import './BodyPage.css'; // CSS 파일 임포트

const videos = [
  { id: 'ZDIIg4kvY-c', title: '팔뚝살을 제대로 다듬고 탄력있게 만들기 위해서는 이 세가지 부위를 모두 적절하게 운동해주는 것이 중요합니다. 따라서 이 영상에서는 부위들을 동시에 운동하는 7가지 유무산소 동작들을 루틴으로 준비해 보았으니 영상 끝까지 꼭 함께 해주시길 바랍니다. ' },
  { id: 'JsF2nzetLBU', title: '전 세계 각지에서 팔뚝살이 빠진다고 난리가 난! 전설의 팔뚝살운동이 7분으로 리뉴얼 됐다고 합니다! 평소 14분 팔뚝살 운동이 부담스러우셨던 분들은 이 7분 루틴으로 꾸준히 해보시는 걸 추천드릴게요😆👍' },
  { id: 'R2-QUEff8NY', title: '집, 사무실 등에서 의자에 앉아 할 수 있는 덤벨 운동 영상입니다. 초보자 분들은 영상처럼 생수병을 이용해 동작을 진행해 주시면 좋습니다. 남자분들은 4~8키로 사이의 적절한 무게의 덤벨을 이용하시면 되고, 여성분들은 2~4키로 사이의 무게를 이용해주시면 될 것 같습니다.' },
  { id: 'eRpPqnmb0PM', title: '매일 5분만 투자에서 팔뚝살을 뺄 수 있는 운동 루틴입니다! 짧은 자투리 시간 투자로 큰 효과를 얻어보세요!' }
];

const ArmsPage = () => {
  
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
        <img src="/images/ArmsPage.png" alt="Arms Exercise" className="exercise-image" />
      </div>
    <h1 className='title'>팔</h1>
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

export default ArmsPage;
