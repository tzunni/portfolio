import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { AiOutlineSound, AiFillSound } from "react-icons/ai";


// Your font imports
import '@fontsource/roboto';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';

// Placeholder components for your content
const OverviewContent = () => 
  <>
    <h3>Hi, my name is Keith Bui and I'm interested in full-stack development, systems engineering, and IT roles.</h3>
    <h3>My work experience includes being a Cybersecurity Mentor for Cypress College and working the IT helpdesk at California State University, Fullerton.</h3>
    <h3>I love to help the community that raised me, whether it's by joining organizations that give back or by helping those around me do better.</h3>
    <h3>My hobbies include playing games, travelling the world, cooking, and listening to music.</h3>
    <h3>My creativity and my tenacity fuel my passion for computer science, and I hope that is reflected in this portfolio here.</h3>
  </>;
const SkillsContent = () => <h3>This is the Skills page.</h3>;
const Languages = () => <h3>I've used Python, C/C++, SQL, JavaScript, HTML/CSS, Bash, Swift, but am most competent in Python and front-end development.</h3>;
const Frameworks = () => <h3>I've used ReactJS, Expo, React Native, Node.js, Flask, and Django, but am most confident in both Reacts and Flask.</h3>;
const Coursework = () => <h3>I've taken...<br/><br/>Cybersecurity Fundamentals, Cisco Networking 1, Network Security, Ethical Hacking, Object Oriented Programming,
Algorithm Engineering, Data Structures, Software Engineering, Artificial Intelligence, File Structures and Databases,
Web Back-End Engineering, iOS Mobile Dev. Programming, Intro. to Data Sci. and Big Data, Computer Communications (in progress)</h3>;
const ProjectsContent = () => <h3>This is the Projects page. It is still WIP.</h3>;
const TaskSocial = () => <h3>TaskSocial is my senior capstone project being built in React Native and Go, and is a social media app that is meant to gamify, share, and encourage physical activity.</h3>;
const TypeFighter = () => <h3>TypeFighter is a joint project with Patrick Tang built in Flask and ReactJS, and is a typing test designed around book prompts. It features a boss and a leaderboard to encourage players to play with and against each other.</h3>;
const ApexRPC = () => <h3>ApexRPC is an open source Discord Rich Presence Client that broadcasts the Apex Legends in game status onto Discord. It is created around reverse engineering the Steam API, and usees NodeJS to fetch and broadcast.</h3>;
const BlueTeamCTF = () => <h3>This Blue Team CTF used file analysis, tracking suites, and web vulnerabilities to find flags in a team competition, and we placed 13th/354 teams.</h3>;
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
const CertificationsContent = () => <h3>These are my certications.</h3>;
const ITF = () => <h3>This is the CompTIA IT Fundamentals+ certificate. I got this in June 2021.</h3>;
const CE = () => <h3>This is the CompTIA Cloud Essentials certificate. I got this in June 2021.</h3>;
const Network = () => <h3>This is the CompTIA Network+ certificate. I got this in November 2021, and it expired November 2024. This was the N10-008 iteration of the exam.</h3>;
const ClubsContent = () => <h3>These are the clubs and extracurriculars I joined in college.</h3>;
const UVSA = () => 
  <>
    <h3 style={{fontWeight: 'bold'}}>IT Coordinator<br/><span style={{fontWeight: '300', fontStyle: 'italic'}}>Union of Vietnamese Student Associations</span><br/><span style={{fontWeight: '300'}}>Garden Grove, CA</span><br/><span style={{fontWeight: '300'}}>February 2024 – April 2024</span></h3>
    <h3>I assisted the media team during external events.</h3>
    <h3>I helped manage and redirect emails during TetFest, one of the organization's busiest times.</h3>
    <h3>I generated ideas during meetings to help the organization reach more people.</h3>
  </>;
const CSUFVSA = () =>
  <>
    <h3 style={{fontWeight: 'bold'}}>Intern<br/><span style={{fontWeight: '300', fontStyle: 'italic'}}>Vietnamese Student Association, California State Univerity, Fullerton</span><br/><span style={{fontWeight: '300'}}>Fullerton, CA</span><br/><span style={{fontWeight: '300'}}>October 2022 – June 2023</span></h3>
    <h3>I built my extroversion from cohosting events and networking with students from our student body, as well as from other schools.</h3>
    <h3>I helped to mediate conflict amongst the club members and managed crowds during events.</h3>
    <h3>I encouraged others to reach out and created a safe space for members to celebrate their culture and heritage.</h3>
  </>;
const C4 = () => 
  <>
    <h3 style={{fontWeight: 'bold'}}>Social Media Manager<br/><span style={{fontWeight: '300', fontStyle: 'italic'}}>Cypress College Cyber Club, Cypress College</span><br/><span style={{fontWeight: '300'}}>Cypress, CA</span><br/><span style={{fontWeight: '300'}}>September 2021 – June 2022</span></h3>
    <h3>I created fliers every other week for events that the club hosted, such as movie nights, speaker events, and Capture the Flag competitions.</h3>
    <h3>I collaborated with my club board to create announcements, combat spam, and moderate the discord server.</h3>
    <h3>I helped come up with and cohosted events online during the pandemic on Zoom.</h3>
  </>;
const ContactContent = () => <h3>Here are my links and contact information.</h3>
const Github = () => <h3>This is my Github link.</h3>;
const LinkedIn = () => <h3>This is my LinkedIn link.</h3>;
const Resume = () => <h3>This is my Resume link.</h3>;
const Email = () => <h3>This is my email, keithqbui@gmail.com.</h3>

function App() {
  const backSound = new Audio('/back_sound.mp3'); 
  const clickSound = new Audio('/click_sound.mp3');
  const hoverSound = new Audio('/hover_sound.mp3');
  const menuData = {
    main: [
      { id: 'overview', title: 'Overview', content: <OverviewContent /> },
      { id: 'skills', title: 'Skills', content: <SkillsContent/> },
      { id: 'projects', title: 'Projects', content: <ProjectsContent/>},
      { id: 'work experience', title: 'Work Experience', content: <WorkExpContent/>},
      { id: 'certifications', title: 'Certifications', content: <CertificationsContent/>},
      { id: 'clubs', title: 'Clubs', content: <ClubsContent/>},
      { id: 'contact', title: 'Links/Contact', content: <ContactContent/>},
    ],
    subMenus: {
      'overview': [],
      'skills': [
        { id: 'languages', title: 'Languages', content: <Languages/>},
        { id: 'frameworks/tools', title: 'Frameworks and Tools', content: <Frameworks/>},
        { id: 'coursework', title: 'Coursework', content: <Coursework/>},
      ],
      'projects': [
        { id: 'tasksocial', title: 'TaskSocial', content: <TaskSocial/>},
        { id: 'typefighter', title: 'TypeFighter', content: <TypeFighter/>},
        { id: 'apexrpc', title: 'ApexRPC', content: <ApexRPC/>},
        { id: 'btctf', title: 'Blue Team CTF', content: <BlueTeamCTF/>},
      ],
      'work experience': [
        { id: 'ceda', title: 'IT Student Assistant', content: <CEDA/>},
        { id: 'cypress', title: 'Cybersecurity Mentor', content: <Cypress/>},
      ],
      'certifications': [
        { id: 'itf', title: 'IT Fundamentals+', content: <ITF/>, link: "https://www.certmetrics.com/comptia/public/verification.aspx?code=PD2S4DS9T7KPFESX"},
        { id: 'ce', title: 'Cloud Essentials', content: <CE/>, link: "https://www.certmetrics.com/comptia/public/verification.aspx?code=KKTWQ4S7Z4P6V69J"},
        { id: 'network', title: 'Network+', content: <Network/>, link: "https://www.certmetrics.com/comptia/public/verification.aspx?code=9ET0292F834EQQG2"},
      ],
      'clubs': [
        { id: 'UVSA', title: 'UVSA', content: <UVSA/>},
        { id: 'CSUFVSA', title: 'CSUF VSA', content: <CSUFVSA/>},
        { id: 'C4', title: 'C4', content: <C4/>},
      ],
      'contact': [
        {id: 'github', title: 'Github', link: "https://github.com/tzunni", content: <Github/>},
        {id: 'linkedin', title: 'LinkedIn', link: "https://www.linkedin.com/in/keithqbui/", content: <LinkedIn/>},
        {id: 'resume', title: 'Resume', link: "/resume.pdf", content: <Resume/>},
        {id: 'email', title: 'Email', link: "mailto:keithqbui@gmail.com", content: <Email/>}
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
  const [isMuted, setIsMuted] = useState(false);
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
    if (!isMuted) {hoverSound.play();};
    setActiveLink(linkId);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleMenuClick = (linkId) => {
    setIsMenuHidden(true);
    const currentMenu = isMainMenu ? menuData.main : menuData.subMenus[currentSubMenu];
    const item = currentMenu.find(item => item.id === linkId);
    if (linkId === 'back') {
      setTimeout(() => {
        if (!isMuted) {backSound.play();};
        setIsMenuHidden(false);
        setIsMainMenu(true);
        setActiveLink('overview');
        setCurrentParentMenu(null);
        setIsContentHidden(true);
        setIsPlayerHidden(false);
      }, 250);
    } else if (item.link) {
      setTimeout(() => {
        if (!isMuted) {clickSound.play();};
        setIsMenuHidden(false);
        window.open(item.link, '_blank');
      }, 250);
    } else if (menuData.subMenus[linkId]) {
      setTimeout(() => {
        if (!isMuted) {clickSound.play();};
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
        if (!isMuted) {clickSound.play();};
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
      <div onClick={toggleMute}>
        {isMuted ? <AiOutlineSound id='mute'/> : <AiFillSound id='mute'/>}
      </div>
    </div>
  );
}

export default App;