// Deterministic seeded PRNG (mulberry32). Used anywhere gameplay-critical
// randomness (like which doors in Door Dash are "real" vs permanently solid)
// needs to come out IDENTICAL on the host and every client. Plain Math.random()
// is different on every machine, which was silently causing the host and each
// client to disagree about which doors should have collision - a client's
// "solid" door could vanish because the host, using its own independent
// randomness, considered that same slot breakable and told everyone it broke.
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeSeed() {
  return Math.floor(Math.random() * 2 ** 31);
}
