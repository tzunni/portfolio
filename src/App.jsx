import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// Your font imports
import '@fontsource/roboto';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';

// Placeholder components for your content
const OverviewContent = () => <h3>This is the Overview page content.</h3>;
const SkillsContent = () => <h3>This is the Skills page.</h3>;
const SubSkills1 = () => <h3>This is the content for Sub-skill 1.</h3>;
const SubSkills2 = () => <h3>This is the content for Sub-skill 2.</h3>;
const ProjectsContent = () => <h3>This is the Projects page.</h3>;
const WorkExpContent = () => <h3>This is the Work Experience page.</h3>;
const CEDA = () => 
  <>
    <h3 style={{fontWeight: 'bold'}}>IT Student Assistant<br/><span style={{fontWeight: '300', fontStyle: 'italic'}}>Center of Equitable Digital Access, California State University, Fullerton</span><br/><span style={{fontWeight: '300'}}>Fullerton, CA</span><br/><span style={{fontWeight: '300'}}>October 2024 – June 2025</span></h3>
    <h3>I provisioned, checked out, and troubleshooted for a fleet of over 1,500 devices, ranging from Linux, Windows, Mac, and iOS devices, for the student body. </h3>
    <h3>I provided technical support across the library floor for an variety of devices, including desktop computers, printers, Surface Hubs, TVs, Wacom graphics tablets, and a 3D printer.</h3>
    <h3>I documented and escalated problems to a team of technical specialists using <span style={{fontStyle: 'italic'}}>ServiceNow</span> and <span style={{fontStyle: 'italic'}}>Microsoft Teams</span>.</h3>
  </>;
const Cypress = () => 
  <>
    <h3 style={{fontWeight: 'bold'}}>Cybersecurity Mentor<br/><span style={{fontWeight: '300', fontStyle: 'italic'}}>Computer Information Systems department, Cypress College</span><br/><span style={{fontWeight: '300'}}>Cypress, CA</span><br/><span style={{fontWeight: '300'}}>August 2021 – May 2022</span></h3>
    <h3>I assisted students taking <span style={{fontStyle: 'italic'}}>Cisco Networking I</span> and <span style={{fontStyle: 'italic'}}>Network Security</span> classes, reinforcing their technical skills and developing their mindsets for Blue Team exercises.</h3>
    <h3>I fielded questions about Linux, Windows, Cisco, and SysAdmin configurations, researching them to further my students' understanding of the subject.</h3>
    <h3>I created three lab walkthroughs and performed several in-class demonstrations to guide students during their classwork.</h3>
  </>;
const Certifications = () => <h3>There are my certications.</h3>;
const ITF = () => <h3>This is the CompTIA IT Fundamentals+ certificate. I got this in June 2021.</h3>;
const CE = () => <h3>This is the CompTIA Cloud Essentials certificate. I got this in June 2021.</h3>;
const Network = () => <h3>This is the CompTIA Network+ certificate. I got this in November 2021, and it expired November 2024. This was the N10-008 iteration of the exam.</h3>;
const Github = () => <h3>This is my Github link.</h3>;
const LinkedIn = () => <h3>This is my LinkedIn link.</h3>;
const Resume = () => <h3>This is my Resume link.</h3>;

function App() {
  const backSound = new Audio('/back_sound.mp3'); 
  const clickSound = new Audio('/click_sound.mp3'); 
  const menuData = {
    main: [
      // { id: 'overview', title: 'Overview', content: <OverviewContent /> },
      { id: 'overview', title: 'Overview', content: <OverviewContent /> },
      { id: 'skills', title: 'Skills', content: <SkillsContent/> },
      { id: 'projects', title: 'Projects', content: <ProjectsContent/>},
      { id: 'work experience', title: 'Work Experience', content: <WorkExpContent/>},
      { id: 'certifications', title: 'Certifications', content: <Certifications/>},
      { id: 'clubs', title: 'Clubs'},
      { id: 'contact', title: 'Links/Contact'},
    ],
    subMenus: {
      'overview': [],
      'skills': [
        { id: 'subskill1', title: 'Sub-skill 1', content: <SubSkills1/>},
        { id: 'subskill2', title: 'Sub-skill 2', content: <SubSkills2/>},
      ],
      'projects': [],
      'work experience': [
        { id: 'ceda', title: 'IT Student Assistant', content: <CEDA/>},
        { id: 'cypress', title: 'Cybersecurity Mentor', content: <Cypress/>},
      ],
      'certifications': [
        { id: 'itf', title: 'IT Fundamentals+', content: <ITF/>, link: "https://www.certmetrics.com/comptia/public/verification.aspx?code=PD2S4DS9T7KPFESX"},
        { id: 'ce', title: 'Cloud Essentials', content: <CE/>, link: "https://www.certmetrics.com/comptia/public/verification.aspx?code=KKTWQ4S7Z4P6V69J"},
        { id: 'network', title: 'Network+', content: <Network/>, link: "https://www.certmetrics.com/comptia/public/verification.aspx?code=9ET0292F834EQQG2"},
      ],
      'clubs': [],
      'contact': [
        {id: 'github', title: 'Github', link: "https://github.com/tzunni", content: <Github/>},
        {id: 'linkedin', title: 'LinkedIn', link: "https://www.linkedin.com/in/keithqbui/", content: <LinkedIn/>},
        {id: 'resume', title: 'Resume', link: "/resume.pdf", content: <Resume/>}
      ],
    },
  };

  const [activeLink, setActiveLink] = useState('overview');
  const [isMainMenu, setIsMainMenu] = useState(true);
  const [currentParentMenu, setCurrentParentMenu] = useState('overview');
  const [currentSubMenu, setCurrentSubMenu] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ top: 19.656, left: 31 });
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const [isContentHidden, setIsContentHidden] = useState(true);
  const [isPlayerHidden, setIsPlayerHidden] = useState(false);
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
    const currentMenu = isMainMenu ? menuData.main : menuData.subMenus[currentSubMenu];
    const item = currentMenu.find(item => item.id === linkId);
    if (linkId === 'back') {
      setTimeout(() => {
        backSound.play(); // Play the sound immediately
        setIsMenuHidden(false);
        setIsMainMenu(true);
        setActiveLink('overview');
        setCurrentParentMenu(null);
        setIsContentHidden(true);
        setIsPlayerHidden(false);
      }, 250);
    } else if (item.link) {
      setTimeout(() => {
        clickSound.play();
        setIsMenuHidden(false);
        window.open(item.link, '_blank');
      }, 250);
    } else if (menuData.subMenus[linkId]) {
      setTimeout(() => {
        clickSound.play(); // Play the sound immediately
        setIsMenuHidden(false);
        setIsMainMenu(false);
        setCurrentSubMenu(linkId);
        setCurrentParentMenu(activeLink);
        setActiveLink('back');
        setIsContentHidden(false);
        setIsPlayerHidden(true);
      }, 250);
    } else {
      setTimeout(() => {
        clickSound.play(); // Play the sound immediately
        setIsMenuHidden(false);
        setCurrentParentMenu(activeLink);
        setActiveLink('back');
        setIsContentHidden(false);
        setIsPlayerHidden(true);
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
      if (activeLink === 'back') {
        const mainLink = menuData.main.find(item => item.id === currentParentMenu);
        return mainLink?.content || null;
      }
      const subMenu = menuData.subMenus[currentSubMenu];
      const subLink = subMenu.find(item => item.id === activeLink);
      return subLink?.content || null;
    }
  };

  return (
    <div id="main-content">
      <img src="src/assets/img.png" id="player-icon" className={isPlayerHidden ? 'hidden' : ''} />
        <div id="player" className={isPlayerHidden ? 'hidden' : ''}>
          <p id="player-text">Keith</p>
          <div id="player-line"></div>
          <div className={"player-subtext"}>
            <p>Lv</p>
            <p>21</p>
          </div>
        </div>
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
      <div id="content-container" className={isContentHidden ? 'hidden' : ''}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;