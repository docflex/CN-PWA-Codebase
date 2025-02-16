const { addNumbers } = require("../public/app.js");

// Mocking the `navigator` object
global.navigator = {
    serviceWorker: {
        register: jest.fn(() => Promise.resolve({})), // Mock register function
    },
};

test("adds 2 + 3 to equal 5", () => {
    expect(addNumbers(2, 3)).toBe(5);
});
