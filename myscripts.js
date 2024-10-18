const sounds = ['audio1', 'audio2', 'audio3', 'audio4'];


// later let the audios create it self as well

sounds.forEach((sounds) => {
    const btn = document.createElement('button');
    btn.classList.add('btn');

    btn.innerText = sounds;

    document.getElementById('buttons').appendChild(btn);
} )



