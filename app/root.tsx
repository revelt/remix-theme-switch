import { useRef } from "react";
import {
  json,
  Links,
  Form,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useSubmit,
  LinksFunction,
  ScrollRestoration,
  useLoaderData,
  LoaderFunction,
  ActionFunction,
} from "remix";
import type { MetaFunction } from "remix";

// -----------------------------------------------------------------------------

import { unencryptedSession } from "./sessions.server";
export const action: ActionFunction = async ({ request }) => {
  let session = await unencryptedSession.getSession(
    request.headers.get("Cookie")
  );
  let formData = new URLSearchParams(await request.text());
  let theme = formData.get("theme") || "auto";
  session.set("theme", theme);
  return json(null, {
    headers: {
      "Set-Cookie": await unencryptedSession.commitSession(session),
    },
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  let session = await unencryptedSession.getSession(
    request.headers.get("Cookie")
  );
  let theme = session.get("theme") || "auto";
  return json({ theme });
};

// -----------------------------------------------------------------------------

type Theme = "auto" | "light" | "dark";
const VALID_THEMES: Theme[] = ["auto", "dark", "light"];

// -----------------------------------------------------------------------------

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

import stylesUrl from "~/styles/global.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

// -----------------------------------------------------------------------------

function Document({
  children,
  title,
  selectedTheme = "auto",
}: {
  children: React.ReactNode;
  title?: string;
  selectedTheme?: Theme;
}) {
  return (
    <html data-theme={selectedTheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({
  children,
  selectedTheme = "auto"
}: {
  children: React.ReactNode;
  selectedTheme?: Theme;
  }) {
  let formRef = useRef<HTMLFormElement>(null);
  let submit = useSubmit();
  let onRadioChanged = () => {
    submit(formRef.current, { action: location.pathname });
  };

  return (
    <div>
      <div>
        <Form
          className="remix-app__theme-toggle"
          ref={formRef}
          method="post"
        >
          {VALID_THEMES.map((theme) => (
            <div key={theme} className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">{theme}</span>
                <input
                  data-testid={`theme-${theme}`}
                  type="radio"
                  name="theme"
                  defaultChecked={selectedTheme === theme}
                  className="radio"
                  value={theme}
                  onChange={onRadioChanged}
                />
              </label>
            </div>
          ))}
        </Form>
        <br/>
        Chosen theme: "{selectedTheme}"
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default function App() {
  let { theme = "auto" } = useLoaderData();

  return (
    <Document selectedTheme={theme}>
      <Layout selectedTheme={theme}>
        <Outlet />
      </Layout>
    </Document>
  )
}
