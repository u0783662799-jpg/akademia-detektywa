// GA uses first-party cookies. JavaScript cannot enumerate cookie domain/path
// attributes or remove HttpOnly/third-party cookies; expire matching first-party scopes.
export function removeAnalyticsCookies() {
  const names = new Set([
    "_ga", "_ga_V817XGHG8Q",
    ...document.cookie.split(";").map(cookie => cookie.trim().split("=")[0])
      .filter(name => /^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name)),
  ]);
  const domains = new Set([""]);
  const labels = window.location.hostname.split(".");
  for (let i = 0; i < labels.length; i++) {
    const domain = labels.slice(i).join(".");
    domains.add(domain);
    domains.add(`.${domain}`);
  }
  const paths = new Set(["/"]);
  const segments = window.location.pathname.split("/").filter(Boolean);
  for (let i = 1; i <= segments.length; i++) {
    const path = `/${segments.slice(0, i).join("/")}`;
    paths.add(path);
    paths.add(`${path}/`);
  }
  for (const name of Array.from(names)) for (const domain of Array.from(domains)) for (const path of Array.from(paths)) {
    document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}${domain ? `; domain=${domain}` : ""}`;
  }
}
