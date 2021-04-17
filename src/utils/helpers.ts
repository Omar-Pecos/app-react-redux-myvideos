export const regexYoutubeLink = new RegExp(
  /(?:http?s?:\/\/)?(?:www.)?(?:m.)?(?:music.)?youtu(?:\.?be)(?:\.com)?(?:(?:\w*.?:\/\/)?\w*.?\w*-?.?\w*\/(?:embed|e|v|watch|.*\/)?\??(?:feature=\w*\.?\w*)?&?(?:v=)?\/?)([\w\d_-]{11})(?:\S+)?/gm
);

export const matchYoutubeLink = (url: string) => {
  const match = url.match(regexYoutubeLink);
  return match ? true : false;
};

export const getYoutubeID = (url: string) => {
  const splitted = url.split(regexYoutubeLink);
  return splitted[1] ? splitted[1] : null;
};
