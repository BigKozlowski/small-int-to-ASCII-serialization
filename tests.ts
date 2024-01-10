import { serialize, deserialize } from "./serialize";
import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";

const generateRandomNums = (length: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * 300 + 1));

const cases: { input: string; output: string; relativeSize: number }[] = [];

// writeFileSync("testResults.json", "");

console.log("Running tests for arrays with 50 random numbers");
for (let i = 0; i < 100; i++) {
  const randomNums = generateRandomNums(50);

  const serialized = serialize(randomNums);

  const deserialized = deserialize(serialized);

  assert.deepEqual(deserialized, randomNums);
  cases.push({
    input: JSON.stringify(randomNums),
    output: serialized,
    relativeSize: serialized.length / JSON.stringify(randomNums).length,
  });
}
console.log("Tests for arrays with 50 random numbers passed\n");

console.log("Running tests for arrays with 100 random numbers");
for (let i = 0; i < 100; i++) {
  const randomNums = generateRandomNums(100);

  const serialized = serialize(randomNums);

  const deserialized = deserialize(serialized);

  assert.deepEqual(deserialized, randomNums);
  cases.push({
    input: JSON.stringify(randomNums),
    output: serialized,
    relativeSize: serialized.length / JSON.stringify(randomNums).length,
  });
}
console.log("Tests for arrays with 100 random numbers passed\n");

console.log("Running tests for arrays with 500 random numbers");
for (let i = 0; i < 100; i++) {
  const randomNums = generateRandomNums(500);

  const serialized = serialize(randomNums);

  const deserialized = deserialize(serialized);

  assert.deepEqual(deserialized, randomNums);
  cases.push({
    input: JSON.stringify(randomNums),
    output: serialized,
    relativeSize: serialized.length / JSON.stringify(randomNums).length,
  });
}
console.log("Tests for arrays with 500 random numbers passed\n");

console.log("Running tests for arrays with 1000 random numbers");
for (let i = 0; i < 100; i++) {
  const randomNums = generateRandomNums(1000);

  const serialized = serialize(randomNums);

  const deserialized = deserialize(serialized);

  assert.deepEqual(deserialized, randomNums);
  cases.push({
    input: JSON.stringify(randomNums),
    output: serialized,
    relativeSize: serialized.length / JSON.stringify(randomNums).length,
  });
}
console.log("Tests for arrays with 1000 random numbers passed\n");

console.log("Running tests for arrays with all 1-digit numbers");
{
  const nums = Array.from({ length: 9 }, (_, i) => i + 1);

  const serialized = serialize(nums);

  const deserialized = deserialize(serialized);

  assert.deepEqual(deserialized, nums);
  cases.push({
    input: JSON.stringify(nums),
    output: serialized,
    relativeSize: serialized.length / JSON.stringify(nums).length,
  });
}
console.log("Tests for arrays with all 1-digit numbers passed\n");

console.log("Running tests for arrays with all 2-digit numbers");
{
  const nums = Array.from({ length: 90 }, (_, i) => i + 10);

  const serialized = serialize(nums);

  const deserialized = deserialize(serialized);

  assert.deepEqual(deserialized, nums);
  cases.push({
    input: JSON.stringify(nums),
    output: serialized,
    relativeSize: serialized.length / JSON.stringify(nums).length,
  });
}
console.log("Tests for arrays with all 2-digit numbers passed\n");

console.log("Running tests for arrays with all 3-digit numbers");
{
  const nums = Array.from({ length: 201 }, (_, i) => i + 100);

  const serialized = serialize(nums);

  const deserialized = deserialize(serialized);

  assert.deepEqual(deserialized, nums);
  cases.push({
    input: JSON.stringify(nums),
    output: serialized,
    relativeSize: serialized.length / JSON.stringify(nums).length,
  });
}
console.log("Tests for arrays with all 3-digit numbers passed\n");

console.log("Running tests for arrays with all numbers included 3 times");
{
  // Algorithm: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  const shuffle = (array: number[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const nums = Array.from({ length: 300 }, (_, i) => i + 1);
  const triple = shuffle([...nums, ...nums, ...nums]);

  const serialized = serialize(triple);

  const deserialized = deserialize(serialized);

  assert.deepEqual(deserialized, triple);
  cases.push({
    input: JSON.stringify(triple),
    output: serialized,
    relativeSize: serialized.length / JSON.stringify(triple).length,
  });
}
console.log("Tests for arrays with all  numbers included 3 times passed\n");

writeFileSync("testResults.json", JSON.stringify(cases));

console.log(
  "Max relative size: ",
  cases.map((e) => e.relativeSize).reduce((a, e) => Math.max(a, e), 0)
);

console.log(
  "Average relative size: ",
  cases.map((e) => e.relativeSize).reduce((a, e) => a + e, 0) / cases.length
);
