function navigateTo(page) {
    window.location.href = page;
}

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url-input');
    const submitUrlButton = document.getElementById('submit-url');
    const formatOptions = document.getElementById('format-options');
    const videoFormatButton = document.getElementById('video-format');
    const audioFormatButton = document.getElementById('audio-format');
    const availableFormats = document.getElementById('available-formats');
    const formatSelect = document.getElementById('format-select');
    const selectFormatButton = document.getElementById('select-format');
    const confirmation = document.getElementById('confirmation');
    const startDownloadButton = document.getElementById('start-download');
    const progressSection = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');

    let selectedUrl = '';
    let selectedFormat = '';

    submitUrlButton.addEventListener('click', () => {
        selectedUrl = urlInput.value;
        if (!selectedUrl) {
            alert('URL cannot be empty!');
            return;
        }
        formatOptions.style.display = 'block';
    });

    videoFormatButton.addEventListener('click', () => {
        displayAvailableFormats('video');
    });

    audioFormatButton.addEventListener('click', () => {
        displayAvailableFormats('audio');
    });

    selectFormatButton.addEventListener('click', () => {
        selectedFormat = formatSelect.value;
        if (!selectedFormat) {
            alert('No format selected!');
            return;
        }
        confirmation.style.display = 'block';
    });

    startDownloadButton.addEventListener('click', () => {
        startDownload(selectedUrl, selectedFormat);
    });

    function displayAvailableFormats(type) {
        formatOptions.style.display = 'none';
        availableFormats.style.display = 'block';

        // Simulate fetching formats
        const formats = type === 'video'
            ? [{ id: '22', name: '720p' }, { id: '137', name: '1080p' }, { id: '313', name: '4K' }]
            : [{ id: '140', name: '128kbps' }, { id: '256', name: '256kbps' }, { id: '320', name: '320kbps' }];

        formatSelect.innerHTML = '';
        formats.forEach(format => {
            const option = document.createElement('option');
            option.value = format.id;
            option.textContent = format.name;
            formatSelect.appendChild(option);
        });
    }

    function startDownload(url, formatId) {
        progressSection.style.display = 'block';
        progressText.textContent = 'Downloading...';

        fetch('http://47.6.206.226:5000/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, format_id: formatId })
        })
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                return response.json().then(error => Promise.reject(error));
            }
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'downloaded_file';
            document.body.appendChild(a);
            a.click();
            a.remove();
            progressText.textContent = 'Download completed!';
        })
        .catch(error => {
            alert('Download failed: ' + error.error);
            progressText.textContent = 'Download failed!';
        });
    }
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
