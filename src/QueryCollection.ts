import { queryCollection } from './api/Discovery'
import { red, blue, yellow } from 'chalk'


export const getDocumentIDs = async (url: string, apikey: string, environmentid: string, collectionid: string) => {
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
  const matching_results: number = resquery.result.matching_results
  const count = matching_results / 10000 | 0 + (matching_results % 10000 === 0 ? 0 : 1)
  console.log('Remaining number of executions: ', count)

  //no document to delete
  if (matching_results === 0) {
    console.log(yellow('There is no document to delete.'))
    process.exit()
  }

  const results = resquery.result.results
  //Delete documents id
  let deleteIds: string[] = []
  for (const key of results) {
    deleteIds.push(key.id)
  }
  return { deleteIds: deleteIds, count: count, matching_results: matching_results }
}