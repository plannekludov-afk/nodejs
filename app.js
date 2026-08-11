document.getElementById('downloadBtn').addEventListener('click', async () => {
    const urlInput = document.getElementById('videoUrl');
    const status = document.getElementById('status');
    const btn = document.getElementById('downloadBtn');
    
    const url = urlInput.value.trim();
    
    if (!url) {
        status.textContent = '⚠ Вставьте ссылку';
        status.style.color = 'red';
        return;
    }

    // Визуальная загрузка
    btn.disabled = true;
    btn.textContent = 'CONNECTING...';
    status.innerHTML = '<div class="loading"></div>';

    try {
        // Создаем скрытую ссылку для скачивания
        // Мы используем /api/download, который стримит файл
        const downloadUrl = `/api/download?url=${encodeURIComponent(url)}`;
        
        // Трюк для запуска скачивания на мобильных устройствах
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'ASTRAL_VIDEO.mp4'; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        status.textContent = '✔ ПОРТАЛ ОТКРЫТ';
        status.style.color = '#00ffcc';
    } catch (err) {
        status.textContent = '✖ ОШИБКА СВЯЗИ';
        status.style.color = 'red';
    } finally {
        btn.disabled = false;
        btn.textContent = 'СКАЧАТЬ';
    }
});