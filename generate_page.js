var handlebars = require('handlebars'),
    fs = require('fs');

var data = {
    cards: [
        {front: 'Who was first president?', back: 'George Washington'},
    ]
}

var webpage_path = __dirname + '/index_generated.html'
console.assert(webpage_path == "/home/cchilders/projects/trilogy/work-on-repos/aelly-flashcard-generator/index_generated.html")

fs.readFile('index_template.html', 'utf-8', function(error, source) {
    var template = handlebars.compile(source);
    var html = template(data);
    console.log(html);
    fs.writeFile(webpage_path, html);
})
