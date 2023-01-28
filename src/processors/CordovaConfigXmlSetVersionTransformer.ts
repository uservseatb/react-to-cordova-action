import {Transformer, TransformerResult} from "./Transformer";

const MARK_OF_THE_CORDOVA_CONFIG_FILE = 'xmlns:cdv="http://cordova.apache.org'
const VERSION_PART = 'version="'

type CordovaConfigXmlSetVersionTransformerContext = {
    version?: string
}

export class CordovaConfigXmlSetVersionTransformer implements Transformer {
    private context: CordovaConfigXmlSetVersionTransformerContext

    constructor(context: CordovaConfigXmlSetVersionTransformerContext) {
        this.context = context
    }

    transform(content: string): TransformerResult {
        return this.processCordovaConfigXmlFile(content)
    }

    acceptedFileExtensions(): string[] {
        return ['xml'];
    }

    private processCordovaConfigXmlFile(fileContent: string): CordovaConfigXmlSetVersionTransformerResult {
        const isCordovaXmlConfigFile = fileContent.indexOf(MARK_OF_THE_CORDOVA_CONFIG_FILE) > -1
        const startIndexOfVersion = fileContent.indexOf(VERSION_PART) + VERSION_PART.length
        const endIndexOfVersion = fileContent.indexOf('"', startIndexOfVersion)

        if (
            isCordovaXmlConfigFile &&
            startIndexOfVersion > -1 &&
            endIndexOfVersion > -1
        ) {
            const result = fileContent.substring(0, startIndexOfVersion) +
                this.context.version +
                fileContent.substring(endIndexOfVersion)
            return CordovaConfigXmlSetVersionTransformerResult.ofSuccess(result)
        } else {
            return CordovaConfigXmlSetVersionTransformerResult.ofFailed()
        }
    }
}

class CordovaConfigXmlSetVersionTransformerResult implements TransformerResult {
    private fileContent?: string

    private constructor(fileContent?: string) {
        if (fileContent) this.fileContent = fileContent
    }

    static ofSuccess(fileContent: string): CordovaConfigXmlSetVersionTransformerResult {
        return new CordovaConfigXmlSetVersionTransformerResult(fileContent)
    }

    static ofFailed(): CordovaConfigXmlSetVersionTransformerResult {
        return new CordovaConfigXmlSetVersionTransformerResult()
    }

    success(): boolean {
        return this.fileContent != undefined;
    }

    getUpdatedContent(): string {
        if (!this.success() || !this.fileContent) {
            throw new Error("cannot get updated content of un-success transformer result");
        }
        return this.fileContent;
    }
}