#!/usr/bin/env node
import fs from "fs";
import path from "path";
import assert from "assert";

if (!process.argv[2]) throw new Error("Input file is not specified");

const input = fs.readFileSync(path.resolve(".", process.argv[2]), "utf8");
const output = process.argv[3];
const functions: Record<string, Function> = {};
let stream: string[] = [];
let compiled = "";

stream = input.split("^f");
compiled = "";
for (let i of stream)
  if (i.includes("f^")) {
    const def = i.split("\n");
    const header = def.shift();
    assert(header !== undefined, "Function without header.");
    const name = header.split("(")[0].replaceAll(" ", "");
    functions[name] = new Function(
      header.match(/\(([^()]*)\)/)![1],
      def.join("\n").split("f^")[0]
    );
    append(i.split("f^")[1]);
  } else append(i);
stream = compiled.split("^-");
compiled = "";
for (const i of stream)
  if (i.includes("-^")) {
    eval(`Object.assign(global, functions);\n${i.split("-^")[0]}`);
    append(i.split("-^")[1]);
  } else append(i);
stream = compiled.split("^(");
compiled = "";
for (const i of stream)
  if (i.includes(")^")) {
    append(eval(`Object.assign(global, functions);\n${i.split(")^")[0]}`));
    append(i.split(")^")[1]);
  } else append(i);

fs.writeFileSync(output || process.argv[2].replace(".mds", ".md"), compiled);

function append(text: string) {
  compiled += text;
}
function appendl(text: string) {
  append(`${text}\n`);
}
