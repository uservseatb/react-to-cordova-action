import {ArrayUtils} from "../src/utils/ArrayUtils";

test("should distinct an array", function () {
    const undistinctArray = ["234", "rgt3", "234", "875645", "asd2", "rgt3", "rgt3", "23fr"]
    const distinctArray = ["234", "rgt3", "875645", "asd2", "23fr"]
    const emptyArray = []

    expect(ArrayUtils.distinctArray(undistinctArray))
        .toEqual(["234", "rgt3", "875645", "asd2", "23fr"])

    expect(ArrayUtils.distinctArray(distinctArray))
        .toEqual(["234", "rgt3", "875645", "asd2", "23fr"])

    expect(ArrayUtils.distinctArray(emptyArray))
        .toEqual([])
})
