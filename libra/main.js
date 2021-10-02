drinks = [];

    drinks[0] = "J&S Coffee";
	drinks[1] = "Decade";
	drinks[2] = "Z's Divine Espresso";
	drinks[3] = "Starbucks (our usual)";
	drinks[4] = "Smoothie King";
	drinks[5] = "The SconeLady's Coffee Shop";
	drinks[6] = "Uplift Coffee";
	drinks[7] = "La Prime Tazza";
	drinks[8] = "Alchemy Coffee & Bake House";
	drinks[9] = "Tropical Smoothie Cafe";
	drinks[10] = "The Java Break";
	drinks[11] = "t. Loft";
	drinks[12] = "Ding Tea";
	drinks[13] = "HiTea";
	drinks[14] = "Presotea";
	drinks[15] = "House of Cha";
	drinks[16] = "Bubble Box";   

treats = [];

    treats[0] = "Wheatfields Bakery Cafe";
    treats[1] = "Munchers Bakery";
    treats[2] = "1900 Barker Bakery and Cafe";
    treats[3] = "Hot Box Cookies";
    treats[4] = "Formosa Bakery";
    treats[5] = "Smallcakes";
    treats[6] = "Alchemy Coffee & Bake House";
    treats[7] = "McLain's Market";
    treats[8] = "Cold Stone";
    treats[9] = "Orange Leaf";
    treats[10] = "Sylas and Maddy's";
    treats[11] = "Sonic??????";
    treats[12] = "Peachwave";
    treats[13] = "BingBox";

food = [];

    food[0] = "Tortas Jalisco";
	food[1] = "The Fresh Mediterranean Co";
	food[2] = "715 Restaurant";
	food[3] = "Burrito King";
	food[4] = "The Roost";
	food[5] = "Spin!";
	food[6] = "Terrbonne Po' Boys";
	food[7] = "Merchants Pub & Plate";
	food[8] = "The Mad Greek";
	food[9] = "The Burger Stand at the Casbah";
	food[10] = "El Potro Mexican cafe";
	food[11] = "J.Wilson's";
	food[12] = "The Basil Leaf Cafe";
	food[13] = "Mass St. Fish House & Raw Bar";
	food[14] = "Texas Roadhouse";
	food[15] = "Thai Diner";
	food[16] = "Jeffersons";
	food[17] = "Little Saigon";
	food[18] = "Ramen Bowls";
	food[19] = "Pokeloha";

random_shit = [];

    /*place*/	random_shit[0] = "KC";
                random_shit[1] = "Learn to Skate (again)";
                random_shit[2] = "Relax at either of our places (cuddle, hold hands, hug for long periods of time <3)";
                random_shit[3] = "GO ON A RANDOM DAY TRIP";
    /*watch*/	random_shit[4] = "Avatar";
                random_shit[5] = "iCarly";
                random_shit[6] = "Spongebob";
                random_shit[7] = "Twilight";
    /*play*/	random_shit[8] = "Apex";																	
                random_shit[9] = "Minecraft";
                random_shit[10] = "Mariokart";
                random_shit[11] = "GTA";

function getRandomInt(max) 
{
    return Math.floor(Math.random() * (max + 1));
}

function shuffle()
{
    var category = getRandomInt( 4 );

    if( category == 0 )
    {
        document.getElementById("date").innerHTML = "Looks like we're gonna get drinks at " + "<b>" + drinks[getRandomInt(17)] + "</b>";
    }

    if( category == 1 )
    {
        document.getElementById("date").innerHTML = "Looks like we're munching at " + "<b>" + treats[getRandomInt(14)] + "</b>";
    }

    if( category == 2 )
    {
        document.getElementById("date").innerHTML = "Looks like we're eating at " + "<b>" + food[getRandomInt(20)] + "</b>";
    }

    if( category == 3 )
    {
        var type = getRandomInt(3);

        if( type == 0 )
        {
            document.getElementById("date").innerHTML = "Looks like we're going to " + "<b>" + random_shit[getRandomInt(4)] + "</b>";
        }

        if( type == 1 )
        {
            document.getElementById("date").innerHTML = "Looks like we're going to watch " + "<b>" + random_shit[getRandomInt(4) + 4] + "</b>";
        }

        if( type == 2 )
        {
            document.getElementById("date").innerHTML = "Looks like we're going to play " + "<b>" + random_shit[getRandomInt(4) + 8] + "</b>";
        }
    }
}
