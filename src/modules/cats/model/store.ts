import { makeAutoObservable, runInAction} from "mobx";

import { apiClient } from "@/shared/api";
import type { TCat } from "@/shared/types";

class Store {
  public data: TCat[] = []
  public isLoading = false
  public error: string | null = null
  public page = 0
  public hasMore = true
  private readonly limit = 24

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public async getCats() {
    try {
      this.isLoading = true
      this.page = 0
      const response = await apiClient.get<TCat[]>('/images/search', {
        params: { limit: this.limit, page: 0 }
      })
      // Это делаю исключительно из-за того, что api возвращает одинаковые айдишники
      const uniqueCats = response.data.filter(
        (cat, index, self) => index === self.findIndex((c) => c.id === cat.id)
      )

      runInAction(() => {
        this.data = uniqueCats
        this.hasMore = uniqueCats.length === this.limit
      })
    } catch (e: unknown) {
      runInAction(() => {
        if (e instanceof Error) this.error = e.message
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  public async loadMore() {
    if (this.isLoading || !this.hasMore) return

    try {
      this.isLoading = true
      const nextPage = this.page + 1
      const response = await apiClient.get<TCat[]>('/images/search', {
        params: { limit: this.limit, page: nextPage }
      })

      // Это делаю исключительно из-за того, что api возвращает одинаковые айдишники
      const existingIds = new Set(this.data.map(cat => cat.id))
      const newCats = response.data.filter(cat => !existingIds.has(cat.id))

      runInAction(() => {
        this.data = [
          ...this.data,
          ...newCats,
        ]
        this.page = nextPage
        this.hasMore = newCats.length === this.limit
      })
    } catch (e: unknown) {
      runInAction(() => {
        if (e instanceof Error) this.error = e.message
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }
}

export const catsStore = new Store()