// I kept going back and changing things so my javascript it pretty messy :[ 
// sorry about that.
const vocab = {
adjectives : ["pink", "tall", "old", "short", "round", "happy", "flat", "bright", "colorful", "salty", "loyal", "calm", "young" , "rotten", "nervous" , "long"],
verbs : ["jumped", "yelled", "spoke", "kicked", "cried", "sang", "ran", "ate", "learned", "failed", "played", "streched", "typed", "slept", "played", "feed", "stole"],
nouns : ["chef", "bug", "dog", "bunny", "book", "car", "apple", "cherry", "flower", "house", "oven", "teacher", "baker", "xylophone", "doctor", "bird", "duck"],
adverbs : ["quickly", "loudly", "spookily", "calmly", "gently", "softly", "rudely", "sadly", "neatly", "foolishly", "zonally", "eerily", "tentatively"],
determiners : ["A", "Some", "That", "The", "Every", "This", "Her", "His", "Thier"]
}

const getword = (wordArray) => {
    return wordArray[Math.floor(Math.random()* wordArray.length)]
}

const sentence = () => {
    const det = getword(vocab.determiners);
    const adj = getword(vocab.adjectives);
    const noun = getword(vocab.nouns);
    const verb = getword(vocab.verbs)
    const adverb = getword(vocab.adverbs);
    const object = getword(['to a','the','another']);
    const noun2 = getword(vocab.nouns);

    return `${det} ${adj} ${noun} ${adverb} ${verb} ${object} ${noun2}.`
}

const restart = document.getElementById('restart');
const words = document.getElementById('words'); 

function sentencegen() {
      const sentences =[]
      for (let i = 0; i < 5; i++){
        sentences.push(sentence())
      }

      return sentences.join (" ");
}

function randompara () {
    const paragraph = sentencegen();
    words.textContent = "";
    const spansentences = paragraph.split("").map(char => `<span>${char}</span>`)
    .join("");
    words.innerHTML = spansentences;
    words.querySelectorAll("span")[0].classList.add("active");
}


const inputarea = document.getElementById('player')

document.addEventListener("keydown" , () =>inputarea.focus());
words.addEventListener("click" , () => inputarea.focus());
Errors = document.querySelector("#errors span");
Timer = document.querySelector("#time span");
Wpmtag = document.querySelector("#wpm span");
timeup = document.getElementById("timeup")

let charindex = mistakes = started = 0;

let time,
maxtime = 60,
timeleft = maxtime;

function Timerfunct() {
    if(timeleft > 0) {
        timeleft--;
        Timer.innerText = timeleft;
    }
    else{
        clearInterval(time)
    }
}

function typing() {
    const characters = words.querySelectorAll("span");
        if (characters.length === 0) {
        alert("Please click restart");
        inputarea.value = "";
        return;
    }
    let inputchar = inputarea.value.split("")[charindex];
    if (charindex < characters.length - 1 && timeleft > 0){
    if(!started){
        time = setInterval(Timerfunct, 1000); 
        started = true
    }
    if (inputchar == null){
        charindex--;

        if ( characters[charindex].classList.contains("wrong")){
            mistakes--;
        }
        characters[charindex].classList.remove("correct", "wrong");
    }
    else{
    if (characters[charindex].innerText === inputchar){
        characters[charindex].classList.add("correct")
    }
    else{
        mistakes++;
        characters[charindex].classList.add("wrong")
    }
    charindex++;
}
    characters.forEach(span => span.classList.remove("active"))
    characters[charindex].classList.add("active")
    Errors.innerText = mistakes
    let wpm = Math.round((((charindex - mistakes) / 5)/ (maxtime - timeleft)) * 60);
    wpm = wpm < 0 || !wpm || wpm===Infinity ? 0: wpm 
    Wpmtag.innerHTML = wpm;
}else{
    inputarea.value = "";
    clearInterval(time);
    timeup.style.opacity = "1";
} 
}

 inputarea.addEventListener("input", typing) 


 let clickcount = 0;

function restartgame (){
 randompara();
 timeup.style.opacity = "0";
  inputarea.value = "";
    clearInterval(time);
 timeleft = maxtime;
 charindex = mistakes = started = 0;
 Timer.innerText = timeleft;
 Errors.innerText = mistakes;
 Wpmtag.innerHTML = 0;
}

restart.addEventListener('click', function () {
    clickcount++;

    if(clickcount=== 1){
        randompara();
        restart.innerText ="Restart";
    }else{
        restartgame()
    }
});



