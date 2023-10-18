import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchArticleById } from "./fetchArticleById";
import { defaultArticleDetails } from "entities/Article/model/selectors/articleDetails";

describe("fetchArticleById.test", () => {
    test("successful", async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: defaultArticleDetails }));

        const result = await thunk.callTrunk("1232");

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(result.payload).toEqual(defaultArticleDetails);
    })

    test("error", async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 404 }));

        const result = await thunk.callTrunk("1232");

        expect(result.meta.requestStatus).toBe("rejected");
    })
})