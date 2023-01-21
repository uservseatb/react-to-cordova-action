import {Transformer, TransformerResult} from "./Transformer";

export class ReactAppHtmlToCordovaTransformer implements Transformer {
    transform(content: string): TransformerResult {
        return ReactAppHtmlToCordovaTransformerResult.ofSuccess();
    }
}

export class ReactAppHtmlToCordovaTransformerResult implements TransformerResult {
    private constructor() {
    }

    static ofSuccess() {
        return new ReactAppHtmlToCordovaTransformerResult()
    }

    success(): boolean {
        return true;
    }

    getUpdatedContent(): string {
        return "";
    }
}