/*
What is debounce?
The term debounce comes from electronics. When you’re pressing a button, let’s say on your TV remote, the signal travels to the microchip of the remote so quickly that before you manage to release the button, it bounces, and the microchip registers your “click” multiple times.
*/
const debounce = (func, delay = 1000) => {
    let timeOutId;
    return (...args) => {
        if (timeOutId) {
            clearTimeout(timeOutId);
        }
        timeOutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

//http://www.omdbapi.com/?apikey=[yourkey]&
// const key = "3c4869fc";