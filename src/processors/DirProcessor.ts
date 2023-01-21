import {FileUtils} from "../utils/FileUtils";
import {Transformer} from "./Transformer";
import {UpdateFileProcessor} from "./UpdateFileProcessor";
import {ReactAppJsToCordovaTransformer} from "./ReactAppJsToCordovaTransformer";
import {ReactAppHtmlToCordovaTransformer} from "./ReactAppHtmlToCordovaTransformer";

export function processDir(dirName: string) {
    console.log("start process")
    const transformers = {
        "js": new ReactAppJsToCordovaTransformer(),
        "html": new ReactAppHtmlToCordovaTransformer()
    }

    FileUtils
        .walk(dirName, ["js", "html"])
        .forEach(fileName => {
            console.log("processing ", fileName)
            const extension = FileUtils.fileExtension(fileName)
            const transformer: Transformer | undefined = transformers[extension]
            if (transformer) {
                let processResult = new UpdateFileProcessor(fileName).process(transformer);
                console.log(processResult)
            } else {
                console.log("no transformer for ", fileName)
            }
        })
}