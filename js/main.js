var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("../node_modules/inquirer");
//Test code-------------------------------------------------------------------
// var firstPresident = new BasicCard(
//     "Who was the first president of the United States?", "George Washington");

// // "Who was the first president of the United States?"
// console.log(firstPresident.front); 

// // "George Washington"
// console.log(firstPresident.back); 


// try{
//     var firstPresidentCloze = new ClozeCard("George Washington was the first president of the United States.", "George Washington");
//     // "George Washington"
//     console.log(firstPresidentCloze.cloze); 

//     // " ... was the first president of the United States.
//     console.log(firstPresidentCloze.partial); 

//     // "George Washington was the first president of the United States.
//     console.log(firstPresidentCloze.fullText);

// }
// catch(e){
//     console.log(e);
// }

// // Should throw or log an error because "oops" doesn't appear in "This doesn't work"
// try{
//     var brokenCloze = new ClozeCard("This doesn't work", "oops");
// }
// catch(e){
//     console.log(e);
// }
//---------------------------------------------------------------------------------


console.log("Instruction:\n You have two types of flash cards that you can create.\n 1. Basic flash card. \n 2. Cloze Deleted flash card.\n+++++++++++++++++++++++++++++++++++++++++++++++++++++");

var cardsArr=[];
var createFC= function(){
    inquirer.prompt([
        {
            type:"list",
            name:"cardType",
            message:"Which type of flash card would you like to create?",
            choices: ["Basic","Cloze Deleted"]
        }
    ]).then(function(answer){
        console.log("---------------------------------------------\nCreating "+ answer.cardType+" flash card.");
var

        switch(answer.cardType)
        {
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
                    catch(e)
                    {
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

function moreFC()
{
        inquirer.prompt([
        {
            type:"confirm",
            name:"more",
            message:"Would you like to create more flash cards?"
        }
    ]).then(function(answer){
        if(answer.more)
        {
            createFC();
        }
        else
        {
            console.log("\n\nHere are all the flash cards\n========================================");
            console.log(JSON.stringify(cardsArr) +"\n");

        
        }
    });

}
