export const stripTag = (val: any): string => {
  return val.toString().replace(/(<([^>]+)>)/gi, '');
};
