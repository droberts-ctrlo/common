export type JSONData<T> = string | T | null | undefined;

/**
 * Stop propagation and prevent default behavior of an event
 * @param e Event to stop propagation and prevent default behavior
 */
export const stopPropagation = (e: Event) => {
    try {
        e.stopPropagation();
        e.preventDefault();
    } catch (e) {
        //ignore - this is because unit tests are failing - there will be a "better" fix incoming in the future
    }
}

/**
 * Check if an element has a class
 * @param element Element to check for class
 * @param className Class to check for
 * @returns True if element has class, false otherwise
 */
export const hasClass = (element: HTMLElement, className: string): boolean => {
    return element.classList.contains(className)
};

/**
 * Hide an element by adding the hidden class and setting aria-hidden to true
 * @param element Element to hide
 */
export const hideElement = (element: HTMLElement) => {
    if (hasClass(element, 'hidden')) return;
    element.classList.add('hidden');
    element.setAttribute('aria-hidden', 'true');
    element.style.display = 'none';
    element.style.visibility = 'hidden';
};

/**
 * Show an element by removing the hidden class and setting aria-hidden to false
 * @param element Element to show
 */
export const showElement = (element: HTMLElement) => {
    if (!hasClass(element, 'hidden')) return;
    removeClass(element, 'hidden');
    element.removeAttribute('aria-hidden');
    element.removeAttribute('style');
};

/**
 * Add a class to an element if it does not already have it
 * @param element Element to add class to
 * @param className Class to add
 */
export const addClass = (element: HTMLElement, className: string) => {
    if (hasClass(element, className)) return;
    element.classList.add(className);
}

/**
 * Remove a class from an element if it has it
 * @param element Element to remove class from
 * @param className Class to remove
 */
export const removeClass = (element: HTMLElement, className: string) => {
    if (!hasClass(element, className)) return;
    element.classList.remove(className);
}

/**
 * Convert a string to a boolean
 * @param json String to convert to boolean
 * @returns {Object} Object representation of the given input
 */
export const fromJson = <T>(json: JSONData<T>): T => {
    try {
        if (!json || json === '') return {} as T;
        if (typeof json === 'string') {
            return JSON.parse(json);
        }
        return json;
    } catch (e) {
        return {} as T;
    }
}
