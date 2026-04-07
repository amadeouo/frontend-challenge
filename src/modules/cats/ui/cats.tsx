import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite"

import { catsStore } from "@/modules/cats/model/store.ts";
import { CatCard } from "@/shared/components/cat-card";
import classes from './cats.module.css'

function Cats() {
  const { hasMore, isLoading } = catsStore
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (catsStore.data.length) return
    catsStore.getCats()
  }, [])

  useEffect(() => {
    if (!hasMore || isLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          catsStore.loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading])


  return (
    <main className={classes.wrapper}>
      <div className={classes.list}>
        {catsStore.data.map((cat) => (
          <CatCard
            key={cat.id}
            id={cat.id}
            url={cat.url}
          />
        ))}
        <div ref={observerRef} />
      </div>
      {isLoading && (
        <span className={classes.loader}>... загружаем еще котиков ...</span>
      )}
    </main>
  )
}

export default observer(Cats);