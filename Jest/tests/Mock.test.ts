import { config } from "../src/mockedModules/mocked";

describe("Mock return different values", () => {

    it("mock return 10", () => {
        const mock = jest.fn()
        mock.mockReturnValueOnce(10);
        expect(mock()).toEqual(10);
    })

    it("mock return 10 and then return Cat", () => {
        const mock = jest.fn()
        mock.mockReturnValueOnce(10);
        mock.mockReturnValueOnce("Cat");
        expect(mock()).toEqual(10);
        expect(mock()).toEqual("Cat");
        expect(mock.mock.calls.length).toBe(2);
    })
    it("mock test if function runs arguments with correct values", () => {

    })
})