(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function BasicCard(front,back){
    if(this instanceof BasicCard){
        this.front=front;
        this.back=back;
    }
    else{
        return new BasicCard(front,back);
    }
    
}

module.exports=BasicCard;
},{}],2:[function(require,module,exports){
function ClozeCard(text,cloze){
    if(this instanceof ClozeCard){
        this.fullText=text;
        this.cloze=cloze;
        if(this.fullText.includes(cloze))
        {
            this.partial=this.fullText.replace(cloze,"______");
        }
        else throw "Invalid Cloze Card.";
    }
    else{
        return new ClozeCard(text,cloze);
    }
    
}

module.exports=ClozeCard;
},{}],3:[function(require,module,exports){
var BasicCard=require("./BasicCard.js");
var ClozeCard=require("./ClozeCard.js");

//-------------------------------------------------------------------
//referenced this code from http://jsfiddle.net/adiioo7/vG5u9/1/
//
$('#createFC input, #createFC select').bind('input propertychange change',function(){
		var currentInput = $(this);
		var currentContainer = currentInput.closest(".section");
		var allRequired = 1;
		var requiredForm = 1;
		currentContainer.find('.required').each(function(){
			var currentRequiredValue = $(this).val();
			if(currentRequiredValue == ''||currentRequiredValue == '0')
				allRequired = 0;
		});
		if(allRequired == 1) {//if not empty
			var nextSection = currentContainer.next('.section.disabled');
			nextSection.removeClass('disabled').addClass('enabled').find('input, select,button').prop('disabled',false);
			

		}else{//if empty
			var enabledSections = currentContainer.nextAll('.section.enabled');
			enabledSections.removeClass('enabled').addClass('disabled').find('input, select, button').prop('disabled',true);
		}

	});

//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
//reference this code from https://jsfiddle.net/james2doyle/qsQun/
//
function flip() {
    $('.card').toggleClass('flipped');
}
//-----------------------------------------------------------------------


$("#submit").click(function(){
    event.preventDefault();
	var fcType=$("#typeFC option:selected").val();
	var front=$("#front-input").val();
	var back=$("#back-input").val();
	if(front !== "" && back !=="")
	{
		switch(fcType)
		{
			case "BasicCard":
				//TODO: create a new basic flash card and display it
				displayNewCard(new BasicCard(front,back));
				break;
			
			case "ClozeCard":
				displayNewCard(new ClozeCard(front,back));
				break;

			default:
				console.log("invalid card type");
		}


	}else
	{
		console.log("no question or answer is entered.");
	}

	//clear the form
		$("#front-input").val("");
		$("#back-input").val("");

})

$("#clear").click(function(){
    event.preventDefault();
		$("#front-input").val("");
		$("#back-input").val("");

})

function displayNewCard(fc)
{
	var front,back;
	if(fc instanceof ClozeCard)
	{
		front=fc.partial;
		back=fc.fullText;
	}

	if (fc instanceof BasicCard)
	{
		front=fc.front;
		back=fc.back;
	}
	$("#displayFC").append("<div class=\"card\"><div class=\"front\">"
				+front
				+"</div><div class=\"back\">"+back
				+"</div></div>");
}
},{"./BasicCard.js":1,"./ClozeCard.js":2}]},{},[3]);
