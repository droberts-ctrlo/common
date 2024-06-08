# Common Module

[![JS Tests](https://github.com/droberts-ctrlo/common/actions/workflows/tests.yml/badge.svg)](https://github.com/droberts-ctrlo/common/actions/workflows/tests.yml)

This is a common module with functionality for use within other modules - some code here is repeated or replacements for JQuery functionality with some additional functionality. This library is now written in pure javascript and requires _no_ other dependencies. The functionality within this library is as follows:

## Types

`JSONData<T>` - This is an alias to the union `string | T | undefined | null` - This is for when you aren't sure if you
shall be receiving an object, a string, or nothing at all.

## Functions

`stopPropagation(e:Event):void` - This function both stops the propagation and prevents default of an
event, and is a replacement for the standard JQuery function.

`hasClass(element:HTMLElement, className:string):boolean` - This function checks if an element has a class.

`hideElement(element:HTMLElement):void` - This function hides an element and sets the ARIA hidden attribute to true - this is a more specific and ARIA-compatible version of JQuery's `hide()` function.

`showElement(element:HTMLElement):void` - This function shows an element and sets the ARIA hidden attribute to false - this is a more specific and ARIA-compatible version of JQuery's `show()` function.

`addClass(element:HTMLElement, className:string):void` - This function adds a class to an element.

`removeClass(element:HTMLElement, className:string):void` - This function removes a class from an element.

`fromJSON<T>(data:JSONData<T>):T` - This function converts a JSON string to an object, or returns the object if it is
not a string.
