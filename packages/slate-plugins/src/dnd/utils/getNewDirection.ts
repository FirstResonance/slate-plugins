/**
 * Get new direction if updated
 */
const allowedDirections = ['top', 'bottom', 'inside', 'left', 'right']
export const getNewDirection = (previousDir: string, dir?: string) => {
  if (!dir && previousDir) {
    return '';
  }

  if (dir && allowedDirections.includes(dir) && dir !== previousDir) return dir;
};
