import {Transformer} from "./Transformer";

export type ProcessResult = {
    status: ProcessStatus,
    message?: string
}

export enum ProcessStatus {
    SUCCESS,
    FAIL
}

export interface FileProcessor {
    process(transformer: Transformer): ProcessResult
}
