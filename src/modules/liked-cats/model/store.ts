import { makeAutoObservable, reaction } from "mobx";

import type { TCatId, TLikedCat } from "@/shared/types";

class LikedCatsStore {
  public data: TLikedCat[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    reaction(
      () => this.data,
      (likedData) => localStorage.setItem('likedCats', JSON.stringify(likedData))
    )
  }

  public getLikedCats() {
    this.data = JSON.parse(localStorage.getItem('likedCats') || "[]")
  }

  public toggleLike(id: TCatId, url = "https://cdn.thecatapi.com/images") {
    if (this.data.some(cat => cat.id === id)) {
      this.data = this.data.filter(cat => cat.id !== id)
      return
    }
    this.data = [...this.data, {id, url}]
  }

  public isLiked(id: TCatId) {
    return this.data.some(cat => cat.id === id)
  }
}

export const likedCatsStore = new LikedCatsStore()