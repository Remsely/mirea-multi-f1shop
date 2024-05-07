const eventListeners = {};

export const subscribeToEvent = (eventName, callback) => {
    if (!eventListeners[eventName]) {
        eventListeners[eventName] = [];
    }
    eventListeners[eventName].push(callback);
};

export const triggerEvent = (eventName, payLoad) => {
    if (eventListeners[eventName]) {
        eventListeners[eventName].forEach(callback => callback(payLoad));
    }
};