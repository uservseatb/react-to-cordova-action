import {FileProcessor, ProcessResult, ProcessStatus} from "./FileProcessor";
import {Transformer, TransformerResult} from "./Transformer";
import * as fs from "fs";

export class UpdateFileProcessor implements FileProcessor {
    private fileName: string

    constructor(fileName: string) {
        this.fileName = fileName
    }

    process(transformer: Transformer): ProcessResult {
        const fileContent: string = fs.readFileSync(this.fileName).toString();
        const transformResult: TransformerResult = transformer.transform(fileContent)
        if (transformResult.success()) {
            let updatedContent = transformResult.getUpdatedContent()
            fs.writeFileSync(this.fileName, updatedContent)
            return {
                status: ProcessStatus.SUCCESS,
                message: `successfully processed the file ${this.fileName}`
            };
        } else {
            return {
                status: ProcessStatus.FAIL,
                message: `the file ${this.fileName} can not be processed`
            };
        }
    }
}