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
  		app.refresh(app.model.pendientes,app.model.completadas);
  	},

	refresh: function(pend,comp){
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