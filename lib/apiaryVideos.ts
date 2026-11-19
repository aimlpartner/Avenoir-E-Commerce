export interface ApiaryVideoClip {
  id: string;
  alt: string;
  videoUrl: string;
  posterUrl: string;
}

export const APIARY_VIDEO_CLIPS: ApiaryVideoClip[] = [
  {
    id: 'hive-opening',
    alt: 'Opening hive box',
    videoUrl: '/media/apiary/videos/clips/hive-opening.mp4',
    posterUrl: '/media/apiary/videos/posters/hive-opening-poster.jpg',
  },
  {
    id: 'frame-pull',
    alt: 'Lifting honey frame',
    videoUrl: '/media/apiary/videos/clips/frame-pull.mp4',
    posterUrl: '/media/apiary/videos/posters/frame-pull-poster.jpg',
  },
  {
    id: 'hive-tool-care',
    alt: 'Inspecting frames with hive tool',
    videoUrl: '/media/apiary/videos/clips/hive-tool-care.mp4',
    posterUrl: '/media/apiary/videos/posters/hive-tool-care-poster.jpg',
  },
  {
    id: 'living-comb-frame',
    alt: 'Honeybees on comb frame',
    videoUrl: '/media/apiary/videos/clips/living-comb-frame.mp4',
    posterUrl: '/media/apiary/videos/posters/living-comb-frame-poster.jpg',
  },
  {
    id: 'apiary-teamwork',
    alt: 'Working at the bee yard',
    videoUrl: '/media/apiary/videos/clips/apiary-teamwork.mp4',
    posterUrl: '/media/apiary/videos/posters/apiary-teamwork-poster.jpg',
  },
  {
    id: 'golden-nectar-cells',
    alt: 'Capped honey cells in comb',
    videoUrl: '/media/apiary/videos/clips/golden-nectar-cells.mp4',
    posterUrl: '/media/apiary/videos/posters/golden-nectar-cells-poster.jpg',
  },
  {
    id: 'meadow-harvest-inspection',
    alt: 'Checking comb frame in the bee yard',
    videoUrl: '/media/apiary/videos/clips/meadow-harvest-inspection.mp4',
    posterUrl: '/media/apiary/videos/posters/meadow-harvest-inspection-poster.jpg',
  },
];

export const HERO_WALL_CLIPS: ApiaryVideoClip[] = [
  APIARY_VIDEO_CLIPS[0],
  APIARY_VIDEO_CLIPS[3],
  APIARY_VIDEO_CLIPS[5],
  APIARY_VIDEO_CLIPS[4],
  APIARY_VIDEO_CLIPS[6],
];
