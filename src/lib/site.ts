export const siteBasePath = "/luxewash";

export function assetPath(path: string) {
  return `${siteBasePath}${path.startsWith("/") ? path : `/${path}`}`;
}
