import React, { useState, useRef, useEffect } from 'react';
import './App.css';

import '@fontsource/roboto';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';

function App() {
  const [activeLink, setActiveLink] = useState('overview');
  // You can set the initial state to the hardcoded values directly
  const [cursorPosition, setCursorPosition] = useState({ top: 19.656, left: 31 });
  const menuRef = useRef(null);
  const cursorRef = useRef(null); // <-- You need to declare the cursorRef here

  const setCursorInitialPosition = () => {
    if (menuRef.current && cursorRef.current) {
      const activeElement = menuRef.current.querySelector(`.link[data-id="${activeLink}"]`);
      if (activeElement) {
        const targetRect = activeElement.getBoundingClientRect();
        
        // Get cursor's height from the ref
        const cursorHeight = cursorRef.current.offsetHeight; 

        // Calculate Y position in pixels first
        const yInPixels = targetRect.top + (targetRect.height / 3) - (cursorHeight / 2);

        // Convert the pixel value to vh
        const yInVh = (yInPixels / window.innerHeight) * 100;

        setCursorPosition({
          top: yInVh,
          left: 31 // The left value is not being calculated, so it should be included
        });
      }
    }
  };

  // Set initial position of the cursor after the component mounts
  useEffect(() => {
    setCursorInitialPosition();
  }, []); 

  // Update cursor position when a new link becomes active
  useEffect(() => {
    setCursorInitialPosition();
  }, [activeLink]); 

  const handleMouseEnter = (linkId) => {
    setActiveLink(linkId);
  };

  return (
    <div id="main-content">
      <div id="menu-bar" ref={menuRef}>
        <div 
          className="menu-cursor"
          // You need to attach the ref to the div here
          ref={cursorRef} 
          style={{ top: `${cursorPosition.top}vh`, left: `${cursorPosition.left}vw` }}
        ></div>
        <a className={`link ${activeLink === 'overview' ? 'active' : ''}`} href="/overview" data-id="overview" onMouseEnter={() => handleMouseEnter('overview')}><div id="menu-item">Overview</div></a>
        <a className={`link ${activeLink === 'skills' ? 'active' : ''}`} href="/skills" data-id="skills" onMouseEnter={() => handleMouseEnter('skills')}><div id="menu-item">Skills</div></a>
        <a className={`link ${activeLink === 'projects' ? 'active' : ''}`} href="/projects" data-id="projects" onMouseEnter={() => handleMouseEnter('projects')}><div id="menu-item">Projects</div></a>
        <a className={`link ${activeLink === 'experience' ? 'active' : ''}`} href="/experience" data-id="experience" onMouseEnter={() => handleMouseEnter('experience')}><div id="menu-item">Work Experience</div></a>
        <a className={`link ${activeLink === 'certs' ? 'active' : ''}`} href="/certs" data-id="certs" onMouseEnter={() => handleMouseEnter('certs')}><div id="menu-item">Certificates</div></a>
        <a className={`link ${activeLink === 'clubs' ? 'active' : ''}`} href="/clubs" data-id="clubs" onMouseEnter={() => handleMouseEnter('clubs')}><div id="menu-item">Clubs</div></a>
        <a className={`link ${activeLink === 'links' ? 'active' : ''}`} href="/links" data-id="links" onMouseEnter={() => handleMouseEnter('links')}><div id="menu-item">Links/Contact</div></a>
      </div>
    </div>
  );
}

export default App;