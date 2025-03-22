import React, { useEffect, useState } from 'react';
import background from '../assets/background-mobile.jpg';
import backgroundMobile from '../assets/background-mobile.jpg';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [text, setText] = useState('');
  const fullText = 'MINT SOON...';
  const speed = 150;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let index = 0;
    let direction = 1;

    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index += direction;

      if (index > fullText.length) {
        direction = -1;
        index = fullText.length;
      } else if (index < 0) {
        direction = 1;
        index = 0;
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  const styles = {
    container: {
      height: '100vh',
      width: '100vw',
      backgroundImage: `url(${isMobile ? backgroundMobile : background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    glitchBox: {
      width: isMobile ? '280px' : '500px',
      height: isMobile ? '80px' : '120px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '0px',
      border: '2px solid #ff00ff',
      boxShadow: `
        0 0 10px #ff00ff,
        0 0 20px #ffff00,
        inset 0 0 10px #2c2e31
      `,
      backdropFilter: 'blur(5px)',
      animation: 'glitchBox 0.1s infinite alternate',
    },
    header: {
      color: '#c2cfd2',
      fontSize: isMobile ? '1.5rem' : '3rem',
      fontFamily: 'Rubik Glitch',
      textShadow: `
        0 0 3px #fa0355,
        0 2px 1px rgba(0,0,0,0.8)
      `,
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
    keyframes: `
      @keyframes glitchBox {
        0% { transform: translate(0px, 0px); }
        33% { transform: translate(1px, -1px); }
        66% { transform: translate(-1px, 1px); }
        100% { transform: translate(0.5px, -0.5px); }
      }
    `,
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = styles.keyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.glitchBox}>
        <h1 style={styles.header}>{text}</h1>
      </div>
    </div>
  );
};

export default Hero;
