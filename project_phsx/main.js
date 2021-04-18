var counter = 0;

function add_dv()
{
	// i be shittin different

	const dv = document.createElement( "input" );

	dv.setAttribute( "class", "dv" );
	dv.setAttribute( "type", "text" );
	dv.setAttribute( "placeholder", ++counter > 7 ? "fucking tryhard" : "Input a DV value");
	dv.addEventListener( "change", calculate );

	if( counter > 7 )
	{
		document.getElementById( "add_dv" ).innerHTML = "bro stop??";
	}

	document.getElementById( "dvs" ).appendChild( dv );
}

function numerator_sum(total, num)
{
	return total + num;
}

function standard_dev( mean, size, dv_values )
{
	numerator_values = [];

	for( let i = 0; i < size; ++i )
	{
		numerator_values[ i ] = ( dv_values[ i ] - mean ) ** 2;

		num_sum = numerator_values.reduce( numerator_sum )
	}

	return Math.sqrt( num_sum / ( size - 1 ) );
}

function dv_sum(total, num)
{
	return total + num;
}

function calculate()
{
	var std_dev, std_error_out, avg_dv, std_error, total_unc, total_prop_unc, total_meas_unc = 0;

	document.getElementById( "std_dev" ).innerText = 0;
	document.getElementById( "std_error" ).innerText = 0;
	document.getElementById( "avg_dv" ).innerText = 0;
	document.getElementById( "total_unc" ).innerText = 0;
	document.getElementById( "total_prop_unc" ).innerText = "this shit doesn't work yet";
	document.getElementById( "total_meas_unc" ).innerText = "this shit doesn't work yet";

	const dv_array = document.getElementsByClassName( "dv" );

	dv_values = [];

	for( let i = 0; i < dv_array.length; ++i )
	{
		dv_values.push( Number( dv_array[ i ].value ) ) ;

		if( isNaN( dv_values[ i ] ) ){ return false; }

		sum = dv_values.reduce( dv_sum );
	}

	if( isNaN( inst_unc ) ){ inst_unc = 0; }

	avg_dv = sum / dv_array.length;
	std_dev = standard_dev( avg_dv, dv_array.length, dv_values );
	std_error = std_dev / Math.sqrt( dv_array.length );
	total_unc = Math.sqrt( ( std_error ** 2 ) + ( inst_unc ** 2 ) ); 

	document.getElementById( "std_dev" ).innerText = std_dev;
	document.getElementById( "std_error" ).innerText = std_error;
	document.getElementById( "avg_dv" ).innerText = avg_dv;
	document.getElementById( "total_unc" ).innerText = total_unc;

}

window.onload = function()
{ 
	calculate();

	const inst_input = document.getElementById( "inst_unc" );

	inst_input.addEventListener( "input", function(){ 
		if( isNaN( inst_input.value ) ){ return false; }
		else
		{ 
			inst_unc = inst_input.value; 
			calculate();
		}
	} );

	const dv_array = document.getElementsByClassName( "dv" );

	for( let i = 0; i < dv_array.length; ++i )
	{
		dv_array[i].addEventListener( "change", calculate );
	}
}

function dropdown()
{
	if( document.getElementById( "drop_items" ).style.display === "none" )
	{
		document.getElementById( "drop_items" ).style.display = "block";
	}

	else
	{
		document.getElementById( "drop_items" ).style.display = "none";
	}
}

function change_mx()
{
	document.getElementById( "drop_button" ).innerHTML = "y=mx";
	document.getElementById( "drop_items" ).style.display = "none";
	correlation = "mx";
}

function change_mx_b()
{
	document.getElementById( "drop_button" ).innerHTML = "y=mx+b";
	document.getElementById( "drop_items" ).style.display = "none";
	correlation = "mx_b";
}

function change_mx_pow_b()
{
	document.getElementById( "drop_button" ).innerHTML = "y=mx^b";
	document.getElementById( "drop_items" ).style.display = "none";
	correlation = "mx_pow_b";
}

function change_me_pow_bx()
{
	document.getElementById( "drop_button" ).innerHTML = "y=me^(bx)";
	document.getElementById( "drop_items" ).style.display = "none";
	correlation = "me_pow_bx";
}

function change_a_sin_wx()
{
	document.getElementById( "drop_button" ).innerHTML = "y=Asin(wx)";
	document.getElementById( "drop_items" ).style.display = "none";
	correlation = "a_sin_wx";
}

function change_no_correlation()
{
	document.getElementById( "drop_button" ).innerHTML = "No correlation";
	document.getElementById( "drop_items" ).style.display = "none";
	correlation = "no_correlation";
}