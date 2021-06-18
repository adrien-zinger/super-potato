import XLSX from 'xlsx'
import path from 'path';
import { fileURLToPath } from 'url';
import { getAlphabetSerie } from './alphabet.js';
import { table } from 'console';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 
 * @param {XLSX.WorkSheet} worksheet 
 * @param {*} letter_lim 
 * @param {*} num_lim 
 * @param {*} filter 
 * @returns 
 */
function graps(worksheet, letter_lim, num_lim, map) {
  const ret = []
  const serie = getAlphabetSerie()
  for (const letter of serie) {
    const col = []
    for (let num = 0; num <= num_lim; ++num) {
      col.push(map(worksheet[`${letter}${num}`]))
      if (num_lim === num)
        break
    }
    ret.push(col)
    if (letter_lim === letter)
      return ret
  }
}

function run() {
  const workbook = XLSX.readFile(`${__dirname}/input.xlsx`)
  for (const name of workbook.SheetNames) {
    console.log(`grapping ${name}`)
    var worksheet = workbook.Sheets[name];
    const table = graps(worksheet, 'V', 30, cell => {
      if (cell && cell.t === 's') {
        return cell.v
      }
      return ''
    })
    console.log(table)
    break
  }
  var desired_value = (desired_cell ? desired_cell.v : undefined);
  console.log(first_sheet_name, desired_value)
}

run()