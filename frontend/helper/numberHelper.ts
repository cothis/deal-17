const _addComma = (price: string) => {
  let len, point, res;

  price = price + '';
  point = price.length % 3;
  len = price.length;

  res = price.substring(0, point);
  while (point < len) {
    if (res != '') res += ',';
    res += price.substring(point, point + 3);
    point += 3;
  }

  return res;
};

export const convertToMarketPrice = (price?: number) => {
  if (price === null || price === undefined) {
    return '가격미정';
  }
  if (price === 0) {
    return '무료나눔';
  }

  return _addComma(String(price)) + "원";
};

export const addComma = (price: string) => {
  return _addComma(price);
};
