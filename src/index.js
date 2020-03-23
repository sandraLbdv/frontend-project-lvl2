import fs from 'fs';
import path from 'path';
import parse from './parsers';
import makeAst from './makeAst';
import { render, plain, json } from './formatters';

const readFile = (filePath) => {
  const fullFilePath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullFilePath, 'utf-8');
  return data;
};

const formatAst = (format, ast) => {
  switch (format) {
    case 'plain':
      return plain(ast);
    case 'json':
      return json(ast);
    default:
      return render(ast);
  }
};

export default (filePath1, filePath2, format) => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);

  const parsedData1 = parse(filePath1, data1);
  const parsedData2 = parse(filePath2, data2);

  const ast = makeAst(parsedData1, parsedData2);

  const result = formatAst(format, ast);
  console.log(result);
  return result;
};
