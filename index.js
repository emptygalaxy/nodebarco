const https = require('https');
const http = require('http');

var ip  = "192.168.50.100";
// var ip  = "127.0.0.1";
var port= 9999;
// var port= 8000;
var id  = 1;
var dest="ScreenDest1";

var Command = {
    TRANSITION_ALL:  "allTrans",
};

var PresetCommand = {
    LIST:       "listPresets",
    ACTIVATE:   "activatePreset",
}

var DestinationCommand = {
    LIST:   "listDestinations",
    FREEZE: "freezeDestSource",
}

var SourceCommand = {
    LIST:   "listSources",
}

var ContentCommand = {
    LIST:   "listContent",
    CHANGE: "changeContent",
}

var AuxCommand = {
    CHANGE: "changeAuxContent",
    LIST:   "listAuxContent",
}
var StillCommand = {
    LIST:   "listStill",
    DELETE: "deleteStill",
    TAKE:   "takeStill",
}

var RecallMode = {
    RECALL_TO_PREVIEW:  0,
    RECALL_TO_PROGRAM:  1
}

var InclusionMode = {
    EXCLUDE:    -2,
    DONT_CARE:  -1,
}

var DestinationMode = {
    BOTH:   0,
    SCREEN: 1,
    AUX:    2,
}

var DestinationType = {
    INPUT:      0,
    BACKGROUND: 1,
    SCREEN:     2,
    AUX:        3,
}


function connect(ip, port)
{
	ip = ip;
	port = port;
}


//  Transitions
function transitionAll()
{
    return makeRequest(Command.TRANSITION_ALL, {}, id);
}

//  Presets
function listPresets(screenDest, auxDest)
{
    if(screenDest == undefined) screenDest  = InclusionMode.DONT_CARE;
    if(auxDest == undefined)    auxDest  = InclusionMode.DONT_CARE;
    
    return makeRequest(PresetCommand.LIST, {ScreenDest:screenDest, AuxDest:auxDest});
}

function savePreset(presetId, name, screenDest, auxDest){}
function renamePreset(presetId, name){}
function deletePreset(presetId){}

function activatePreset(preset, mode=0)
{
    return makeRequest(PresetCommand.ACTIVATE, {id:preset, type:mode});
}

//  Destinations
function listDestinations(mode=undefined)
{
    if(mode == undefined)   mode  = DestinationMode.BOTH;
    
    return makeRequest(DestinationCommand.LIST, {type: mode});
}
function listSources(mode=undefined)
{
    if(mode == undefined)   mode  = DestinationMode.BOTH;
    
    return makeRequest(SourceCommand.LIST, {type: mode});
}
function listContent(screenDest)
{
    return makeRequest(ContentCommand.LIST, {id: screenDest});
}
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

function listStills()
{
    return makeRequest(StillCommand.LIST, {});
}

function deleteStill(still)
{
    return makeRequest(StillCommand.DELETE, {id: still});
}
function takeStill(sourceId, file)
{
    return makeRequest(StillCommand.TAKE, {type: 0, id: sourceId, file: file});
}

function getFrameSettings()
{
    return makeRequest(StillCommand.TAKE, {});
}





function makeRequest(method, params, id)
{
    if(params == undefined) params  = {};
    if(id == undefined)     id  = 1;
    
    
    var data    = {params:params, method:method, id:id, jsonrpc:"2.0"};
    var body    = JSON.stringify(data);
    
    var options = {
        host:   ip,
        port:   port,
        method: 'POST',
        path:   '/test/',
        headers:{
            'Content-Type': 'application/json',
            'Content-Length':   body.length,
        }
    };
    
    
    // var url = ["http://", ip, ":", port].join("");
    var req = http.request(options, (resp) => {
        
        let response = '';
        
        resp.on("data", (chunk) => {
            response += chunk;
        });
        
        resp.on("end", () => {
            console.log(response);
            // console.log(JSON.parse(data).explanation);
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
exports.RecallMode=RecallMode;