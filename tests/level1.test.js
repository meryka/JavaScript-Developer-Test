import Collection from "../src/level1";
import { readFileSync } from "fs";

test("Testing a single line", () => {
  const singleLine = "100000  ATIVO             1000  300   500   1200";
  const expected = [
    {
      description: "ATIVO",
      classifier: "100000",
      openingBalance: 1000,
      debit: 300,
      credit: 500,
      finalBalance: 1200,
      parent: null
    }
  ];
  expect(new Collection(singleLine)).toMatchObject(expected);
});

test("Testing multiple lines", () => {
  const lines =
    "100000  ATIVO             1000  300   500   1200\n110000  ATIVO CIRCULANTE  500   100   200   600\n111000  DISPONIVEL        200   100   50    150\n200000  PASSIVO           800   250   450   1000";
  const expected = [
    {
      description: "ATIVO",
      classifier: "100000",
      openingBalance: 1000,
      debit: 300,
      credit: 500,
      finalBalance: 1200,
      parent: null
    },
    {
      description: "ATIVO CIRCULANTE",
      classifier: "110000",
      openingBalance: 500,
      debit: 100,
      credit: 200,
      finalBalance: 600,
      parent: "100000"
    },
    {
      description: "DISPONIVEL",
      classifier: "111000",
      openingBalance: 200,
      debit: 100,
      credit: 50,
      finalBalance: 150,
      parent: "110000"
    },
    {
      description: "PASSIVO",
      classifier: "200000",
      openingBalance: 800,
      debit: 250,
      credit: 450,
      finalBalance: 1000,
      parent: null
    }
  ];
  expect(new Collection(lines)).toEqual(expected);
});

test("Testing a line ending with \\n", () => {
  const singleLine = "100000  ATIVO             1000  300   500   1200\n";
  const expected = [
    {
      description: "ATIVO",
      classifier: "100000",
      openingBalance: 1000,
      debit: 300,
      credit: 500,
      finalBalance: 1200,
      parent: null
    }
  ];
  expect(new Collection(singleLine)).toMatchObject(expected);
});

test("Testing with a string openingBalance instead of a number", () => {
  const singleLine =
    "100000  ATIVO             random string  300   500   1200\n";
  const expected = [
    {
      description: "ATIVO",
      classifier: "100000",
      openingBalance: NaN,
      debit: 300,
      credit: 500,
      finalBalance: 1200,
      parent: null
    }
  ];
  expect(new Collection(singleLine)).toMatchObject(expected);
});

test("Testing with a description containing spaces", () => {
  const singleLine =
    "100000  this is a description containing spaces   500  300   500   1200\n";
  const expected = [
    {
      description: "this is a description containing spaces",
      classifier: "100000",
      openingBalance: 500,
      debit: 300,
      credit: 500,
      finalBalance: 1200,
      parent: null
    }
  ];
  expect(new Collection(singleLine)).toMatchObject(expected);
});

test("Testing with an input file", () => {
  const inputFile = "./tests/test-files/level1-input.txt";
  const inputData = readFileSync(inputFile).toString();
  const outputFile = "./tests/test-files/level1-output.txt";
  const output = readFileSync(outputFile).toString();
  const outputData = JSON.parse(output);
  expect(new Collection(inputData)).toEqual(outputData);
});
