document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // 初始化主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
    } else if (prefersDarkScheme.matches) {
        document.body.dataset.theme = 'dark';
    }

    // 主题切换
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
    });

    // 监听系统主题变化
    prefersDarkScheme.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            document.body.dataset.theme = e.matches ? 'dark' : 'light';
        }
    });
}); 