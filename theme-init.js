// Apply the saved preference before styles paint, including on slow connections.
(() => {
 let theme;
 try { theme = JSON.parse(localStorage.getItem('bayes-notes:v1') || '{}')?.theme; } catch {}
 if (!['light', 'dark'].includes(theme)) theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
 document.documentElement.dataset.theme = theme;
 document.documentElement.style.colorScheme = theme;
 document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#191b1e' : '#ffffff';
})();
