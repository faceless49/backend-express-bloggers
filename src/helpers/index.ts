type RequestUrlQueryType = {
    Page?: string | number
    PageSize?: string | number
    SearchNameTerm?: string | null
}

export type RequestQueryType = {
    page: number
    pageSize: number
    searchNameTerm: string | null
}

export const getPaginationData = ({
                                      Page = 1,
                                      PageSize = 10,
                                      SearchNameTerm = null
                                  }: RequestUrlQueryType): RequestQueryType => {
    const page = +Page
    const pageSize = +PageSize
    const searchNameTerm = SearchNameTerm
    return {page, pageSize, searchNameTerm}
}