export const extractDomain = url => {
  let arr = url.split ('/');
  url = arr[0] + '//' + arr[2];
  return url;
};
