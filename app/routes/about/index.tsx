import { Link, LinksFunction } from "remix";

import stylesUrl from "~/styles/about-styles.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function IndexRoute() {
  return (
    <div>
      <h1>About</h1>
      <p className="set-red">
        <code>about-styles.css</code> sets this text to be red.
      </p>
      <p>
        If you switch theme, links function won't load the stylesheet!
      </p>
      <p>
        But refresh and it's loaded again.
      </p>
      <div>
        <Link to="/">go back</Link>
      </div>
    </div>
  );
}
