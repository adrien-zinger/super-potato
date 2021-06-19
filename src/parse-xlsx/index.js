import XLSX from "xlsx"
import { getAlphabetSerie } from "./alphabet.js"

import default_config from "./config.js"

/**
 *
 * @param {XLSX.WorkSheet} worksheet
 * @param {*} letter_lim
 * @param {*} num_lim
 * @param {*} filter
 * @returns
 */
function graps(worksheet, [letter_start, letter_end, num_start, num_end], map) {
  const ret = []
  const serie = getAlphabetSerie(letter_start)
  for (const letter of serie) {
    const col = []
    for (let num = num_start; num <= num_end; ++num) {
      col.push(map(worksheet[`${letter}${num}`], `${letter}${num}`))
      if (num_end === num) break
    }
    ret.push(col)
    if (letter_end === letter) return ret
  }
}

function xlsxMdPrint(table, cb) {
  function replaceLineJump(str) {
    return str
      .split("")
      .map((c) => {
        if (c === "\n") return "\\n"
        if (c === "\r") return ""
        if (c === "\t") return ""
        return c
      })
      .join("")
  }
  const height = table[0].length
  const width = table.length
  let out = "|"
  const serie = getAlphabetSerie()
  for (let i = 0; i < width; ++i) out += ` ${serie.next().value} |`
  out += "\n|"
  for (let i = 0; i < width; ++i) out += " ------ |"
  for (let x = 0; x < height; ++x) {
    out += "\n|"
    for (let y = 0; y < width; ++y) out += ` ${replaceLineJump(table[y][x])} |`
  }
  cb((out += "\n"))
}

function removeEmpties(table) {
  const height = table[0].length
  const width = table.length
  const lines_to_remove = []
  const column_to_remove = []
  for (let x = 0; x < height; ++x) {
    let rm = true
    for (let y = 0; y < width; ++y) {
      if (table[y][x] != "") {
        rm = false
        break
      }
    }
    if (rm) lines_to_remove.push(x)
  }
  for (let y = 0; y < width; ++y) {
    let rm = true
    for (let x = 0; x < height; ++x) {
      if (table[y][x] != "") {
        rm = false
        continue
      }
    }
    if (rm) column_to_remove.push(y)
  }
  for (const c of column_to_remove) table.splice(c, 1)
  for (const l of lines_to_remove) for (let c of table) c.splice(l, 1)
  return table
}

/**
 * 
 * @param {*} config 
 * @returns {Promise}
 */
function xlsxParser(path, config = undefined) {
  if (config === undefined) config = default_config
  return new Promise((res) => {
    let ret = []
    const workbook = XLSX.readFile(path)
    const { sheetignore, limits } = config
    for (const name of workbook.SheetNames) {
      if (sheetignore.length > 0 && sheetignore.indexOf(name) >= 0) continue
      var worksheet = workbook.Sheets[name]
      const lims = limits[name] !== undefined ? limits[name] : limits["default"]
      const table = graps(worksheet, lims, (cell) => {
        return cell === undefined ? "" : cell.v
      })
      ret.push({
        sheetpage: name,
        data: removeEmpties(table),
      })
    }
    res(ret)
  })
}

export {
  xlsxParser,
  xlsxMdPrint,
}
