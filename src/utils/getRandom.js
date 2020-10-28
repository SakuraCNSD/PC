export default function getRandom(max, min) {
  return parseInt(Math.random() * (max - min + 1) + min);
}
