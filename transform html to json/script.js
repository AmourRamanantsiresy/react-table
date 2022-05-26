const fs = require("fs");

let dataf = [];
let count = 0;
fs.readFile("data.txt", "utf-8", (err, data) => {
    let array = data.split('<tr>'), result = [];
    for (let i of array) {
        let temp = [];
        let g = i.split("</td>");
        for (let a = 0; a <= 5; a++) {
            temp.push(g[a].slice(6, g[a].length));
        }
        dataf.push(temp);
    }
    fs.writeFile('../src/result.json', JSON.stringify(dataf), () => { console.log("succes"); })
})

