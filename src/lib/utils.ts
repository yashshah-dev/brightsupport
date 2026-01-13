export function getAssetPath(path: string): string {
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/brightsupport' : '';
  return `${basePath}${path}`;
}
