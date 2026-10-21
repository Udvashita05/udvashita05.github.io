const $ = (selector) => document.querySelector(selector);
const themeButton = $('#theme-toggle');
function syncTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Switch to light lavender theme' : 'Switch to dark baby pink theme');
  $('.theme-icon').textContent = dark ? '☀' : '☾';
  $('.theme-label').textContent = dark ? 'Lavender' : 'Baby pink';
}
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('portfolio-theme', theme); } catch {}
  syncTheme();
});
syncTheme();
function updateClock() {
  const now = new Date();
  $('#retro-clock').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  $('#retro-date').textContent = now.toLocaleDateString('en-GB');
  $('#copyright-year').textContent = now.getFullYear();
}
updateClock();
setInterval(updateClock, 1000);
const sections = {
  about: { title: 'about_me.txt', heading: 'Hello, I’m Udvashita ♡', text: 'I’m a B.Tech undergraduate and full-stack software engineer interested in open source. I love bringing thoughtful interfaces and the code behind them together.', tags: ['Full-stack development', 'Open source'] },
  projects: { title: 'projects.folder', heading: 'Project showcase', text: 'A little corner for things I build.', projects: [] },
  skills: { title: 'tech_stack.sys', heading: 'My developer toolkit', text: 'The technologies in my full-stack toolkit.', tags: ['React', 'Node.js', 'TypeScript', 'Python'], tools: ['Linux', 'Git', 'GitHub', 'Codex', 'Claude'] },
  experience: { title: 'experience.log', heading: 'Experience & timeline', text: 'Growing through building, learning, and contributing to open source.' },
  education: { title: 'education.txt', heading: 'B.Tech · Information Technology', text: 'An undergraduate journey into software engineering and full-stack development.' },
  hobbies: { title: 'creative.space', heading: 'Beyond the code ♪', text: 'A space for the creative side of my world.' },
  contact: { title: 'inbox.mail', heading: 'Let’s build something together ♡', text: 'Available for internships & full-time roles.', socials: true }
};
// Social profile links shown in the Contact section.
const socialProfiles = [
  { name: 'LinkedIn', host: 'linkedin.com', url: 'https://www.linkedin.com/in/udvashita-banerjee-5b855630b', icon: 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z' },
  { name: 'GitHub', host: 'github.com', url: 'https://github.com/Udvashita05', icon: 'M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.82 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.47 11.47 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.13 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.38.81 1.1.81 2.22v3.13c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z' },
  { name: 'X (Twitter)', host: 'x.com', url: 'https://x.com/UdvashitaB', icon: 'M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-8.08L4.98 22H1.85l7.25-8.29L1.4 2h6.4l4.43 7.37L18.9 2Zm-1.1 17.9h1.73L6.88 3.99H5.02L17.8 19.9Z' }
];
function renderSocials(content) {
  const links = document.createElement('div'); links.className = 'social-links';
  socialProfiles.forEach(profile => {
    let valid = false;
    try {
      const url = new URL(profile.url);
      valid = url.protocol === 'https:' && [profile.host, 'www.' + profile.host, ...(profile.host === 'x.com' ? ['twitter.com', 'www.twitter.com'] : [])].includes(url.hostname);
    } catch {}
    const link = document.createElement(valid ? 'a' : 'span');
    link.className = 'social-link';
    if (valid) {
      link.href = profile.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', profile.name + ' profile (opens in a new tab)');
    }
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('class', 'social-icon');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', profile.icon);
    icon.append(path);
    const label = document.createElement('span'); label.textContent = profile.name;
    const arrow = document.createElement('span'); arrow.className = 'social-arrow'; arrow.setAttribute('aria-hidden', 'true'); arrow.textContent = '↗';
    link.append(icon, label, arrow);
    links.append(link);
  });
  content.append(links);
}
const sectionList = $('#homepage-sections');
Object.entries(sections).forEach(([key, section], index) => {
  const content = document.createElement('section');
  content.id = key; content.className = 'homepage-section'; content.tabIndex = -1;
  content.setAttribute('aria-labelledby', key + '-heading');
  const kicker = document.createElement('div'); kicker.className = 'section-kicker'; kicker.textContent = `${String(index + 1).padStart(2, '0')} / ${key.toUpperCase()}`;
  const heading = document.createElement('h2'); heading.id = key + '-heading'; heading.textContent = section.heading;
  const text = document.createElement('p'); text.textContent = section.text;
  content.append(kicker, heading, text);
  if (section.tags) {
    const tags = document.createElement('div'); tags.className = 'toolbox-tags';
    section.tags.forEach(tag => { const badge = document.createElement('span'); badge.textContent = tag; tags.append(badge); });
    content.append(tags);
  }
  if (section.tools) {
    const label = document.createElement('h3'); label.textContent = 'Tools I know'; label.style.marginTop = '24px'; label.style.fontWeight = '600';
    const tools = document.createElement('div'); tools.className = 'toolbox-tags';
    section.tools.forEach(tool => { const badge = document.createElement('span'); badge.textContent = tool; tools.append(badge); });
    content.append(label, tools);
  }
  if (section.projects && section.projects.length === 0) {
    const note = document.createElement('p'); note.className = 'section-note'; note.textContent = 'New projects will land here soon. Stay curious ✦'; content.append(note);
  }
  if (section.socials) renderSocials(content);
  sectionList.append(content);
});
const scroller = $('.window-scroll');
function showSection(key, push = true) {
  const target = document.getElementById(key);
  if (!target || !sections[key]) return;
  target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  target.focus({ preventScroll: true });
  if (push && location.hash !== '#' + key) history.pushState(null, '', '#' + key);
}
for (const link of document.querySelectorAll('a[href^="#"]')) link.addEventListener('click', event => { event.preventDefault(); showSection(link.hash.slice(1)); });
window.addEventListener('popstate', () => { if(sections[location.hash.slice(1)]) showSection(location.hash.slice(1), false); else scroller.scrollTo({top:0,behavior:'smooth'}); });
history.scrollRestoration = 'manual';
if (location.hash) history.replaceState(null, '', location.pathname + location.search);
scroller.scrollTop = 0;
window.addEventListener('pageshow', () => { scroller.scrollTop = 0; });
function search(value) {
  const query = value.trim().toLowerCase();
  if (!query || query === 'b.tech full stack developer') return showSection('projects');
  const entry = Object.entries(sections).find(([key, section]) => `${key} ${section.heading} ${section.text} ${(section.tags || []).join(' ')} ${(section.tools || []).join(' ')}`.toLowerCase().includes(query));
  if (entry) showSection(entry[0]);
  else toast('No matches yet. Try skills, education, or contact.');
}
$('#search-btn').addEventListener('click', () => search($('#portfolio-search').value));
$('#portfolio-search').addEventListener('keydown', event => { if(event.key === 'Enter') search(event.target.value); });
$('[aria-label="Clear Search Input"]').addEventListener('click', () => { $('#portfolio-search').value = ''; $('#portfolio-search').focus(); });
const dockSearch = $('[placeholder="search for portfolio docs..."]');
dockSearch.addEventListener('keydown', event => { if(event.key === 'Enter') search(event.target.value); });
for(const label of ['Open Desktop Menu', 'Menu Options', 'New Tab']) $(`[aria-label="${label}"]`).addEventListener('click', () => showSection('about'));
let toastTimer;
function toast(message) { $('#toast').textContent = message; $('#toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').hidden = true, 3500); }
$('[aria-label="Bookmark"]').addEventListener('click', () => toast('Press Ctrl+D (or ⌘D) to bookmark this little universe ♡'));
$('[aria-label="Desktop Pet"]').addEventListener('click', () => toast('Your little chibi friend says hello! ♡'));
$('[aria-label="Go Back"]').addEventListener('click', () => history.back());
$('[aria-label="Go Forward"]').addEventListener('click', () => history.forward());
$('[aria-label="Refresh Page"]').addEventListener('click', () => location.reload());
const browserWindow = $('[data-purpose="central-browser-window"]');
$('[aria-label="Maximize Window"]').addEventListener('click', () => { const maximized = browserWindow.classList.toggle('maximized'); browserWindow.style.maxWidth = maximized ? '100%' : ''; toast(maximized ? 'Window maximized' : 'Window restored'); });
for(const label of ['Close Tab', 'Close Window', 'Minimize Window']) $(`[aria-label="${label}"]`).addEventListener('click', () => { scroller.scrollTo({top:0,behavior:'smooth'}); history.replaceState(null, '', location.pathname + location.search); });
