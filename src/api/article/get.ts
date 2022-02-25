import makeRequest from '../makeRequest'
import { AuthorizedRequestParams, Article } from 'src/types'

interface Params {
  id: number | string
  authData?: AuthorizedRequestParams
}

export default async ({ id, authData }: Params) =>
  await makeRequest<Article>({
    path: `articles/${id}`,
    version: 2,
    authData,
  })
