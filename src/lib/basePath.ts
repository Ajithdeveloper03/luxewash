export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/laundry-demo";

export const getRuntimeBasePath = (): string => {
  return basePath;
};

export const getAssetPath = (path: string): string => {
  const base = basePath.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
};
