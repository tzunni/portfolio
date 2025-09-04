import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// Your font imports
import '@fontsource/roboto';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';

// Placeholder components for your content
const OverviewContent = () => <h2>This is the Overview page content.</h2>;
const SkillsContent = () => <h2>This is the Skills page.</h2>;
const ProjectsContent = () => <h2>This is the Projects page.</h2>;
const SubSkills1 = () => <h3>This is the content for Sub-skill 1.</h3>;
const SubSkills2 = () => <h3>This is the content for Sub-skill 2.</h3>;

function App() {
  const menuData = {
    main: [
      { id: 'overview', title: 'Overview', content: <OverviewContent /> },
      { id: 'skills', title: 'Skills' },
      { id: 'projects', title: 'Projects' },
      { id: 'work experience', title: 'Work Experience' },
      { id: 'certifications', title: 'Certifications'},
      { id: 'clubs', title: 'Clubs'},
      { id: 'contact', title: 'Links/Contact'},
    ],
    subMenus: {
      skills: [
        { id: 'subskill1', title: 'Sub-skill 1'},
        { id: 'subskill2', title: 'Sub-skill 2'},
      ],
    },
  };

  const [activeLink, setActiveLink] = useState('overview');
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [currentSubMenu, setCurrentSubMenu] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ top: 19.656, left: 31 });
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const menuRef = useRef(null);
  const cursorRef = useRef(null);

  const setCursorInitialPosition = () => {
    if (menuRef.current && cursorRef.current) {
      const activeElement = menuRef.current.querySelector(`.link[data-id="${activeLink}"]`);
      if (activeElement) {
        const targetRect = activeElement.getBoundingClientRect();
        const parentRect = menuRef.current.getBoundingClientRect();
        const cursorHeight = cursorRef.current.offsetHeight; 
        const cursorWidth = cursorRef.current.offsetWidth;
        
        // Dynamically get the transform offset from the active link's computed style
        const computedStyle = window.getComputedStyle(activeElement);
        const transformValue = computedStyle.getPropertyValue('transform');

        // Extract the translateX value from the transform matrix
        let activeOffsetInPixels = 0;
        if (transformValue && transformValue !== 'none') {
            const matrix = new DOMMatrix(transformValue);
            activeOffsetInPixels = matrix.m41;
        }

        const yInPixels = (targetRect.top - parentRect.top) + (targetRect.height / 3) - (cursorHeight / 2);
        const yInVh = (yInPixels / window.innerHeight) * 100;
        
        const xInPixels = (targetRect.left - parentRect.left) + (targetRect.width * 13/14) - (cursorWidth / 2) + activeOffsetInPixels;
        const xInVw = (xInPixels / window.innerWidth) * 100;
        
        setCursorPosition({
          top: yInVh,
          left: xInVw
        });
      }
    }
  };

  useEffect(() => {
    setCursorInitialPosition();
  }, []); 

  useEffect(() => {
    setCursorInitialPosition();
  }, [activeLink]); 

  const handleMouseEnter = (linkId) => {
    setActiveLink(linkId);
  };

  const handleMenuClick = (linkId) => {
    setIsMenuHidden(true);

    if (linkId === 'back') {
      setTimeout(() => {
        setIsMenuHidden(false);
        setIsMainMenu(true);
        setActiveLink('overview');
      }, 250);
    } else if (menuData.subMenus[linkId]) {
      setTimeout(() => {
        setIsMenuHidden(false);
        setIsMainMenu(false);
        setCurrentSubMenu(linkId);
        setActiveLink(linkId);
      }, 250);
    } else {
      setTimeout(() => {
        setIsMenuHidden(false);
        setActiveLink(linkId);
      }, 250);
    }
  };
  
  const renderCurrentMenu = () => {
    const menuToRender = isMainMenu ? menuData.main : menuData.subMenus[currentSubMenu];
    
    return (
      <>
        {!isMainMenu && (
          <a
            className={`menu-item link ${activeLink === 'back' ? 'active' : ''}`}
            data-id="back"
            onMouseEnter={() => handleMouseEnter('back')}
            onClick={() => handleMenuClick('back')}
            style={{
              transform: activeLink === 'back' ? 'translateX(0.5vw)' : 'translateX(0)',
              opacity: activeLink === 'back' ? 0.9 : 0.7,
              fontWeight: activeLink === 'back' ? 'normal' : '300',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Back
          </a>
        )}
        
        {menuToRender.map((item) => (
          <a
            key={item.id}
            className={`menu-item link ${activeLink === item.id ? 'active' : ''}`}
            data-id={item.id}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onClick={() => handleMenuClick(item.id)}
            style={{
              transform: activeLink === item.id ? 'translateX(0.5vw)' : 'translateX(0)',
              opacity: activeLink === item.id ? 0.9 : 0.7,
              fontWeight: activeLink === item.id ? 'normal' : '300',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {item.title}
          </a>
        ))}
      </>
    );
  };

  const renderContent = () => {
    if (isMainMenu) {
      const mainLink = menuData.main.find(item => item.id === activeLink);
      return mainLink?.content || null;
    } else {
      const subMenu = menuData.subMenus[currentSubMenu];
      const subLink = subMenu.find(item => item.id === activeLink);
      return subLink?.content || null;
    }
  };

  return (
    <div id="main-content">
      <div id="menu-bar" ref={menuRef} className={isMenuHidden ? 'hidden' : ''}>
        <div 
          className="menu-cursor"
          ref={cursorRef} 
          style={{ 
            top: `${cursorPosition.top}vh`, 
            left: `${cursorPosition.left}vw`,
            transition: 'all 0.2s ease-in-out'
          }}
        ></div>
        {renderCurrentMenu()}
      </div>
      <div id="content-container">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;