'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

/*display the data*/

for(var i = 0; i<cars.length;i++){
    console.log(cars[i].pricePerDay);
}

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];


//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];


// ------- Exercise 1 ----------
/*
	convert a string to a Date
	@param {string} str
	@return{date}
*/
function convertDate(str)
{
	var re = /[0-9]+/g;
	var result = re[Symbol.match](str);

	var dateLoc=new Date(result[0], result[1], result[2]);
	return dateLoc;
}

/*
	Number of rental days from begin and end dateLoc
	@param {string} beginDate
	@param {string} returnDate
	@return {Integer}
*/

function getDays(beginDate,returnDate)
{
	var begin =convertDate(beginDate).getTime(); 	
	var end = convertDate(returnDate).getTime();
	var MS = 24*60*60*1000;
	var days = (Math.abs(end - begin))/MS; //the difference is in miliseconds
	return days;
}

/* function to compute the rental price */
function rentalPrice(){
	var time;
	var distance;
	var rentalPrice;
	for(var i = 0; i<rentals.length;i++)
	{
		var daysDiff = getDays(rentals[i].pickupDate,rentals[i].returnDate);	
		
		for(var j = 0; j<cars.length;j++)
		{			
			if (rentals[i].carId==cars[j].id)
			{						
				time = daysDiff * cars[i].pricePerDay;
				distance = cars[i].pricePerKm * rentals[i].distance;
				rentalPrice = time + distance;
				rentals[i].price=rentalPrice;
			}
		}
	}	
}

/* 
we call the function that compute the rental price 
and change this value in the rentals array
*/
rentalPrice();
console.log(rentals);

/* function to compute the rental price */
function rentalPriceDecreasing(){
	var time;
	var distance;
	var rentalPrice;
	for(var i = 0; i<rentals.length;i++)
	{
		var daysDiff = getDays(rentals[i].pickupDate,rentals[i].returnDate);	

		for(var j = 0; j<cars.length;j++)
		{			
			if (rentals[i].carId==cars[j].id)
			{						
				time = daysDiff * cars[i].pricePerDay;
				distance = cars[i].pricePerKm * rentals[i].distance;
				if(daysDiff>10)
				{
					rentalPrice = time*0.5 + distance;
					rentals[i].price=rentalPrice;
				}
				else if(daysDiff>4)
				{
					rentalPrice = time*0.7 + distance;
					rentals[i].price=rentalPrice;
				}
				else if(daysDiff>1)
				{
					rentalPrice = time*0.9 + distance;
					rentals[i].price=rentalPrice;
				}
				else
				{
					rentalPrice = time + distance;
					rentals[i].price=rentalPrice;
				}
			}
		}
	}	
}
/* 
we call the function that compute the rental price 
and change this value in the rentals array
*/
rentalPriceDecreasing();
console.log(rentals);

/*
Function to compute the comissions
the amount that belongs to the insurance, to the assistance and to drivy
*/
function commission()
{
	var commission;
	var daysDiff;
	var ins_com;
	var asist_com;
	var drv_com;
	
	for (var i = 0; i<rentals.length;i++)
	{
		commission = rentals[i].price*0.3;
		daysDiff = getDays(rentals[i].pickupDate,rentals[i].returnDate);

		// insurance part
		ins_com = commission/2;
		rentals[i].commission.insurance = ins_com;

		// road assistance part
		rentals[i].commission.assistance = ins_assist;
		
		// drivy part
		drv_com = commission - ins_com - ins_assist;
		rentals[i].commission.drivy = drv_com;
	}	
}
commission();
console.log(rentals);

function deductible()
{
	for (var i = 0; i<rentals.length;i++)
	{
		daysDiff = getDays(rentals[i].pickupDate,rentals[i].returnDate);
		if(rentals[i].options.deductibleReduction == true)
		{
			rentals[i].price= rentals[i].price + daysDiff*4;
		}
	}
}
deductible();
console.log(rentals);

function payTheActors()
{
	for (var i = 0; i<actors.length;i++)
	{
		for(var j=0; j<rentals.length;j++)
		{
			if(actors[i].rentalId == rentals[j].id)
			{
				// driver debit
				actors[i].payment[0].amount = rentals[j].price;
				// owner credit
				actors[i].payment[1].amount = rentals[j].price * 0.7;
				// insurance credit
				actors[i].payment[2].amount = rentals[j].commission.insurance;
				// assistance credit
				actors[i].payment[3].amount = rentals[j].commission.assistance;
				// credit drivy
				daysDiff = getDays(rentals[j].pickupDate,rentals[j].returnDate);
				deductibleRed = daysDiff*4;
				actors[i].payment[4].amount = rentals[j].commission.drivy + deductibleRed;
			}
		}
	}
}
payTheActors();
console.log(actors);


console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
