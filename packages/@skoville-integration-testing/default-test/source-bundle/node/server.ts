import * as express from 'express';
import {renderedPage} from './wording';

var thePage= renderedPage;

const app = express();
app.get("/hello-world", (_req, res) => {
    res.type("html");
    res.send(thePage);
});
app.listen(8000, () => {
    console.log("listening");
});

if(module.hot) {
    console.log("module is hot");
    module.hot.accept("./wording", () => {
        thePage = require('./wording').renderedPage;
    });
}