const kEpsilon = 1e-6

export function IvSqrt(value:number) {
  return Math.sqrt(value)
}

export function IvInverseSqrt(value:number) {
  return 1/Math.sqrt(value)
}

export function IvIsZero(value:number){
  return Math.abs(value) <= kEpsilon
}