#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN
const data = content.split(' |\r\n| ')
  .slice(1)
  .map((el) => el.split(' | '))
  .map ((el) => {
    const price = el[6].split(' ')[0]
    const newEl = [el[0], Number(el[1]), Number(el[2]), Number(el[3]), Number(el[4]), Number(el[5]), Number(price)]
    return newEl;
  })
console.log(`Количество cуществ: ${data.length}`);
const sortedData = data.sort((a, b) => b[1] - a[1])
console.log(`Стоимость найма 10: ${sortedData[0][6] * 10}`)
console.log(`Стоимость найма 20: ${sortedData[1][6] * 20}`)
const fat = data.reduce((acc, el) => {
  const size = el[4] / el[5];
  const name = el[0]
  const cost = el[3] * el[6]
  if (Object.keys(acc).length === 0) {
    return { ...acc, name, size, cost };
  }
  if (acc.size > size) {
    return { name, size, cost };
  }
  return { ...acc };
}, {});
console.log(`Самый толстый: ${fat.name}, стоимость ${fat.cost}`);
const thin = data.reduce((acc, el) => {
  const size = el[4] / el[5];
  const name = el[0]
  const cost = el[3] * el[6]
  if (Object.keys(acc).length === 0) {
    return { ...acc, name, size, cost };
  }
  if (acc.size < size) {
    return { name, size, cost };
  }
  return { ...acc };
}, {});
console.log(`Самый худой: ${thin.name}, стоимость ${thin.cost}`);

const effect = data.sort((b, a) => a[1] * a[3] / a[6] - b[1] * b[3] / b[6]);
console.log(`Самый эффективый: ${effect[0][0]}, Самый неэффективый: ${effect[5][0]}`);

const bestArmy = data.sort((b, a) => 10000 / a[6] * a[1] - 10000 / b[6] * b[1]);
console.log(`Самая сильная армия из ${bestArmy[0][0]}ов`);
// END