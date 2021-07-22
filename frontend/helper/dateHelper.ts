export const convertToMarketDate = (timestamp: string) => {
  const time = Number(timestamp);

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let elapsed = Date.now() - time;

  if (elapsed < minute) {
    return Math.floor(elapsed / second) + '초 전';
  } else if (elapsed < hour) {
    return Math.floor(elapsed / minute) + '분 전';
  } else if (elapsed < day) {
    return Math.floor(elapsed / hour) + '시간 전';
  } else {
    return Math.floor(elapsed / day) + '일 전';
  }
};
