const sounds = [
    ['audio1', 'audio\\hamburgLandL.mp3'], 
    ['audio2', 'audio\\Hobbit.mp3'],
    ['audio3', 'audio\\JugendwortWyyyyldddd.mp3'],
    ['audio4', 'audio\\memeFast.mp3'],
    ['audio5', 'audio\\wombats.mp3'],
    ['audio6', 'audio\\PinkPanther.mp3'], 
    ['audio7', 'audio\\RickNeverGonna.mp3'],
    ['audio8', 'audio\\schüddi.mp3'],
    ['audio9', 'audio\\pianooo.mp3'],
    ['audio10', 'audio\\Jugendwort.mp3'],
    ['audio11', 'audio\\Amogo.mp3'],
    ['audio12', 'audio\\Madddin.mp3'],
    ['audio13', 'audio\\Pioano2.mp3'],
    ['audio14', 'audio\\HobbitWar.mp3'],
];


const Language = {
    Buttons : "Guess",
    Found: "Found",
    TitleStart: "Let`s Play",
    TitleFalse: "Falsch!",
    TitleFound: "Richtig!",
    TitleSelected: "erstes",
    GuessedAll: "Alle erraten!"
}

const AudioIdName = 'Audio';
const AudioIdCloneName = 'c';

const pairsAmount = sounds.length;
var Found = 0;
var Pairs = [];
var selcted = false;
var SelectedElement;
var SelectedSongId;
var isSameButton = false;
const  HeaderInfo = document.getElementById("output");

var CurrentSongId = sounds[0][0];
var MusicPlay = false;
var Color_NotGuessed = "rgb(130, 37, 37)"
var Color_DefaultHeader = "rgb(108, 117, 126)" //"rgb(167, 180, 192)"
var Color_Correct = "rgb(55, 120, 55)"

console.log("start id:" + CurrentSongId)
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
// console.log(buttonArr)

// functions

function CreateAudio(id, path)
{
    const audioField = document.createElement('audio');
    audioField.id = id;
    // console.log(audioField.id)
    audioField.src = path;
    document.getElementById('audiosDiv').appendChild(audioField);
    return id;
}


function CreateButton(_audioId)
{
    // das hier zusammen fassen mit Methode, wie oben
    const btn = document.createElement('button');
    btn.classList.add('btn');

    btn.innerText = Language.Buttons;

    btn.addEventListener('click', (e)=>{
        stopSong();
        // Wenn selber Audio ist am laufen, spiele nicht erneut
        if(CurrentSongId != _audioId || !MusicPlay)
        {
            console.log("-------------");
            let id_against_double_click = CurrentSongId;
            console.log("first id: " +CurrentSongId);
            CurrentSongId = _audioId;
            console.log("Set id: " +_audioId);
            document.getElementById(CurrentSongId).play();
            MusicPlay = true;
            console.log(CurrentSongId + ", play");
            const el = e.currentTarget;
            if(!selcted)
            {
                console.log("select first")
                SelectedElement = el;
                SelectedSongId = CurrentSongId;
                HeaderInfo.style.color = Color_DefaultHeader
                HeaderInfo.innerHTML = Language.TitleSelected;

                el.style.backgroundColor  = 'rgb(109, 59, 59)';
                selcted = true;
            }
            else
            {
                if(isSameButton && CurrentSongId == SelectedSongId)
                {
                    console.log("Same button is pressed!");
                    return
                }
                console.log("compare: ")   
                for(let i = 0; i < Pairs.length; i++)
                {
                    // console.log(Pairs[i][0])
                    // console.log(Pairs[i][0] + " == " +  CurrentSongId)
                    // console.log(Pairs[i][1] + " == " +  SelectedSongId)
                    if(Pairs[i][0] == CurrentSongId || Pairs[i][1] == CurrentSongId)
                        if((Pairs[i][1] == SelectedSongId || Pairs[i][0] == SelectedSongId) && CurrentSongId != SelectedSongId )
                        {
                            console.log("current: " + CurrentSongId + " != selected: " + SelectedSongId)
                            PairFound(SelectedElement, el, i)
                            selcted = false;
                            return;
                        }
                }
                SelectedElement.style.backgroundColor = Color_NotGuessed;
                HeaderInfo.innerHTML = Language.TitleFalse;
                HeaderInfo.style.color = Color_NotGuessed;
                console.log("hier:")
                console.log(MusicPlay)
                console.log(CurrentSongId)
                console.log(_audioId)
                if(id_against_double_click != CurrentSongId)
                {
                    selcted = false;
                    CurrentSongId = null
                }
            }
        }
        else
        {
            console.log(CurrentSongId + ", is already on play");
            MusicPlay = false;
            isSameButton = true;
        }
        
    });

    buttonArr.push(btn)
}

function PairFound(firstElement, secondeElement, index)
{
    Found++;
    console.log("Found Pair")
    firstElement.style.backgroundColor = Color_Correct;
    secondeElement.style.backgroundColor = Color_Correct;

    HeaderInfo.innerHTML = Language.TitleFound
    HeaderInfo.style.color = Color_Correct
    firstElement.innerText = secondeElement.innerText = "Found"
    if(Found == Pairs.length)
    {
        HeaderInfo.innerHTML = Language.GuessedAll;
        HeaderInfo.style.color
    }
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
    // console.log(buttonArr)
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



