"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialize_1 = require("./serialize");
const strict_1 = __importDefault(require("node:assert/strict"));
const node_fs_1 = require("node:fs");
const generateRandomNums = (length) => Array.from({ length }, () => Math.floor(Math.random() * 300 + 1));
const cases = [];
// writeFileSync("testResults.json", "");
console.log("Running tests for arrays with 50 random numbers");
for (let i = 0; i < 100; i++) {
    const randomNums = generateRandomNums(50);
    const serialized = (0, serialize_1.serialize)(randomNums);
    const deserialized = (0, serialize_1.deserialize)(serialized);
    strict_1.default.deepEqual(deserialized, randomNums);
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
    const serialized = (0, serialize_1.serialize)(randomNums);
    const deserialized = (0, serialize_1.deserialize)(serialized);
    strict_1.default.deepEqual(deserialized, randomNums);
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
    const serialized = (0, serialize_1.serialize)(randomNums);
    const deserialized = (0, serialize_1.deserialize)(serialized);
    strict_1.default.deepEqual(deserialized, randomNums);
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
    const serialized = (0, serialize_1.serialize)(randomNums);
    const deserialized = (0, serialize_1.deserialize)(serialized);
    strict_1.default.deepEqual(deserialized, randomNums);
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
    const serialized = (0, serialize_1.serialize)(nums);
    const deserialized = (0, serialize_1.deserialize)(serialized);
    strict_1.default.deepEqual(deserialized, nums);
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
    const serialized = (0, serialize_1.serialize)(nums);
    const deserialized = (0, serialize_1.deserialize)(serialized);
    strict_1.default.deepEqual(deserialized, nums);
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
    const serialized = (0, serialize_1.serialize)(nums);
    const deserialized = (0, serialize_1.deserialize)(serialized);
    strict_1.default.deepEqual(deserialized, nums);
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
    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;
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
    const serialized = (0, serialize_1.serialize)(triple);
    const deserialized = (0, serialize_1.deserialize)(serialized);
    strict_1.default.deepEqual(deserialized, triple);
    cases.push({
        input: JSON.stringify(triple),
        output: serialized,
        relativeSize: serialized.length / JSON.stringify(triple).length,
    });
}
console.log("Tests for arrays with all  numbers included 3 times passed\n");
(0, node_fs_1.writeFileSync)("testResults.json", JSON.stringify(cases));
console.log("Max relative size: ", cases.map((e) => e.relativeSize).reduce((a, e) => Math.max(a, e), 0));
console.log("Average relative size: ", cases.map((e) => e.relativeSize).reduce((a, e) => a + e, 0) / cases.length);
