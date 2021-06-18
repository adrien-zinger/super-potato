const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "X",
  "Y",
  "Z",
];

function* gen(start) {
  let index = alphabet.indexOf(start);
  const alen = alphabet.length;
  while (true) {
    if (index >= alen) {
      yield alphabet[Math.floor(index / alen) - 1] + alphabet[index % alen];
    } else yield alphabet[index];
    index++;
  }
}

function getAlphabetSerie(start = "A") {
  return gen(start);
}

export { getAlphabetSerie, alphabet };
