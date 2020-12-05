import fs from 'fs'
import { blue, bold, red, yellow } from 'chalk'
import { readUserInput } from './src/UserInput'
import { getDocumentIDs } from './src/QueryCollection'
import { deleteDocuments } from './src/DeleteDocuments'

//IIFE 即時関数
(async function main() {

  //Start message & UserInput
  console.log(yellow('IBM Discovery ---Delete AllDocument'))
  console.log('Please enter the Discovery parameters...')
  const url: string = await readUserInput('url? ')
  const apikey: string = await readUserInput('apikey? ')
  const environmentid: string = await readUserInput('environmentId? ')
  const collectionid: string = await readUserInput('collectionId? ')
  //UserInput Check
  if (!(url && apikey && environmentid && collectionid)) {
    console.log(red('Missing required parameters'))
    process.exit()
  }
  //Confirmation of deletion.
  console.log(yellow.bold('All documents in the collection will be deleted. Also, once deleted, it cannot be undone. Do you really want to delete this?'))
  const confirm: string = await readUserInput(' y / n ? ')

  //All Document Delete
  if (confirm === 'y') {
    let countFlag: boolean = true
    let deletecount = 0
    let alldocumentcount: number[] = []
    while (countFlag) {
      const { deleteIds, count, matching_results } = await getDocumentIDs(url, apikey, environmentid, collectionid)
      alldocumentcount.push(matching_results)
      deletecount += await deleteDocuments(url, apikey, environmentid, collectionid, deleteIds)
      if (count <= 1) countFlag = false
    }

    //End message
    if (fs.existsSync('./err.txt')) {
      console.log(yellow.bold('All Document Not Completed!!! Please check the error.txt'))
      console.log(`deleted: ${deletecount} / ${Math.max.apply(null, alldocumentcount)}`)
    } else {
      console.log(blue.bold('All Document Completed.') + `    deleted: ${deletecount} / ` + bold(`${Math.max.apply(null, alldocumentcount)}`))
    }
  } else {
    console.log('...Canceled')
  }

})()
