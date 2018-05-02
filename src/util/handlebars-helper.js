const Handlebars = require('handlebars-template-loader/runtime');

Handlebars.registerHelper('link',function(res){
    return res+1;
})