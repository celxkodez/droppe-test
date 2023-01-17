import APIClientRequest from "./APIClientRequest";

const postArray:{ price: number; description: string; id: number; title: string }[] = [
    {
        id: 1,
        title: 'Test Title 1',
        description: 'Test Description 1',
        price: 500
    },
    {
        id: 2,
        title: 'Test Title 2',
        description: 'Test Description 2',
        price: 500
    },
    {
        id: 3,
        title: 'Test Title 3',
        description: 'Test Description 3',
        price: 500
    },
];

beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(
        jest.fn(
            () => Promise.resolve({
                json: () => Promise.resolve(postArray),
            }),
        ) as jest.Mock )
});

afterEach(() => {
    jest.clearAllMocks();
});
export default describe('Test Api Client Request', () => {

    it('should return a valid promise response', function () {
        const clientRequest: Promise<any> = APIClientRequest('https://localhost/#')

        expect(clientRequest).resolves.toBeTruthy()

        clientRequest.then(data => {
            expect(data).toBeTruthy()
            expect(data).toEqual(postArray)
        })
    });
});