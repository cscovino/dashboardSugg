var app = {
	model:{},

	firebaseConfig: {
	    apiKey: "AIzaSyBPoo47X4J0Cwc4AeVgMhg6G5aafqc1ilo",
	    authDomain: "sugerencias-2938f.firebaseapp.com",
	    databaseURL: "https://sugerencias-2938f.firebaseio.com",
	    projectId: "sugerencias-2938f",
	    storageBucket: "sugerencias-2938f.appspot.com",
	    messagingSenderId: "1032775982970"
	},

  	setSnap: function(snap){
  		app.model = snap;
  		app.refreshChart(Object.keys(app.model.pendientes).length,Object.keys(app.model.completadas).length);
  		app.refreshPends();
  	},

  	sendSuggestion: function(){
  		document.getElementById('detalles').style.display = 'none';
  		var sugg = document.getElementById('suggestion').value;
  		firebase.database().ref('pendientes').push({suggestion:sugg,percent:0});
  	},

  	refreshPends: function(){
  		var suggs = $('#pends');
		suggs.html('');
		var codigo = '<ul>';
  		for(var key in app.model.pendientes){
  			codigo += '<li>'+app.model.pendientes[key].suggestion+'</li>';
  			//codigo += '<div class="progress" style="width: 50%;"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"' 
  			codigo += "<input id='ex8' data-slider-id='ex1Slider' type='text' data-slider-min='0' data-slider-max='100' data-slider-step='1' data-slider-value='45'/>";
  			//codigo += 'style="width:'+app.model.pendientes[key].percent+'%"></div></div>';
  		}
  		codigo += '</ul>';
  		suggs.append(codigo);
  		$("#ex8").slider();
  		console.log($("#ex8").slider().getValue());
  	},

	refreshChart: function(pend,comp){
		var ctx = $("#pieChart").get(0).getContext("2d");
		var data = {
		    datasets: [{
		        data: [pend, comp],
		        backgroundColor: ['#f40000','#118200']
		    }],
		    // These labels appear in the legend and in the tooltips when hovering different arcs
		    labels: [
		        'Pendientes',
		        'Completadas'
		    ]
		};
		var options = {
			responsive: true
		};

		var myDoughnutChart = new Chart(ctx, {
		    type: 'doughnut',
		    data: data,
		    options: options
		});
	}
};

firebase.initializeApp(app.firebaseConfig);
firebase.database().ref().on('value', function(snap){
	if (snap.val() !== null) {
		app.setSnap(snap.val());
	}
});