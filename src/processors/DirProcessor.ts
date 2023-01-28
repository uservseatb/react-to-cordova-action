import {FileUtils} from "../utils/FileUtils";
import {Transformer} from "./Transformer";
import {ReactAppHtmlToCordovaTransformer} from "./ReactAppHtmlToCordovaTransformer";
import {ReactAppJsToCordovaTransformer} from "./ReactAppJsToCordovaTransformer";
import {UpdateFileProcessor} from "./UpdateFileProcessor";
import {CordovaConfigXmlSetVersionTransformer} from "./CordovaConfigXmlSetVersionTransformer";

export function processDir(dirName: string, transformerNames: string[], tagName?: string) {
    console.log("start process")

    const availableTransformers = {
        "reactjs": new ReactAppJsToCordovaTransformer(),
        "reacthtml": new ReactAppHtmlToCordovaTransformer(),
        "cordovaconfig": new CordovaConfigXmlSetVersionTransformer({version: tagName})
    }

    const transformers = {}
    transformerNames
        .flatMap(tn => {
            const transformer = (availableTransformers[tn] as Transformer)
            const extensions: string[] = transformer.acceptedFileExtensions()
            return extensions.map(ext => {
                return [ext, transformer]
            })
        })
        .forEach(mapping => {
            transformers[mapping[0] as string] = mapping[1]
        })

    console.log(transformers)

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