import DiscoveryV1 from 'ibm-watson/discovery/v1'
import { IamAuthenticator } from 'ibm-watson/auth'

export const queryCollection = async (url: string, apikey: string, environment: string, collection: string) => {
  const discovery = new DiscoveryV1({
    version: '2019-04-30',
    authenticator: new IamAuthenticator({
      apikey: apikey,
    }),
    serviceUrl: url,
  });
  const queryParams = {
    environmentId: environment,
    collectionId: collection,
    _return: 'id',
    count: 10000,
  };
  return discovery.query(queryParams).then(res => res).catch(err => err)
}

export const deleteDiscoveryDocuments = async (url: string, apikey: string, environment: string, collection: string, ids: string[]) => {
  const discovery = new DiscoveryV1({
    version: '2019-04-30',
    authenticator: new IamAuthenticator({
      apikey: apikey,
    }),
    serviceUrl: url,
  });
  let promises = []
  for (const id of ids) {
    const deleteDocumentParams = {
      environmentId: environment,
      collectionId: collection,
      documentId: id,
    };
    promises.push(discovery.deleteDocument(deleteDocumentParams))
  }
  return Promise.all(promises).then(res => res).catch(err => err)
}