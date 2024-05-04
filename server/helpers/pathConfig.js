import fs from "fs";
import path from "path";

// retrieves the contents from a file on the file system
export const getFileContents = (files, folder = "") => {
  // concat inline styles for document <head>
  let flattenedContents = "";
  files.forEach(function(file) {
    flattenedContents += fs.readFileSync(
      path.resolve(__dirname) + folder + file
    );
  });
  return flattenedContents;
};

export const defaultPathConfig = {
  view: "index",
  inlineStyles: getFileContents(
    ["/inline.css"],
    `/../../${process.env.outputFolder}`
  ),
  remoteStyles: [
    "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&display=swap",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.google.com/specimen/M+PLUS+Rounded+1c?icon.style=Outlined&subset=japanese&noto.script=Hira",
    "https://fonts.google.com/noto/specimen/Noto+Sans+KR?icon.style=Outlined&subset=korean&noto.script=Kore",
    "/style.css"
  ],
  vendorScripts: ["/vendors~main.js"],
  remoteScripts: ["/main.js"]
};
