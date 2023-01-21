import fs from "fs";

export class FileUtils {
    static walk(dirName: string, filter?: string[]): string[] {
        let results: string[] = [];
        const list = fs.readdirSync(dirName);
        list.forEach(function (file) {
            file = dirName + '/' + file;
            file = file.replace("//", "/")
            const stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                results = results.concat(FileUtils.walk(file));
            } else {
                results.push(file);
            }
        });
        return results;
    }

    static fileExtension(fileName: string): string {
        const dotIndex = fileName.lastIndexOf(".")
        return dotIndex > -1
            ? fileName.substring(fileName.lastIndexOf(".") + 1)
            : ""

    }
}
