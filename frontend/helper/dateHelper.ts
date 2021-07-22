export const convertToMarketDate = (timestamp: string) => {
  const time = Number(timestamp);
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const oneDay = hour * 24;

  let elapsed = Date.now() - time;

  if (elapsed < minute) {
    return Math.floor(elapsed / second) + '초 전';
  } else if (elapsed < hour) {
    return Math.floor(elapsed / minute) + '분 전';
  } else if (elapsed < oneDay) {
    return Math.floor(elapsed / hour) + '시간 전';
  } else {
    return Math.floor(elapsed / oneDay) + '일 전';
  }
};
