import { introScenes } from './scenes/intro';
import { developerScenes } from './scenes/developer';
import { analystScenes } from './scenes/analyst';
import { directorScenes } from './scenes/director';
import { debugScenes } from './scenes/debug';
import { secretScenes } from './scenes/secret';

export const scenes = {
    ...introScenes,
    ...developerScenes,
    ...analystScenes,
    ...directorScenes,
    ...debugScenes,
    ...secretScenes
};
