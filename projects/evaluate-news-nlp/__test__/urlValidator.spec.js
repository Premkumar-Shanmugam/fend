import { isValidUrl } from "../src/client/js/urlValidator"
const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe("Testing the URL Validator functionality", () => {

    afterEach(() => {
        jest.clearAllMocks();
    })
    
    test("isValidUrl should be defined", () => {
          expect(isValidUrl).toBeDefined();
    })

    test("empty url should be handled", () => {
        expect(isValidUrl('')).toBe(false);
        expect(alertMock).toBeCalledWith('URL is required.')
        expect(alertMock).toHaveBeenCalledTimes(1)
    })

    test("invalid url should be handled", () => {
        expect(isValidUrl('this is an invalid url')).toBe(false);
        expect(alertMock).toBeCalledWith('Invalid URL !')
        expect(alertMock).toHaveBeenCalledTimes(1)
    })

    test("valid url should be handled", () => {
        expect(isValidUrl('http://valid-url.com/path/')).toBe(true);
        expect(alertMock).not.toHaveBeenCalled()
    })
});
