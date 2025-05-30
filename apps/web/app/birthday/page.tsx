"use client";
import { useState, useEffect, useRef } from "react";

export default function BirthdayLanding() {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  type ConfettiPiece = { id: number; x: number; y: number; rotation: number; color: string; size: number; delay: number };
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  type Firework = { id: number; left: number; delay: number };
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  type Star = { left: string; top: string; size: string; opacity: number };
  const [stars, setStars] = useState<Star[]>([]);
  const wishes = [
    "May your day be filled with laughter and joy!",
    "Wishing you success in all your endeavors!",
    "May this year bring you closer to your dreams!",
    "You're an amazing friend - enjoy your special day!",
    "Cheers to health, happiness, and prosperity!"
  ];
  const name = "ALI ABBAS CHAHDAR";
  const imageUrl = "/aliabbas.jpeg";
  const confettiRef = useRef(null);

  // Star background
  useEffect(() => {
    setStars(
      Array.from({ length: 80 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${1 + Math.random() * 2}px`,
        opacity: Math.random() * 0.7 + 0.3
      }))
    );
  }, []);

  // Confetti
  useEffect(() => {
    if (isCelebrating) {
      const confettiArr = [];
      for (let i = 0; i < 120; i++) {
        confettiArr.push({
          id: i,
          x: Math.random() * 100,
          y: -10 - Math.random() * 20,
          rotation: Math.random() * 360,
          color: `hsl(${Math.random() * 360}, 100%, ${50 + Math.random() * 20}%)`,
          size: 6 + Math.random() * 12,
          delay: Math.random() * 2
        });
      }
      setConfetti(confettiArr);
      setTimeout(() => setConfetti([]), 5000);
    }
  }, [isCelebrating]);

  // Fireworks
  useEffect(() => {
    if (isCelebrating) {
      const fwArr = [];
      for (let i = 0; i < 6; i++) {
        fwArr.push({
          id: i,
          left: 10 + Math.random() * 80,
          delay: Math.random() * 1.5
        });
      }
      setFireworks(fwArr);
      setTimeout(() => setFireworks([]), 3500);
    }
  }, [isCelebrating]);

  function handleCelebrate() {
    setIsCelebrating(true);
    setShowWishes(true);
    setTimeout(() => setIsCelebrating(false), 6000);
  }

  return (
    <div className="bday-root">
      {/* Star background */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="bday-star"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size, opacity: star.opacity }}
        />
      ))}
      {/* Fireworks */}
      {fireworks.map(fw => (
        <div
          key={fw.id}
          className="bday-firework"
          style={{ left: `${fw.left}%`, animationDelay: `${fw.delay}s` }}
        >
          {Array.from({ length: 12 }).map((_, j) => (
            <div key={j} className="bday-firework-spark" style={{ transform: `rotate(${j * 30}deg)` }} />
          ))}
        </div>
      ))}
      {/* Confetti */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="bday-confetti"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `bday-fall 3.5s ${piece.delay}s linear forwards`
          }}
        />
      ))}
      <div className="bday-card bday-card-horizontal">
        <div className="bday-img-wrap">
          <img src={imageUrl} alt={name} className="bday-img" />
          <div className="bday-img-glow" />
        </div>
        <div className="bday-content">
          <h1 className="bday-title">Happy Birthday <span>{name}</span>!</h1>
          <p className="bday-desc">Wishing you a magical day filled with joy, laughter, and unforgettable moments. May all your dreams come true!</p>
          <button className={`bday-btn${isCelebrating ? " celebrating" : ""}`} onClick={handleCelebrate}>
            {isCelebrating ? "🎉 Celebrate! 🎉" : "Send Birthday Wishes"}
            <span className="bday-btn-glow"></span>
          </button>
          {showWishes && (
            <div className="bday-wishes">
              <h2 className="bday-wishes-title">Birthday Wishes for {name}</h2>
              <div className="bday-wish-list">
                {wishes.map((wish, idx) => (
                  <div key={idx} className={`bday-wish${idx % 3 === 1 ? " pink" : idx % 3 === 2 ? " blue" : ""} visible`} style={{ animationDelay: `${0.5 + idx * 0.2}s` }}>
                    <p>{wish}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .bday-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1625 0%, #6d28d9 60%, #1a1625 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          overflow: hidden;
          position: relative;
        }
        .bday-star {
          position: absolute;
          border-radius: 9999px;
          background: #fff;
          animation: bday-twinkle 3s infinite alternate;
          z-index: 1;
        }
        .bday-card {
          max-width: 60rem;
          width: 100%;
          background: rgba(31, 41, 55, 0.85);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px 0 rgba(31, 41, 55, 0.37);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          margin-top: 2rem;
        }
        .bday-card-horizontal {
          flex-direction: row;
          align-items: flex-start;
          gap: 2.5rem;
        }
        @media (max-width: 900px) {
          .bday-card-horizontal {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
        }
        .bday-img-wrap {
          position: relative;
          margin-bottom: 0;
        }
        .bday-img {
          width: 16rem;
          height: 16rem;
          border-radius: 50%;
          border: 4px solid #a78bfa;
          object-fit: cover;
          box-shadow: 0 0 40px #a78bfa55;
        }
        .bday-img-glow {
          position: absolute;
          inset: -1rem;
          border-radius: 50%;
          border: 2px solid #f472b6;
          opacity: 0.7;
          animation: bday-ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
          pointer-events: none;
        }
        .bday-title {
          font-size: 2.5rem;
          font-weight: bold;
          background: linear-gradient(90deg, #a78bfa, #f472b6, #a78bfa);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          margin-bottom: 1rem;
          animation: bday-text-pulse 6s ease infinite;
          background-size: 200% 200%;
        }
        .bday-title span {
          color: #fff;
        }
        .bday-desc {
          font-size: 1.125rem;
          color: #d1d5db;
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }
        .bday-btn {
          padding: 0.8em 2em;
          border-radius: 2em;
          font-weight: bold;
          font-size: 1.1rem;
          color: #fff;
          background: linear-gradient(90deg, #7c3aed, #f472b6);
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 8px #e9d5ff;
          transition: all 0.5s;
          position: relative;
          overflow: hidden;
        }
        .bday-btn.celebrating {
          background: linear-gradient(90deg, #a78bfa, #f472b6);
          transform: scale(1.1);
          box-shadow: 0 0 20px #a78bfa88;
        }
        .bday-btn-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #fff2, transparent);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .bday-btn:hover .bday-btn-glow,
        .bday-btn.celebrating .bday-btn-glow {
          opacity: 1;
          animation: bday-button-glow 2s infinite;
        }
        .bday-wishes {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid #6b7280;
          transition: all 1s;
        }
        .bday-wishes-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #c4b5fd;
          margin-bottom: 1rem;
          text-align: center;
        }
        .bday-wish-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .bday-wish-list {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 1024px) {
          .bday-wish-list {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        .bday-wish {
          padding: 1rem;
          border-radius: 0.75rem;
          background: rgba(55, 65, 81, 0.5);
          backdrop-filter: blur(4px);
          border-left: 4px solid #a78bfa;
          color: #e5e7eb;
          transition: all 0.3s;
          opacity: 0;
          animation: bday-fadeInUp 0.7s ease-out forwards;
        }
        .bday-wish.pink {
          border-left-color: #f472b6;
        }
        .bday-wish.blue {
          border-left-color: #60a5fa;
        }
        .bday-wish.visible {
          opacity: 1;
        }
        .bday-confetti {
          position: absolute;
          z-index: 20;
          border-radius: 50%;
        }
        .bday-firework {
          position: absolute;
          bottom: 10%;
          width: 0;
          height: 0;
          z-index: 30;
          left: 50%;
          animation: bday-firework-burst 1.2s linear forwards;
        }
        .bday-firework-spark {
          position: absolute;
          left: 0;
          top: 0;
          width: 6px;
          height: 40px;
          background: linear-gradient(180deg, #fff 0%, #f472b6 100%);
          border-radius: 3px;
          opacity: 0.7;
          transform-origin: bottom center;
          animation: bday-firework-spark 1.2s linear forwards;
        }
        @keyframes bday-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes bday-firework-burst {
          0% { opacity: 0; transform: scale(0.5); }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.2); }
        }
        @keyframes bday-firework-spark {
          0% { height: 0; opacity: 0; }
          30% { height: 40px; opacity: 1; }
          100% { height: 0; opacity: 0; }
        }
        @keyframes bday-twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
        @keyframes bday-fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bday-text-pulse {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes bday-button-glow {
          0% { box-shadow: 0 0 5px #c084fc00; }
          50% { box-shadow: 0 0 20px #c084fcbb; }
          100% { box-shadow: 0 0 5px #c084fc00; }
        }
        @keyframes bday-ping-slow {
          0% { transform: scale(1); opacity: 0.7; }
          70%, 100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
