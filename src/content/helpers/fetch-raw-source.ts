export const fetchRawSource = async (url: string) => {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`HTTP ${res.status}`);
      return null;
    }
    const contentType = res.headers.get('content-type');

    if (contentType && !contentType.includes('javascript')) {
      return null;
    }
    const rawJS = await res.text();
    return rawJS;
  } catch (ex) {
    console.error('Failed to fetch from URL:', { url, exception: ex });
    return null;
  }
};
