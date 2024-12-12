document.addEventListener('DOMContentLoaded', () => {
    const notepad = document.getElementById('notepad');
    const status = document.getElementById('status');
    const wordCount = document.getElementById('wordCount');
    const clearBtn = document.getElementById('clearBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearStorageBtn = document.getElementById('clearStorageBtn');
    const STORAGE_KEY = 'quicknote_content';

    // 加载保存的内容
    notepad.value = localStorage.getItem(STORAGE_KEY) || '';
    updateWordCount();

    // 自动保存功能
    let saveTimeout;
    notepad.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        status.textContent = '正在保存...';
        updateWordCount();
        
        saveTimeout = setTimeout(() => {
            try {
                localStorage.setItem(STORAGE_KEY, notepad.value);
                status.textContent = '已保存';
                
                setTimeout(() => {
                    status.textContent = '';
                }, 2000);
            } catch (e) {
                status.textContent = '保存失败！存储空间可能已满';
            }
        }, 1000);
    });

    // 字数统计
    function updateWordCount() {
        const count = notepad.value.trim().length;
        wordCount.textContent = `字数：${count}`;
    }

    // 清空按钮
    clearBtn.addEventListener('click', () => {
        if (confirm('确定要清空当前内容吗？')) {
            notepad.value = '';
            localStorage.setItem(STORAGE_KEY, '');
            updateWordCount();
            status.textContent = '已清空';
            setTimeout(() => {
                status.textContent = '';
            }, 2000);
        }
    });

    // 下载功能
    downloadBtn.addEventListener('click', () => {
        const content = notepad.value;
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quicknote_${new Date().toISOString().slice(0,10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // 清除所有数据
    clearStorageBtn.addEventListener('click', () => {
        if (confirm('确定要清除所有保存的数据吗？此操作不可恢复���')) {
            localStorage.clear();
            notepad.value = '';
            updateWordCount();
            status.textContent = '所有数据已清除';
            setTimeout(() => {
                status.textContent = '';
            }, 2000);
        }
    });
}); 