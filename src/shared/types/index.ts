export interface TCat {
  id: string,
  url: string,
  width: number,
  height: number,
  breeds: Record<string, unknown>[]
}

export type TCatId = TCat["id"]

export type TLikedCat = Pick<TCat, "id" | "url">