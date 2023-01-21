import {FileUtils} from "../src/utils/FileUtils";

test("should extract extension from file name", function () {
    let extensionDf = FileUtils.fileExtension("sdafgs/adfgsdfd/gsdfg/tsdfgmp.df");
    let extensionJs = FileUtils.fileExtension("ewr/fdgers/dasd1sp.js");
    let extensionHtml = FileUtils.fileExtension("sd34rep.html");
    let noExtension = FileUtils.fileExtension("sdafgs/adfgsdfd/gsdfg/tsdfgmp");
    let emptyFileExtension = FileUtils.fileExtension("");
    expect(extensionDf).toEqual("df")
    expect(extensionJs).toEqual("js")
    expect(extensionHtml).toEqual("html")
    expect(noExtension).toEqual("")
    expect(emptyFileExtension).toEqual("")
})

test("should return all of the files inside of a directory", function () {
    const files = FileUtils.walk("__test__/data/js")
    expect(files).toHaveLength(5)
    expect(files[0]).toEqual("__test__/data/js/fragment.js")
    expect(files[1]).toEqual("__test__/data/js/fulljs/app.js")
    expect(files[2]).toEqual("__test__/data/js/fulljs/index.js")
    expect(files[3]).toEqual("__test__/data/js/fulljs/prod_index.js")
    expect(files[4]).toEqual("__test__/data/js/prod_fragment.js")
})