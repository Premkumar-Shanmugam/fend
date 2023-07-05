import { handleSubmit, onBlur } from "../src/client/js/formHandler"

const mockEvent = {
    preventDefault: jest.fn(() => {})
};

const elementMock = jest.fn(()=>{
    return {
        innerHTML: '',
        value: 'https://test.url'
    }
});

const getElementMock = jest.spyOn(document, "getElementById").mockReturnValue(elementMock)

const isValidUrlMock = jest.spyOn(Client, "isValidUrl").mockReturnValue(true)

describe("Testing the submit functionality", () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();
        handleSubmit(mockEvent)
        expect(mockEvent.preventDefault).toBeCalled()
        expect(getElementMock).toBeCalledWith('results')
        expect(elementMock.innerHTML).toBe('<br />Analysing...')
        expect(getElementMock).toBeCalledWith('url')
        expect(getElementMock).toBeCalledTimes(2)
        expect(isValidUrlMock).toBeCalledWith(elementMock.value)
        expect(fetch).toBeCalledWith(`http://localhost:8081/sentiment?url=${elementMock.value}`)
    })
});


describe("Testing the onBlur functionality", () => {
    test("onBlur() function", () => {
        expect(onBlur).toBeDefined();
        onBlur();
        expect(getElementMock).toBeCalledWith('results')
        expect(elementMock.innerHTML).toBe('')
        expect(getElementMock).toBeCalledWith('url')
        expect(getElementMock).toBeCalledTimes(2)
        expect(isValidUrlMock).toBeCalledWith(elementMock.value)
    })
});
