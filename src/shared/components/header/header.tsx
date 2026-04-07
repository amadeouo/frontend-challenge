import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

import classes from './header.module.css'

export function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <header className={classes.wrapper}>
      <nav className={classes.list}>
        <li className={classes.item}>
          <a
            className={classNames(
              classes.link,
              { [classes.isSelected]: pathname === '/cats' }
            )}
            onClick={() => navigate("/cats")}
          >
            Все котики
          </a>
        </li>
        <li className={classes.item}>
          <a
            className={classNames(
              classes.link,
              { [classes.isSelected]: pathname === '/liked' }
            )}
            onClick={() => navigate("/liked")}
          >
            Любимые котики
          </a>
        </li>
      </nav>
    </header>
  )
}