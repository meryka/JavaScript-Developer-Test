import Collection from "../src/level4";
import fs from "fs";

test("Testing a single line", () => {
  const singleLine =
    "10000  1000000000      A T I V O                                        5.869.359,63   13.988.798,89  14.478.791,43   5.379.367,09";
  const expected = [
    {
      description: "A T I V O",
      classifier: "1000000000",
      openingBalance: 5869359.63,
      debit: 13988798.89,
      credit: 14478791.43,
      finalBalance: 5379367.09,
      parent: null
    }
  ];
  expect(new Collection(singleLine)).toMatchObject(expected);
});

test("Testing multiple lines", () => {
  const lines =
    "20000  2000000000      P A S S I V O                                    5.869.359,63      967.949,40     835.447,46   5.736.857,69\n20001  2100000000       CIRCULANTE                                        852.890,36      942.948,91     835.447,46     745.388,91\n20002  2101000000        FORNECEDORES                                     194.005,11      470.136,21     450.880,32     174.749,22\n20004  2101010000         FORNECEDORES DIVERSOS                           194.005,11      470.136,21     450.880,32     174.749,22";
  const expected = [
    {
      description: "P A S S I V O",
      classifier: "2000000000",
      openingBalance: 5869359.63,
      debit: 967949.4,
      credit: 835447.46,
      finalBalance: 5736857.69,
      parent: null
    },
    {
      description: "CIRCULANTE",
      classifier: "2100000000",
      openingBalance: 852890.36,
      debit: 942948.91,
      credit: 835447.46,
      finalBalance: 745388.91,
      parent: "2000000000"
    },
    {
      description: "FORNECEDORES",
      classifier: "2101000000",
      openingBalance: 194005.11,
      debit: 470136.21,
      credit: 450880.32,
      finalBalance: 174749.22,
      parent: "2100000000"
    },
    {
      description: "FORNECEDORES DIVERSOS",
      classifier: "2101010000",
      openingBalance: 194005.11,
      debit: 470136.21,
      credit: 450880.32,
      finalBalance: 174749.22,
      parent: "2101000000"
    }
  ];
  expect(new Collection(lines)).toEqual(expected);
});

test("Testing a line ending with \\n", () => {
  const singleLine =
    "11503  1108010800          I.R.R.F.                                         2.023,28        1.756,39           0,00       3.779,67\n";
  const expected = [
    {
      description: "I.R.R.F.",
      classifier: "1108010800",
      openingBalance: 2023.28,
      debit: 1756.39,
      credit: 0.0,
      finalBalance: 3779.67,
      parent: "1108010000"
    }
  ];
  expect(new Collection(singleLine)).toMatchObject(expected);
});

test("Testing with an input file", () => {
  const inputFile = "./tests/test-files/level4-input.txt";
  const inputData = fs.readFileSync(inputFile).toString();
  const outputFile = "./tests/test-files/level4-output.txt";
  const output = fs.readFileSync(outputFile).toString();
  const outputData = JSON.parse(output);
  expect(new Collection(inputData)).toEqual(outputData);
});
