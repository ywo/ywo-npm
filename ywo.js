var  fs= require('fs');
var htmlmin = require('htmlmin');
var globalVar = require('./variable');
module.exports = {
    html2js : function (htmlStr) {
        htmlStr = htmlmin(htmlStr).trim()
           .replace(/[\r\n\t]/g, ' ')
           .replace(/\s+/g, ' ')
           .replace(/\\/g, '\\\\')
           .replace(/'/g, '\\x27')
           .replace(/"/g, '\\x22')
           .replace(/\//g, '\\/')
           .replace(/\n/g, '\\n')
           .replace(/\r/g, '\\r')
           .replace(/\t/g, '\\t');
        return htmlStr;
    },
    print: function(str, type){
        var types = {
            info : '\x1b[32m' + str + '\x1b[0m',
            warn : '\x1b[31m' + str + '\x1b[0m'
        }
        console.log(types[type] || str);
    },
    log: function(level, msg) {
        if (level == 'ok') {
            console.log('\x1b[32m%s\x1b[0m', '[V] '+ msg);
        } else if (level == 'err') {
            console.log('\x1b[31m%s\x1b[0m', '[X] '+ msg);
        } else {
            console.log('[i] '+ msg);
        }
    },
    color: {
        green: function(str) {
            return '\x1b[32m' + str + '\x1b[0m';
        },
        red: function(str) {
            return '\x1b[31m' + str + '\x1b[0m';
        }
    },
    mkdir: function(path) {
        var i, currentPath = '', dirNames = path.split(/[\/\\]/);
        for (i = 0; i < dirNames.length; i++) {
            currentPath += (i===0 ? '' : '/') + dirNames[i];
            if (fs.existsSync(currentPath)) {
                continue;
            }
            fs.mkdirSync(currentPath);
        }
    },
    globalVar : globalVar

}