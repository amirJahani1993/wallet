/* tslint:disable */
/* eslint-disable */
/**
 * REST api to TON blockchain explorer
 * Provide access to indexed TON blockchain
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: support@tonkeeper.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface WalletDNS
 */
export interface WalletDNS {
    /**
     * 
     * @type {string}
     * @memberof WalletDNS
     */
    address: string;
    /**
     * 
     * @type {boolean}
     * @memberof WalletDNS
     */
    isWallet: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof WalletDNS
     */
    hasMethodPubkey: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof WalletDNS
     */
    hasMethodSeqno: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof WalletDNS
     */
    names: Array<string>;
}

/**
 * Check if a given object implements the WalletDNS interface.
 */
export function instanceOfWalletDNS(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "address" in value;
    isInstance = isInstance && "isWallet" in value;
    isInstance = isInstance && "hasMethodPubkey" in value;
    isInstance = isInstance && "hasMethodSeqno" in value;
    isInstance = isInstance && "names" in value;

    return isInstance;
}

export function WalletDNSFromJSON(json: any): WalletDNS {
    return WalletDNSFromJSONTyped(json, false);
}

export function WalletDNSFromJSONTyped(json: any, ignoreDiscriminator: boolean): WalletDNS {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'address': json['address'],
        'isWallet': json['is_wallet'],
        'hasMethodPubkey': json['has_method_pubkey'],
        'hasMethodSeqno': json['has_method_seqno'],
        'names': json['names'],
    };
}

export function WalletDNSToJSON(value?: WalletDNS | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'address': value.address,
        'is_wallet': value.isWallet,
        'has_method_pubkey': value.hasMethodPubkey,
        'has_method_seqno': value.hasMethodSeqno,
        'names': value.names,
    };
}

