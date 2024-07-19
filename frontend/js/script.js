document.addEventListener('DOMContentLoaded', () => {
    // Basic user authentication
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            // Mock login: store username in localStorage
            localStorage.setItem('username', username);
            alert('Login successful!');
            window.location.href = 'home.html';
        });
    }

    // Video upload handling
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const videoFile = document.getElementById('video').files[0];
            if (videoFile) {
                const videoURL = URL.createObjectURL(videoFile);
                const videos = JSON.parse(localStorage.getItem('videos') || '[]');
                videos.push({ title, videoURL });
                localStorage.setItem('videos', JSON.stringify(videos));
                alert('Video uploaded successfully!');
                window.location.href = 'home.html';
            }
        });
    }

    // Display video list on the home page
    const videoList = document.getElementById('video-list');
    if (videoList) {
        const videos = JSON.parse(localStorage.getItem('videos') || '[]');
        videos.forEach((video, index) => {
            const videoElement = document.createElement('video');
            videoElement.src = video.videoURL;
            videoElement.controls = true;
            videoElement.dataset.index = index;
            videoElement.addEventListener('click', () => {
                localStorage.setItem('currentVideo', JSON.stringify(video));
                window.location.href = 'player.html';
            });
            videoList.appendChild(videoElement);
        });
    }

    // Video player
    const videoPlayer = document.getElementById('video-player');
    if (videoPlayer) {
        const currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
        if (currentVideo) {
            videoPlayer.src = currentVideo.videoURL;
            videoPlayer.play();
        }
    }

    // Search functionality
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const videos = JSON.parse(localStorage.getItem('videos') || '[]');
            const filteredVideos = videos.filter(video =>
                video.title.toLowerCase().includes(searchTerm)
            );
            videoList.innerHTML = '';
            filteredVideos.forEach((video, index) => {
                const videoElement = document.createElement('video');
                videoElement.src = video.videoURL;
                videoElement.controls = true;
                videoElement.dataset.index = index;
                videoElement.addEventListener('click', () => {
                    localStorage.setItem('currentVideo', JSON.stringify(video));
                    window.location.href = 'player.html';
                });
                videoList.appendChild(videoElement);
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Basic user authentication
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('http://localhost:5500/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.status === 200) {
                alert(data.message);
                localStorage.setItem('username', username);
                window.location.href = 'index.html';
            } else {
                alert(data.message);
            }
        });
    }

    // Video upload handling
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const videoFile = document.getElementById('video').files[0];
            const formData = new FormData();
            formData.append('title', title);
            formData.append('video', videoFile);

            const response = await fetch('http://localhost:5500/videos/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (response.status === 201) {
                alert(data.message);
                window.location.href = 'index.html';
            } else {
                alert('Video upload failed');
            }
        });
    }

    // Display video list on the home page
    const videoList = document.getElementById('video-list');
    if (videoList) {
        fetch('http://localhost:5500/videos')
            .then(response => response.json())
            .then(videos => {
                videos.forEach(video => {
                    const videoElement = document.createElement('video');
                    videoElement.src = video.url;
                    videoElement.controls = true;
                    videoElement.addEventListener('click', () => {
                        localStorage.setItem('currentVideo', JSON.stringify(video));
                        window.location.href = 'player.html';
                    });
                    videoList.appendChild(videoElement);
                });
            });
    }

    // Video player
    const videoPlayer = document.getElementById('video-player');
    if (videoPlayer) {
        const currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
        if (currentVideo) {
            videoPlayer.src = currentVideo.url;
            videoPlayer.play();
        }
    }

    // Search functionality
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            fetch('http://localhost:5500/videos')
                .then(response => response.json())
                .then(videos => {
                    const filteredVideos = videos.filter(video =>
                        video.title.toLowerCase().includes(searchTerm)
                    );
                    videoList.innerHTML = '';
                    filteredVideos.forEach(video => {
                        const videoElement = document.createElement('video');
                        videoElement.src = video.url;
                        videoElement.controls = true;
                        videoElement.addEventListener('click', () => {
                            localStorage.setItem('currentVideo', JSON.stringify(video));
                            window.location.href = 'player.html';
                        });
                        videoList.appendChild(videoElement);
                    });
                });
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const videoList = document.getElementById('video-list');
    if (videoList) {
        fetch('http://localhost:3000/videos')
            .then(response => response.json())
            .then(videos => {
                videos.forEach(video => {
                    const videoElement = document.createElement('video');
                    videoElement.src = video.url;
                    videoElement.controls = true;
                    videoElement.dataset.index = video.index;
                    videoElement.addEventListener('click', () => {
                        localStorage.setItem('currentVideo', JSON.stringify(video));
                        window.location.href = 'player.html';
                    });
                    videoList.appendChild(videoElement);
                });
            })
            .catch(error => console.error('Error fetching videos:', error));
    }

    const videoPlayer = document.getElementById('video-player');
    if (videoPlayer) {
        const currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
        if (currentVideo) {
            videoPlayer.src = currentVideo.url;
            videoPlayer.play();
        }
    }

    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            fetch('http://localhost:3000/videos')
                .then(response => response.json())
                .then(videos => {
                    const filteredVideos = videos.filter(video =>
                        video.title.toLowerCase().includes(searchTerm)
                    );
                    videoList.innerHTML = '';
                    filteredVideos.forEach(video => {
                        const videoElement = document.createElement('video');
                        videoElement.src = video.url;
                        videoElement.controls = true;
                        videoElement.dataset.index = video.index;
                        videoElement.addEventListener('click', () => {
                            localStorage.setItem('currentVideo', JSON.stringify(video));
                            window.location.href = 'player.html';
                        });
                        videoList.appendChild(videoElement);
                    });
                })
                .catch(error => console.error('Error fetching videos:', error));
        });
    }
});
