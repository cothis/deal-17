export const convertToMarketDate = (timestamp: number) => {
  const hour = 60 * 60 * 1000;
  const oneDay = hour * 24;
  let elapsed = Date.now() - timestamp;
  if (elapsed < oneDay) {
    return Math.floor(elapsed / hour) + '시간 전';
  } else {
    return Math.floor(elapsed / oneDay) + '일 전';
  }
};
