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
  slideshow_cards[ ssnum ].classList.add( "fadeOut" );
  slideshow_cards[ ssnum ].addEventListener( "animationend", () => {
    ssnum++
    if( ssnum >= slideshow_cards.length ) ssnum = 0;
    slideshow_cards[ ssnum ].classList.remove( "fadeOut" );
    slideshow_cards[ ssnum ].classList.add( "fadeIn" );
  }, { once: true } );
  setTimeout( slideshow, 2000 );
}

/**
 * Overrides scrolling behavior, prevents momentum scrolling from scrolling to 
 * the next section prematurely
 * bool: isProcessing, lastScroll
 */

let isProcessing = 0;
let lastScroll = 0;

window.addEventListener( "wheel", ( e ) => {
  const now = Date.now()

  if( isProcessing || now - lastScroll < 100 )  
  {
    e.preventDefault();
    return; // do nothing if scroll events occur < 100 ms between each other
  } 

  lastScroll = now;

  if( e.deltaY > 0 && index < cards.length - 1 ) cardNext(); // go next if up scroll
  else if( e.deltaY < 0 && index > 0 ) cardPrevious(); // go backward if down scroll
  else return; // do nothing

  isProcessing = 1; // page is scrolling
  e.preventDefault();

  setTimeout( () => { // prevent scrolling behavior from happening for 500 ms
    isProcessing = 0;
  }, 1000 );
}, { passive: false } );

function cardNext()
{
  cards[ index ].classList.add( "fadeOut" );
  ++index;
  scrollToSection();
  cards[ index - 1 ].addEventListener( "animationend", function() {
    this.style.display = "none";
    this.classList.remove( "fadeOut" );
    cards[ index ].style.display = "block";
    cards[ index ].classList.add( "fadeIn" );
  }, { once: true });
}

function cardPrevious()
{
  cards[ index ].classList.add( "fadeOut" );
  --index;
  scrollToSection();
  cards[ index + 1 ].addEventListener( "animationend", function() {
    this.style.display = "none";
    this.classList.remove( "fadeOut" );
    cards[ index ].style.display = "block";
    cards[ index ].classList.add( "fadeIn" );
  }, { once: true } );
}

function scrollToSection() 
{
  const showing = sections[ index ].offsetTop;
  container.scrollTo( { // modifies scroll behavior, section by section 
    top: showing, 
    behavior: "smooth" // gradual animation
  } );
  
  if( index == 0 ) up_button.style.display = "none"; // up button disappears if you're at the top
  else up_button.style.display = "flex"; // comes back otherwise

  if( index == cards.length - 1 ) down_button.style.display = "none"; // down button disappears if you're at the bottom
  else down_button.style.display = "flex"; // comes back otherwise
}

function doFadeOut( previous, index )
{
  project_descriptions[ previous ].classList.add( "fadeOut" );
  project_descriptions[ previous ].addEventListener( "animationend", function() {
    console.log( this.id );
    this.classList.remove( "fadeOut" );
    this.style.display = "none";
    project_descriptions[ project_index ].style.display = "block";
    project_descriptions[ project_index ].classList.add( "fadeIn" );
  }, { once: true } );
}

sections[ 1 ].addEventListener( "click", function( event ) 
{
  if ( event.target === event.currentTarget && project_descriptions[ 0 ].style.display == "" || project_descriptions[ 0 ].style.display == "none" ) doFadeOut( project_index, project_index = 0 );
} );

projects[ 0 ].addEventListener( "click", () => 
{
  if( project_descriptions[ 1 ].style.display == "none" || project_descriptions[ 1 ].style.display == "" ) doFadeOut( project_index, project_index = 1 );
} );

projects[ 1 ].addEventListener( "click", () => 
{
  if( project_descriptions[ 2 ].style.display == "none" || project_descriptions[ 2 ].style.display == "" ) doFadeOut( project_index, project_index = 2 );
} );

projects[ 2 ].addEventListener( "click", () => 
{
  if( project_descriptions[ 3 ].style.display == "none" || project_descriptions[ 3 ].style.display == "" ) doFadeOut( project_index, project_index = 3 );
} );

