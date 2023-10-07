const sections = document.querySelectorAll( ".section" );
const scrollUpButton = document.getElementById( "up" );
const scrollDownButton = document.getElementById( "down" );
const container = document.getElementById( "left" );
const cards = document.querySelectorAll( ".card" );
const projects = document.querySelectorAll( ".project-container" );
const project_descriptions = document.querySelectorAll( ".project-desc" );
const up_button = document.getElementById( "up" );
const down_button = document.getElementById( "down" );
const slideshow_cards = document.querySelectorAll( ".slideshow-card" );

let index = 0;
let project_index = 0;

/**
 * event listeners for the buttons at the top- and bottom-left
 * scrolls to the next section
 */

scrollUpButton.addEventListener( "click", () => {
  if( index > 0 ) cardPrevious(); // stop at card & section 0
} );

scrollDownButton.addEventListener( "click", () => {
  if( index < sections.length - 1 ) cardNext(); // stop at last card & section
} ) ;

/**
 * handles slideshow functionality in the design section of the website
 */

let ssnum = 0;
slideshow();
function slideshow()
{
  // fade the current image out
  slideshow_cards[ ssnum ].classList.add( "fadeOut" );
  
  // wait for the animation to end before proceeding
  slideshow_cards[ ssnum ].addEventListener( "animationend", () => {
    // increment the image index
    ssnum++
    
    // if the index is larger than the amount of iamges there are, reset the index to 0
    if( ssnum >= slideshow_cards.length ) ssnum = 0;

    // remove fadeOut animation from the new, current image (so display != block)
    slideshow_cards[ ssnum ].classList.remove( "fadeOut" );

    // fade the new, current image in
    slideshow_cards[ ssnum ].classList.add( "fadeIn" );

    // once finished, remove the event listener
  }, { once: true } );

  // wait 3 seconds, call the function again (infinite loop)
  setTimeout( slideshow, 3000 );
}

/**
 * Overrides scrolling behavior, prevents momentum scrolling from scrolling to 
 * the next section prematurely
 * bool: isProcessing, lastScroll
 */

// page is not scrolling
let isProcessing = 0;
let lastScroll = 0;

window.addEventListener( "wheel", ( e ) => {
  // now = current time
  const now = Date.now()

  // if the event listener is running or the difference between the last school and current time is less than 100ms, do nothing
  if( isProcessing || now - lastScroll < 100 )  
  {
    // prevent default scrolling behavior
    e.preventDefault();

    // current scroll time is now the last scroll time (to be used in the if block above on line 74)
    lastScroll = now;

    // do nothing if scroll events occur < 100 ms between each other
    return; 
  } 

  // otherwise

  // go next if up scroll
  if( e.deltaY > 0 && index < cards.length - 1 ) cardNext(); 

  // go backward if down scroll
  else if( e.deltaY < 0 && index > 0 ) cardPrevious(); 

  // do nothing
  else return; 

  // page is scrolling
  isProcessing = 1; 
  e.preventDefault();

  // prevent scrolling behavior from happening for 1000 ms (or 1s)
  setTimeout( () => { 

    // once a second has passed, the page is guaranteed to no longer be scrolling (i think)
    isProcessing = 0; 

    // 1s timeout
  }, 1000 );

  // wait for the listener to finish executing
}, { passive: false } );

/**
 * part of overriding the scrolling behavior. no input parameters are needed, because
 * index is a global var modified by cardNext() and cardPrevious()
 * simply animates the left side of the screen to scroll to different sections
 */

function scrollToSection() 
{
  // retain the amount of pixels the current section is from the top of the HTML document
  const showing = sections[ index ].offsetTop;

  // scrollTo makes the left column scroll a specific vertical distance
  container.scrollTo( {

    // scroll vertically the value of const showing
    top: showing, 

    // gradual animation becuase linear animations look ugly
    behavior: "smooth" 
  } );
  
  // if at the first section / splash, do not display the up arrow at the top left of the page
  if( index == 0 ) up_button.style.display = "none"; 

  // otherwise, reveal the up arrow
  else up_button.style.display = "flex"; 

  // if at the last section, do not display the down arrow at the bottom left of the page
  if( index == cards.length - 1 ) down_button.style.display = "none"; 

  // otherwise, reveal the down arrow
  else down_button.style.display = "flex"; 
}

/**
 * Changes the description and title on the right side of the webpage
 */

function cardNext()
{
  // fade out the current card
  cards[ index ].classList.add( "fadeOut" );
  
  // incremement the index
  ++index;

  // gives you a cheeseburger
  scrollToSection();

  // wait for the animation to end on the old card
  cards[ index - 1 ].addEventListener( "animationend", function() {
    // this all looks goofy, optimize soon

    // remove card from appearing on the html page
    this.style.display = "none";

    // remove the fadeOut animation
    this.classList.remove( "fadeOut" );

    // allow the new, current card to appear
    cards[ index ].style.display = "block";

    // but make the new, current card fade in.
    cards[ index ].classList.add( "fadeIn" );

    // remove event listener once complete
  }, { once: true });
}

/**
 * Changes the description and title on the right side of the webpage
 */

function cardPrevious()
{
  // fade out the current card
  cards[ index ].classList.add( "fadeOut" );
  
  // decremene the index
  --index;

  // gives you a chicken wing (i promise)
  scrollToSection();
  
  // wait for the animation to end on the old card
  cards[ index + 1 ].addEventListener( "animationend", function() {
    // this all looks goofy, optimize soon
    
    // remove card from appearing on the html page
    this.style.display = "none";

    // remove the fadeOut animation
    this.classList.remove( "fadeOut" );

    // allow the new, current card to appear on the HTML page
    cards[ index ].style.display = "block";

    // but make the new, current card fade in 
    cards[ index ].classList.add( "fadeIn" );
  }, { once: true } );
}

/**
 * applies fadeOut animation to the previous project description
 * applies fadeIn animation to the current (new) project descrition. 
 * executed by an eventListner on the Development section and project buttons on the left
 */

function doFadeOut( previous, index )
{
  // fade out previous project description card
  project_descriptions[ previous ].classList.add( "fadeOut" );

  // wait for the animation to finish before proceeding
  project_descriptions[ previous ].addEventListener( "animationend", function() {
    // remove fadeOut animation
    this.classList.remove( "fadeOut" );

    // prevent this project description card from appearing on the html document
    this.style.display = "none";

    // allow the new, current project description to appear on the html document
    project_descriptions[ project_index ].style.display = "block";

    // but make the new, current project descition fade in
    project_descriptions[ project_index ].classList.add( "fadeIn" );

    // remove event listener once complete
  }, { once: true } );
}

/**
 * Adding event listeners to the Development section and project buttons
 */

// clicking on the blank space in the development section will make the development description appear if it isn't already there
sections[ 1 ].addEventListener( "click", function( event ) 
{
  if ( event.target === event.currentTarget && ( project_descriptions[ 0 ].style.display == "" || project_descriptions[ 0 ].style.display == "none" ) )
  {
    doFadeOut( project_index, project_index = 0 );
  }
} );

// clicking on the mistrrOS button will reveal the mistrrrOS project description.
projects[ 0 ].addEventListener( "click", () => 
{
  if( project_descriptions[ 1 ].style.display == "none" || project_descriptions[ 1 ].style.display == "" )
  {
    doFadeOut( project_index, project_index = 1 );
  }
} );

// clicking on the AntiSpoil button will reveal the AntiSpoil project description.
projects[ 1 ].addEventListener( "click", () => 
{
  if( project_descriptions[ 2 ].style.display == "none" || project_descriptions[ 2 ].style.display == "" )
  {
    doFadeOut( project_index, project_index = 2 );
  }
} );

// clicking on the SongSync button will reveal the SongSync project description.
projects[ 2 ].addEventListener( "click", () => 
{
  if( project_descriptions[ 3 ].style.display == "none" || project_descriptions[ 3 ].style.display == "" ) 
  {
    doFadeOut( project_index, project_index = 3 );
  }
} );