import {words, camelCase, capitalize} from 'lodash';
import * as moment_ from 'moment';
const moment =  moment_;

export class Utils {

    public static generateRandomID(length) {

        const id = Math.random().toString(36).substr(2, length);

        if (id.length === length) {
            return id;
        }

        return Utils.generateRandomID(length);
    }

    public static calculateReadTime(value: any, args?: any) {
        return Math.ceil((words(value).length) / 200);
    }

    public static secondsBetween(date1, date2) {
        const moment1 = moment(date1);
        const moment2 = moment(date2);

        return Math.round(moment1.diff(moment2) / 1000);
    }


    public static renderHTMLToText(html: string) {

        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent.trim() || tmp.innerText.trim() || '';
    }


    /**
     * Encodes an object as a string URI
     * @param obj
     */
    public static URIEncodeObject(obj: object) {
        const str = [];
        for (const p of Object.keys(obj)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }

        return str.join('&');
    }

    public static enumToArray(_enum) {
        const enumsArray = [];
        for (const prop of Object.keys(_enum)) {
            enumsArray.push(_enum[prop]);
        }

        return enumsArray;
    }

    public static toCamelCase(value: string) {
        return camelCase(value);
    }

    public static capitalize(value: string) {
        return capitalize(value);
    }

}
