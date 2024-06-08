import { describe, it, jest, expect } from "@jest/globals"
import { addClass, fromJson, hideElement, removeClass, showElement, stopPropagation } from "./common";

describe('common functions', () => {
    describe('event handling', () => {
        it('stops propagation', () => {
            const ev = {
                stopPropagation: jest.fn(),
                preventDefault: jest.fn()
            };
            stopPropagation(<any>ev);
            expect(ev.stopPropagation).toHaveBeenCalled();
            expect(ev.preventDefault).toHaveBeenCalled();
        });
    });

    describe('CSS and ARIA', () => {
        it('hides an element', () => {
            const classList = {
                contains: jest.fn().mockReturnValue(false),
                add: jest.fn()
            };
            const style = {
                display: '',
                visisbility: ''
            }
            const el = {
                classList,
                style,
                setAttribute: jest.fn()
            };
            hideElement(<any>el);
            expect(el.classList.contains).toHaveBeenCalledWith('hidden');
            expect(el.classList.add).toHaveBeenCalledWith('hidden');
            expect(el.setAttribute).toHaveBeenCalledWith('aria-hidden', 'true');
        });

        it('does not hide a hidden element', () => {
            const classList = {
                contains: jest.fn().mockReturnValue(true),
                add: jest.fn()
            };
            const el = {
                classList,
                setAttribute: jest.fn()
            };
            hideElement(<any>el);
            expect(el.classList.contains).toHaveBeenCalledWith('hidden');
            expect(el.classList.add).not.toHaveBeenCalled();
            expect(el.setAttribute).not.toHaveBeenCalled();
        });

        it('shows a hidden element', () => {
            const classList = {
                contains: jest.fn().mockReturnValue(true),
                remove: jest.fn()
            };
            const el = {
                classList,
                removeAttribute: jest.fn()
            };
            showElement(<any>el);
            expect(el.classList.contains).toHaveBeenCalledWith('hidden');
            expect(el.classList.remove).toHaveBeenCalledWith('hidden');
            expect(el.removeAttribute).toHaveBeenCalledWith('aria-hidden');
        });

        it('does not show a visible element', () => {
            const classList = {
                contains: jest.fn().mockReturnValue(false),
                remove: jest.fn()
            };
            const el = {
                classList,
                removeAttribute: jest.fn()
            };
            showElement(<any>el);
            expect(el.classList.contains).toHaveBeenCalledWith('hidden');
            expect(el.classList.remove).not.toHaveBeenCalled();
            expect(el.removeAttribute).not.toHaveBeenCalled();
        });

        it('adds a class', () => {
            const classList = {
                contains: jest.fn().mockReturnValue(false),
                add: jest.fn()
            };
            const el = {
                classList
            };
            addClass(<any>el, 'foo');
            expect(el.classList.contains).toHaveBeenCalledWith('foo');
            expect(el.classList.add).toHaveBeenCalledWith('foo');
        });

        it('does not add a class if it already exists', () => {
            const classList = {
                contains: jest.fn().mockReturnValue(true),
                add: jest.fn()
            };
            const el = {
                classList
            };
            addClass(<any>el, 'foo');
            expect(el.classList.contains).toHaveBeenCalledWith('foo');
            expect(el.classList.add).not.toHaveBeenCalled();
        });

        it('removes a class', () => {
            const classList = {
                contains: jest.fn().mockReturnValue(true),
                remove: jest.fn()
            };
            const el = {
                classList
            };
            removeClass(<any>el, 'foo');
            expect(el.classList.contains).toHaveBeenCalledWith('foo');
            expect(el.classList.remove).toHaveBeenCalledWith('foo');
        });

        it('does not remove a class if it does not exist', () => {
            const classList = {
                contains: jest.fn().mockReturnValue(false),
                remove: jest.fn()
            };
            const el = {
                classList
            };
            removeClass(<any>el, 'foo');
            expect(el.classList.contains).toHaveBeenCalledWith('foo');
            expect(el.classList.remove).not.toHaveBeenCalled();
        });
    });

    describe('JSON tests', () => {
        it('parses a JSON string', () => {
            const json = '{"foo":"bar"}';
            const parsed: any = fromJson(json);
            expect(parsed.foo).toEqual('bar');
        });

        it('parses a JSON object', () => {
            const json = { foo: "bar" };
            const parsed = fromJson(json);
            expect(parsed.foo).toEqual('bar');
        });

        it('returns an empty object for invalid JSON', () => {
            const json = "foo";
            const parsed = fromJson(json);
            expect(parsed).toEqual({});
        });

        it('returns an empty object for null', () => {
            const json = null;
            const parsed = fromJson(json);
            expect(parsed).toEqual({});
        });

        it('returns an empty object for undefined', () => {
            const json = undefined;
            const parsed = fromJson(json);
            expect(parsed).toEqual({});
        });
    });
});
