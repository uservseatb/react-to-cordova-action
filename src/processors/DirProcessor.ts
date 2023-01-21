import {FileUtils} from "../utils/FileUtils";
import {Transformer} from "./Transformer";
import {UpdateFileProcessor} from "./UpdateFileProcessor";
import {ReactAppJsToCordovaTransformer} from "./ReactAppJsToCordovaTransformer";
import {ReactAppHtmlToCordovaTransformer} from "./ReactAppHtmlToCordovaTransformer";

const RENDER_PART = '.render('
const GET_ELEMENT_BY_ID_PART = '.getElementById('
const CREATE_ROOT_PART = '.createRoot('
const TO_BE_FIND_IN_JS = [RENDER_PART, GET_ELEMENT_BY_ID_PART, CREATE_ROOT_PART]
const ADD_JS_BEFORE = "document.addEventListener(\"deviceready\",(function(){"
const ADD_JS_AFTER = "}),!1)"
const ADD_HTML = "<script src='cordova.js'></script>"


export function processDir(dirName: string) {
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