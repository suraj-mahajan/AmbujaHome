/*
** jQuery Mobile Calculator
**
 */

var RocknCoder = RocknCoder || {};
RocknCoder.Pages = RocknCoder.Pages || {};

// handles all of the page events and dispatches them to a handler, if one exists
RocknCoder.Pages.Kernel = function (event) {
	var that = this,
		eventType = event.type,
		pageName = $(this).attr("data-rockncoder-jspage");

	// if you want to see jQuery Mobile's page event lifecycle, uncomment the line below
	//console.log("Kernel: "+pageName+", "+eventType);
	if (RocknCoder && RocknCoder.Pages && pageName && RocknCoder.Pages[pageName] && RocknCoder.Pages[pageName][eventType]) {
		RocknCoder.Pages[pageName][eventType].call(that);
	}};

// hooks all of the page events
// uses "live" so that the event will stay hooked even if new elements are added later
RocknCoder.Events = function () {
	$("div[data-rockncoder-jspage]").on(
		'pagebeforecreate pagecreate pagebeforeload pagebeforeshow pageshow pagebeforechange pagechange pagebeforehide pagehide pageinit',
		RocknCoder.Pages.Kernel).on(
		"pageinit", RocknCoder.hideAddressBar);
}();

// this is the handler for all page events
RocknCoder.Pages.calculator = function(){
	var pageshow = function () {
		RocknCoder.Display.init($("#displayControl")[0]);
		$("a").click(function(event){
			var key = $(this).attr("data-rockncoder-tag"),
				id = this.id;
			event.preventDefault();

			
			
				
			switch(id){
				case "key0":
				case "key1":
				case "key2":
				case "key3":
				case "key4":
				case "key5":
				case "key6":
				case "key7":
				case "key8":
				case "key9":
				case "keyDecimalPoint":
					RocknCoder.Display.enterDigit(key);
					break;
				case "keyC":
					RocknCoder.Display.clearDisplay();
					break;
				case "keyCe":
					RocknCoder.Display.clearError();
					break;
				case "keyAdd":
					RocknCoder.Display.setOperator("+",key);
					break;
				case "keySubtract":
					RocknCoder.Display.setOperator("-",key);
					break;
				case "keyMultiply":
					RocknCoder.Display.setOperator("*",key);
					break;
				case "keyDivide":
					RocknCoder.Display.setOperator("/",key);
					break;
				case "keyEquals":
					RocknCoder.Display.setOperator("=");
					break;
				case "keyFeet":
					RocknCoder.Display.enterFeet(key);
					break;
				case "keyInch":
					RocknCoder.Display.enterInch(key);
					break;
				case "kayDori":
					RocknCoder.Display.enterDoori(key);
					break;
				case "keyRMTR":
					RocknCoder.Display.CalculateRMTR();
					break;
				case "keyRINCH":
					RocknCoder.Display.CalculateRINCH();
					break;
				case "keySM2SF":
					RocknCoder.Display.Calculate_SM2SF();
					break;
				case "keySF2SM":
					RocknCoder.Display.Calculate_SF2SM();
					break;
			}
			return false;
		});
	},
	pagehide = function () {
		$("a").unbind("tap");
	};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	};
}();

// Display in this case refers to the input type="text" above the buttons
RocknCoder.Display = function() {
	var $displayControl,
	
		operator,
		operatorSet = false,
		equalsPressed = false,
		accumulator = null,

		add = function(x, y) {
			return x + y;
		},
		divide = function(x, y) {
			if (y == 0) {
				alert("Can't divide by 0");
				return 0;
			}
			return x / y;
		},
		multiply = function(x, y) {
			return x * y;
		},
		subtract = function(x, y) {
			return x - y;
		},
		calculate = function() {
			if (!operator || accumulator == null) return;
			var currNumber = parseFloat($displayControl.value),
				newVal = 0;

			switch (operator) {
				case "+":
					newVal = add(accumulator, currNumber);
					break;
				case "-":
					newVal = subtract(accumulator, currNumber);
					break;
				case "*":
					newVal = multiply(accumulator, currNumber);
					break;
				case "/":
					newVal = divide(accumulator, currNumber);
					break;
			}
			setValue(newVal);
			accumulator = newVal;
			
		},
		
		findstacific=function()
		{
			val_ =$('#CalculationControl').val();
			if ( (val_.indexOf("'") > 0) || (val_.indexOf("\"") > 0) || (val_.indexOf("⅛") > 0) )
			{
				if (val_.indexOf("+") > 0)
				{
					Special_Addition(val_);	
				}
				else if (val_.indexOf("-") > 0)
				{
					Special_Sub(val_);	
				}
				else if (val_.indexOf("Χ") > 0)
				{
					Special_Mul(val_);	
				}
				else if (val_.indexOf("÷") > 0)
				{
					Special_Devid(val_);	
				}
			}
		},
		
		
		
		
		Special_Addition=function(val_)
		{
			var arr = val_.split('+');
			console.log(arr);
	
			i=arr[0].indexOf('\'');
			x1=arr[0].substring(0,i);
			//	alert(VAR_FEET);
			a=arr[0].indexOf('\"');
			y1=arr[0].substring(i+1,a);
			
			b=arr[0].indexOf('⅛');
			z1=arr[0].substring(a+1,b);
			
		
			c=arr[1].indexOf('\'');
			m1=arr[1].substring(0,c);
			
			d=arr[1].indexOf('\"');
			n1=arr[1].substring(c+1,d);
			
			e=arr[1].indexOf('⅛');
			o1=arr[1].substring(d+1,e);

			
			c1=parseInt(parseInt(z1 ) + parseInt(o1));  // 	Dori 
			b1=parseInt(parseInt(y1 ) + parseInt(n1));	//	inch
			a1=parseInt(parseInt(x1 ) + parseInt(m1));	//	feet
			
			console.log(c1);
			console.log(b1);
			console.log(a1);
			
			if (c1 > 8)
			{
				c1=c1-8;
				b1=b1 + 1;
			}
			if (b1 > 12)
			{
				b1=b1-12;
				a1=a1+1;
			}
			ans=a1+'\''+ b1 + '\"' + c1 + '⅛';
			$("#displayControl").val(ans);
	
			
		},
		Special_Sub=function(val_)
		{
			var arr = val_.split('-');
			console.log(arr);
	
			i=arr[0].indexOf('\'');
			x1=arr[0].substring(0,i);
			//	alert(VAR_FEET);
			a=arr[0].indexOf('\"');
			y1=arr[0].substring(i+1,a);
			
			b=arr[0].indexOf('⅛');
			z1=arr[0].substring(a+1,b);
			
		
			c=arr[1].indexOf('\'');
			m1=arr[1].substring(0,c);
			
			d=arr[1].indexOf('\"');
			n1=arr[1].substring(c+1,d);
			
			e=arr[1].indexOf('⅛');
			o1=arr[1].substring(d+1,e);

			
			c1=parseInt(parseInt(z1 ) - parseInt(o1));  // 	Dori 
			b1=parseInt(parseInt(y1 ) - parseInt(n1));	//	inch
			a1=parseInt(parseInt(x1 ) - parseInt(m1));	//	feet
			
			if(c1 < 0){ c1=+c1; }
			if(b1 < 0){ b1=+b1; }

			
			
			if (c1 > 8)
			{
				c1=c1-8;
				b1=b1 + 1;
			}
			if (b1 > 12)
			{
				b1=b1-12;
				a1=a1+1;
			}
			ans=a1+'\''+ b1 + '\"' + c1 + '⅛';
			$("#displayControl").val(ans);
		},
		Special_Mul=function(val_)
		{
			var arr = val_.split('Χ');
			console.log(arr);
	
			i=arr[0].indexOf('\'');
			x1=arr[0].substring(0,i);
			//	alert(VAR_FEET);
			a=arr[0].indexOf('\"');
			y1=arr[0].substring(i+1,a);
			
			b=arr[0].indexOf('⅛');
			z1=arr[0].substring(a+1,b);
			
		
			c=arr[1].indexOf('\'');
			m1=arr[1].substring(0,c);
			
			d=arr[1].indexOf('\"');
			n1=arr[1].substring(c+1,d);
			
			e=arr[1].indexOf('⅛');
			o1=arr[1].substring(d+1,e);
			
			pq=(
					(z1+
						((y1 * 8 )+ (x * 96))
					)
					*
					(
						o1+
						( (n1 * 8) + (m1 * 96) )
					)
			);
			pq=pq/9216;

			
		
			
		
		
		
		
			//ans=a1+'\''+ b1 + '\"' + c1 + '⅛';
			$("#displayControl").val(pq);
		},
		Special_Devid=function(val_)
		{
				var arr = val_.split('Χ');
			console.log(arr);
	
			i=arr[0].indexOf('\'');
			x1=arr[0].substring(0,i);
			//	alert(VAR_FEET);
			a=arr[0].indexOf('\"');
			y1=arr[0].substring(i+1,a);
			
			b=arr[0].indexOf('⅛');
			z1=arr[0].substring(a+1,b);
			
		
			c=arr[1].indexOf('\'');
			m1=arr[1].substring(0,c);
			
			d=arr[1].indexOf('\"');
			n1=arr[1].substring(c+1,d);
			
			e=arr[1].indexOf('⅛');
			o1=arr[1].substring(d+1,e);
			
			pq=(
					(z1+
						((y1 * 8 )+ (x * 96))
					)
					/
					(
						o1+
						( (n1 * 8) + (m1 * 96) )
					)
			);
			$("#displayControl").val(pq);
		},
		
		setValue = function(val) {
			$displayControl.value = val;
			
		},
		getValue = function(){
			return $displayControl.value + "";
		},
		
		getCalcValue = function(){
			return $('#CalculationControl').val() + "";
		},
		
		SetCalValue=function(val)
		{
			
		},
		// clears all of the digits
		clearDisplay = function() {
			accumulator = null;
			equalsPressed = operatorSet = false;
			setValue("0");
			$("#CalculationControl").val("0");
		},
		// removes the last digit entered in the display
		clearError = function(){
			var display = getValue();
			if(display){
				display = display.slice(0, display.length - 1);
				display = display? display: "0";
				setValue(display);
			}
			
			var display2 = getCalcValue();
			if(display2){
				display2 = display2.slice(0, display2.length - 1);
				display2= display2? display2: "0";
				//setValue(display);
				$("#CalculationControl").val(display2);
			}
		},
		// handles a numeric or decimal point key being entered
		enterDigit = function(buttonValue) {
			var currentlyDisplayed = $displayControl.value;
			// keep the max digits to a reasonable number
			if(currentlyDisplayed.length < 20){
				if (operatorSet == true || currentlyDisplayed === "0") {
					setValue("");
					operatorSet = false;
				}
				// already pressed a decimal point
				if(buttonValue === "." && currentlyDisplayed.indexOf(".")>= 0){
					return;
				}
				setValue($displayControl.value + buttonValue);
			}
		},
		
		enterFeet = function(buttonValue) {
			var currentlyDisplayed = $displayControl.value;
			// keep the max digits to a reasonable number
			if(currentlyDisplayed.length < 20){
				if (operatorSet == true || currentlyDisplayed === "0") {
					setValue("");
					operatorSet = false;
				}
				// already pressed a decimal point
				if(buttonValue === "'" && currentlyDisplayed.indexOf("'")>= 0){
					return;
				}
				setValue($displayControl.value + buttonValue);
			}
		},
		
		enterInch = function(buttonValue) {
			var currentlyDisplayed = $displayControl.value;
			// keep the max digits to a reasonable number
			if(currentlyDisplayed.length < 20){
				if (operatorSet == true || currentlyDisplayed === "0") {
					setValue("");
					operatorSet = false;
				}
				// already pressed a decimal point
				if(buttonValue === "&quot;" && currentlyDisplayed.indexOf("&quot;")>= 0){
					return;
				}
				setValue($displayControl.value + buttonValue);
			}
		},
		
		CalculateRMTR=function(){
			
			val=$("#CalculationControl").val();
			
			
			i=val.indexOf('\'');
			x1=val.substring(0,i);
			//	alert(VAR_FEET);
			a=val.indexOf('\"');
			y1=val.substring(i+1,a);
			
			b=val.indexOf('⅛');
			z1=val.substring(a+1,b);
			
			
			alert("x1= "+ x1 + " - y1=" + y1 + " - z1=" + z1);
			ab=(
				((x1 * 12) * 25.4) +
				(y1 * 25.4) + ((z1 * 25.4)/8)
			)/1000;
			
			$("#displayControl").val(ab);
			
		},
		
		CalculateRINCH=function(){
			
			val=$("#CalculationControl").val();
			
			
			i=val.indexOf('\'');
			x1=val.substring(0,i);
			//	alert(VAR_FEET);
			a=val.indexOf('\"');
			y1=val.substring(i+1,a);
			
			b=val.indexOf('⅛');
			z1=val.substring(a+1,b);
			
			ab=(x1 * 12) + parseInt(y1);
			
			$("#displayControl").val(ab + "" + z1);
			
		},
		
		Calculate_SM2SF=function()
		{
			val=$("#CalculationControl").val();
			ab=val * 10.76391;
			$("#displayControl").val(ab);
		},
		
		Calculate_SF2SM=function()
		{
			val=$("#CalculationControl").val();
			ab=val * 0.09290304;
			$("#displayControl").val(ab);
		},
		
		enterDoori = function(buttonValue) {
			var currentlyDisplayed = $displayControl.value;
			// keep the max digits to a reasonable number
			if(currentlyDisplayed.length < 20){
				if (operatorSet == true || currentlyDisplayed === "0") {
					setValue("");
					operatorSet = false;
				}
				// already pressed a decimal point
				if(buttonValue === "&frac18;" && currentlyDisplayed.indexOf("&frac18;")>= 0){
					return;
				}
				setValue($displayControl.value + buttonValue);
			}
		},

		
		setOperator = function(newOperator,val) {
			if (newOperator === "=") {
				equalsPressed = true;
				calculate();
				findstacific();
				return;
			}
			if (!equalsPressed) calculate();
			equalsPressed = false;
			operator = newOperator;
			operatorSet = true;
			accumulator = parseFloat($displayControl.value);
			
		},
		// set the pointer to the HTML element which displays the text
		init = function(currNumber) {
			$displayControl = currNumber;
		};
	// all of the functions below are visible outside of this function
	return {
		clearDisplay: clearDisplay,
		clearError: clearError,
		enterDigit: enterDigit,
		enterInch:enterInch,
		CalculateRMTR:CalculateRMTR,
		CalculateRINCH:CalculateRINCH,
		Calculate_SF2SM:Calculate_SF2SM,
		Calculate_SM2SF:Calculate_SM2SF,
		enterDoori:enterDoori,
		setOperator: setOperator,
		enterFeet:enterFeet,
		init: init
	};
}();

