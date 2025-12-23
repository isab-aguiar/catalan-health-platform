import { allPages as servicePages } from './services';
import { groupsData } from './groups';
import { professionalsData } from './professionals';

export const allPagesData = [
  ...servicePages,
  ...groupsData,
  ...professionalsData,
];
