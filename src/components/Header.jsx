import React, { useEffect, useState } from 'react';
import logo from '../assets/swo-logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'The problem with being faster than a storm is that the calm never finds you.';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (showAboutModal) {
      let index = 0;
      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, index));
        index++;
        if (index > fullText.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    } else {
      setTypedText('');
    }
  }, [showAboutModal]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes glitchBox {
        0% { transform: translate(0px, 0px); }
        33% { transform: translate(1px, -1px); }
        66% { transform: translate(-1px, 1px); }
        100% { transform: translate(0.5px, -0.5px); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleAboutClick = () => {
    setShowNavModal(false);
    setTimeout(() => setShowAboutModal(true), 300);
  };

  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'transparent',
      boxShadow: '2px 15px 15px rgba(11, 11, 11, 0.7)',
      padding: isMobile ? '0.5rem 1rem' : '1rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(2px)',
      flexWrap: 'wrap',
      gap: isMobile ? '0.5rem' : '1.5rem',
    },
    contentWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
    },
    logo: {
      height: isMobile ? '100px' : '140px',
      margin: '0 1.5rem',
    },
    link: {
      textDecoration: 'none',
      color: '#c2cfd2',
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontFamily: 'Rubik Glitch',
      textShadow: `0 0 3px #ff00ff, 0 2px 1px rgba(0,0,0,0.8)`,
      cursor: 'pointer',
      paddingRight: isMobile ? 0 : "15px",
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
    },
    glitchModal: {
      width: isMobile ? '280px' : '500px',
      minHeight: isMobile ? '100px' : '150px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      border: '2px solid #ff00ff',
      boxShadow: `
        0 0 10px #ff00ff,
        0 0 20px #ffff00,
        inset 0 0 10px #2c2e31
      `,
      backdropFilter: 'blur(5px)',
      animation: 'glitchBox 0.1s infinite alternate',
      padding: '2rem',
      position: 'relative',
      textAlign: 'center',
      fontFamily: 'Rubik Glitch',
      color: '#c2cfd2',
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      fontSize: '1.5rem',
      color: '#fff',
      cursor: 'pointer',
    },
    text: {
      fontSize: isMobile ? '1rem' : '1.4rem',
      textShadow: `0 0 3px #fa0355, 0 2px 1px rgba(0,0,0,0.8)`,
    },
    hamburger: {
      position: 'absolute',
      top: '1.2rem',
      right: '3.5rem',
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      cursor: 'pointer',
      zIndex: 1100,
      textShadow: '0 10px 10px rgba(0, 0, 0, 0.8)',
    },
    navList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '2rem',
    },
  };

  return (
    <>
      <header style={styles.container}>
        {isMobile ? (
          <>
            <img src={logo} alt="SWO Logo" style={styles.logo} />
            <GiHamburgerMenu style={styles.hamburger} onClick={() => setShowNavModal(true)} />
          </>
        ) : (
          <div style={styles.contentWrapper}>
            <span style={styles.link} onClick={handleAboutClick}>Speedio</span>
            <a href="https://x.com/speediosonic" target="_blank" rel="noopener noreferrer" style={styles.link}>X</a>
            <img src={logo} alt="SWO Logo" style={styles.logo} />
            <a href="https://t.me/sonicworldorder" target="_blank" rel="noopener noreferrer" style={styles.link}>Telegram</a>
            <a href="https://discord.gg/W2b7EsnS" target="_blank" rel="noopener noreferrer" style={styles.link}>Discord</a>
          </div>
        )}
      </header>

      {showNavModal && isMobile && (
        <div style={styles.modalOverlay}>
          <div style={styles.glitchModal}>
            <span style={styles.closeButton} onClick={() => setShowNavModal(false)}>×</span>
            <div style={styles.navList}>
              <span style={styles.link} onClick={handleAboutClick}>Speedio</span>
              <a href="https://t.me/sonicworldorder" target="_blank" rel="noopener noreferrer" style={styles.link}>Telegram</a>
              <a href="https://x.com/speediosonic" target="_blank" rel="noopener noreferrer" style={styles.link}>X</a>
              <a href="https://discord.gg/W2b7EsnS" target="_blank" rel="noopener noreferrer" style={styles.link}>Discord</a>
            </div>
          </div>
        </div>
      )}

      {showAboutModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.glitchModal}>
            <span style={styles.closeButton} onClick={() => setShowAboutModal(false)}>×</span>
            <p style={styles.text}>{typedText}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
