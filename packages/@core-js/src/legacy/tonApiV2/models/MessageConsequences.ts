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
import type { AccountEvent } from './AccountEvent';
import {
    AccountEventFromJSON,
    AccountEventFromJSONTyped,
    AccountEventToJSON,
} from './AccountEvent';
import type { Risk } from './Risk';
import {
    RiskFromJSON,
    RiskFromJSONTyped,
    RiskToJSON,
} from './Risk';
import type { Trace } from './Trace';
import {
    TraceFromJSON,
    TraceFromJSONTyped,
    TraceToJSON,
} from './Trace';

/**
 * 
 * @export
 * @interface MessageConsequences
 */
export interface MessageConsequences {
    /**
     * 
     * @type {Trace}
     * @memberof MessageConsequences
     */
    trace: Trace;
    /**
     * 
     * @type {Risk}
     * @memberof MessageConsequences
     */
    risk: Risk;
    /**
     * 
     * @type {AccountEvent}
     * @memberof MessageConsequences
     */
    event: AccountEvent;
}

/**
 * Check if a given object implements the MessageConsequences interface.
 */
export function instanceOfMessageConsequences(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "trace" in value;
    isInstance = isInstance && "risk" in value;
    isInstance = isInstance && "event" in value;

    return isInstance;
}

export function MessageConsequencesFromJSON(json: any): MessageConsequences {
    return MessageConsequencesFromJSONTyped(json, false);
}

export function MessageConsequencesFromJSONTyped(json: any, ignoreDiscriminator: boolean): MessageConsequences {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'trace': TraceFromJSON(json['trace']),
        'risk': RiskFromJSON(json['risk']),
        'event': AccountEventFromJSON(json['event']),
    };
}

export function MessageConsequencesToJSON(value?: MessageConsequences | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'trace': TraceToJSON(value.trace),
        'risk': RiskToJSON(value.risk),
        'event': AccountEventToJSON(value.event),
    };
}

