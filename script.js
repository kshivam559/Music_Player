document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const volumeSlider = document.getElementById('volume-slider');
    const playlist = document.getElementById('playlist');

    const songs = [
        { title: 'Host', url: 'music/song1.mp3' },
        { title: 'Leeona-Do I', url: 'music/song2.mp3' },
        { title: 'Sake Bomb', url: 'music/song3.mp3' },
        { title: 'Alone', url: 'music/song4.mp3' },
        { title: 'No Rest Or Endless Rest', url: 'music/song5.mp3' },
        { title: 'Molotov Heart', url: 'music/song6.mp3' },
    ];

    let currentSongIndex = 0;

    // Initialize playlist
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(songs[currentSongIndex]);
            playSong();
        });
        playlist.appendChild(li);
    });

    const loadSong = (song) => {
        audioPlayer.src = song.url;
        updatePlaylistHighlight();
    };

    const playSong = () => {
        audioPlayer.play();
        playPauseButton.textContent = 'Pause';
    };

    const pauseSong = () => {
        audioPlayer.pause();
        playPauseButton.textContent = 'Play';
    };

    playPauseButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            playSong();
        } else {
            pauseSong();
        }
    });

    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    });

    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    });

    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
    });

    const updatePlaylistHighlight = () => {
        const items = playlist.getElementsByTagName('li');
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
        }
        items[currentSongIndex].classList.add('active');
    };

    // Load the first song on startup
    loadSong(songs[currentSongIndex]);
});
