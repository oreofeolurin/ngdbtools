declare const TweenMax: any;

export default class Animation {

    /**
     * Scrolls windows viewport to a particular element.
     * @param selector
     * @param offset
     * @param speed
     */
    public static scrollWindowTo(selector: string, offset?: number, speed?: number) {
        offset = typeof offset === 'number' ? offset : 0;
        speed = typeof speed === 'number' ? speed : 1;

        TweenMax.to(window, speed, {scrollTo: {y: selector, offsetY: offset}});
    }
}
