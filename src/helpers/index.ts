type RequestUrlQueryType = {
  page?: string | number
  pageSize?: string | number
  searchNameTerm?: string | null
}

export type RequestQueryType = {
  page: number
  pageSize: number
  searchNameTerm: string | null
}

export const getPaginationData = ({
  page = 1,
  pageSize = 100,
  searchNameTerm = null
}: RequestUrlQueryType):RequestQueryType => {
  page = +page
  pageSize = +pageSize
  return {page, pageSize, searchNameTerm}
}