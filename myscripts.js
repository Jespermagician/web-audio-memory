const sounds = [
    ['audio1', 'audio\\Pink-Panther-Theme.mp3'], 
    ['audio2', 'audio\\martin-halts-maul.mp3'],
    ['audio3', 'audio\\Jugendwort-2022.mp3'],
    ['audio4', 'audio\\Ronaldo-Shoppe.mp3'],
    ['audio5', 'audio\\Sternenstaub-schmidt-rin.mp3']
    ];

// later let the audios create it self as well
sounds.forEach((sounds, index) => {
    const audioField = document.createElement('audio');
    audioField.id = sounds[0];
    audioField.src = sounds[1];
    document.getElementById('audiosDiv').appendChild(audioField);
})

sounds.forEach((sounds) => {
    const btn = document.createElement('button');
    btn.classList.add('btn');

    btn.innerText = sounds[0]; // hier allgemeiner text einfügen

    btn.addEventListener('click', ()=>{
        console.log(sounds[0])
        document.getElementById(sounds[0]).play();
    });

    document.getElementById('buttons').appendChild(btn);
} )



