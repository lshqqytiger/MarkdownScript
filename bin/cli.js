#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const assert_1 = __importDefault(require("assert"));
if (!process.argv[2])
    throw new Error("Input file is not specified");
const input = fs_1.default.readFileSync(path_1.default.resolve(".", process.argv[2]), "utf8");
const output = process.argv[3];
const functions = {};
let stream = [];
let compiled = "";
stream = input.split("^f");
compiled = "";
for (let i of stream)
    if (i.includes("f^")) {
        const def = i.split("\n");
        const header = def.shift();
        (0, assert_1.default)(header !== undefined, "Function without header.");
        const name = header.split("(")[0].replaceAll(" ", "");
        functions[name] = new Function(header.match(/\(([^()]*)\)/)[1], def.join("\n").split("f^")[0]);
        append(i.split("f^")[1]);
    }
    else
        append(i);
stream = compiled.split("^-");
compiled = "";
for (const i of stream)
    if (i.includes("-^")) {
        eval(`Object.assign(global, functions);\n${i.split("-^")[0]}`);
        append(i.split("-^")[1]);
    }
    else
        append(i);
stream = compiled.split("^(");
compiled = "";
for (const i of stream)
    if (i.includes(")^")) {
        append(eval(`Object.assign(global, functions);\n${i.split(")^")[0]}`));
        append(i.split(")^")[1]);
    }
    else
        append(i);
fs_1.default.writeFileSync(output || process.argv[2].replace(".mds", ".md"), compiled);
function append(text, end = "") {
    compiled += text + end;
}
function appendl(text) {
    append(text, "\n");
}
