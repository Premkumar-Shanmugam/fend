import { handleSubmit, onBlur } from "../src/client/js/formHandler"

describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();

        // const mockEvent = {
        //     preventDefault: jest.fn(() => {})
        // };

        // let element = { innerHTML: '' };
        // let getElementMock = jest.spyOn(document, "getElementById").mockReturnValue(element)
        
        // handleSubmit(mockEvent)
        // expect(mockEvent.preventDefault).toBeCalled()
        // expect(getElementMock.innerHTML).toBe('')
    })
});


describe("Testing the onBlur functionality", () => {
    test("onBlur() function should be defined", () => {
        expect(onBlur).toBeDefined();
    })
});
