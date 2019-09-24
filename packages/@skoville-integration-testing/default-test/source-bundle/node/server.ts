import * as express from 'express';
import {renderedPage} from './wording';

var thePage= renderedPage;

const app = express();
app.get("/hello-world", (_req, res) => {
    res.type("html");
    res.send(thePage);
});

const port = 8000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

if(module.hot) {
    console.log("hot module replacement enabled");
    module.hot.accept("./wording", () => {
        thePage = require('./wording').renderedPage;
    });
}