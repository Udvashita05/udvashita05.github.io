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
// Set profile URLs here to make them available to every portfolio visitor.
const socialProfiles = [
  { name: 'LinkedIn', host: 'linkedin.com', url: '' },
  { name: 'GitHub', host: 'github.com', url: '' },
  { name: 'Twitter / X', host: 'x.com', url: '' }
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
    link.className = 'social-link'; link.textContent = profile.name + (valid ? ' ↗' : '');
    if (valid) {
      link.href = profile.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', profile.name + ' profile (opens in a new tab)');
    }
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
