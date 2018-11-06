import {ElementRef} from '@angular/core';

declare const Modernizr: any;

export class DOM {
    private readonly rootElement: any;

    constructor(private el: any) {
        if (typeof el === 'string') {
            this.rootElement = document.createElement(el);
        } else if (el instanceof ElementRef) {
            this.rootElement = this.el.nativeElement;
        } else {
            this.rootElement = el;
        }
    }

    static getAnimationEndEventName() {
        const animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        };

        return animEndEventNames[Modernizr.prefixed('animation')];
    }

    public self() {
        return new DOMElements(this.rootElement);
    }

    public select(item: string | HTMLElement): DOMElements {

        if (typeof item === 'string') {
            return this.selectElementWithString(item);
        }

        if (item instanceof HTMLElement) {
            return this.selectElementWithElement(item);
        }
    }


    public selectOne(item: any): DOMElements {
        const domElements = this.select(item);
        return new DOMElements(domElements.elements[0]);
    }


    private selectElementWithElement(element: HTMLElement): DOMElements {
        return new DOMElements(element);
    }


    private selectElementWithString(selectorStr: string) {
        const domElements = [].slice.call(this.rootElement.querySelectorAll(selectorStr));
        return new DOMElements(domElements);
    }

}

export class DOMElements {

    public elements: Array<Element>;
    public element: HTMLElement | Element;


    constructor(item: Element | Array<Element>) {

        if (item instanceof HTMLElement || item instanceof Element) {
            this.element = item;
        } else {
            this.elements = item;
        }

    }

    public bind(spaceSeparatedEvents: string, func: any) {

        if (typeof this.elements !== 'undefined') {
            for (const element of this.elements) {
                DOMEvents.registerMultipleEvents(element, spaceSeparatedEvents, func);
            }
        }

        if (typeof this.element !== 'undefined') {
            DOMEvents.registerMultipleEvents(this.element, spaceSeparatedEvents, func);
        }
    }

    public once(spaceSeparatedEvents: string, func: any) {

        if (typeof this.elements !== 'undefined') {
            for (const element of this.elements) {
                DOMEvents.registerMultipleEvents(element, spaceSeparatedEvents, (e) => {
                    func(e);
                    DOMEvents.unregisterMultipleEvents(element, spaceSeparatedEvents);
                });
            }
        }

        if (typeof this.element !== 'undefined') {
            DOMEvents.registerMultipleEvents(this.element, spaceSeparatedEvents, (e) => {
                func(e);
                DOMEvents.unregisterMultipleEvents(this.element, spaceSeparatedEvents);
            });
        }
    }

    public unbind(spaceSeparatedEvents: string) {

        if (typeof this.elements !== 'undefined') {
            for (const element of this.elements) {
                DOMEvents.unregisterMultipleEvents(element, spaceSeparatedEvents);
            }
        }

        if (typeof this.element !== 'undefined') {
            DOMEvents.unregisterMultipleEvents(this.element, spaceSeparatedEvents);
        }


    }


    public remove() {


        if (typeof this.elements !== 'undefined') {
            for (const element of this.elements) {
                element.parentElement.removeChild(element);
            }


        }

        if (typeof this.element !== 'undefined') {

            this.element.parentElement.removeChild(this.element);

        }

    }

    public prependOld(html) {

        if (typeof this.elements !== 'undefined') {
            for (const element of this.elements) {
                element.innerHTML = html + element.innerHTML;
            }
        }

        if (typeof this.element !== 'undefined') {
            this.element.innerHTML = html + this.element.innerHTML;
        }


    }

    public prepend(el: string | DOMElements | DOMElements[]) {

        if (typeof this.elements !== 'undefined') {
            for (const element of this.elements) {
                prependChild(element, el);
            }
        }

        if (typeof this.element !== 'undefined') {
            prependChild(this.element, el);
        }

        return this;

        function prependChild(parent: HTMLElement | Element, child) {

            if (Array.isArray(child)) {
                for (const ch of child) {
                    parent.insertBefore(ch.element, parent.childNodes[0]);
                }
            } else if (child instanceof DOMElements) {
                parent.insertBefore(child.element, parent.childNodes[0]);
            } else {
                parent.innerHTML = parent.innerHTML + child;
            }
        }


    }

    public append(el: string | DOMElements | DOMElements[]) {

        if (typeof this.elements !== 'undefined') {
            for (const element of this.elements) {
                appendChild(element, el);
            }
        }

        if (typeof this.element !== 'undefined') {
            appendChild(this.element, el);
        }

        return this;

        function appendChild(parent, child) {

            if (Array.isArray(child)) {
                for (const ch of child) {
                    parent.appendChild(ch.element);
                }
            } else if (child instanceof DOMElements) {
                parent.appendChild(child.element);
            } else {
                parent.innerHTML = parent.innerHTML + child;
            }
        }


    }

    public html(html?: string): any {
        if (typeof(html) === 'undefined') {

            if (typeof this.elements !== 'undefined') {
                return this.elements[0].innerHTML;
            }

            if (typeof this.element !== 'undefined') {
                return this.element.innerHTML;
            }

        } else {

            if (typeof this.elements !== 'undefined') {
                for (const element of this.elements) {
                    element.innerHTML = html;
                }
                return this;
            }

            if (typeof this.element !== 'undefined') {
                this.element.innerHTML = html;
                return this;
            }

        }
    }

    public empty() {

        if (typeof this.elements !== 'undefined') {
            for (const element of this.elements) {
                element.innerHTML = '';
            }
        }

        if (typeof this.element !== 'undefined') {
            this.element.innerHTML = '';
        }

    }


    public val(value?: string) {

        if (typeof this.element !== 'undefined') {

            if (typeof value !== 'undefined') {
                this.element['value'] = value;
            } else {
                return this.element['value'];
            }
        }
    }

    public removeAttr(name) {

        if (typeof this.element !== 'undefined') {
            this.element.removeAttribute(name);
            return this;
        }

    }

    public attr<T = DOMElements>(name: string, value?: string): T {

        if (typeof this.element !== 'undefined') {
            if (typeof value === 'undefined') {
                return this.element.getAttribute(name) as any;
            }
            this.element.setAttribute(name, value);
            return this as any;
        }

    }

    public addClass(...classNames: string[]): DOMElements {

        if (typeof this.elements !== 'undefined') {
            for (const element of this.elements) {
                element.classList.add(...classNames);
            }
        }

        if (typeof this.element !== 'undefined') {
            this.element.classList.add(...classNames);
        }


        return this;

    }

    public removeClass(...className: string[]) {

        if (typeof this.elements !== 'undefined') {
            for (const element of this.elements) {
                element.classList.remove(...className);
            }
        }

        if (typeof this.element !== 'undefined') {
            this.element.classList.remove(...className);
        }

    }

    public hasClass(className) {

        if (typeof this.element !== 'undefined') {
            return this.element.classList.contains(className);
        }

    }

    public scrollToEnd() {
        if (typeof this.element !== 'undefined') {
            this.element.scrollTop = this.element.scrollHeight;
        }
    }

    public find(item: string | HTMLElement): DOMElements {
        return new DOM(this.element).select(item);
    }

    public findOne(item: string | HTMLElement): DOMElements {
        return new DOM(this.element).selectOne(item);
    }


}


// https://stackoverflow.com/a/2837906/3335054
export class DOMEvents {

    public static registerMultipleEvents(el, spaceSeparatedEvents, func) {
        const events = spaceSeparatedEvents.split(' ');
        events.forEach((eventName) => {
            DOMEvents.registerEvent(el, eventName, func);
        });
    }

    public static unregisterMultipleEvents(el, spaceSeparatedEvents) {
        const events = spaceSeparatedEvents.split(' ');
        events.forEach((eventName) => {
            DOMEvents.unregisterEvents(el, eventName);
        });
    }

    public static registerEvent(el, eventName, funct) {

        if (el.attachEvent) {
            el['e' + eventName + funct] = funct;
            el[eventName + funct] = function () {
                el['e' + eventName + funct](window.event);
            };
            el.attachEvent('on' + eventName, el[eventName + funct]);
        } else {
            el.addEventListener(eventName, funct, false);
        }

        if (!el.eventHolder) {
            el.eventHolder = [];
        }
        el.eventHolder[el.eventHolder.length] = [eventName, funct];

    }

    public static unregisterEvent(obj, type, fn) {
        if (obj.detachEvent) {
            obj.detachEvent('on' + type, obj[type + fn]);
            obj[type + fn] = null;
        } else {
            obj.removeEventListener(type, fn, false);
        }
    }

    public static hasEvent(el, eventName, funct) {

        if (!el.eventHolder) {
            return false;
        } else {
            for (let i = 0; i < el.eventHolder.length; i++) {
                if (el.eventHolder[i][0] === eventName && String(el.eventHolder[i][1]) === String(funct)) {
                    return true;
                }
            }
        }
        return false;
    }


    public static unregisterEvents(el, eventName) {

        if (el.eventHolder) {

            let removed = 0;
            for (let i = 0; i < el.eventHolder.length; i++) {
                if (el.eventHolder[i][0] === eventName) {
                    this.unregisterEvent(el, eventName, el.eventHolder[i][1]);
                    el.eventHolder.splice(i, 1);
                    removed++;
                    i--;
                }
            }

            return (removed > 0);
        } else {
            return false;
        }
    }
}
