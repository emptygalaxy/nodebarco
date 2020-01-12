const barco = require('./');

barco.connect('192.168.50.100', 9999);

barco.listPresets(undefined, undefined, handlePresets);

/**
 *
 * @param {{success: number, response: object}} result
 * @param {null|string} error
 */
function handlePresets(result, error)
{
    if(error)
        console.log('Error getting presets');

    /**
     * @type {{id: number, Name: string, presetSno: number, LockMode: number}[]}
     */
    let presets = result.response;

    for(let i=0; i<presets.length; i++)
    {
        let preset = presets[i];
    }
}