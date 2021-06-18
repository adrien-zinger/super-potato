import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";
import { getAlphabetSerie } from "./alphabet.js";
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
function graps(worksheet, letter_start, letter_end, num_start, num_end, map) {
  const ret = [];
  const serie = getAlphabetSerie(letter_start);
  for (const letter of serie) {
    const col = [];
    for (let num = num_start; num <= num_end; ++num) {
      col.push(map(worksheet[`${letter}${num}`]));
      if (num_end === num) break;
    }
    ret.push(col);
    if (letter_end === letter) return ret;
  }
}

function prettyPrint(table, cb) {
  function replaceLineJump(str) {
    return str
      .split("")
      .map((c) => {
        if (c === "\n") return "\\n";
        if (c === "\r") return "";
        if (c === "\t") return "";
        return c;
      })
      .join("");
  }
  const width = table.length;
  let out = "|";
  const serie = getAlphabetSerie();
  for (let i = 0; i < width; ++i) out += ` ${serie.next().value} |`;
  out += "\n|";
  for (let i = 0; i < width; ++i) out += " ------ |";
  for (let x = 0; x < width; ++x) {
    out += "\n|";
    for (let y = 0; y < table.length; ++y)
      out += ` ${replaceLineJump(table[y][x])} |`;
  }
  cb((out += "\n"));
}

function run() {
  const workbook = XLSX.readFile(`${__dirname}/input.xlsx`);
  for (const name of workbook.SheetNames) {
    console.log(`## grapping ${name}\n`);
    var worksheet = workbook.Sheets[name];
    const table = graps(worksheet, "I", "V", 2, 30, (cell) => {
      return cell && cell.t === "s" ? cell.v : "";
    });
    prettyPrint(table, console.log);
    break;
  }
}

run();
