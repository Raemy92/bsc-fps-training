export type QueryDto = {
  property: string
  operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'array-contains'
  value: any
}

export type QueryOptions = {
  customQuery?: QueryDto[]
  orderBy?: [string, 'asc' | 'desc'][]
  limit?: number
}
