const sounds = [
    ['audio1', 'audio\\Pink-Panther-Theme.mp3'], 
    ['audio2', 'audio\\martin-halts-maul.mp3'],
    ['audio3', 'audio\\Jugendwort-2022.mp3'],
    ['audio4', 'audio\\Ronaldo-Shoppe.mp3'],
    ['audio5', 'audio\\Sternenstaub-schmidt-rin.mp3']
];


const ButtonTitleName = "Guess";

const AudioIdName = 'Audio';
const AudioIdCloneName = 'c';

const pairsAmount = sounds.length;
var Found = 0;
var Pairs = [];
var selcted = false;

var CurrentSongId = sounds[0][0];
var MusicPlay = false;
console.log(CurrentSongId)

// later let the audios create it self as well
sounds.forEach((sounds, index) => {
    Pairs.push(
    [
        CreateAudio(AudioIdName + index, sounds[1]),
        CreateAudio(AudioIdName + index + AudioIdCloneName, sounds[1])
    ]);
})

var buttonArr = []
sounds.forEach((sounds, index) => {
    
    CreateButton(AudioIdName + index)
    CreateButton(AudioIdName + index + AudioIdCloneName)
} )

buttonArr = shuffleArray(buttonArr)
console.log(buttonArr)

// functions

function CreateAudio(id, path)
{
    const audioField = document.createElement('audio');
    audioField.id = id;
    console.log(audioField.id)
    audioField.src = path;
    document.getElementById('audiosDiv').appendChild(audioField);
    return id;
}


function CreateButton(_audioId)
{
    // das hier zusammen fassen mit Methode, wie oben
    const btn = document.createElement('button');
    btn.classList.add('btn');

    btn.innerText = ButtonTitleName;

    btn.addEventListener('click', (e)=>{
        stopSong();
        // Wenn selber Audio ist am laufen, spiele nicht erneut
        if(CurrentSongId != _audioId || !MusicPlay)
        {
            CurrentSongId = _audioId;
            document.getElementById(CurrentSongId).play();
            MusicPlay = true;
            console.log(CurrentSongId + ", play");
            if(!selcted)
            {
                const el = e.currentTarget;
                el.style.backgroundColor  = 'rgb(109, 59, 59)';
            }
        }
        else
        {
            console.log(CurrentSongId + ", is already on play");
            MusicPlay = false;
        }
        
    });

    buttonArr.push(btn)
}



function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

buttonArr.forEach((buttonArr) => {
    console.log(buttonArr)
    document.getElementById('buttons').appendChild(buttonArr);
});


function stopSong()
{
    if (CurrentSongId != null && MusicPlay)
    {
        let songs = document.getElementById(CurrentSongId);
        songs.pause();
        console.log(CurrentSongId);
        songs.currentTime = 0;  
    }
}



