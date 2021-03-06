/*
jshint esversion: 6
*/


//code for loading menu
var loadMenu = function() {

	//if menu exists, delete it
	$('#HollyMenu').remove();

	//load CSS
	if (!$('.HollyCSS').length) {	//if not already added
		$("<style>")
	    .prop("type", "text/css")
	    .addClass("HollyCSS")
	    .html(`
	    #HollyMenu {
	    	all:unset;
	    	all:initial; 

	    	color: white!important;

	    	font-size: 12px;
	        position: absolute; 
	        top: 10px; 
	        left: 10px; 
	        min-width: 150px; 
	        background-color: rgba(0, 0, 0, 0.75); 
	        z-index: 1000000001; /*fuck you, cookie clicker*/
	    }
	    #HollyMenu h1 {
	    	background: black; 
	    	margin: 0px; 
	    	padding: 5px; 
	    	text-align: center; 
	    	font-weight: bold;
	    }
	    #HollyMenuContent {
	    	display: block; padding: 5px;"
	    }

	    #HollyMenuContent h2 {
	    	font-weight: bold;
	    	margin-top: 5px;
	    	margin-bottom: 2px;
	    	font-size: 120%;

	    }

		#HollyMenuContent input[type="button"], 
		#HollyMenuContent input[type="number"], 
		#HollyMenuContent button {
			color: white;
			background: black;
			border: 1px solid white;
			font-size: 12px;
		}`).appendTo("head");
	}

	//create menu
	$(document.body).append(`
	<div id="HollyMenu">
		<h1 onclick="$('#HollyMenuContent').toggle()">HollyCheats</h1>
		<div id="HollyMenuContent"></div>
	</div>`);

	//populate menu (with items/cheats)
	new GeneralCheats();
	if (location.pathname == "/spaceplan/") new SpacePlanCheats();
	if (location.pathname == "/cookieclicker/") new CookieClickerCheats();
	if (location.hostname == "monolith.greenpixel.ca") new MonolithCheats();
	if (location.pathname == "/tour-of-heroes/") new TourOfHeroesCheats();
	if (location.hostname == "adarkroom.doublespeakgames.com") new ADarkRoomCheats();
	new DebugCheats();
};

var GeneralCheats = function() {
	this.hookedRandom = false;
	this.hookedRandomValue = 0;
	$('#HollyMenuContent')	
		.append('<h2>General</h2>')
		.append('<input type="checkbox" onclick="GeneralCheats.UpdateRandomFunctionEnable(this.checked)">Hook Math.random()</br>')
		.append('<input type="number" min="0" max="0.99999999" step="0.05" value="' + this.hookedRandomValue + '" onchange="GeneralCheats.UpdateRandomFunctionValue(this.value)" /></br>')
		;
};
GeneralCheats.UpdateRandomFunctionEnable = function(enabled) {
	if (enabled != this.hookedRandom) {
		if (enabled) {
			this.origRandom = Math.random;	//store original in a safe place
			Math.random = function() {return GeneralCheats.hookedRandomValue;};
		} else {
			Math.random = this.origRandom;	//restore
		}
		this.hookedRandom = enabled;
	}
};
GeneralCheats.UpdateRandomFunctionValue = function(value) {
	this.hookedRandomValue = value;
};

var SpacePlanCheats = function() {
	$('#HollyMenuContent')	
		.append('<h2>SpacePlan cheats</h2>')
		.append('<input type="checkbox" onclick="SpacePlanCheats.SetAC(this)">Autoclick</br>')
		.append('<input type="checkbox" onclick="SpacePlanCheats.InfMoney(this)">Infinite Power</br>')
		.append('<input type="button" onclick="power = 0" value="Reset Power"></br>')
		;
};
SpacePlanCheats.SetAC = function(a) {
	if(a.checked) 	this.ACEnabled = setInterval(kinetigenClick, 10);
	 else 			clearInterval(this.ACEnabled);
};
SpacePlanCheats.InfMoney = function(a) {
	if(a.checked) {
		this.backupMoney = power;	//power is a global var
		power = Infinity;
	} else {
		power = this.backupMoney;
	}
};

var CookieClickerCheats = function() {
	$('#HollyMenuContent')	
		.append('<h2>CookieClicker cheats</h2>')
		.append('<input type="checkbox" onclick="CookieClickerCheats.SetAC(this)">Autoclick</br>')
		.append('<input type="checkbox" onclick="CookieClickerCheats.FreeUpgrades(this)">Free Upgrades</br>')
		.append('<input type="button" onclick="Game.OpenSesame()" value="Enable Debug Menu"></br>')
		.append('<input type="button" onclick="Game.cookies = Infinity" value="Infinite Cookies"></br>')
		//.append('<input type="button" onclick="Game.RuinTheFun()" value="Ruin The Fun"></br>')
		.append('<input type="button" onclick="CookieClickerCheats.CookiesArentAwful()" value="Remove &quot;Cheated cookies taste awful&quot;"></br>')
		.append('<input type="button" onclick="Game.cookies = 0" value="Reset Cookies"></br>')
		.append('<input type="checkbox" onclick="CookieClickerCheats.SetFace(this)">Elder Cookie Texture</br>')
		.append('<input type="checkbox" onclick="Game.PARTY = this.checked">Rave Party</br>')
		;
};
CookieClickerCheats.SetAC = function(a) {
	if(a.checked) 	this.ACEnabled = setInterval(Game.ClickCookie, 10);
	 else 			clearInterval(this.ACEnabled);
};
CookieClickerCheats.FreeUpgrades = function(a) {	//storing this inside the game's variables. usually not a good idea but it works
	if(a.checked)	Game.UpgradesById.forEach(function (e) { e.basePriceBackup = e.basePrice; e.basePrice = 0; });
	else			Game.UpgradesById.forEach(function (e) { e.basePrice = e.basePriceBackup; });
};
CookieClickerCheats.CookiesArentAwful = function() {
	Game.Achievements["Cheated cookies taste awful"].won = 0;
};
CookieClickerCheats.SetFace = function(a) {
	if(a.checked) 	Game.addClass("elderWrath");
	 else 			Game.removeClass("elderWrath");
};

var MonolithCheats = function() {
	$('#HollyMenuContent')	
		.append('<h2>The Monolith cheats</h2>')
		.append('<input type="checkbox" onclick="MonolithCheats.SetAC(this)">Autoclick</br>')
		.append('<input type="checkbox" onclick="MonolithCheats.InfMoney(this)">Infinite Evo Points</br>')
		;
};
MonolithCheats.SetAC = function(a) {
	if(a.checked) 	this.ACEnabled = setInterval(function() {damageClick($('#beastButton')[0]);}, 10);
	else 			clearInterval(this.ACEnabled);
};
MonolithCheats.InfMoney = function(a) {
	if(a.checked) {
		this.backupEvoPoints = evoPoints;
		evoPoints = Infinity;
	} else {
		evoPoints = this.backupEvoPoints;
	}
};

var TourOfHeroesCheats = function() {
	$('#HollyMenuContent')	
		.append('<h2>Tour of Heroes cheats</h2>')
		.append('<input type="checkbox" onclick="TourOfHeroesCheats.SetAC(this)">Autoclick</br>')
		//.append('<input type="checkbox" onclick="MonolithCheats.InfMoney(this)">Infinite Evo Points</br>')
		;
};
TourOfHeroesCheats.SetAC = function(a) {
	if(a.checked) 	this.ACEnabled = setInterval(function() {$('.action-main .progress-bar').click();}, 10);
	else 			clearInterval(this.ACEnabled);
};

var ADarkRoomCheats = function() {
	$('#HollyMenuContent')	
		.append('<h2>A Dark Room cheats</h2>')
		//.append('<input type="checkbox" onclick="ADarkRoomCheats.FastGatherers(this)">Faster Gatherers</br>')
		.append('<input type="button" onclick="State.game.population=State.game.buildings.hut" value="Fill Village"></br>')
		.append('<input type="button" onclick="State.game.buildings.hut=StateManager.MAX_STORE" value="Max Huts"></br>')
		.append('<input type="button" onclick="State.game.population=StateManager.MAX_STORE" value="Max Population"></br>')
		.append('<input type="button" onclick="ADarkRoomCheats.SetResources(true)" value="Max Resources"></br>')
		.append('<input type="button" onclick="ADarkRoomCheats.SetResources(false)" value="Reset Resources"></br>')
		;
};
/*
ADarkRoomCheats.FastGatherers  = function(a) {
	if(a.checked) 	{ State.income.gatherer.delay = 1;  }
	else 			{ State.income.gatherer.delay = 10; }
};
*/
ADarkRoomCheats.SetResources = function(infinite) {
	for (var property in State.stores)
	    if (State.stores.hasOwnProperty(property))
	        State.stores[property] = (infinite ? StateManager.MAX_STORE : 0);
};

var DebugCheats = function() {
	$('#HollyMenuContent')	
		.append('<h2>Debug</h2>')
		//.append('<input type="checkbox" onclick="DebugCheats.DoThing(this)">Thing</br>')
		.append('<input type="button" onclick="localStorage.clear();location.reload()" value="Clear localStorage"></br>')
		.append('<input type="button" onclick="$(\'#HollyMenu\').remove()" value="Destroy Menu"></br>')
		;
};
DebugCheats.DoThing = function(a) {
	if(a.checked) 	;
	else 			;
};

//new code here

clear();

if (!window.jQuery) {
	//stuff
	e = document.createElement('script');
    e.src = '//code.jquery.com/jquery-latest.min.js';
    e.onload = function() {
        console.log('jQuery injected');
        loadMenu();
    };
    document.head.appendChild(e);
} else {
	loadMenu();
}
