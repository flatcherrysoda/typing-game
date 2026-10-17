
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

const sentance = () => {
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
const result = document.getElementById('words'); 

restart.addEventListener('click', () => {
      const sentace1 = sentance();
      const sentace2 = sentance();
      const sentace3 = sentance();
      const sentace4 = sentance();
      result.textContent = `${sentace1} ${sentace2} ${sentace3} ${sentace4}`
})

