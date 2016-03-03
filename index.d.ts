import * as VFile from "vfile";

/** Construct a new Processor class based on the given options. */
declare function unified(options: unified.IOptions): unified.Processor;
declare namespace unified {

    export interface IOptions {
        /** Unique namespace, e.g. 'mdast' or 'retext'. */
        name: string;
        /** JSON.stringifyable dictionary providing information to Parser, Compiler, and plug-ins. */
        data?: Object;
        /**
         * Constructor which transforms a virtual file into a syntax tree.
         * When input is parsed, this function will be constructed with a file, settings, and the processor.
         * Parser instances must have a parse method which returns a node (an object with a type property).
         */
        Parser: Function;
        /**
         * Constructor which transforms a node into a string.
         * When input is compiled, this function will be constructed with a file, settings, and the processor.
         * Compiler instances must have a compile method which returns a string.
         */
        Compiler: Function;
    }

    /** Node represents any unit in NLCST hierarchy. */
    export interface Node {
        /** The string name of the node type */
        type: string;
        /** Data associated with any node, must be stringifyable. */
        data: Object;
        /** Children Node that only exists on a Parent Node */
        children?: Node[];
        /** The value of the node, only exists on Text Nodes */
        value?: string;
    }


    export class Processor {
        /**
         * Note that all methods on the instance are also available as functions on the constructor, which, when invoked, create a new instance.
         * Thus, invoking new Processor().process() is the same as Processor.process().
         */
        constructor(processor: Processor);

        public data: any;
        /** Attach a plugin, returns either `context` or a new Processor instance. */
        public use(plugin: Processor.Attacher, options?: any): Processor;
        /** Attach a plugin, returns either `context` or a new Processor instance. */
        public use(plugins: Processor.Attacher[], options?: any): Processor;

        /**
         * Transform.
         *
         * @param [node] - Syntax tree.
         * @param [file] - Virtual file.
         * @param [done] - Callback.
         */
        public run(node: Node, file: VFile, done: (error: Error, node: Node, file: VFile) => any): Node;
        /**
         * Parse a file. Patches the parsed node onto the `name` namespace on the `type` property.
         * @param value - Input to parse.
         * @param [settings] - Configuration.
         */
        public parse(value: string | VFile, settings?: any): Node;
        /**
         * Compile a file. Used the parsed node at the `name` namespace at `'tree'` when no node was given.
         *
         * @param [node] - Syntax tree.
         * @param [file] - File with syntax tree.
         * @param [settings] - Configuration.
         */
        public stringify(node?: Node, file?: VFile, settings?: any): string;

        /**
         * Parse / Transform / Compile.
         *
         * @param value - Input to process.
         * @param [settings] - Configuration.
         * @param [done] - Callback.
         */
        public process(value: string | VFile, settings?: any, done?: Processor.ProcessCallback): string;
        /**
         * Parse / Transform / Compile.
         *
         * @param value - Input to process.
         * @param [done] - Callback.
         * @return - Parsed document, when transformation was async.
         */
        public process(value: string | VFile, done?: Processor.ProcessCallback): string;
    }
    export namespace Processor {
        export type ProcessCallback = (err: Error, file: VFile, result: string) => any;
        export type Transformer = (tree: Node, file: VFile, next?: Function) => any;
        export type Attacher = (processor: Processor, options?: any) => Transformer;
    }
}

export = unified;
