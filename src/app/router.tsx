import { createBrowserRouter, Navigate } from "react-router-dom";
import { Main } from "@/modules/main";
import { Cats } from "@/modules/cats";
import { LikedCats } from "@/modules/liked-cats";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Navigate to="/cats" replace />
      },
      {
        path: "cats",
        element: <Cats />
      },
      {
        path: "liked",
        element: <LikedCats />
      }
    ]
  }
])