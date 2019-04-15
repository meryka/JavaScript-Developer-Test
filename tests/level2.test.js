import Collection from "../src/level2";
import fs from "fs";

test("Testing a single line", () => {
  const singleLine = "1				  ATIVO    1120807,67D		527.081,41					464.716,15			1.183.172,93D					";
  const expected = [
    {
      description: "ATIVO",
      classifier: "100000",
      openingBalance: 1120807.67,
      debit: 527081.41,
      credit: 464716.15,
      finalBalance: 1183172.93,
      parent: null
    }
  ];
  expect(new Collection(singleLine)).toMatchObject(expected);
});

test("Testing multiple lines", () => {
  const lines =
    "1				  ATIVO							1.120.807,67D		527.081,41					464.716,15			1.183.172,93D	      			\n1.1				     Ativo Circulante							130.288,57D		527.081,41					464.716,15			192.653,83D					\n1.1.1				        Caixa							4.000,98D		104.653,71					108.648,69			6,00D     ";
  const expected = [
    {
      description: "ATIVO",
      classifier: "100000",
      openingBalance: 1120807.67,
      debit: 527081.41,
      credit: 464716.15,
      finalBalance: 1183172.93,
      parent: null
    },
    {
      description: "Ativo Circulante",
      classifier: "110000",
      openingBalance: 130288.57,
      debit: 527081.41,
      credit: 464716.15,
      finalBalance: 192653.83,
      parent: "100000"
    },
    {
      description: "Caixa",
      classifier: "111000",
      openingBalance: 4000.98,
      debit: 104653.71,
      credit: 108648.69,
      finalBalance: 6.0,
      parent: "110000"
    }
  ];
  expect(new Collection(lines)).toEqual(expected);
});

test("Testing a line ending with \\n", () => {
  const singleLine =
    "1.1.2.05				           Bradesco Conta Poupanca:9999999-9							39.053,87D		5.073,15					76,77			44.050,25D					\n";
  const expected = [
    {
      description: "Bradesco Conta Poupanca:9999999-9",
      classifier: "112050",
      openingBalance: 39053.87,
      debit: 5073.15,
      credit: 76.77,
      finalBalance: 44050.25,
      parent: "112000"
    }
  ];
  expect(new Collection(singleLine)).toMatchObject(expected);
});

test("Testing with an input file", () => {
  const inputFile = "./tests/test-files/level2-input.txt";
  const inputData = fs.readFileSync(inputFile).toString();
  const outputFile = "./tests/test-files/level2-output.txt";
  const output = fs.readFileSync(outputFile).toString();
  const outputData = JSON.parse(output);
  expect(new Collection(inputData)).toEqual(outputData);
});
