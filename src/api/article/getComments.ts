import makeRequest from 'src/api/makeRequest'
import { AuthorizedRequestParams } from 'src/types'
import { APIResponseComments } from 'src/types/Comments'

export default async (
  id: string | number,
  authData?: AuthorizedRequestParams
) =>
  await makeRequest<APIResponseComments>({
    path: `articles/${id}/comments`,
    version: 2,
    authData,
  })
