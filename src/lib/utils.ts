export function getAssetPath(path: string): string {
  const deployTarget = process.env.NEXT_PUBLIC_DEPLOY_TARGET || 'default';
  const basePath = deployTarget === 'gh-pages' ? '/brightsupport' : '';
  return `${basePath}${path}`;
}
