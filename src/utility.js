export const extractDomain = url => {
  let arr = url.split ('/');
  url = arr[0] + '//' + arr[2];
  return url;
};

export const canUseDOM = () => {
  const isClitent =
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement;
  return isClitent;
};
