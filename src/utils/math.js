// 处理在指定的误差范围内两个数是否相等
export function equal(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON
}