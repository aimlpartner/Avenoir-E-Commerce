export interface ApiaryVideoClip {
  id: string;
  title: string;
  subtitle: string;
  sourceLabel: string;
  timestampRange: string;
  videoUrl: string;
  posterUrl: string;
  tag: string;
  description: string;
}

export const APIARY_VIDEO_CLIPS: ApiaryVideoClip[] = [
  {
    id: 'hive-opening',
    title: 'Inside the Brood Box',
    subtitle: 'Sunlit Wooden Frames',
    sourceLabel: 'Yard Inspection I',
    timestampRange: '0:28 – 0:38',
    videoUrl: '/media/apiary/videos/clips/hive-opening.mp4',
    posterUrl: '/media/apiary/videos/posters/hive-opening-poster.jpg',
    tag: 'Brood Check',
    description:
      'First-person view opening a thriving wooden hive box in full morning light—checking capped honey and active worker frames.',
  },
  {
    id: 'frame-pull',
    title: 'Two-Handed Frame Pull',
    subtitle: 'Live Colony Health',
    sourceLabel: 'Yard Inspection I',
    timestampRange: '0:14 – 0:25',
    videoUrl: '/media/apiary/videos/clips/frame-pull.mp4',
    posterUrl: '/media/apiary/videos/posters/frame-pull-poster.jpg',
    tag: 'Active Hive',
    description:
      'Lifting a heavy frame packed with bees out into daylight to inspect comb building and healthy queen-laid brood.',
  },
  {
    id: 'hive-tool-care',
    title: 'Gentle Hive Tool Work',
    subtitle: 'Propolis & Spacing',
    sourceLabel: 'Full Yard Check (2:01)',
    timestampRange: '0:04 – 0:15',
    videoUrl: '/media/apiary/videos/clips/hive-tool-care.mp4',
    posterUrl: '/media/apiary/videos/posters/hive-tool-care-poster.jpg',
    tag: 'Hand Tended',
    description:
      'Carefully loosening propolis-sealed frames by hand with a steel hive tool—zero harsh machinery, zero rushing the bees.',
  },
  {
    id: 'living-comb-frame',
    title: 'The Living Superorganism',
    subtitle: 'Thousands of Foragers',
    sourceLabel: 'Full Yard Check (2:01)',
    timestampRange: '0:40 – 0:51',
    videoUrl: '/media/apiary/videos/clips/living-comb-frame.mp4',
    posterUrl: '/media/apiary/videos/posters/living-comb-frame-poster.jpg',
    tag: 'Dense Colony',
    description:
      'A dense, calm colony blanketing both sides of a golden comb frame while gentle smoker mist settles over the yard.',
  },
  {
    id: 'apiary-teamwork',
    title: 'Side-by-Side Stewardship',
    subtitle: 'Green Pasture Apiaries',
    sourceLabel: 'Full Yard Check (2:01)',
    timestampRange: '1:02 – 1:13',
    videoUrl: '/media/apiary/videos/clips/apiary-teamwork.mp4',
    posterUrl: '/media/apiary/videos/posters/apiary-teamwork-poster.jpg',
    tag: 'Apiary Team',
    description:
      'Our suited beekeepers working side by side across sun-drenched pasture hives during routine seasonal harvest checks.',
  },
  {
    id: 'golden-nectar-cells',
    title: 'Glowing Raw Nectar Cells',
    subtitle: 'Close-Up Golden Comb',
    sourceLabel: 'Harvest Comb Check',
    timestampRange: '0:05 – 0:16',
    videoUrl: '/media/apiary/videos/clips/golden-nectar-cells.mp4',
    posterUrl: '/media/apiary/videos/posters/golden-nectar-cells-poster.jpg',
    tag: 'Pure Nectar',
    description:
      'Translucent amber beeswax hexagons brimming with raw, unheated wildflower honey before cold extraction.',
  },
  {
    id: 'meadow-harvest-inspection',
    title: 'Meadow Comb Inspection',
    subtitle: 'Field-to-Jar Purity',
    sourceLabel: 'Harvest Comb Check',
    timestampRange: '0:18 – 0:30',
    videoUrl: '/media/apiary/videos/clips/meadow-harvest-inspection.mp4',
    posterUrl: '/media/apiary/videos/posters/meadow-harvest-inspection-poster.jpg',
    tag: 'Raw Harvest',
    description:
      'Checking capped and open wildflower comb right in front of the rolling meadow where our bees forage daily.',
  },
];

// Curated 5-clip panoramic wall for the Hero background (diverse visual angles side-by-side)
export const HERO_WALL_CLIPS: ApiaryVideoClip[] = [
  APIARY_VIDEO_CLIPS[0], // hive-opening
  APIARY_VIDEO_CLIPS[3], // living-comb-frame
  APIARY_VIDEO_CLIPS[5], // golden-nectar-cells
  APIARY_VIDEO_CLIPS[4], // apiary-teamwork
  APIARY_VIDEO_CLIPS[6], // meadow-harvest-inspection
];
