import { describe, it, vi, expect } from "vitest"
import { addClass, fromJson, hideElement, removeClass, showElement, stopPropagation } from "./common";

describe('common functions', () => {
    describe('event handling', () => {
        it('stops propagation', () => {
            const ev = {
                stopPropagation: vi.fn(),
                preventDefault: vi.fn(),
            };
            stopPropagation(<any>ev);
            expect(ev.stopPropagation).toHaveBeenCalled();
            expect(ev.preventDefault).toHaveBeenCalled();
        });
    });

    describe('CSS and ARIA', () => {
        it('hides an element', () => {
            const el = {
                hasClass: vi.fn().mockReturnValue(false),
                addClass: vi.fn(),
                attr: vi.fn(),
                css: vi.fn()
            };
            hideElement(<any>el);
            expect(el.hasClass).toHaveBeenCalledWith('hidden');
            expect(el.addClass).toHaveBeenCalledWith('hidden');
            expect(el.attr).toHaveBeenCalledWith('aria-hidden', 'true');
        });

        it('does not hide a hidden element', () => {
            const el = {
                hasClass: vi.fn().mockReturnValue(true),
                addClass: vi.fn(),
                attr: vi.fn()
            };
            hideElement(<any>el);
            expect(el.hasClass).toHaveBeenCalledWith('hidden');
            expect(el.addClass).not.toHaveBeenCalled();
            expect(el.attr).not.toHaveBeenCalled();
        });

        it('shows a hidden element', () => {
            const el = {
                hasClass: vi.fn().mockReturnValue(true),
                removeClass: vi.fn(),
                removeAttr: vi.fn(),
                css: vi.fn()
            };
            showElement(<any>el);
            expect(el.hasClass).toHaveBeenCalledWith('hidden');
            expect(el.removeClass).toHaveBeenCalledWith('hidden');
            expect(el.removeAttr).toHaveBeenCalledWith('aria-hidden');
        });

        it('does not show a visible element', () => {
            const el = {
                hasClass: vi.fn().mockReturnValue(false),
                removeClass: vi.fn(),
                removeAttr: vi.fn()
            };
            showElement(<any>el);
            expect(el.hasClass).toHaveBeenCalledWith('hidden');
            expect(el.removeClass).not.toHaveBeenCalled();
            expect(el.removeAttr).not.toHaveBeenCalled();
        });

        it('adds a class', () => {
            const el = {
                hasClass: vi.fn().mockReturnValue(false),
                addClass: vi.fn()
            };
            addClass(<any>el, 'foo');
            expect(el.hasClass).toHaveBeenCalledWith('foo');
            expect(el.addClass).toHaveBeenCalledWith('foo');
        });

        it('does not add a class if it already exists', () => {
            const el = {
                hasClass: vi.fn().mockReturnValue(true),
                addClass: vi.fn()
            };
            addClass(<any>el, 'foo');
            expect(el.hasClass).toHaveBeenCalledWith('foo');
            expect(el.addClass).not.toHaveBeenCalled();
        });

        it('removes a class', () => {
            const el = {
                hasClass: vi.fn().mockReturnValue(true),
                removeClass: vi.fn()
            };
            removeClass(<any>el, 'foo');
            expect(el.hasClass).toHaveBeenCalledWith('foo');
            expect(el.removeClass).toHaveBeenCalledWith('foo');
        });

        it('does not remove a class if it does not exist', () => {
            const el = {
                hasClass: vi.fn().mockReturnValue(false),
                removeClass: vi.fn()
            };
            removeClass(<any>el, 'foo');
            expect(el.hasClass).toHaveBeenCalledWith('foo');
            expect(el.removeClass).not.toHaveBeenCalled();
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
