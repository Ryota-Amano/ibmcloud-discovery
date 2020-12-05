import fs from 'fs'
import { red, green, yellow } from 'chalk'
import { deleteDiscoveryDocuments } from './api/Discovery'

export const deleteDocuments = async (url: string, apikey: string, environmentid: string, collectionid: string, deleteIds: string[]) => {
  //Delete documents
  const resdelete = await deleteDiscoveryDocuments(url, apikey, environmentid, collectionid, deleteIds)

  let ok_count: number = 0
  const errdocumentId: string[] = []
  for (const key of resdelete) {
    if (key.status === 200) {
      ok_count++
    } else {
      errdocumentId.push(key.result.document_id)
    }
  }
  const errFilePath = '../err.txt'
  //Delete documents Error check
  if (errdocumentId.length !== 0) {
    //Error
    fs.writeFileSync(errFilePath, 'Error documentIds\n')
    errdocumentId.map(id => {
      fs.appendFileSync(errFilePath + '\n', id)
    })
    console.log(red('Result: '), `delete: ${ok_count},`, yellow(`error: ${errdocumentId.length}`))
  } else {
    if (fs.existsSync(errFilePath)) {
      fs.unlinkSync(errFilePath)
    }
    console.log(green('Result: '), `delete: ${ok_count},`, `error: ${errdocumentId.length}`)
  }
  return ok_count
}