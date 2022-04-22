#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
if (!process.argv[2])
    throw new Error("Input file not specified");
const input = fs_1.default.readFileSync(process.argv[2], "utf8");
const output = process.argv[3];
const functions = {};
let stream = [];
let compiled = "";
stream = input.split("^f");
compiled = "";
for (let i of stream) {
    if (i.includes("f^")) {
        const name = i.split("(")[0].replaceAll(" ", "");
        const parameters = i
            .split("(")[1]
            .split(")")[0]
            .split(",")
            .map((v) => v.replaceAll(" ", ""));
        functions[name] = new Function(...parameters, i.split(")")[1].split("f^")[0]);
        append(i.split("f^")[1]);
    }
    else
        append(i);
}
stream = compiled.split("^-");
compiled = "";
for (const i of stream) {
    if (i.includes("-^")) {
        eval(`Object.assign(global, functions);\n${i.split("-^")[0]}`);
        append(i.split("-^")[1]);
    }
    else
        append(i);
}
stream = compiled.split("^(");
compiled = "";
for (const i of stream) {
    if (i.includes(")^")) {
        append(eval(`Object.assign(global, functions);\n${i.split(")^")[0]}`));
        append(i.split(")^")[1]);
    }
    else
        append(i);
}
fs_1.default.writeFileSync(output || process.argv[2].replace(".mds", ".md"), compiled);
function append(text) {
    compiled += text;
}
function appendl(text) {
    compiled += `${text}\n`;
}
