import { getQueryParams } from "./addQueryParams";

describe("addQueryParams", () => {
    test("with 1 param", () => {
        const res = getQueryParams({
            test: "value"
        });

        expect(res).toEqual("?test=value");
    })

    test("with 2 params", () => {
        const res = getQueryParams({
            test: "value",
            test2: "value2",
        });

        expect(res).toEqual("?test=value&test2=value2");
    })

    test("with an undefined param", () => {
        const res = getQueryParams({
            test: "value",
            test2: undefined,
        });

        expect(res).toEqual("?test=value");
    })
})