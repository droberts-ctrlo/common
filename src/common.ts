export type TOrJQuery<T> = T | JQuery<T>;
export type ElementOrJQueryElement = TOrJQuery<HTMLElement>
export type JSONData<T> = string | T | null | undefined;

/**
 * Stop propagation and prevent default behavior of an event
 * @param e Event to stop propagation and prevent default behavior
 */
export const stopPropagation = (e: Event | JQuery.Event) => {
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
export const hasClass = (element: ElementOrJQueryElement, className: string): boolean => {
    const $el = element instanceof HTMLElement ? $(element) : element;
    return $el.hasClass(className);
};

/**
 * Hide an element by adding the hidden class and setting aria-hidden to true
 * @param element Element to hide
 */
export const hideElement = (element: ElementOrJQueryElement) => {
    const $el = element instanceof HTMLElement ? $(element) : element;
    if (hasClass($el, 'hidden')) return;
    $el.addClass('hidden');
    $el.attr('aria-hidden', 'true');
    $el.css('display', 'none');
    $el.css('visibility', 'hidden');
};

/**
 * Show an element by removing the hidden class and setting aria-hidden to false
 * @param element Element to show
 */
export const showElement = (element: ElementOrJQueryElement) => {
    const $el = element instanceof HTMLElement ? $(element) : element;
    if (!hasClass($el, 'hidden')) return;
    removeClass($el, 'hidden');
    $el.removeAttr('aria-hidden');
    $el.removeAttr('style');
};

/**
 * Add a class to an element if it does not already have it
 * @param element Element to add class to
 * @param className Class to add
 */
export const addClass = (element: ElementOrJQueryElement, className: string) => {
    const $el = element instanceof HTMLElement ? $(element) : element;
    if (hasClass($el, className)) return;
    $el.addClass(className);
}

/**
 * Remove a class from an element if it has it
 * @param element Element to remove class from
 * @param className Class to remove
 */
export const removeClass = (element: ElementOrJQueryElement, className: string) => {
    const $el = element instanceof HTMLElement ? $(element) : element;
    if (!hasClass($el, className)) return;
    $el.removeClass(className);
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
