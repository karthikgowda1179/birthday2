this.$dom = {};
this.$dom.animatedText = document.createElement('div');
this.text = "We wish you a happy birthday. We feel so blessed to have you as our mom. We wish you an amazing year as we start our journey in Florida. We love you so much!    --Leo";  // MESSAGE AREA , THIS CAN BE CHANGED FROM YOUR MESSAGE :)
this.text1 = "Happy Birthday to the most amazing mom in the world! Thank you for being there for us and helping us when we need you. We love you very much and we hope you have the happiest birthday ever!   --Robby";
this.$dom.container = document.getElementById('container');
this.$dom.container.appendChild(this.$dom.animatedText);
this.text.width ='100px';
animateText();
animateText1();
function animateText(){
	var arrayOfLetters = this.text.split("");
	var animatedSpan = [];
	arrayOfLetters.forEach(function(item){
		var span = document.createElement('span');
		span.innerHTML = item;
		animatedSpan.push(span);
		span.style.opacity = 0.2;
		span.style.color = 'rgba(130, 113, 192, 0.505)';
		this.$dom.animatedText.appendChild(span);
	});
	TweenMax.staggerTo(animatedSpan, .2,{
		opacity : 1,
		delay : 2
	},0.05);
}

function animateText1(){
	var arrayOfLetters = this.text1.split("");
	var animatedSpan = [];
	this.$dom.animatedText.appendChild(document.createElement('br'));
	this.$dom.animatedText.appendChild(document.createElement('br'));
	arrayOfLetters.forEach(function(item){
		var span = document.createElement('span');
		span.innerHTML = item;
		animatedSpan.push(span);
		span.style.opacity = 0.2;
		span.style.color = 'rgba(130, 113, 192, 0.505)';
		this.$dom.animatedText.appendChild(span);
	});
	TweenMax.staggerTo(animatedSpan, .2,{
		opacity : 1,
		delay : 13
	},0.05);
}

