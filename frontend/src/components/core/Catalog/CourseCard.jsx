import React, { useEffect, useState, useRef } from 'react';
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course, Height]);

  // Tilt and glow effect handlers
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = -(y - height / 2) / 15;
    const rotateY = (x - width / 2) / 15;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    glow.style.display = 'block';
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;

    if (card) card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    if (glow) glow.style.display = 'none';
  };

  useEffect(() => {
    const glow = document.createElement('div');
    glow.className = 'glow-dot';
    glow.style.display = 'none';
    document.body.appendChild(glow);
    glowRef.current = glow;

    return () => {
      document.body.removeChild(glow);
    };
  }, []);

  return (
    <>
      <style>{`
        .glow-dot {
          pointer-events: none;
          position: fixed;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, 
          rgba(59, 130, 246, 0.85) 0%,
            rgba(59, 130, 246, 0.5) 30%,
            rgba(59, 130, 246, 0.2) 60%,
            transparent 80%);
          filter: blur(40px);
          border-radius: 50%;
          mix-blend-mode: screen;
          transform: translate(-50%, -50%);
          z-index: 50;
          transition: left 0.05s ease-out, top 0.05s ease-out;
        }
        .tilt-card {
          transform-style: preserve-3d;
          transition: transform 0.2s ease;
        }
      `}</style>

      <div className="flex flex-wrap justify-evenly gap-4 py-14">
        <Link to={`/courses/${course._id}`}>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="tilt-card mx-auto max-w-[400px] rounded-lg border bg-neutral-200 dark:bg-[#181a1b] hover:bg-transparent hover:shadow-2xl dark:border-[#353a3c] shadow-md md:mx-0 p-5 overflow-hidden transition-all duration-300 select-none cursor-pointer"
            style={{ perspective: '1000px' }}
          >
            <div className="max-h-52 w-full overflow-hidden rounded-lg mb-4">
              <img
                alt="course_img"
                loading="lazy"
                width="400"
                height={Height}
                decoding="async"
                className="mx-auto object-bottom"
                src={course?.thumbnail}
                style={{ color: 'transparent' }}
              />
            </div>

            <div>
              <div className="dark:text-[#e8e6e3] mb-2 font-rubik text-lg font-bold tracking-tight md:text-2xl">
                {course?.courseName}
              </div>

              <div className="h-[2px] w-3/4 bg-grey-50 opacity-10"></div>

              <div className="mt-4 flex-col font-bold">
                <p className="text-sm text-white mb-2">
                  {course?.instructor?.firstName} {course?.instructor?.lastName}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">{avgReviewCount || 0}</span>
                  <RatingStars Review_Count={avgReviewCount} />
                  <span className="text-white">
                    {course?.ratingAndReviews?.length} Ratings
                  </span>
                </div>
                <p className="text-xl text-[#6e96cf]">₹ {course?.price}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CourseCard;
