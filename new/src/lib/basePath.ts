export const getRuntimeBasePath = (): string => {
  if (typeof window !== "undefined") {
    // Dynamically check if the current URL path is under /laundry
    const pathname = window.location.pathname;
    if (pathname === "/laundry" || pathname.startsWith("/laundry/")) {
      return "/laundry";
    }
    // If not running under /laundry, use root
    return "";
  }
  return process.env.NEXT_PUBLIC_BASE_PATH || "/laundry";
};

export const basePath = getRuntimeBasePath();

export const getAssetPath = (path: string): string => {
  const base = getRuntimeBasePath().replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
};


