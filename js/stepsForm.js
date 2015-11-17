/**
 * stepsForm.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */

 $(document).ready(function() {


 TweenLite.set($('.progress'),  {  width: 0});

	
});

	var dotCurrent = 0;
	var currentField = $(".current").attr('data-id');
	var lastEntry = 1;

		$(".nav-dots button").click(function() {
			currentField = $(".current").attr('data-id');
			dotCurrent = $(this).attr('data-id');
			var input = $( ".current input").val();
			var nextEntry = parseInt(currentField) + 1;

			$(".error-message").removeClass("show");
			
			if (dotCurrent > currentField) {

				
				moveForward(currentField, dotCurrent, input, nextEntry);
				

				
			}else{

				labelFlyDown();
				updateProgress();
				
				$(".simform").addClass('show-pre');
				$(".nav-dots button").removeClass("dot-current");
				$(this).addClass("dot-current");
				setTimeout(function() {$(".simform").removeClass('show-pre');},500);
				$( ".questions li" ).each(function( index ) {
				  var current = $(this).attr('data-id');
				  if (current == dotCurrent) {
				  	$(this).addClass('current');
				  } else {
				  	$(this).removeClass('current');
				  }
				});
			};
		});

		function moveForward(currentField, dotCurrent, input, nextEntry){
					if(input == ""){
					$(".current .error-message").text('Please fill the field before continuing');
					$(".current .error-message").addClass("show");
					console.log(currentField);

				}//if the user clicks on a fwn nav dot without entering data
				else if(input.length > 255){
					$(".current .error-message").text('Thats a little long, please try again');
					$(".current .error-message").addClass("show");
				}

				else if(currentField == 2 && !isValidEmailAddress( input ) ) { //check email format
					$(".current .error-message").text('Please enter a correct email address');
					$(".current .error-message").addClass("show");
				}

				else if(currentField == 3 && !isValidPhoneNumber( input ) ) { //check email format
					$(".current .error-message").text('Please enter a valid UK phone number');
					$(".current .error-message").addClass("show");
				}

				else if(dotCurrent <= nextEntry || dotCurrent <= lastEntry && dotCurrent){

				labelFlyUp();

				if (lastEntry <= currentField) {lastEntry++;}; //increment the last entry var each time a field is filled in upto 4 times

					$(".error-message").removeClass("show");
					
					$(".simform").addClass('show-next');
					setTimeout(function() {$(".simform").removeClass('show-next');},500);

					$( ".questions li" ).each(function( index ) {
					  var current = $(this).attr('data-id');
					  if (current == dotCurrent) {
					  	$(this).addClass('current');
					  } else {
					  	$(this).removeClass('current');
					  }
					});

					updateProgress();
					$(".nav-dots button").removeClass("dot-current");//switch the nav dots
					$(".nav-dots ."+dotCurrent).addClass("dot-current");
				
				}
				else{
					$(".current .error-message").text('Please fill in all fields');
					$(".current .error-message").addClass("show");
				};
		};

		
		function labelFlyUp(){
 				TweenLite.set($('.simform .questions li > span label'), {  y:75, opacity: 0});
				TweenLite.set($('.simform .questions li.current > span label'), {  y:-0, opacity: 1});
				TweenLite.to($('.simform .questions li > span label'), 0.5, { ease: Back.easeOut.config(1.7), y:0, opacity: 1});
				TweenLite.to($('.simform .questions li.current > span label'), 0.5, { ease: Back.easeOut.config(1.7), y:-75, opacity: 0});
 		};

 		function labelFlyDown(){
				TweenLite.set($('.simform .questions li > span label'), {  y:-75, opacity: 0});
				TweenLite.set($('.simform .questions li.current > span label'), {  y:0, opacity: 1});
				TweenLite.to($('.simform .questions li > span label'), 0.5, { ease: Back.easeOut.config(1.7), y:0, opacity: 1});
				TweenLite.to($('.simform .questions li.current > span label'), 0.5, { ease: Back.easeOut.config(1.7), y:75, opacity: 0});
 		};

 		function updateProgress(){
				TweenLite.to($('.progress'), 1, { ease: Bounce.easeOut, width: (dotCurrent*25-25) + '%'});

		};

	var transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	};

	function stepsForm( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
  		extend( this.options, options );
  		this._init();
	};

	stepsForm.prototype.options = {
		onSubmit : function() { return false; }
	};


	stepsForm.prototype._init = function() {
		// current question
		this.current = 0;

		// questions
		this.questions = [].slice.call( this.el.querySelectorAll( 'ol.questions > li' ) );
		// total questions
		this.questionsCount = this.questions.length;

		// show first question
		classie.addClass( this.questions[0], 'current' );
		
		// next question control
		this.ctrlNext = this.el.querySelector( '.next' );

		// progress bar
		this.progress = this.el.querySelector( 'div.progress' );
		
		// question number status
		this.questionStatus = this.el.querySelector( 'span.number' );
		// current question placeholder
		this.currentNum = this.questionStatus.querySelector( 'span.number-current' );
		this.currentNum.innerHTML = Number( this.current + 1 );
		// total questions placeholder
		this.totalQuestionNum = this.questionStatus.querySelector( 'span.number-total' );

		this.totalQuestionNum.innerHTML = this.questionsCount;

		// error message
		this.error = this.el.querySelector( 'span.error-message' );
		
		// init events
		this._initEvents();

	};

	/**
	 * FForm options
	 */
	stepsForm.prototype.options = {
		// show progress bar
		ctrlProgress : true,
		// show navigation dots
		ctrlNavDots : true,
		// show [current field]/[total fields] status
		ctrlNavPosition : true,
		// reached the review and submit step
		onReview : function() { return false; }
	};



	stepsForm.prototype._updateNav = function() {
		if( this.options.ctrlNavDots ) {
			classie.remove( this.ctrlNav.querySelector( 'button.dot-current' ), 'dot-current' );
			classie.add( this.ctrlNavDots[ this.current ], 'dot-current' );
			this.ctrlNavDots[ this.current ].disabled = false;
		}
	};


	
	stepsForm.prototype._initEvents = function() {
		var self = this,
			// first input
			firstElInput = this.questions[ this.current ].querySelector( 'input' ),
			// focus
			onFocusStartFn = function() {
				firstElInput.removeEventListener( 'focus', onFocusStartFn );
				classie.addClass( self.ctrlNext, 'show' );
			};

		// show the next question control first time the input gets focused
		firstElInput.addEventListener( 'focus', onFocusStartFn );

		// show next question
		this.ctrlNext.addEventListener( 'click', function( ev ) { 
			ev.preventDefault();
			self._nextQuestion(); 


		} );

		// pressing enter will jump to next question
		document.addEventListener( 'keydown', function( ev ) {
			var keyCode = ev.keyCode || ev.which;
			// enter
			if( keyCode === 13 ) {
				
				ev.preventDefault(); //prevent form subm

				self._nextQuestion();
				
			}
		});

		// disable tab
		this.el.addEventListener( 'keydown', function( ev ) {
			var keyCode = ev.keyCode || ev.which;
			// tab
			if( keyCode === 9 ) {
				ev.preventDefault();
			} 
		} );
	};

	stepsForm.prototype._nextQuestion = function() {

		currentField = $(".current").attr('data-id');
			
			var input = $( ".current input").val();
			var nextEntry = parseInt(currentField) + 1;

							if(input == ""){
					$(".current .error-message").text('Please fill the field before continuing');
					$(".current .error-message").addClass("show");
					console.log(currentField);

				}//if the user clicks on a fwn nav dot without entering data
				else if(input.length > 255){
					$(".current .error-message").text('Thats a little long, please try again');
					$(".current .error-message").addClass("show");
				}

				else if(currentField == 2 && !isValidEmailAddress( input ) ) { //check email format
					$(".current .error-message").text('Please enter a correct email address');
					$(".current .error-message").addClass("show");
				}

				else if(currentField == 3 && !isValidPhoneNumber( input ) ) { //check email format
					$(".current .error-message").text('Please enter a valid UK phone number');
					$(".current .error-message").addClass("show");
				}
				else{
				labelFlyUp();
		 		updateProgress();
		 		$(".error-message").removeClass("show");

			// clear any previous error messages
			this._clearError();

			// current question
			var currentQuestion = this.questions[ this.current ];

			// increment current question iterator
			++this.current;

			// update progress bar
			this._progress();

				// change the current question number/status
				this._updateQuestionNumber();

				// add class "show-next" to form element (start animations)
				classie.addClass( this.el, 'show-next' );

				// remove class "current" from current question and add it to the next one
				// current question
				var nextQuestion = this.questions[ this.current ];
				classie.removeClass( currentQuestion, 'current' );
				classie.addClass( nextQuestion, 'current' );
				

				//switch nav circles if the user hits enter
				currentField = $(".current").attr('data-id');
				dotCurrent = $(".nav-dots button").attr('data-id');

				$( $(".nav-dots button")).removeClass('dot-current');
				$( $(".nav-dots ." +currentField)).addClass('dot-current');
				if (lastEntry <= currentField) {lastEntry++;};
			

			nextQuestion.querySelector( 'input' ).focus();
			}
		}

	// updates the progress bar by setting its width
	stepsForm.prototype._progress = function() {
		updateProgress();
		// this.progress.style.width = this.current * ( 100 / this.questionsCount ) + '%';
	}

	// changes the current question number
	stepsForm.prototype._updateQuestionNumber = function() {
		// first, create next question number placeholder
		this.nextQuestionNum = document.createElement( 'span' );
		this.nextQuestionNum.className = 'number-next';
		this.nextQuestionNum.innerHTML = Number( this.current + 1 );
		// insert it in the DOM
		this.questionStatus.appendChild( this.nextQuestionNum );
	}

	// submits the form
	stepsForm.prototype._submit = function() {
		this.options.onSubmit( this.el );
	}


	//email regex
	function isValidEmailAddress(input) {
	    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	    return pattern.test(input);
	};

	//UK phone regex
	function isValidPhoneNumber(input) {
	    var pattern = /^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$/i;
	    return pattern.test(input);
	};

	// clears/hides the current error message
	stepsForm.prototype._clearError = function() {
		classie.removeClass( this.error, 'show' );
	}

	// add to global namespace
	window.stepsForm = stepsForm;

