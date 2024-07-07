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
    const outputDestination = document.getElementById('output-destination');
    const outputFilename = document.getElementById('output-filename');
    const startDownloadButton = document.getElementById('start-download');
    const progressSection = document.getElementById('progress');
    const progressBar = document.getElementById('progress-bar');
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
        const destination = outputDestination.value;
        const filename = outputFilename.value;
        if (!destination || !filename) {
            alert('Output destination and file name cannot be empty!');
            return;
        }
        startDownload(selectedUrl, selectedFormat, destination, filename);
    });

    function displayAvailableFormats(type) {
        formatOptions.style.display = 'none';
        availableFormats.style.display = 'block';

        // Simulate fetching formats
        const formats = type === 'video'
            ? ['720p', '1080p', '4K']
            : ['128kbps', '256kbps', '320kbps'];

        formatSelect.innerHTML = '';
        formats.forEach(format => {
            const option = document.createElement('option');
            option.value = format;
            option.textContent = format;
            formatSelect.appendChild(option);
        });
    }

    function startDownload(url, format, destination, filename) {
        progressSection.style.display = 'block';
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.value = progress;
            progressText.textContent = `Downloading... ${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                progressText.textContent = `Download completed: ${filename}`;
            }
        }, 1000);
    }
});
