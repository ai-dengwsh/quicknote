document.addEventListener('DOMContentLoaded', () => {
    const notepad = document.getElementById('notepad');
    const status = document.getElementById('status');
    const STORAGE_KEY = 'quicknote_content';

    // Load saved content
    notepad.value = localStorage.getItem(STORAGE_KEY) || '';

    // Auto-save functionality
    let saveTimeout;
    notepad.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        status.textContent = '正在保存...';
        
        saveTimeout = setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, notepad.value);
            status.textContent = '已保存';
            
            setTimeout(() => {
                status.textContent = '';
            }, 2000);
        }, 1000);
    });
});
