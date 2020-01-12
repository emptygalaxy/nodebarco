const https = require('https');
const http = require('http');

// let _ip  = "192.168.50.100";
var _ip  = "127.0.0.1";
let _port= 9999;
// var _port= 8000;
let _id  = 1;
let _dest="ScreenDest1";

/**
 *
 * @type {{TRANSITION_ALL: string}}
 */
const TransitionCommand = {
    TRANSITION_ALL:  'allTrans',
};

/**
 *
 * @type {{ACTIVATE: string, LIST: string}}
 */
const PresetCommand = {
    LIST:       'listPresets',
    ACTIVATE:   'activatePreset',
};

/**
 *
 * @type {{FREEZE: string, LIST: string}}
 */
const DestinationCommand = {
    LIST:   'listDestinations',
    FREEZE: 'freezeDestSource',
};

/**
 *
 * @type {{LIST: string}}
 */
const SourceCommand = {
    LIST:   'listSources',
};

/**
 *
 * @type {{CHANGE: string, LIST: string}}
 */
const ContentCommand = {
    LIST:   "listContent",
    CHANGE: "changeContent",
};

/**
 *
 * @type {{CHANGE: string, LIST: string}}
 */
const AuxCommand = {
    CHANGE: "changeAuxContent",
    LIST:   "listAuxContent",
};

const StillCommand = {
    LIST:   "listStill",
    DELETE: "deleteStill",
    TAKE:   "takeStill",
};

/**
 *
 * @type {{TRANSITION: {TRANSITION_ALL: string}, STILL: {TAKE: string, DELETE: string, LIST: string}, AUX: {CHANGE: string, LIST: string}, DESTINATION: {FREEZE: string, LIST: string}, PRESET: {ACTIVATE: string, LIST: string}, SOURCE: {LIST: string}, CONTENT: {CHANGE: string, LIST: string}}}
 */
const Command = {
    TRANSITION: TransitionCommand,
    PRESET: PresetCommand,
    DESTINATION: DestinationCommand,
    SOURCE: SourceCommand,
    CONTENT: ContentCommand,
    AUX: AuxCommand,
    STILL: StillCommand,
};

/**
 *
 * @type {{RECALL_TO_PREVIEW: number, RECALL_TO_PROGRAM: number}}
 */
const RecallMode = {
    RECALL_TO_PREVIEW:  0,
    RECALL_TO_PROGRAM:  1
};

/**
 *
 * @type {{EXCLUDE: number, DONT_CARE: number}}
 */
const InclusionMode = {
    EXCLUDE:    -2,
    DONT_CARE:  -1,
};

/**
 *
 * @type {{SCREEN: number, AUX: number, BOTH: number}}
 */
const DestinationMode = {
    BOTH:   0,
    SCREEN: 1,
    AUX:    2,
};

/**
 *
 * @type {{INPUT: number, SCREEN: number, AUX: number, BACKGROUND: number}}
 */
const DestinationType = {
    INPUT:      0,
    BACKGROUND: 1,
    SCREEN:     2,
    AUX:        3,
};

/**
 *
 * @param {string} ip
 * @param {number} port
 */
function connect(ip, port)
{
	_ip = ip;
	_port = port;
}


/**
 *
 * @return {{method: *, id: *, params: *, jsonrpc: string}}
 */
function transitionAll()
{
    return makeRequest(TransitionCommand.TRANSITION_ALL, {}, _id);
}

/**
 *
 * @param {string} screenDest
 * @param {string} auxDest
 * @param {function} callback
 * @return {{method: *, id: *, params: *, jsonrpc: string}}
 */
function listPresets(screenDest, auxDest, callback)
{
    if(screenDest === undefined) screenDest  = InclusionMode.DONT_CARE;
    if(auxDest === undefined)    auxDest  = InclusionMode.DONT_CARE;
    
    return makeRequest(Command.PRESET.LIST, {ScreenDest:screenDest, AuxDest:auxDest}, null, callback);
}

/**
 *
 * @param {number} presetId
 * @param {string} name
 * @param {string} screenDest
 * @param {string} auxDest
 */
function savePreset(presetId, name, screenDest, auxDest){}

/**
 *
 * @param presetId
 * @param name
 */
function renamePreset(presetId, name){}

/**
 *
 * @param presetId
 */
function deletePreset(presetId){}

/**
 *
 * @param {number} preset
 * @param {number} mode
 * @return {{method: *, id: *, params: *, jsonrpc: string}}
 */
function activatePreset(preset, mode=0)
{
    return makeRequest(PresetCommand.ACTIVATE, {id:preset, type:mode});
}

//  Destinations
/**
 *
 * @param {number} mode
 * @return {{method: *, id: *, params: *, jsonrpc: string}}
 */
function listDestinations(mode=undefined)
{
    if(mode == undefined)   mode  = DestinationMode.BOTH;
    
    return makeRequest(DestinationCommand.LIST, {type: mode});
}

/**
 *
 * @param {number} mode
 * @return {{method: *, id: *, params: *, jsonrpc: string}}
 */
function listSources(mode=undefined)
{
    if(mode == undefined)   mode  = DestinationMode.BOTH;
    
    return makeRequest(SourceCommand.LIST, {type: mode});
}

/**
 *
 * @param {string} screenDest
 * @return {{method: *, id: *, params: *, jsonrpc: string}}
 */
function listContent(screenDest)
{
    return makeRequest(ContentCommand.LIST, {id: screenDest});
}

/**
 *
 * @param screenDest
 * @return {{method: *, id: *, params: *, jsonrpc: string}}
 */
function changeContent(screenDest)
{
    return makeRequest(ContentCommand.LIST, {
                                                id: 0,
                                                BGLyr: [
                                                    {
                                                        id: 0,
                                                        LastBGSourceIndex: 0,
                                                        BGShowMatte: 0,
                                                        BGColor: [
                                                            {
                                                                id: 0,
                                                                Red: 0,
                                                                Green: 0,
                                                                Blue: 0
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: 1,
                                                        LastBGSourceIndex: 0,
                                                        BGShowMatte: 0,
                                                        BGColor: [
                                                            {
                                                                id: 0,
                                                                Red: 0,
                                                                Green: 0,
                                                                Blue: 0
                                                            }
                                                        ]
                                                    }
                                                ],
                                                Layers: [
                                                    {
                                                        id: 0,
                                                        LastSrcIdx: 0,
                                                        Window: {
                                                            HPos: 0,
                                                            VPos: 0,
                                                            HSize: 400,
                                                            VSize: 300
                                                        },
                                                        Source: {
                                                            HPos: 0,
                                                            VPos: 0,
                                                            HSize: 1920,
                                                            VSize: 1080
                                                        },
                                                        Mask: {
                                                            Left: 0.01,
                                                            Right: 10.1,
                                                            Top: 0,
                                                            Bottom: 0
                                                        },
                                                        PvwMode: 0,
                                                        PgmMode: 0,
                                                        Freeze: 0,
                                                        PgmZOrder: 0,
                                                        'PvwZ Order': 0
                                                    }
                                                ]
                                            });
}

function listAuxContent(auxDest)
{
    return makeRequest(AuxCommand.LIST, {id: auxDest});
}
function changeAuxContent(auxDest, previewLastSourceIndex, programLastSourceIndex)
{
    return makeRequest(AuxCommand.CHANGE, {id: id, Name: auxDest, PvwLastSrcIndex: previewLastSourceIndex, PgmLastSrcIndex: programLastSourceIndex});
}

function freezeDestination(type, subject, group, freeze=true)
{
    return makeRequest(DestinationsCommand.FREEZE, {type: type, id: subject, screengroup: group, mode: freeze?1:0});
}

/**
 *
 * @return {{method: *, id: *, params: *, jsonrpc: string}}
 */
function listStills()
{
    return makeRequest(StillCommand.LIST, {});
}

/**
 *
 * @param {number} still
 * @return {{method: *, id: *, params: *, jsonrpc: string}}
 */
function deleteStill(still)
{
    return makeRequest(StillCommand.DELETE, {id: still});
}

/**
 *
 * @param {number} sourceId
 * @param file
 * @return {{method: *, id: *, params: *, jsonrpc: string}}
 */
function takeStill(sourceId, file)
{
    return makeRequest(StillCommand.TAKE, {type: 0, id: sourceId, file: file});
}

/**
 *
 * @return {{method: *, id: *, params: *, jsonrpc: string}}
 */
function getFrameSettings()
{
    return makeRequest(StillCommand.TAKE, {});
}


/**
 *
 * @param {string} method
 * @param {Object} params
 * @param {number} id
 * @param {function} callback
 * @return {{method: *, id: *, params: *, jsonrpc: string}}
 */
function makeRequest(method, params, id, callback)
{
    if(params === undefined || params === null) params  = {};
    if(id === undefined || id === null)     id  = 1;
    
    
    let data    = {params:params, method:method, id:id, jsonrpc:"2.0"};
    let body    = JSON.stringify(data);

    console.log(data);
    
    let options = {
        host:   _ip,
        port:   _port,
        method: 'POST',
        path:   '/test/',
        headers:{
            'Content-Type': 'application/json',
            'Content-Length':   body.length,
        }
    };
    

    let req = http.request(options, (resp) => {
        
        let response = '';
        
        resp.on("data", (chunk) => {
            response += chunk;
        });

        resp.on("end", () => {
            console.log(response);

            let result = JSON.parse(response);
            callback(result.result, null);
        });
        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    
    
    req.write(body);
    req.end();
    
    return data;
}

// var result  = transitionAll();
// console.log("done");
// console.log(result);
// console.log("exit");

/*
listPresets(screenDest=dest, auxDest=1);
activatePreset(preset=1, mode=RecallMode.RECALL_TO_PREVIEW);
activatePreset(preset=1, mode=RecallMode.RECALL_TO_PROGRAM);

listDestinations();
listDestinations(mode=DestinationMode.BOTH);
listDestinations(mode=DestinationMode.SCREEN);
listDestinations(mode=DestinationMode.AUX);

listSources();
listSources(mode=DestinationMode.BOTH);
listSources(mode=DestinationMode.SCREEN);
listSources(mode=DestinationMode.AUX);

listContent(screenDest=dest);
// changeContent(screenDest=dest);

listAuxContent(auxDest=0);
changeAuxContent(auxDest=0, previewLastSourceIndex=0, programLastSourceIndex=0);
freezeDestination(type=DestinationType.INPUT, subject=0, group=0, freeze=true);
freezeDestination(type=DestinationType.BACKGROUND, subject=0, group=0, freeze=false);
freezeDestination(type=DestinationType.SCREEN, subject=0, group=0, freeze=false);
freezeDestination(type=DestinationType.AUX, subject=0, group=0, freeze=false);

listStills();
deleteStill(still=4);
takeStill(sourceId=0, file=10);

getFrameSettings();
*/


exports.connect = connect;
exports.transitionAll=transitionAll;
exports.activatePreset=activatePreset;
exports.listPresets=listPresets;

exports.Command=Command;
exports.RecallMode=RecallMode;
exports.DestinationType=DestinationType;