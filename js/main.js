var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("../node_modules/inquirer");
var handlebars = require('handlebars');
var fs = require('fs');
var child_proc = require('child_process');

// http://voidcanvas.com/get-working-directory-name-and-file-name-in-node/
// console.log(__dirname)
// console.log(__filename)

console.log("Instruction:\n You have two types of flash cards that you can create.\n 1. Basic flash card. \n 2. Cloze Deleted flash card.\n+++++++++++++++++++++++++++++++++++++++++++++++++++++");

var cardsArr = [];

// function generate_html(cards_array) {
//     // https://stackoverflow.com/questions/7083045/fs-how-do-i-locate-a-parent-folder
//     var webpage_path = __dirname + '/../index_generated.html';
//     var template_path = __dirname + '/../index_template.html';
//     var html;
//     var html = fs.readFile(template_path, 'utf-8', function(error, source) {
//         var template = handlebars.compile(source);
//         var data = {
//             cards: cardsArr
//         }
//         return template(data);
//     });
//     return html
// }


var createFC = function() {
    inquirer.prompt([
        {
            type: "list",
            name: "cardType",
            message: "Which type of flash card would you like to create?",
            choices: ["Basic", "Cloze Deleted"]
        }
    ]).then(function(answer) {
        console.log("---------------------------------------------\nCreating " + answer.cardType + " flash card.");

        switch(answer.cardType) {
            case "Basic":
                inquirer.prompt([
                    {
                        type:"input",
                        name:"front",
                        message:"Please enter your question: "
                    },
                    {
                        type:"input",
                        name:"back",
                        message:"Please enter your answer: "
                    }
                ]).then(function(answer){

                    cardsArr.push(new BasicCard(answer.front,answer.back));

                    moreFC();
                });

                break;

            case "Cloze Deleted":

                inquirer.prompt([
                    {
                        type:"input",
                        name:"front",
                        message:"Please enter the full correct information: "
                    },
                    {
                        type:"input",
                        name:"back",
                        message:"Please enter the answer you like to hide: "
                    }
                ]).then(function(answer){
                    try{
                        cardsArr.push(new ClozeCard(answer.front,answer.back));
                         moreFC();
                    }
                    catch(e) {
                        console.log(e);
                        console.log("---------------------------------------------\nPlease try again;");
                        createFC();
                    }
                });

                break;
        }

    }).catch(function(err){
        console.log(err);
    });
};

createFC();

function moreFC() {
    inquirer.prompt([
        {
            type:"confirm",
            name:"more",
            message:"Would you like to create more flash cards?"
        }
    ]).then(function(answer) {
        if(answer.more) {
            createFC();
        } else {
            // https://stackoverflow.com/questions/7083045/fs-how-do-i-locate-a-parent-folder
            var webpage_path = __dirname + '/../index_generated.html';
            var template_path = __dirname + '/../index_template.html';
            fs.readFile(template_path, 'utf-8', function(error, source) {
                var template = handlebars.compile(source);
                var data = {
                    cards: cardsArr
                }
                var html = template(data);
                fs.writeFile(webpage_path, html);
            });

            if (process.platform == 'linux') {
                child_proc.exec(`google-chrome ${webpage_path}`)
            } else if (process.platform == 'darwin') {
                child_proc.exec(`open -a "Google Chrome" ${webpage_path}`, function() {} );
            }
        }
    });

}
