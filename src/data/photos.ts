export interface LandscapePhoto {
  id: string;
  title: string;
  category: 'lawn' | 'pebbles' | 'vertical' | 'paths' | 'nooks';
  categoryLabel: string;
  src: string;
  description: string;
  aspect: 'landscape' | 'portrait' | 'square';
  highlight?: string;
}

export const LANDSCAPE_PHOTOS: LandscapePhoto[] = [
  {
    id: 'landscape-1',
    title: 'A Geometric Garden Walkway',
    category: 'paths',
    categoryLabel: 'Pathways & Steppers',
    src: '/images/geometric-steppers.jpg',
    description: 'Clean-lined stone and turf create a striking geometric path through a planted courtyard.',
    aspect: 'landscape',
    highlight: 'Geometric Steppers',
  },
  {
    id: 'landscape-2',
    title: 'A Pebble Garden Path',
    category: 'pebbles',
    categoryLabel: 'Stone & Pebble Zen',
    src: '/images/pebble-garden-path.jpg',
    description: 'A curving path of stone pavers and pale pebbles, softened with tropical planting.',
    aspect: 'landscape',
    highlight: 'Garden Path',
  },
  {
    id: 'landscape-3',
    title: 'A Garden in Bloom',
    category: 'nooks',
    categoryLabel: 'Courtyard Nooks',
    src: '/images/flowering-garden-border.jpg',
    description: 'Colorful flowering plants bring a welcoming focal point to a landscaped garden.',
    aspect: 'landscape',
    highlight: 'Flowering Border',
  },
  {
    id: 'landscape-4',
    title: 'A Tropical Living Wall',
    category: 'vertical',
    categoryLabel: 'Vertical Green Walls',
    src: '/images/tropical-living-wall.jpg',
    description: 'Layered tropical foliage brings a vertical garden to life beneath a shaded canopy.',
    aspect: 'landscape',
    highlight: 'Living Wall',
  },
  {
    id: 'landscape-5',
    title: 'A Quiet Courtyard Lawn',
    category: 'lawn',
    categoryLabel: 'Lawn Transformations',
    src: '/images/walled-courtyard-lawn.jpg',
    description: 'A calm green lawn framed by a curved garden edge, clipped planting, and a bright boundary wall.',
    aspect: 'landscape',
    highlight: 'Courtyard Garden',
  },
  {
    id: 'landscape-6',
    title: 'A Checkerboard Garden Walk',
    category: 'paths',
    categoryLabel: 'Pathways & Steppers',
    src: '/images/checkerboard-garden-path.jpg',
    description: 'Large-format pavers and green joints form a crisp, contemporary garden walkway.',
    aspect: 'landscape',
    highlight: 'Modern Paving',
  },
  {
    id: 'landscape-7',
    title: 'An Illuminated Vertical Garden',
    category: 'vertical',
    categoryLabel: 'Vertical Green Walls',
    src: '/images/illuminated-living-wall.jpg',
    description: 'A lush living wall and warm lighting create a dramatic green entrance.',
    aspect: 'landscape',
    highlight: 'Garden Lighting',
  },
];
