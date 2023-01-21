import {Transformer, TransformerResult} from "./Transformer";
import {ArrayUtils} from "../utils/ArrayUtils";

const RENDER_PART = '.render('
const GET_ELEMENT_BY_ID_PART = '.getElementById('
const CREATE_ROOT_PART = '.createRoot('
const TO_BE_FIND_IN_JS = [RENDER_PART, GET_ELEMENT_BY_ID_PART, CREATE_ROOT_PART]
const ADD_JS_BEFORE = "document.addEventListener(\"deviceready\",(function(){"
const ADD_JS_AFTER = "}),!1)"


export class ReactAppJsToCordovaTransformer implements Transformer {
    transform(content: string): TransformerResult {
        return ReactAppJsToCordovaTransformer.processJsFile(content)
    }

    private static processJsFile(jsFileContent: string): ReactAppJsToCordovaTransformerResult {
        const fileContentAsList: string[] = jsFileContent.split(";")
        const filteredContent = {}
        for (let i = 0; i < fileContentAsList.length; i++) {
            const current = fileContentAsList[i].replaceAll("\n", "")
            if (current.trim() === '\n') continue
            TO_BE_FIND_IN_JS.forEach(se => {
                if (current.indexOf(se) > -1) {
                    filteredContent[i] = current
                    return false
                }
            })
        }

        const indiciesToCheck = Object.keys(filteredContent).reverse()

        const found = {}
        for (let i = 0; i < indiciesToCheck.length; i++) {
            if (Object.keys(found).length >= 3) {
                break
            }
            const currentLineNumber = indiciesToCheck[i]
            const currentLine = filteredContent[currentLineNumber]
            TO_BE_FIND_IN_JS.forEach(se => {
                if (currentLine.indexOf(se) > -1) {
                    found[se] = currentLineNumber
                    return false
                }
            })
        }

        const lines = ArrayUtils.distinctArray(Object.values(found)).sort()
        const firstLineNumber: number = +lines[0]
        const lastLineNumber: number = +lines[lines.length - 1]
        const linesCount = lastLineNumber - firstLineNumber + 1

        const canBeTransformed = !(Object.keys(found).length < 3 || linesCount > 2 || linesCount < 1)

        if (canBeTransformed) {
            return ReactAppJsToCordovaTransformerResult.ofSuccess(fileContentAsList, firstLineNumber, lastLineNumber)
        } else {
            return ReactAppJsToCordovaTransformerResult.ofFailed()
        }
    }
}

class ReactAppJsToCordovaTransformerResult implements TransformerResult {
    private fileContentAsList: string[] = []
    private firstLineNumber: number = 0
    private lastLineNumber: number = 0

    private constructor(data?: string[], firstLineNumber?: number, lastLineNumber?: number) {
        if (data) this.fileContentAsList = data
        if (firstLineNumber) this.firstLineNumber = firstLineNumber
        if (lastLineNumber) this.lastLineNumber = lastLineNumber
    }

    static ofSuccess(data: string[], firstLineNumber: number, lastLineNumber: number): ReactAppJsToCordovaTransformerResult {
        return new ReactAppJsToCordovaTransformerResult(data, firstLineNumber, lastLineNumber)
    }

    static ofFailed(): ReactAppJsToCordovaTransformerResult {
        return new ReactAppJsToCordovaTransformerResult()
    }

    success(): boolean {
        return this.fileContentAsList.length > 0;
    }

    getUpdatedContent(): string {
        if (!this.success()) {
            throw new Error("cannot get updated content of un-success transformer result")
        }

        this.fileContentAsList[this.firstLineNumber] = ADD_JS_BEFORE + this.fileContentAsList[this.firstLineNumber]

        const lastLineContent = this.fileContentAsList[this.lastLineNumber]
        const closeBracketOfRenderIndex = ReactAppJsToCordovaTransformerResult.indexOfCloseBracketOfRender(lastLineContent)
        this.fileContentAsList[this.lastLineNumber] = lastLineContent.substring(0, closeBracketOfRenderIndex + 1) +
            ADD_JS_AFTER +
            lastLineContent.substring(closeBracketOfRenderIndex + 1)

        return this.fileContentAsList.join(";")
    }

    private static indexOfCloseBracketOfRender(renderContainingString): number {
        const indexOfStartRenderBracket = renderContainingString.indexOf(RENDER_PART) + RENDER_PART.length - 1
        let stackIndex = 0
        for (let i = indexOfStartRenderBracket; i < renderContainingString.length; i++) {
            const currentLetter = renderContainingString[i]
            if (currentLetter === '(') {
                stackIndex++
            }
            if (currentLetter === ')') {
                stackIndex--
            }
            if (stackIndex === 0) {
                return i
            }
        }
        return -1
    }
}