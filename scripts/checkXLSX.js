import { xlsxParser, xlsxMdPrint } from "../src/parse-xlsx/index.js"
import config from './config.js'
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

xlsxParser(`${__dirname}/input.xlsx`, config).then(res => {
  console.log('# Parsing')
  for (const r of res) {
    console.log(`## Parsing sheet ${r.sheetpage}`)
    xlsxMdPrint(r.data, console.log)
  }
})
