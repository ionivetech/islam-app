interface IHadithItems {
  arab: string
  id: string
  number: number
}

interface IHadithPagination {
  currentPage: number
  endIndex: number
  endPage: number
  pageSize: number
  pages: number[]
  startIndex: number
  startPage: number
  totalItems: number
  totalPages: number
}

export interface IHadithHistory {
  name: string
  slug: string
}

export interface IHadithList {
  name: string
  items: IHadithItems[]
  pagination: IHadithPagination
}
