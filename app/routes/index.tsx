import { Link } from "remix";

export default function Index() {
  return (
    <div>
      <h1>Welcome to Remix</h1>
      <div>
        <Link to="/about">about page</Link>
      </div>
    </div>
  );
}
