import fs from "fs";

if (!process.argv[2]) throw new Error("Input file not specified");

const input = fs.readFileSync(process.argv[2], "utf8");
const output = process.argv[3];
let stream = [];
let compiled = "";

stream = input.split("^-");
for (const i of stream) {
  if (i.includes("-^")) {
    eval(i.split("-^")[0]);
    append(i.split("-^")[1]);
  } else append(i);
}
stream = compiled.split("^(");
compiled = "";
for (const i of stream) {
  if (i.includes(")^")) {
    append(eval(i.split(")^")[0]));
    append(i.split(")^")[1]);
  } else append(i);
}

fs.writeFileSync(output || process.argv[2].replace(".mds", ".md"), compiled);

function append(text: string) {
  compiled += text;
}
function appendl(text: string) {
  compiled += `${text}\n`;
}
