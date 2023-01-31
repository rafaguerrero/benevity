import { setCookieData, getCookieData, removeCookieData } from './index';

describe('Utils Data', () => {
    let cookieJar;

    beforeEach(() => {
        cookieJar = "";
        jest.spyOn(document, 'cookie', 'set').mockImplementation(cookie => (cookieJar += cookie));
        jest.spyOn(document, 'cookie', 'get').mockImplementation(() => cookieJar);
        
        const DATE_TO_USE = new Date("Tue, 31 Jan 2023 22:00:00 GMT");
        global.Date = jest.fn(() => DATE_TO_USE);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('setCookieData', () => {
        it('Set expires if exist', () => {
            setCookieData('test', "1234", 5*1000*60*60*24);

            expect(cookieJar).toEqual("test=1234;expires=Sun, 05 Feb 2023 22:00:00 GMT;");
        });

        it('Set cookie without expire', () => {
            setCookieData('test', "1234");

            expect(cookieJar).toEqual("test=1234;");
        });
    });

    describe('getCookieData', () => {
        beforeEach(() => {
            cookieJar = "test=1234; test2=5678; test3=90; ";
        });

        it('Get data if exists', () => {
            expect(getCookieData('test')).toEqual("1234");
        });

        it('Return null if cookie doesn\'t exist', () => {
            expect(getCookieData('test6')).toBeNull();
        });
    });

    describe('removeCookieData', () => {
        beforeEach(() => {
            cookieJar = "test=1234; test2=5678; test3=90; ";
        });

        it('Remove cookies by setting it\'s time to 0', () => {
            removeCookieData('test');

            expect(cookieJar).toEqual("test=1234; test2=5678; test3=90; test=;");
        });
    });
});