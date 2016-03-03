
import * as VFile from "vfile";
import * as unified from "unified";

let x = unified({ name: "test", Parser: () => { }, Compiler: () => { } });
x.use((p, o) => () => { });
x.stringify();
