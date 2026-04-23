const normalizeBaseUrl = (rawUrl, fallbackUrl) => {
  const input = rawUrl?.trim();
  if (!input) return fallbackUrl;

  try {
    return new URL(input).toString().replace(/\/$/, "");
  } catch {
    return input.replace(/\/$/, "");
  }
};

const apiBaseUrl = normalizeBaseUrl(
  import.meta.env.VITE_API_URL,
  "http://localhost:5000"
);

export const uploadsBaseUrl = normalizeBaseUrl(
  import.meta.env.VITE_UPLOADS_URL,
  `${apiBaseUrl}/uploads`
);

export const getUploadUrl = (path) => {
  if (!path) return "https://via.placeholder.com/640x480?text=House";
  if (path.startsWith("http")) return path;
  return `${uploadsBaseUrl}/${String(path).replace(/^\/+/, "")}`;
};
