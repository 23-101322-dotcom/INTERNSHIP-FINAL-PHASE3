import { useState } from 'react';
import './pages.css';
import bgImage from '../assets/77777.png';
import headphonesImg from '../assets/headphones.png';
import questionImg from '../assets/question.png';

const MESSAGES = [
  { id:'D', name:'Dad',       time:'2 days ago', preview:"Sara, please call me back. We're worried.",           unread: true  },
  { id:'D', name:'Dr. Hayes', time:'3 days ago', preview:'The readings are off the charts. We need to talk.',   unread: true  },
  { id:'M', name:'Marcus',    time:'Jan 15',     preview:'I heard the sounds too. Meet me at the lighthouse.',  unread: false },
  { id:'L', name:'Lab Group', time:'Jan 14',     preview:'Emergency meeting canceled – equipment malfunction',  unread: false },
  { id:'U', name:'Unknown',   time:'Jan 12',     preview:"They're listening. Don't trust the tide reports.",    unread: true  },
  { id:'E', name:'Emma Chen', time:'Jan 10',     preview:"Your shift starts at 6. Don't be late!",              unread: false },
];

const CALLS = [
  { id:'D', name:'Dad',         type:'missed',   count:3, time:'Today, 9:23 AM'      },
  { id:'D', name:'Dr. Hayes',   type:'received',          time:'Yesterday, 11:45 PM' },
  { id:'M', name:'Marcus',      type:'outgoing',          time:'Jan 15, 7:12 PM'     },
  { id:'C', name:'Coast Guard', type:'received',          time:'Jan 14, 3:30 PM'     },
  { id:'U', name:'Unknown',     type:'missed',   count:2, time:'Jan 12, 2:47 AM'     },
];

const MAILS = [
  { sender:'Research Director',   subject:'Project Suspension Notice',        preview:'Effective immediately, all deep-sea monitoring has been suspended pending investigation…', time:'2 days ago', unread: true  },
  { sender:'Security Alert',      subject:'Unauthorized Lab Access Detected',  preview:'Your credentials were used to access Lab C at 2:47 AM on January 12…',                   time:'Jan 15',     unread: true  },
  { sender:'Dr. Hayes',           subject:'RE: Anomalous Readings',            preview:"Sara, the frequency patterns match nothing in our database. We need to discuss this in person…", time:'Jan 14', unread: false },
  { sender:'Facility Management', subject:'Storm Evacuation Protocol',         preview:'All personnel must evacuate by 23:59. Lock down all equipment and secure samples…',         time:'Jan 9',      unread: false },
  { sender:'Marcus Thompson',     subject:'Did you hear that?',                preview:'I was outside the facility around midnight and the ground was vibrating. Something is down there…', time:'Jan 8', unread: false },
];

const GALLERY = [
  { label:'At the lab - last normal day',                   date:'Jan 16', emoji:'🔬' },
  { label:'Dinner with the team before everything changed', date:'Jan 14', emoji:'🍽️' },
  { label:'With Marcus and Emma - they heard it too',       date:'Jan 12', emoji:'📸' },
  { label:'Research team - analyzing the frequencies',      date:'Jan 10', emoji:'📊' },
  { label:'Ocean view - before the storm',                  date:'Jan 8',  emoji:'🌊' },
  { label:'Something in the dark',                          date:'Jan 7',  emoji:'🌑' },
  { label:'The light beneath the water',                    date:'Jan 6',  emoji:'💡' },
  { label:'Dr. Hayes at the chalkboard',                    date:'Jan 5',  emoji:'📝' },
];

const FEED = [
  { id:'M', name:'Marcus Thompson',    date:'3 days ago', likes:12,  comments:8,  text:"Anyone else hearing strange sounds at night near the research facility? It's like a low frequency hum coming from underground. Been recording it for analysis." },
  { id:'E', name:'Emma Chen',          date:'Jan 15',     likes:24,  comments:15, text:"Sara hasn't been responding to messages. Has anyone seen her since the storm? Getting worried." },
  { id:'C', name:'Coastal Watch Group',date:'Jan 14',     likes:156, comments:43, text:"URGENT: Unusual tidal patterns detected. The ocean is behaving erratically. All boats should return to harbor immediately." },
];

const DIARY = [
  { date:'January 15, 2026', title:'The sounds are getting louder',    text:"I can't sleep anymore. Every night at 2:47 AM, the humming starts. It's not just in my head – Marcus hears it too. The equipment confirms it…" },
  { date:'January 12, 2026', title:'Something is wrong with the data', text:"Dr. Hayes pulled me aside today. The frequency patterns we're detecting don't match anything natural. He looked scared, and Hayes never gets scared…" },
  { date:'January 9, 2026',  title:'The storm changed everything',     text:"The tidal readings before the storm were impossible. Water doesn't move like that. And now the equipment is failing, showing error codes that shouldn't exist…" },
  { date:'January 5, 2026',  title:'Underground chamber discovery',    text:"Sonar picked up something 847 meters below. Geometric patterns. Not geological. Someone—or something—built this. The coordinates are burned in my memory…" },
];

const RESEARCH = [
  { icon:'warn',  label:'Audio Data',     date:'Jan 15, 2026', title:'Frequency Analysis Report',  text:'Detected frequency: 0.047 Hz – Impossible natural occurrence. Pattern repeats every 3 hours, 14 minutes. Source: Unknown.' },
  { icon:'trend', label:'Oceanographic',  date:'Jan 14, 2026', title:'Tidal Anomaly Records',       text:'Water displacement patterns inconsistent with lunar cycles. Suggesting external gravitational influence or subsurface activity.' },
  { icon:'warn',  label:'Sonar Imaging',  date:'Jan 10, 2026', title:'Underground Structure Scan',  text:'Geometric patterns detected 847 meters below sea floor. Structure spans approximately 2.3 km radius. Non-geological origin confirmed.' },
  { icon:'trend', label:'Technical',      date:'Jan 12, 2026', title:'Equipment Malfunction Log',   text:'System errors across all monitoring equipment. Error code: SIGNAL_INTERFERENCE_UNKNOWN. External electromagnetic source suspected.' },
  { icon:'doc',   label:'Archive',        date:'Jan 8, 2026',  title:'Historical Research Notes',   text:"Local legends mention 'voices from the deep' dating back centuries. Indigenous tribes avoided this coastline. Possible connection?" },
  { icon:'warn',  label:'Correspondence', date:'Jan 6, 2026',  title:'Dr. Hayes - Personal Notes',  text:"If you're reading this, something happened to me. The frequencies aren't random – they're a pattern. Mathematical. Deliberate. Someone is listening." },
];

const LEVELS = [
  { num:1, diff:'Easy',   diffColor:'#22c55e', iconType:'waves',  bgColor:'#0E2130', locked:false, title:'The Disappearance', sub:"Sara's Office Investigation", desc:"Search Sara's office and find 5 pieces of evidence. Click on glowing objects to discover what happened the night she disappeared." },
  { num:2, diff:'Medium', diffColor:'#f97316', iconType:'bolt',   bgColor:'#0E2130', locked:false, title:'The Data Breach',   sub:'Classified Files Stolen',      desc:"Someone hacked into the research facility's mainframe and stole classified oceanographic data. Track down the hacker and recover the files." },
  { num:3, diff:'Hard',   diffColor:'#ef4444', iconType:'shield', bgColor:'#0E2130', locked:false, title:'The Underground',   sub:'Descent into the Deep',        desc:'Infiltrate the underwater structure 847 meters below. Stabilize the pressure system by adjusting 5 valves to their correct levels.' },
  { num:4, diff:'Hard',   diffColor:'#ef4444', iconType:'signal', bgColor:'#0E2130', locked:false, title:'The Final Signal',  sub:"Decode Sara's Message",        desc:"The source of the 0.047 Hz frequency has been located. Decode the final signal and uncover the truth behind Sara's disappearance." },
];

const EVIDENCE_SPOTS = [
  { id:'phone', label:"Sara's Phone",   clue:"Last message: 'I found something… they don't want us to know'", top:'72%', left:'16%' },
  { id:'notes', label:'Research Notes', clue:'Strange frequency detected at 0.047 Hz - impossible!',           top:'38%', left:'34%' },
  { id:'mug',   label:'Coffee Mug',     clue:'Still warm… Sara was here recently',                             top:'47%', left:'68%' },
  { id:'badge', label:'Security Badge', clue:'Access log: Lab C entry at 2:47 AM',                             top:'40%', left:'83%' },
  { id:'photo', label:'Photo Frame',    clue:'Sara with her team at the lighthouse',                           top:'28%', left:'53%' },
];

const PHONE_APPS = [
  { icon:'💬', label:'Messages'       },
  { icon:'📞', label:'Phone'          },
  { icon:'✉️', label:'Mail'           },
  { icon:'🖼️', label:'Gallery'        },
  { icon:'📷', label:'Social Feed'    },
  { icon:'📖', label:'Diary'          },
  { icon:'🗂️', label:'Research Files' },
  { icon:'⚙️', label:'Settings'       },
];

const ACCOUNT_SETTINGS = [
  { icon:'👤', label:'Profile',  sub:'Sara Rodriguez' },
  { icon:'🔒', label:'Security', sub:'2FA Enabled'    },
];

const SYSTEM_SETTINGS = [
  { icon:'🔔', label:'Notifications', sub:'All enabled'           },
  { icon:'🌙', label:'Dark Mode',     sub:'Always on'             },
  { icon:'🔊', label:'Sound',         sub:'Maximum'               },
  { icon:'📶', label:'Network',       sub:'Research Facility LAN' },
  { icon:'🔋', label:'Battery',       sub:'87%'                   },
];

const S = {
  HEADPHONES: 0, TITLE: 1, STORY: 2,
  DAYS: 3, PHONE: 4,
  MESSAGES: 5, CALLS: 6, MAIL: 7, GALLERY: 8,
  SOCIAL: 9, DIARY: 10, RESEARCH: 11, SETTINGS: 12,
  LEVELS: 13,
  LEVEL1PLAY: 14,
  LEVEL1DONE: 15,
};

const APP_SCREEN_MAP = {
  'Messages':       S.MESSAGES,
  'Phone':          S.CALLS,
  'Mail':           S.MAIL,
  'Gallery':        S.GALLERY,
  'Social Feed':    S.SOCIAL,
  'Diary':          S.DIARY,
  'Research Files': S.RESEARCH,
  'Settings':       S.SETTINGS,
};

const CALL_ICON = { missed:'📵', received:'📲', outgoing:'📤' };
const RESEARCH_ICON = { warn:'⚠️', trend:'📈', doc:'📄' };
const RESEARCH_CLASS = { warn:'researchWarn', trend:'researchTrend', doc:'researchDoc' };

function LevelIcon({ type, bg }) {
  const icons = {
    waves: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M4 12 Q9 8 14 12 Q19 16 24 12 Q29 8 34 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M4 20 Q9 16 14 20 Q19 24 24 20 Q29 16 34 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M4 28 Q9 24 14 28 Q19 32 24 28 Q29 24 34 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    bolt: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M21 4 L10 20 H18 L15 32 L26 16 H18 L21 4Z" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="white" fillOpacity="0.15"/>
      </svg>
    ),
    shield: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4 L30 9 V18 C30 25 24 31 18 33 C12 31 6 25 6 18 V9 L18 4Z" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="white" fillOpacity="0.1"/>
      </svg>
    ),
    signal: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="3" fill="white"/>
        <path d="M11 11 A10 10 0 0 0 11 25" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M25 11 A10 10 0 0 1 25 25" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M6 6 A17 17 0 0 0 6 30"   stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M30 6 A17 17 0 0 1 30 30"  stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  };
  return <div className="levelIcon" style={{ background: bg }}>{icons[type]}</div>;
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" strokeWidth="2"/>
      <path d="M16.5 16.5 L21 21" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function CallOfTheOcean() {
  const [screen, setScreen]           = useState(S.HEADPHONES);
  const [flashing, setFlashing]       = useState(false);
  const [foundEvidence, setFound]     = useState([]);
  const [showHTP, setShowHTP]         = useState(true);

  const goTo = (n) => {
    setFlashing(true);
    setTimeout(() => { setScreen(n); setFlashing(false); }, 380);
  };

  const startLevel1 = () => {
    setFound([]);
    setShowHTP(true);
    goTo(S.LEVEL1PLAY);
  };

  const handleSpot = (spot) => {
    if (foundEvidence.find(e => e.id === spot.id)) return;
    const updated = [...foundEvidence, spot];
    setFound(updated);
    if (updated.length === EVIDENCE_SPOTS.length) {
      setTimeout(() => goTo(S.LEVEL1DONE), 600);
    }
  };

  const showStatusBar = screen >= S.DAYS && screen < S.LEVEL1PLAY;

  return (
    <div className="root">

      <img className="bgImage" src={bgImage} alt="" />
      <div className="noise" />

      {showStatusBar && (
        <div className="statusBar">
          <div className="statusSignal"><span /><span /><span /><span /></div>
          <span className="statusWifi">〜</span>
          {screen === S.PHONE && <div className="statusTitle">Sara's phone</div>}
          <div className="statusBattery" style={{ marginLeft: screen === S.PHONE ? 0 : 'auto' }}>
            <div className="statusBatteryFill" />
          </div>
        </div>
      )}

      <div className={`flash${flashing ? ' flashOn' : ''}`} />

      <div className={`screen${screen === S.HEADPHONES ? ' screenActive' : ''}`}>
        <div className="overlay1" />
        <div className="toast">
          <span className="toastIcon">🚀</span>
          <div>
            <div className="toastTitle">Game Mode: On</div>
            <div className="toastSub">Access Game Overlay in Control Center</div>
          </div>
        </div>
        <div className="headphones"><img src={headphonesImg} alt="headphones" /></div>
        <h1 className="headline">Use headphones for a<br />better experience</h1>
        <button className="btnOutline" onClick={() => goTo(S.TITLE)}>CONTINUE →</button>
      </div>

      <div className={`screen${screen === S.TITLE ? ' screenActive' : ''}`}>
        <div className="overlay2" />
        <img src={questionImg} alt="mystery" className="questionImg" />
        <h1 className="gameTitle">Call Of<br />The Ocean</h1>
        <button className="btnBegin" onClick={() => goTo(S.STORY)}>▷ Begin</button>
      </div>

      <div className={`screen${screen === S.STORY ? ' screenActive' : ''}`}>
        <div className="overlay3" />
        <h1 className="storyTitle">Call of the Ocean</h1>
        <div className="storyCard">
          <p className="storyPara">A fisherman's daughter vanished the night before the storm.</p>
          <p className="storyPara">No one heard her scream. No one saw her leave. The only trace left behind was her scarf.</p>
          <p className="storyPara">Did she drown in the merciless ocean? Or did someone take her into the darkness?</p>
          <p className="storyPara storyHighlight">Uncover the truth, level by level.</p>
        </div>
        <button className="btnBegin" onClick={() => goTo(S.DAYS)}>▷ Begin Investigation</button>
        <button className="btnBack"  onClick={() => goTo(S.HEADPHONES)}>← Back to Start</button>
      </div>

      <div className={`screen${screen === S.DAYS ? ' screenActive' : ''}`}>
        <div className="overlayDark" />
        <div className="daysPage">
          <div className="daysDate">January 17, 2026</div>
          <div className="daysCounter">
            <div className="digit">2</div>
            <div className="digit">5</div>
          </div>
          <div className="daysText">Days since the night of disappearance</div>
          <button className="daysBtn" onClick={() => goTo(S.PHONE)}>Continue</button>
        </div>
      </div>

      <div className={`screen${screen === S.PHONE ? ' screenActive' : ''}`}>
        <div className="overlayDark" />
        <div className="phonePage">
          <div className="phoneAlert">
            <h3>Sara's Investigation</h3>
            <p>Access files and communications</p>
          </div>
          <div className="phoneGrid">
            {PHONE_APPS.map(app => (
              <button key={app.label} className="phoneApp" onClick={() => goTo(APP_SCREEN_MAP[app.label])}>
                {app.icon}
                <span>{app.label}</span>
              </button>
            ))}
          </div>
          <button className="phoneContinueBtn" onClick={() => goTo(S.LEVELS)}>▷ Continue to Levels</button>
        </div>
      </div>

      <div className={`screen${screen === S.MESSAGES ? ' screenActive' : ''}`}>
        <div className="overlayDark" />
        <div className="subPage">
          <div className="pageHeader">
            <button className="backBtn" onClick={() => goTo(S.PHONE)}>←</button>
            <h1>Messages</h1>
          </div>
          <input className="msgSearch" placeholder="🔍 Search conversations..." readOnly />
          <div className="msgList">
            {MESSAGES.map((m, i) => (
              <div key={i} className="msgItem">
                <div className="msgAvatar">{m.id}</div>
                <div className="msgBody">
                  <h3>{m.name}</h3>
                  <p>{m.preview}</p>
                </div>
                <div className="msgMeta">
                  <span className="msgTime">{m.time}</span>
                  {m.unread && <span className="msgDot" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`screen${screen === S.CALLS ? ' screenActive' : ''}`}>
        <div className="overlayDark" />
        <div className="subPage">
          <div className="pageHeader">
            <button className="backBtn" onClick={() => goTo(S.PHONE)}>←</button>
            <h1>Recent Calls</h1>
          </div>
          <div className="callList">
            {CALLS.map((c, i) => (
              <div key={i} className="callItem">
                <div className="msgAvatar">{c.id}</div>
                <span className={`callIcon ${c.type === 'missed' ? 'callMissed' : c.type === 'received' ? 'callReceived' : 'callOutgoing'}`}>
                  {CALL_ICON[c.type]}
                </span>
                <div className="callInfo">
                  <h3 className={c.type === 'missed' ? 'missedName' : ''}>
                    {c.name}{c.count ? ` (${c.count})` : ''}
                  </h3>
                  <p>{c.time}</p>
                </div>
                <button className="callBtn">📞</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`screen${screen === S.MAIL ? ' screenActive' : ''}`}>
        <div className="overlayDark" />
        <div className="subPage">
          <div className="pageHeader">
            <button className="backBtn" onClick={() => goTo(S.PHONE)}>←</button>
            <h1>Mail</h1>
          </div>
          <input className="mailSearch" placeholder="🔍 Search emails..." readOnly />
          <div className="mailList">
            {MAILS.map((m, i) => (
              <div key={i} className="mailItem">
                <div className="mailIconBox">✉️</div>
                <div className="mailBody">
                  <h3>{m.sender}</h3>
                  <h4>{m.subject}</h4>
                  <p>{m.preview}</p>
                </div>
                <div className="mailMeta">
                  <span className="mailTime">{m.time}</span>
                  {m.unread && <span className="mailDot" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`screen${screen === S.GALLERY ? ' screenActive' : ''}`}>
        <div className="overlayDark" />
        <div className="subPage">
          <div className="pageHeader">
            <button className="backBtn" onClick={() => goTo(S.PHONE)}>←</button>
            <h1>Gallery</h1>
          </div>
          <div className="galleryGrid">
            {GALLERY.map((g, i) => (
              <div key={i} className="galleryCard">
                <div className="galleryThumb">{g.emoji}</div>
                <p>{g.label}</p>
                <small>{g.date}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`screen${screen === S.SOCIAL ? ' screenActive' : ''}`}>
        <div className="overlayDark" />
        <div className="subPage">
          <div className="pageHeader">
            <button className="backBtn" onClick={() => goTo(S.PHONE)}>←</button>
            <h1>Social Feed</h1>
          </div>
          <div className="feedList">
            {FEED.map((f, i) => (
              <div key={i} className="feedPost">
                <div className="feedAuthor">
                  <div className="feedAvatar">{f.id}</div>
                  <div>
                    <div className="feedName">{f.name}</div>
                    <div className="feedDate">{f.date}</div>
                  </div>
                </div>
                <p className="feedText">{f.text}</p>
                <div className="feedActions">
                  <span className="feedAction">👍 {f.likes}</span>
                  <span className="feedAction">💬 {f.comments}</span>
                  <span className="feedAction">↗️ Share</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`screen${screen === S.DIARY ? ' screenActive' : ''}`}>
        <div className="overlayDark" />
        <div className="subPage">
          <div className="pageHeader">
            <button className="backBtn" onClick={() => goTo(S.PHONE)}>←</button>
            <h1>Sara's Diary</h1>
          </div>
          <div className="diaryList">
            {DIARY.map((d, i) => (
              <div key={i} className="diaryEntry">
                <div className="diaryDateRow">🔒 {d.date}</div>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`screen${screen === S.RESEARCH ? ' screenActive' : ''}`}>
        <div className="overlayDark" />
        <div className="subPage">
          <div className="pageHeader">
            <button className="backBtn" onClick={() => goTo(S.PHONE)}>←</button>
            <h1>Research Files</h1>
          </div>
          <div className="researchGrid">
            {RESEARCH.map((r, i) => (
              <div key={i} className="researchCard">
                <div className="researchCardHeader">
                  <span className={`researchIcon ${RESEARCH_CLASS[r.icon]}`}>{RESEARCH_ICON[r.icon]}</span>
                  <h3>{r.title}</h3>
                </div>
                <p className="researchMeta">{r.label} • {r.date}</p>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`screen${screen === S.SETTINGS ? ' screenActive' : ''}`}>
        <div className="overlayDark" />
        <div className="subPage">
          <div className="pageHeader">
            <button className="backBtn" onClick={() => goTo(S.PHONE)}>←</button>
            <h1>Settings</h1>
          </div>
          {[
            { label:'Account', items: ACCOUNT_SETTINGS },
            { label:'System',  items: SYSTEM_SETTINGS  },
          ].map(section => (
            <div key={section.label} className="settingsSection">
              <div className="settingsLabel">{section.label}</div>
              <div className="settingsList">
                {section.items.map((item, i) => (
                  <div key={i} className="settingsItem">
                    <div className="settingsItemIcon">{item.icon}</div>
                    <div>
                      <h3>{item.label}</h3>
                      <p>{item.sub}</p>
                    </div>
                    <span className="settingsArrow">›</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`screen${screen === S.LEVELS ? ' screenActive' : ''}`}>
        <div className="overlayDark" />
        <div className="subPage levelsCenter">
          <div className="levelsHeader">
            <h1>Call of the Ocean</h1>
            <p>Select Your Mission</p>
          </div>
          <div className="levelsList">
            {LEVELS.map(lv => (
              <div
                key={lv.num}
                className={`levelCard${lv.locked ? ' levelCardLocked' : ''}`}
                onClick={() => { if (!lv.locked && lv.num === 1) startLevel1(); }}
              >
                <LevelIcon type={lv.iconType} bg={lv.bgColor} />
                <div className="levelInfo">
                  <div className="levelTags">
                    <span className="levelTag levelTagNum">Level {lv.num}</span>
                    <span className="levelTag levelTagDiff" style={{ background: lv.diffColor }}>{lv.diff}</span>
                  </div>
                  <h3>{lv.title}</h3>
                  <p className="levelSub">{lv.sub}</p>
                  <p>{lv.desc}</p>
                </div>
                <div className="levelStart">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="10" stroke="rgba(100,200,220,0.5)" strokeWidth="1.5"/>
                    <circle cx="11" cy="11" r="4"  stroke="rgba(100,200,220,0.8)" strokeWidth="1.5"/>
                    <circle cx="11" cy="11" r="1.5" fill="rgba(100,200,220,0.9)"/>
                  </svg>
                  Start Mission
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`screen${screen === S.LEVEL1PLAY ? ' screenActive' : ''}`}>
        <div className="lvlPage">
          <div className="statusBar">
            <div className="statusSignal"><span /><span /><span /><span /></div>
            <span className="statusWifi">〜</span>
            <div className="statusBattery" style={{ marginLeft:'auto' }}>
              <div className="statusBatteryFill" />
            </div>
          </div>

          <div className="lvlTopbar">
            <div className="lvlTitleBlock">
              <button className="backBtn" onClick={() => goTo(S.LEVELS)}>←</button>
              <div>
                <h1>Level 1: Sara's Office</h1>
                <p>Click objects to find evidence</p>
              </div>
            </div>
            <div className="lvlCounter">
              <span>Evidence Found</span>
              <strong>{foundEvidence.length}/5</strong>
            </div>
          </div>

          <div className="lvlDivider" />

          <div className="lvlScene">
            <img className="lvlSceneImg" src={bgImage} alt="scene" />
            <div className="lvlSceneOverlay" />

            {EVIDENCE_SPOTS.map(spot => {
              const found = !!foundEvidence.find(e => e.id === spot.id);
              return (
                <div
                  key={spot.id}
                  className={`evSpot${found ? ' evSpotFound' : ''}`}
                  style={{ top: spot.top, left: spot.left }}
                  onClick={() => handleSpot(spot)}
                >
                  {found ? <IconCheck /> : <IconSearch />}
                </div>
              );
            })}

            {foundEvidence.length > 0 && (
              <div className="evPanel">
                <h3>Evidence Collected</h3>
                <div className="evList">
                  {foundEvidence.map((e, i) => (
                    <div key={i} className="evItem">
                      <IconCheck />
                      <div>
                        <h4>{e.label}</h4>
                        <p>{e.clue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showHTP && (
              <div className="htpPanel">
                <div className="htpTitle">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5" stroke="rgba(100,160,220,0.7)"/>
                    <circle cx="12" cy="12" r="4"  strokeWidth="1.5" stroke="rgba(100,160,220,0.7)"/>
                    <circle cx="12" cy="12" r="1.5" fill="rgba(100,160,220,0.7)"/>
                  </svg>
                  How to Play
                </div>
                <p className="htpBody">
                  Look around Sara's office and click on the glowing objects to collect evidence. Find all 5 pieces of evidence to complete the level.
                </p>
                <button className="htpBtn" onClick={() => setShowHTP(false)}>Hide Locations</button>
                <p className="htpLocations">
                  Look for: Phone (left), Notes (center), Mug (center-right), Badge (right), Photo (upper-left)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`screen${screen === S.LEVEL1DONE ? ' screenActive' : ''}`}>
        <div className="completePage">
          <div className="statusBar">
            <div className="statusSignal"><span /><span /><span /><span /></div>
            <span className="statusWifi">〜</span>
            <div className="statusBattery" style={{ marginLeft:'auto' }}>
              <div className="statusBatteryFill" />
            </div>
          </div>

          <div className="completeTopbar">
            <div>
              <h1>Level 1: Sara's Office</h1>
              <p>Click objects to find evidence</p>
            </div>
            <div className="completeTopRight">
              <span>Evidence Found</span>
              <strong>5/5</strong>
            </div>
          </div>

          <div className="completeBody">
            <div className="completeIcon"><IconCheck /></div>
            <h2 className="completeTitle">Level 1 Complete!</h2>
            <p className="completeSub">You've discovered what happened in Sara's office. The mystery deepens…</p>
            <div className="completeCard">
              <h3>The Mystery Deepens…</h3>
              <p>Sara Rodriguez was investigating an impossible frequency coming from deep underwater. She accessed Lab C at 2:47 AM and discovered something dangerous - something "they" didn't want anyone to know. Her coffee was still warm when found, but Sara had vanished without a trace.</p>
              <p className="completeTeaser">The lighthouse holds more secrets. The investigation continues in Level 2…</p>
            </div>
            <div className="completeActions">
              <button className="btnContinue"  onClick={() => goTo(S.LEVELS)}>Continue to Level 2</button>
              <button className="btnMissions" onClick={() => goTo(S.LEVELS)}>Back to Missions</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}