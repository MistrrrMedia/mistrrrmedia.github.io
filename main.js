const sections = document.querySelectorAll( ".section" );
const scrollUpButton = document.getElementById( "up" );
const scrollDownButton = document.getElementById( "down" );
const container = document.getElementById( "left" );
const cards = document.querySelectorAll( ".card" );
const projects = document.querySelectorAll( ".project-container" );
const project_descriptions = document.querySelectorAll( ".project-desc" );
const up_button = document.getElementById( "up" );
const down_button = document.getElementById( "down" );
let index = 0;
let project_index = 0;

scrollUpButton.addEventListener( "click", () => {
  if( index > 0 ) cardPrevious(); // stop at card & section 0
} );

scrollDownButton.addEventListener( "click", () => {
  if( index < sections.length - 1 ) cardNext(); // stop at last card & section
} ) ;

// /**
//  * modifies scroll behavior. scroll up to show the next card & section–down to show the previous. 
//  * debounced by 200ms to prevent the UI from jumping to further cards on a single scroll
//  */
// const scroll = debounce( ( e ) => {
//   if( e.deltaY > 0 && index < cards.length - 1 ) cardNext(); // go next if up scroll
//   else if( e.deltaY < 0 && index > 0 ) cardPrevious(); // go backward if down scroll
//   else return; // do nothing
//   e.preventDefault;
// }, 50 ); // delay in ms

// /**
//  * @param {*} func function to debounce
//  * @param {*} wait time in ms to wait before invoking func
//  * 
//  * prevents functions from being called too many times within a single time frame. 
//  * notably, this is used to modify the scroll behavior to prevent multiple sections from 
//  * being scrolled through on a single scroll on a trackpad/mouse
//  */
// function debounce( func, wait )
// {
//   let timeout = 0;

//   return function( ...args )
//   {
//     const context = this;
//     clearTimeout( timeout );
//     timeout = setTimeout( () => func.apply( context, args ), wait );
//   }
// }

// window.addEventListener( "wheel", scroll );

let scrolling = 0;

// window.addEventListener( "wheel", function( event ) 
// {
//   if( !scrolling )
//   {
//     scrolling = 1;
//     document.body.classList.add( "no-scroll" );
//     clearTimeout( window.endScrolling );
//     window.endScrolling - setTimeout ( function() {
//       scrolling = 0;
//       document.body.classList.remove( "no-scroll" );
//     }, 1000 ); 
//   }

//   if( event.deltaY > 0 && index < cards.length - 1 ) cardNext(); // go next if up scroll
//   else if( event.deltaY < 0 && index > 0 ) cardPrevious(); // go backward if down scroll
//   else return; // do nothing
//   event.preventDefault;

// }, { passive: false } );

let isProcessing = 0;
let lastScroll = 0;

window.addEventListener( "wheel", ( e ) => {
  const now = Date.now();

  if( isProcessing || now - lastScroll < 100 )  
  {
    e.preventDefault();
    return;
  }

  lastScroll = now;
  console.log( "poop! " + lastScroll ); // debug for no reason

  if( e.deltaY > 0 && index < cards.length - 1 ) cardNext(); // go next if up scroll
  else if( e.deltaY < 0 && index > 0 ) cardPrevious(); // go backward if down scroll
  else return; // do nothing

  
  isProcessing = 1;
  e.preventDefault();

  setTimeout( () => {
    isProcessing = 0;
  }, 500 );
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
  if ( event.target === event.currentTarget ) doFadeOut( project_index, project_index = 0 );
} );

projects[ 0 ].addEventListener( "click", () => 
{
  if( project_descriptions[ 1 ].style.display == "none" || project_descriptions[ 1 ].style.display == "" ) doFadeOut( project_index, project_index = 1 );
} );

projects[ 1 ].addEventListener( "click", () => 
{
  if( project_descriptions[ 2 ].style.display == "none" || project_descriptions[ 2 ].style.display == "" ) doFadeOut( project_index, project_index = 2 );
} );

