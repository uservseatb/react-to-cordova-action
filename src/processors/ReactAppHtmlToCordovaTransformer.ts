import {Transformer, TransformerResult} from "./Transformer";

const CLOSING_SCRIPT_TAG = "</script>"
const ADDED_SCRIPT = "<script src=\"cordova.js\"></script>"

export class ReactAppHtmlToCordovaTransformer implements Transformer {
    transform(content: string): TransformerResult {
        let scriptTagIndex = content.indexOf(CLOSING_SCRIPT_TAG);
        if (scriptTagIndex > -1) {
            const updatedContent = content.substring(0, scriptTagIndex + CLOSING_SCRIPT_TAG.length) +
                ADDED_SCRIPT +
                content.substring(scriptTagIndex + CLOSING_SCRIPT_TAG.length);
            return ReactAppHtmlToCordovaTransformerResult.ofSuccess(updatedContent);
        } else {
            return ReactAppHtmlToCordovaTransformerResult.ofFail();
        }
    }
}

export class ReactAppHtmlToCordovaTransformerResult implements TransformerResult {
    private content?: string

    private constructor(content?: string) {
        this.content = content
    }

    static ofSuccess(content: string) {
        return new ReactAppHtmlToCordovaTransformerResult(content)
    }

    static ofFail() {
        return new ReactAppHtmlToCordovaTransformerResult()
    }

    success(): boolean {
        return this.content != undefined;
    }

    getUpdatedContent(): string {
        if (!this.success() || !this.content) {
            throw new Error("cannot get updated content of un-success transformer result")
        }
        return this.content;
    }
}