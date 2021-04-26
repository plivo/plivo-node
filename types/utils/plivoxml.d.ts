/**
 * Response element
 * @constructor
 */
export function Response(): void;
export class Response {
    element: string;
    nestables: string[];
    valid_attributes: any[];
    elem: object;
    add: (new_element: object, body: string, attributes: object) => object;
    addConference: (body: string, attributes: {
        muted?: boolean;
        enterSound?: string;
        exitSound?: string;
        startConferenceOnEnter?: boolean;
        endConferenceOnExit?: boolean;
        stayAlone?: boolean;
        waitSound?: string;
        maxMembers?: number;
        record?: boolean;
        recordFileFormat?: string;
        timeLimit?: number;
        hangupOnStar?: boolean;
        action?: string;
        method?: string;
        callbackUrl?: string;
        callbackMethod?: string;
        digitsMatch?: string;
        floorEvent?: boolean;
        redirect?: boolean;
        relayDTMF?: boolean;
    }) => object;
    addNumber: (body: string, attributes: {
        sendDigits?: string;
        sendOnPreanswer?: boolean;
    }) => object;
    addUser: (body: string, attributes: {
        sendDigits?: string;
        sendOnPreanswer?: boolean;
        sipHeaders?: string;
    }) => object;
    addDial: (attributes: {
        action?: string;
        method?: string;
        hangupOnStar?: boolean;
        timeLimit?: number;
        timeout?: number;
        callerID?: string;
        callerName?: string;
        confirmSound?: string;
        confirmKey?: string;
        dialMusic?: string;
        callbackUrl?: string;
        callbackMethod?: string;
        redirect?: boolean;
        digitsMatch?: string;
        digitsMatchBLeg?: string;
        sipHeaders?: string;
    }) => object;
    addGetDigits: (attributes: {
        action?: string;
        method?: string;
        timeout?: number;
        digitTimeout?: number;
        finishOnKey?: string;
        numDigits?: number;
        retries?: number;
        redirect?: boolean;
        playBeep?: boolean;
        validDigits?: string;
        invalidDigitsSound?: string;
        log?: boolean;
    }) => object;
    addGetInput: (attributes: {
        action?: string;
        method?: string;
        inputType?: string;
        executionTimeout?: number;
        digitEndTimeout?: number;
        speechEndTimeout?: number;
        finishOnKey?: string;
        numDigits?: number;
        speechModel?: string;
        hints?: string;
        language?: string;
        interimSpeechResultsCallback?: string;
        interimSpeechResultsCallbackMethod?: string;
        log?: boolean;
        redirect?: boolean;
        profanityFilter?: string;
    }) => object;
    addHangup: (attributes: {
        reason?: string;
        schedule?: number;
    }) => object;
    addMessage: (body: string, attributes: {
        src?: string;
        dst?: string;
        type?: string;
        callbackUrl?: string;
        callbackMethod?: string;
    }) => object;
    addPlay: (body: string, attributes: {
        loop?: number;
    }) => object;
    addPreAnswer: () => any;
    addRecord: (attributes: {
        action?: string;
        method?: string;
        fileFormat?: string;
        redirect?: boolean;
        timeout?: number;
        maxLength?: number;
        playBeep?: boolean;
        finishOnKey?: string;
        recordSession?: boolean;
        startOnDialAnswer?: boolean;
        transcriptionType?: string;
        transcriptionUrl?: string;
        transcriptionMethod?: string;
        callbackUrl?: string;
        callbackMethod?: string;
    }) => object;
    addRedirect: (body: string, attributes: {
        method?: string;
    }) => object;
    addSpeak: (body: string, attributes: {
        voice?: string;
        language?: string;
        loop?: number;
    }) => object;
    addBreak: (attributes: {
        strength?: string;
        time?: string;
    }) => object;
    addEmphasis: (body: string, attributes: {
        level?: string;
    }) => object;
    addLang: (body: string, attributes: {
        xml?: string;
    }) => object;
    addP: (body: string) => any;
    addPhoneme: (body: string, attributes: {
        alphabet?: string;
        ph?: string;
    }) => object;
    addProsody: (body: string, attributes: {
        pitch?: string;
        rate?: string;
        volume?: string;
    }) => object;
    addS: (body: string) => any;
    addSayAs: (body: string, attributes: {
        interpret?: string;
        format?: string;
    }) => object;
    addSub: (body: string, attributes: {
        alias?: string;
    }) => object;
    addW: (body: string, attributes: {
        role?: string;
    }) => object;
    addText: (body: string) => object;
    addWait: (attributes: {
        length?: number;
        silence?: boolean;
        minSilence?: number;
        beep?: boolean;
    }) => object;
    addDTMF: (body: string, attributes: {
        async?: boolean;
    }) => object;
    toXML: () => string;
    toJSON: string;
}
export class PlivoXMLError extends Error {
    constructor(message?: string);
}
