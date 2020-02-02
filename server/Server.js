import express from 'express';
import fs from "fs";
import path from 'path';

import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./../src/App";
const PORT = 8000;

const app = express(); //create express app

// define row for this app
app.use('^/$', (req, res, next) => {
    //read our built index.html file
    fs.readFile(path.resolve("./build/index.html"), 'utf-8', (err, data) => {
        //if there is error
        if(err) {
            console.log(err);
            return res.status(500).send("some error happend")
        }
        //render root div and replace it with build index
        return res.send(data.replace('<div id="root"></div>', `<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`));
    })
});

app.use(express.static(path.resolve(__dirname, "..", 'build')));
app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
});

