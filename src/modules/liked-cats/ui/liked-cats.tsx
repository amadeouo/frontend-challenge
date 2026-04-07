import { useEffect } from "react";
import { observer } from "mobx-react-lite"

import classes from "@/modules/cats/ui/cats.module.css";
import { likedCatsStore } from "@/modules/liked-cats/model/store";
import { CatCard } from "@/shared/components/cat-card";
import type { TLikedCat } from "@/shared/types";

function LikedCats() {
  useEffect(() => {
    likedCatsStore.getLikedCats()
  }, [])

  return (
    <main className={classes.wrapper}>
      <div className={classes.list}>
        {likedCatsStore.data.map((cat: TLikedCat) => (
          <CatCard
            key={cat.id}
            id={cat.id}
            url={cat.url}
          />
        ))}
      </div>
      {!likedCatsStore.data.length && (
        <span className={classes.loader}>Еще нет лайкнутых котиков</span>
      )}
    </main>
  )
}

export default observer(LikedCats);