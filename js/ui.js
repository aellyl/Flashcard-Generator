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
				+ front
				+"</div><div class=\"back\">"+back
				+"</div></div>");
}
