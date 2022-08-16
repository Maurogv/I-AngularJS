var regioni=[
	{id:0,codifica:'seleziona',descrizione:'Seleziona'},
	{id:1,codifica:'piemonte',descrizione:'Piemonte'},
	{id:2,codifica:'aosta',descrizione:'Valle d\'Aosta/Vallée d\'Aoste'},
	{id:3,codifica:'lombardia',descrizione:'Lombardia'},
	{id:4,codifica:'trentino',descrizione:'Trentino-Alto Adige/Süd Tirol'},
	{id:5,codifica:'veneto',descrizione:'Veneto'},
	{id:6,codifica:'friuli',descrizione:'Friuli-Venezia Giulia'},
	{id:7,codifica:'liguria',descrizione:'Liguria'},
	{id:8,codifica:'emilia',descrizione:'Emilia Romagna'},
	{id:9,codifica:'toscana',descrizione:'Toscana'},
	{id:10,codifica:'marche',descrizione:'Marche'},
	{id:11,codifica:'umbria',descrizione:'Umbria'},
	{id:12,codifica:'lazio',descrizione:'Lazio'},
	{id:13,codifica:'abruzzo',descrizione:'Abruzzo'},
	{id:14,codifica:'molise',descrizione:'Molise'},
	{id:15,codifica:'puglia',descrizione:'Puglia'},
	{id:16,codifica:'campania',descrizione:'Campania'},
	{id:17,codifica:'basilicata',descrizione:'Basilicata'},
	{id:18,codifica:'calabria',descrizione:'Calabria'},
	{id:19,codifica:'sicilia',descrizione:'Sicilia'},
	{id:20,codifica:'sardegna',descrizione:'Sardegna'}
];

var province=[
	{id:84,codifica:'AG',descrizione:'Agrigento',idRegione:19},
	{id:6,codifica:'AL',descrizione:'Alessandria',idRegione:1},
	{id:42,codifica:'AN',descrizione:'Ancona',idRegione:10},
	{id:7,codifica:'AO',descrizione:'Aosta',idRegione:2},
	{id:51,codifica:'AR',descrizione:'Arezzo',idRegione:9},
	{id:44,codifica:'AP',descrizione:'Ascoli Piceno',idRegione:10},
	{id:5,codifica:'AT',descrizione:'Asti',idRegione:1},
	{id:64,codifica:'AV',descrizione:'Avellino',idRegione:16},
	{id:72,codifica:'BA',descrizione:'Bari',idRegione:15},
	{id:25,codifica:'BL',descrizione:'Belluno',idRegione:5},
	{id:62,codifica:'BN',descrizione:'Benevento',idRegione:16},
	{id:16,codifica:'BG',descrizione:'Bergamo',idRegione:3},
	{id:96,codifica:'BI',descrizione:'Biella',idRegione:1},
	{id:37,codifica:'BO',descrizione:'Bologna',idRegione:8},
	{id:21,codifica:'BZ',descrizione:'Bolzano-Bozen',idRegione:4},
	{id:17,codifica:'BS',descrizione:'Brescia',idRegione:3},
	{id:74,codifica:'BR',descrizione:'Brindisi',idRegione:15},
	{id:92,codifica:'CA',descrizione:'Cagliari',idRegione:20},
	{id:85,codifica:'CL',descrizione:'Caltanissetta',idRegione:19},
	{id:70,codifica:'CB',descrizione:'Campobasso',idRegione:14},
	{id:107,codifica:'CI',descrizione:'Carbonia-Iglesias',idRegione:20},
	{id:61,codifica:'CE',descrizione:'Caserta',idRegione:16},
	{id:87,codifica:'CT',descrizione:'Catania',idRegione:19},
	{id:79,codifica:'CZ',descrizione:'Catanzaro',idRegione:18},
	{id:69,codifica:'CH',descrizione:'Chieti',idRegione:13},
	{id:13,codifica:'CO',descrizione:'Como',idRegione:3},
	{id:78,codifica:'CS',descrizione:'Cosenza',idRegione:18},
	{id:19,codifica:'CR',descrizione:'Cremona',idRegione:3},
	{id:101,codifica:'KR',descrizione:'Crotone',idRegione:18},
	{id:4,codifica:'CN',descrizione:'Cuneo',idRegione:1},
	{id:86,codifica:'EN',descrizione:'Enna',idRegione:19},
	{id:38,codifica:'FE',descrizione:'Ferrara',idRegione:8},
	{id:48,codifica:'FI',descrizione:'Firenze',idRegione:9},
	{id:71,codifica:'FG',descrizione:'Foggia',idRegione:15},
	{id:40,codifica:'FO',descrizione:'Forlì-Cesena',idRegione:8},
	{id:60,codifica:'FR',descrizione:'Frosinone',idRegione:12},
	{id:10,codifica:'GE',descrizione:'Genova',idRegione:7},
	{id:31,codifica:'GO',descrizione:'Gorizia',idRegione:6},
	{id:53,codifica:'GR',descrizione:'Grosseto',idRegione:9},
	{id:8,codifica:'IM',descrizione:'Imperia',idRegione:7},
	{id:94,codifica:'IS',descrizione:'Isernia',idRegione:14},
	{id:11,codifica:'SP',descrizione:'La Spezia',idRegione:7},
	{id:66,codifica:'AQ',descrizione:'L\'Aquila',idRegione:13},
	{id:59,codifica:'LT',descrizione:'Latina',idRegione:12},
	{id:75,codifica:'LE',descrizione:'Lecce',idRegione:15},
	{id:97,codifica:'LC',descrizione:'Lecco',idRegione:3},
	{id:49,codifica:'LI',descrizione:'Livorno',idRegione:9},
	{id:98,codifica:'LO',descrizione:'Lodi',idRegione:3},
	{id:46,codifica:'LU',descrizione:'Lucca',idRegione:9},
	{id:43,codifica:'MC',descrizione:'Macerata',idRegione:10},
	{id:20,codifica:'MN',descrizione:'Mantova',idRegione:3},
	{id:45,codifica:'MS',descrizione:'Massa Carrara',idRegione:9},
	{id:77,codifica:'MT',descrizione:'Matera',idRegione:17},
	{id:106,codifica:'VS',descrizione:'Medio Campidano',idRegione:20},
	{id:83,codifica:'ME',descrizione:'Messina',idRegione:19},
	{id:15,codifica:'MI',descrizione:'Milano',idRegione:3},
	{id:36,codifica:'MO',descrizione:'Modena',idRegione:8},
	{id:63,codifica:'NA',descrizione:'Napoli',idRegione:16},
	{id:3,codifica:'NO',descrizione:'Novara',idRegione:1},
	{id:91,codifica:'NU',descrizione:'Nuoro',idRegione:20},
	{id:105,codifica:'OG',descrizione:'Ogliastra',idRegione:20},
	{id:104,codifica:'OT',descrizione:'Olbia-Tempio',idRegione:20},
	{id:95,codifica:'OR',descrizione:'Oristano',idRegione:20},
	{id:28,codifica:'PD',descrizione:'Padova',idRegione:5},
	{id:82,codifica:'PA',descrizione:'Palermo',idRegione:19},
	{id:34,codifica:'PR',descrizione:'Parma',idRegione:8},
	{id:18,codifica:'PV',descrizione:'Pavia',idRegione:3},
	{id:54,codifica:'PG',descrizione:'Perugia',idRegione:11},
	{id:41,codifica:'PU',descrizione:'Pesaro e Urbino',idRegione:10},
	{id:68,codifica:'PE',descrizione:'Pescara',idRegione:13},
	{id:33,codifica:'PC',descrizione:'Piacenza',idRegione:8},
	{id:50,codifica:'PI',descrizione:'Pisa',idRegione:9},
	{id:47,codifica:'PT',descrizione:'Pistoia',idRegione:9},
	{id:93,codifica:'PN',descrizione:'Pordenone',idRegione:6},
	{id:76,codifica:'PZ',descrizione:'Potenza',idRegione:17},
	{id:100,codifica:'PO',descrizione:'Prato',idRegione:9},
	{id:88,codifica:'RG',descrizione:'Ragusa',idRegione:19},
	{id:39,codifica:'RA',descrizione:'Ravenna',idRegione:8},
	{id:80,codifica:'RC',descrizione:'Reggio Calabria',idRegione:18},
	{id:35,codifica:'RE',descrizione:'Reggio Emilia',idRegione:8},
	{id:57,codifica:'RI',descrizione:'Rieti',idRegione:12},
	{id:99,codifica:'RN',descrizione:'Rimini',idRegione:8},
	{id:58,codifica:'RM',descrizione:'Roma',idRegione:12},
	{id:29,codifica:'RO',descrizione:'Rovigo',idRegione:5},
	{id:65,codifica:'SA',descrizione:'Salerno',idRegione:16},
	{id:90,codifica:'SS',descrizione:'Sassari',idRegione:20},
	{id:9,codifica:'SV',descrizione:'Savona',idRegione:7},
	{id:52,codifica:'SI',descrizione:'Siena',idRegione:9},
	{id:89,codifica:'SR',descrizione:'Siracusa',idRegione:19},
	{id:14,codifica:'SO',descrizione:'Sondrio',idRegione:3},
	{id:73,codifica:'TA',descrizione:'Taranto',idRegione:15},
	{id:67,codifica:'TE',descrizione:'Teramo',idRegione:13},
	{id:55,codifica:'TR',descrizione:'Terni',idRegione:11},
	{id:1,codifica:'TO',descrizione:'Torino',idRegione:1},
	{id:81,codifica:'TP',descrizione:'Trapani',idRegione:19},
	{id:22,codifica:'TN',descrizione:'Trento',idRegione:4},
	{id:26,codifica:'TV',descrizione:'Treviso',idRegione:5},
	{id:32,codifica:'TS',descrizione:'Trieste',idRegione:6},
	{id:30,codifica:'UD',descrizione:'Udine',idRegione:6},
	{id:12,codifica:'VA',descrizione:'Varese',idRegione:3},
	{id:27,codifica:'VE',descrizione:'Venezia',idRegione:5},
	{id:103,codifica:'VB',descrizione:'Verb-Cus-Ossola',idRegione:1},
	{id:2,codifica:'VC',descrizione:'Vercelli',idRegione:1},
	{id:23,codifica:'VR',descrizione:'Verona',idRegione:5},
	{id:102,codifica:'VV',descrizione:'Vibo Valentia',idRegione:18},
	{id:24,codifica:'VI',descrizione:'Vicenza',idRegione:5},
	{id:56,codifica:'VT',descrizione:'Viterbo',idRegione:12}
];

var tipoImmobile_full=[
	{id:10,codifica:'agriturismo',descrizione:'Agriturismo'},
	{id:20,codifica:'albergo',descrizione:'Albergo'},
	{id:60,codifica:'appartamento',descrizione:'Appartamento'},
	{id:50,codifica:'attico',descrizione:'Attico'},
	{id:30,codifica:'attivita-licenzacommerciale',descrizione:'Attività / Licenza commerciale'},
	{id:40,codifica:'azienda',descrizione:'Azienda'},
	{id:110,codifica:'bar-ristorante',descrizione:'Bar / Ristorante'},
	{id:90,codifica:'bed-breakfast',descrizione:'Bed & Breakfast'},
	{id:70,codifica:'box-postoauto',descrizione:'Box / Posto auto'},
	{id:100,codifica:'bungalow-baita',descrizione:'Bungalow / Baita'},
	{id:150,codifica:'camera-di-albergo',descrizione:'Camera d\'albergo'},
	{id:140,codifica:'capannone',descrizione:'Capannone'},
	{id:160,codifica:'casa',descrizione:'Casa'},
	{id:120,codifica:'casa-indipendente',descrizione:'Casa indipendente'},
	{id:130,codifica:'casale-rustico',descrizione:'Casale / Rustico'},
	{id:180,codifica:'centro-commerciale',descrizione:'Centro commerciale'},
	{id:190,codifica:'centro-direzionale',descrizione:'Centro direzionale'},
	{id:170,codifica:'comeplesso-edilizio',descrizione:'Complesso edilizio'},
	{id:210,codifica:'laboratorio',descrizione:'Laboratorio'},
	{id:200,codifica:'loft-openspace',descrizione:'Loft / Open space'},
	{id:240,codifica:'magazzino',descrizione:'Magazzino'},
	{id:220,codifica:'mansarda',descrizione:'Mansarda'},
	{id:230,codifica:'monolocale',descrizione:'Monolocale'},
	{id:250,codifica:'negozio-localecommerciale',descrizione:'Negozio / Locale commerciale'},
	{id:80,codifica:'posti-auto',descrizione:'Posti auto'},
	{id:260,codifica:'residence',descrizione:'Residence'},
	{id:270,codifica:'stabile-palazzo',descrizione:'Stabile / Palazzo'},
	{id:290,codifica:'terreno-uso-commerciale',descrizione:'Terreno uso commerciale'},
	{id:280,codifica:'terreno-uso-residenziale',descrizione:'Terreno uso residenziale'},
	{id:310,codifica:'uffici',descrizione:'Uffici'},
	{id:300,codifica:'ufficio-studio',descrizione:'Ufficio / Studio'},
	{id:320,codifica:'villa',descrizione:'Villa'},
	{id:330,codifica:'villetta-schiera',descrizione:'Villetta a schiera'},
	{id:340,codifica:'villette-villeschiera',descrizione:'Villette / Ville a schiera'}
];

var tipoImmobile_10=[
	{id:60,codifica:'appartamento',descrizione:'Appartamento'},
	{id:50,codifica:'attico',descrizione:'Attico'},
	{id:70,codifica:'box-postoauto',descrizione:'Box / Posto auto'},
	{id:120,codifica:'casa-indipendente',descrizione:'Casa indipendente'},
	{id:130,codifica:'casale-rustico',descrizione:'Casale / Rustico'},
	{id:200,codifica:'loft-openspace',descrizione:'Loft / Open space'},
	{id:220,codifica:'mansarda',descrizione:'Mansarda'},
	{id:230,codifica:'monolocale',descrizione:'Monolocale'},
	{id:270,codifica:'stabile-palazzo',descrizione:'Stabile / Palazzo'},
	{id:280,codifica:'terreno-uso-residenziale',descrizione:'Terreno uso residenziale'},
	{id:320,codifica:'villa',descrizione:'Villa'},
	{id:330,codifica:'villetta-schiera',descrizione:'Villetta a schiera'}
];

var tipoImmobile_20=[
	{id:10,codifica:'agriturismo',descrizione:'Agriturismo'},
	{id:20,codifica:'albergo',descrizione:'Albergo'},
	{id:30,codifica:'attivita-licenzacommerciale',descrizione:'Attività / Licenza commerciale'},
	{id:40,codifica:'azienda',descrizione:'Azienda'},
	{id:110,codifica:'bar-ristorante',descrizione:'Bar / Ristorante'},
	{id:140,codifica:'capannone',descrizione:'Capannone'},
	{id:210,codifica:'laboratorio',descrizione:'Laboratorio'},
	{id:240,codifica:'magazzino',descrizione:'Magazzino'},
	{id:250,codifica:'negozio-localecommerciale',descrizione:'Negozio / Locale commerciale'},
	{id:290,codifica:'terreno-uso-commerciale',descrizione:'Terreno uso commerciale'},
	{id:300,codifica:'ufficio-studio',descrizione:'Ufficio / Studio'}
];

var tipoImmobile_30=[
	{id:10,codifica:'agriturismo',descrizione:'Agriturismo'},
	{id:60,codifica:'appartamento',descrizione:'Appartamento'},
	{id:90,codifica:'bed-breakfast',descrizione:'Bed & Breakfast'},
	{id:100,codifica:'bungalow-baita',descrizione:'Bungalow / Baita'},
	{id:150,codifica:'camera-di-albergo',descrizione:'Camera d\'albergo'},
	{id:160,codifica:'casa',descrizione:'Casa'},
	{id:130,codifica:'casale-rustico',descrizione:'Casale / Rustico'},
	{id:260,codifica:'residence',descrizione:'Residence'},
	{id:320,codifica:'villa',descrizione:'Villa'}
];

var inizializzaComuni = 0;


$("document").ready(function(){
	$("#idprovincia").html(getComboOptions(province,true));
	$("#tipologia").html(getComboOptions(eval("tipoImmobile_10"),false));
	
	$("#idprovincia").change(function(){
		var myProvincia=""+$("#idprovincia").get(0)[$("#idprovincia").get(0).selectedIndex].value;
		var myUrl="http://trovocasa.corriere.it/annunci/annuncio/CaricaComuniInProvinciaDaCorriere.do?provincia="+myProvincia;
		if(myProvincia>0){
			$.getScript(myUrl, function(){
				var myHtml=getComboOptions(comuni,false);
				$("#idcomune").html(myHtml);
			});
		}else{
			var myHtml="<option value=\"0\">Tutti</option>\n<option value=\"0\">Selezionare provincia</option>";
			$("#idcomune").html(myHtml);
		}
	});


	$("#idcomune").mouseover(function(){

		var num = $("#idcomune option").length
		if (inizializzaComuni==0){
			var myProvincia=""+$("#idprovincia").get(0)[$("#idprovincia").get(0).selectedIndex].value;
		var myUrl="http://trovocasa.corriere.it/annunci/annuncio/CaricaComuniInProvinciaDaCorriere.do?provincia="+myProvincia;
		if(myProvincia>0 && num<=2){
			$.getScript(myUrl, function(){
				var myHtml=getComboOptions(comuni,false);
				$("#idcomune").html(myHtml);
			});
		}
		inizializzaComuni++;
		}
	});



	$(".vendita").click(function(){
		$("#tc_radio_vacanza").hide();
	});
	$(".affitto").click(function(){
		$("#tc_radio_vacanza").show();
	});
	
	$("#formTrovocasa").submit(function(){
		if($("#tipologia").val()=="" || $("#tipologia").val()==0 || $("#tipologia").val()=="undefined"){
			alert("Selezionare la tipologia");
			return false;
		}
	});
	
	$(".radio_tipo_filter").each(function(){
		$(this).click(function(){
			$("#tipologia").html(getComboOptions(eval("tipoImmobile_"+$(this).val()),false));
			if($(this).val()==30){
				$(".vendita").get(0).disabled=true;
			}else{
				$(".vendita").get(0).disabled=false;
			}
		});
	});
	
});

function getComboOptions(obj, isProvince){
	var s='';
	var sezione = "milano";
	
	sezione = "milano";

	if(isProvince){
		s+='<option value="0">&lt;Seleziona&gt;</option>';
	}else{
		s+='<option value="0" selected>&lt;Tutte&gt;</option>';
	}
	for(var i=0;i<obj.length;i++){
		
		if(sezione.toUpperCase()==obj[i].descrizione.toUpperCase()){
			s+='<option value="'+obj[i].id+'" selected="selected">'+obj[i].descrizione+'</option>\n';
		}else{
			s+='<option value="'+obj[i].id+'">'+obj[i].descrizione+'</option>\n';
		}
		//s+='<option value="'+obj[i].id+'">'+obj[i].descrizione+'</option>\n';

	}
	return s;
}