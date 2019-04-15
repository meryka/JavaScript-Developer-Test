import Collection from "../src/level3";
import fs from "fs";

test("Testing a single line", () => {
  const singleLine = "1	*** Ativo ***	82997,66	D		247726,89	240377,5		90347,05	D";
  const expected = [
    {
      description: "Ativo",
      classifier: "100000",
      openingBalance: 82997.66,
      debit: 247726.89,
      credit: 240377.5,
      finalBalance: 90347.05,
      parent: null
    }
  ];
  expect(new Collection(singleLine)).toMatchObject(expected);
});

test("Testing multiple lines", () => {
  const lines =
    "1	*** Ativo ***	82997,66	D		247726,89	240377,5		90347,05	D\n11	Ativo Circulante	32573,59	D		247726,89	239574,01		40726,47	D\n111	Disponível	24059,92	D		200259,03	187061,24		37257,71	D";
  const expected = [
    {
      description: "Ativo",
      classifier: "100000",
      openingBalance: 82997.66,
      debit: 247726.89,
      credit: 240377.5,
      finalBalance: 90347.05,
      parent: null
    },
    {
      description: "Ativo Circulante",
      classifier: "110000",
      openingBalance: 32573.59,
      debit: 247726.89,
      credit: 239574.01,
      finalBalance: 40726.47,
      parent: "100000"
    },
    {
      description: "Disponível",
      classifier: "111000",
      openingBalance: 24059.92,
      debit: 200259.03,
      credit: 187061.24,
      finalBalance: 37257.71,
      parent: "110000"
    }
  ];
  expect(new Collection(lines)).toEqual(expected);
});

test("Testing a line ending with \\n", () => {
  const singleLine = "1	*** Ativo ***	82997,66	D		247726,89	240377,5		90347,05	D\n";
  const expected = [
    {
      description: "Ativo",
      classifier: "100000",
      openingBalance: 82997.66,
      debit: 247726.89,
      credit: 240377.5,
      finalBalance: 90347.05,
      parent: null
    }
  ];
  expect(new Collection(singleLine)).toMatchObject(expected);
});

test("Testing with an input file", () => {
  const inputFile = "./tests/test-files/level3-input.txt";
  const inputData = fs.readFileSync(inputFile).toString();
  const outputFile = "./tests/test-files/level3-output.txt";
  const output = fs.readFileSync(outputFile).toString();
  const outputData = JSON.parse(output);
  expect(new Collection(inputData)).toEqual(outputData);
});
