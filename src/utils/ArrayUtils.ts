export class ArrayUtils {
    static distinctArray(array): Array<string> {
        return Array.of(...new Map(array.map(i => [i, i])).values()) as string[]
    }
}