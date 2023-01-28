export interface Transformer {
    acceptedFileExtensions(): string[]

    transform(content: string): TransformerResult
}

export interface TransformerResult {
    success(): boolean

    getUpdatedContent(): string
}