export interface Transformer {
    transform(content: string): TransformerResult
}

export interface TransformerResult {
    success(): boolean

    getUpdatedContent(): string
}