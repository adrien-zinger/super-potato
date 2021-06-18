const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']

function *gen() {
  let index = 0
  const alen = alphabet.length
  while(true) {
    if (index >= alen) {
      yield alphabet[Math.floor(index / alen)] + alphabet[index % alen]
    } else yield alphabet[index]
    index++
  }
}

function getAlphabetSerie() {
  return gen()
}

export {
  getAlphabetSerie,
  alphabet
}