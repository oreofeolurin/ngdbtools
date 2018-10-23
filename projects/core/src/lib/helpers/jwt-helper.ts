import {AppException} from '../exceptions/app.exception';

// Avoid TS error "cannot find name escape"
declare const escape: any;


/**
 * Helper class to decode and find JWT expiration.
 *
 * @author  Oreofe Olurin
 * @version 0.0.1
 * @since   2017-10-27
 */
export class JwtHelper {

    /**
     * Static function to verify a  token not expired using
     *
     */
    public static tokenNotExpired(token: string, offsetSeconds: number = null) {
        const jwtHelper = new JwtHelper();
        return token && !jwtHelper.isTokenExpired(token, offsetSeconds);
    }

    /**
     * Static function to decode a token
     *
     * @param {string} token
     * @return {string | any}
     */
    public static decodeToken(token: string) {
        const jwtHelper = new JwtHelper();
        return token && jwtHelper.decodeToken(token);
    }

    // noinspection JSMethodCanBeStatic
    private urlBase64Decode(str: string) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw new AppException('Illegal base64url string!');
            }
        }

        // polifyll https://github.com/davidchambers/Base64.js
        return decodeURIComponent(escape(window.atob(output)));
    }

    private decodeToken(token: string) {
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }

        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }

        return JSON.parse(decoded);
    }

    private getTokenExpirationDate(token: string) {
        let decoded: any;
        decoded = this.decodeToken(token);

        if (typeof decoded.exp === 'undefined') {
            return null;
        }

        const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp);

        return date;
    }

    private isTokenExpired(token: string, offsetSeconds: number = 0) {
        const date = this.getTokenExpirationDate(token);
        if (date === null) {
            return false;
        }

        // Token expired?
        return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }
}
