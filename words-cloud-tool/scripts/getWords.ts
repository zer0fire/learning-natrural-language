const fs = require("fs-extra");
const { Command } = require("commander");
const path = require("path");
// import fs from "fs-extra";
// import { Command } from "commander";
// import path from "path";

const cwd = process.cwd();
const program = new Command();

async function getWordsJson(pathStr: string) {
  try {
    const filePath = path.join(cwd, pathStr);
    const file = await fs.readFile(filePath);
    // console.log(file.toString());
    return file.toString();
  } catch (e) {
    console.log("read file fail");
    process.exit(0);
  }
}

const main = () => {
  program
    .version("1.0.0")
    .command("generate")
    .argument("<path>", "the file path of words contents")
    .description("Get word.json from public folder")
    .action(async (pathStr: string) => {
      // console.log(pathStr);
      const strContent: string = await getWordsJson(pathStr);
      // console.log(json);

      const map: { [key: string]: number } = {};
      // strContent.match(/\w+/g);

      strContent
        .split(" ")
        .filter((it) => it !== "\n")
        .map((it) => {
          return it.replace(/[,.-\s]/g, "");
        })
        .forEach((word: string) => {
          if (map[word]) {
            map[word]++;
          } else {
            map[word] = 1;
          }
        });
      const list = Object.entries(map).map((entry, idx) => ({
        value: entry[1],
        name: idx,
        text: entry[0],
      }));
      fs.writeJSON(path.join(cwd, "/public/word.json"), list);
    });
  program.parse(process.argv);
};

main();
