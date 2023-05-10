import Decimal from "decimal.js";

/**
 * @description 加法
 * @param {*} x1
 * @param {*} x2
 * @returns
 */
export function nPlus(x1: number, x2: number) {
  if (!x1 || !x2) return "";
  try {
    let temp1 = new Decimal(x1);
    let temp2 = new Decimal(x2);
    return temp1.plus(temp2).toString();
  } catch (error) {
    return "";
  }
}

/**
 * @description 减法
 * @param {} x1
 * @param {*} x2
 * @returns
 */

export function nMinus(x1: number, x2: number) {
  if (!x1 || !x2) return "0";
  try {
    let temp1 = new Decimal(x1);
    let temp2 = new Decimal(x2);
    return temp1.minus(temp2).toString();
  } catch (error) {
    return "0";
  }
}

/**
 * @description 乘法
 * @param {*} x1
 * @param {*} x2
 * @returns
 */
export function nTimes(x1: number, x2: number) {
  if (!x1 || !x2) return "0";
  try {
    let temp1 = new Decimal(x1);
    let temp2 = new Decimal(x2);
    return temp1.times(temp2).toString();
  } catch (error) {
    return "0";
  }
}

/**
 * @description 除法
 * @param {*} x1
 * @param {*} x2
 * @returns
 */

export function nDiv(x1: number, x2: number) {
  if (!x1 || !x2) return "0";
  try {
    let temp1 = new Decimal(+x1);
    let temp2 = new Decimal(+x2);
    return temp1.div(temp2).toString();
  } catch (error) {
    return "0";
  }
}
