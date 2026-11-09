export const sectionLinks = [
  { id: 'showcase', path: '/projects', label: 'Projects' },
  { id: 'gallery', path: '/gallery', label: 'Project Gallery' },
  { id: 'clients', path: '/clients', label: 'Our Clients' },
  { id: 'transformation', path: '/before-after', label: 'Before & After' },
  { id: 'studio', path: '/garden-planner', label: 'Garden Planner' },
  { id: 'inquire', path: '/contact', label: 'Contact & Office' },
] as const;

export const sectionIdByPath: Record<string, string> = {
  '/services': 'showcase',
  ...Object.fromEntries(sectionLinks.map(({ id, path }) => [path, id])),
};

export const sectionPathById: Record<string, string> = {
  home: '/',
  ...Object.fromEntries(sectionLinks.map(({ id, path }) => [id, path])),
};
