console.log("index.ts is running");
import { containerElement } from './hmr-test';
document.body.append(containerElement);
if (module.hot) {
    console.log("module is hot"); 
}
console.log("hello world");