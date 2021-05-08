var xmlFormatter = require('./xmlformatter.js');

function opf(inputXML, opts) {
    // opts is currently unused

    var outputXML = xmlFormatter(inputXML, {
        indentation: '',
        collapseContent: true,
        sortRules: [
            {
                parentTag: 'DECLARE',
                childTag: 'PhysicalForeignKey',
                sortAttribute: 'name',
                reverse: false
            }
        ]
    });
}

module.exports = opf;
