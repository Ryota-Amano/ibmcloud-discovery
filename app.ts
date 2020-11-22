import Readline from 'readline'
import { queryCollection, deleteDocuments } from './src/discovery'
import { red, blue, green, yellow } from 'chalk'
import fs from 'fs'

const readUserInput = (question: string): Promise<string> => {
  const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer)
      rl.close()
    })
  })
}
const AllDeleteDocument = () => {

}

(async function main() {
  //UserInput
  console.log(yellow('IBM Discovery ---Delete AllDocument'))
  console.log('Please enter the parameters...')
  const url = await readUserInput('url? ');
  const apikey = await readUserInput('apikey? ');
  const environmentid = await readUserInput('environmentId? ');
  const collectionid = await readUserInput('collectionId? ');

  //UserInput Check
  if (!(url && apikey && environmentid && collectionid)) {
    console.log(red('Missing required parameters'))
    process.exit()
  }

  //Discovery query
  const resquery = await queryCollection(url, apikey, environmentid, collectionid)

  //Discovery query error Check
  if (resquery.status !== 200) {
    //Error
    console.log('Query a collection', red(`ERROR: ${resquery.status}: ${resquery.statusText}`))
    console.log(`message: ${resquery.message}`)
    process.exit()
  }

  console.log('Query a collection ', blue('OK'))
  const matching_results = resquery.result.matching_results
  //const count = matching_results / 10000 | 0 + (matching_results % 10000 === 0 ? 0 : 1)
  //console.log('実行回数:', count)
  console.log(`matching_results: ${matching_results}`)

  //no document to delete
  if (matching_results === 0) {
    console.log(yellow('There is no document to delete.'))
    process.exit()
  }

  const results = resquery.result.results
  //Delete documents id
  let deleteId = []
  for (const key of results) {
    deleteId.push(key.id)
  }

  //Delete documents
  const resdelete = await deleteDocuments(url, apikey, environmentid, collectionid, deleteId)

  let ok_count = 0
  let errdocumentId: string[] = []
  for (const key of resdelete) {
    if (key.status === 200) {
      ok_count++
    } else {
      errdocumentId.push(key.result.document_id)
    }
  }
  //Delete documents Error check
  if (errdocumentId.length !== 0) {
    //Error
    fs.writeFileSync('./err.txt', 'Error documentIds\n')
    errdocumentId.map(id => {
      fs.appendFileSync('./err.txt', id)
    })
    console.log(red('Result: '), `delete: ${ok_count},`, yellow(`error: ${errdocumentId.length}`))
  } else {
    if (fs.existsSync('./err.txt')) {
      fs.unlinkSync('./err.txt')
    }
    console.log(green('Result: '), `delete: ${ok_count},`, `error: ${errdocumentId.length}`)
  }
})();





