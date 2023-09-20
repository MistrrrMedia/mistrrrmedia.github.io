const inputForm = document.getElementById( "terminal-input" );
const userIn = document.getElementById( "command-input" );
const output = document.getElementById( "terminal-output" );
const terminalContents = document.getElementById( "terminal" );
const terminalTitleBar = document.getElementById( "tb-terminal" );
const terminalWindow = document.getElementById( "window-terminal" );
const reloadButton = document.getElementById( "reload" );
const greeting = document.getElementById( "greeting" );

/**
 * handles window dragging and repositioning
 */

var x_offset, y_offset, isDragging = 0;
var targetElement = null;

function mouseDown( m ) 
{
  isDragging = 1;
  targetElement = m.target;
  if( m.target.id == "" ) targetElement = targetElement.parentElement;
  if( targetElement.id == "tb-terminal" ) targetElement = terminalWindow;

  console.log( targetElement.id );
  x_offset = m.clientX - targetElement.offsetLeft;
  y_offset = m.clientY - targetElement.offsetTop;

  document.body.style.userSelect = 'none';
}

function mouseMove( m )
{
  if( !isDragging ) return;
  targetElement.style.left = ( m.clientX - x_offset ) + "px";
  targetElement.style.top = ( m.clientY - y_offset ) + "px";
}

function mouseUp( m )
{
  isDragging = 0;

  document.body.style.userSelect = 'auto';
}

terminalTitleBar.addEventListener( "mousedown", mouseDown );
document.addEventListener( "mousemove", mouseMove );
document.addEventListener( "mouseup" , mouseUp );
greeting.addEventListener( "mousedown", mouseDown );

/**
 * handles user input
 * Jul 31 2023 - should probably utilize php to handle this? it might be cool. unnecessary though.
 */

inputForm.addEventListener( "submit", ( event ) => {
  event.preventDefault(); 
  const input = userIn.value.trim(); // remove before and after white space
  handleInput( input ); 
  userIn.value = ''; // clear input
} );

terminalContents.addEventListener( "click", ( event ) => {
  var target = event.target;
  if( target !== userIn && !userIn.contains( target ) )
    userIn.focus();
} )

function handleInput( input )
{
  args = input.split( ' ' );

  // debugging
  // for( let i = 0; i < args.length; ++i )
  // {
  //   console.log( args[i] );
  // }

  output.innerHTML += `<p>beautiful-human@mistrrrmedia % ${input}</p>`; // output $ input

  switch( args[ 0 ].toLowerCase() )
  {
    // normal stuff
    case "": // nothing
      break;

    case "about":
      output.innerHTML += `<p>Hello! I'm Nicholas Nguyen.</p><br>`;
      output.innerHTML += `<p>I'm a Technical Expert at Apple Leawood, and I'm obtaining my BS in Computer Science and undergraduate certificate in Cybersecurity at the University of Kansas.</p><br>`;
      output.innerHTML += `<p>Mistrrr Media encapsulates my creative endeavors in music production, DJing, and design. My aliases under Mistrrr Media are Mistrrr and nick!.</p><br>`;
      output.innerHTML += `<p>I love exploring web development and UI design. I helped my group of friends design and construct the requirements for our browser extension, AntiSpoil, which is an on-demand web-filter. View my Github to see more: <a href = "https://github.com/mistrrrmedia">https://github.com/mistrrrmedia.</p>`;
      break;

    case "clear":
      output.innerHTML = ``;
      break;

    case "color":
      if( args[ 1 ] == null )
        output.innerHTML += `<p>usage: color string</p>`;
      else 
        terminalContents.style.color = args[ 1 ];
        userIn.style.color = args[ 1 ];
      break;
    
    case "madi": // madi & madison output the same thing
    case "madison":
      output.innerHTML += `<p>For Madison &#8212 May 30, 2023.<p>`;
      break;

    case "neofetch":
      var OS = "idk";

           if( window.navigator.userAgent.indexOf( "Windows NT 10.0" ) != -1 ) OS = "Windows 10";
      else if( window.navigator.userAgent.indexOf( "Windows NT 6.3" )  != -1 ) OS = "Windows 8.1";
      else if( window.navigator.userAgent.indexOf( "Windows NT 6.2" )  != -1 ) OS = "Windows 8";
      else if( window.navigator.userAgent.indexOf( "Windows NT 6.1" )  != -1 ) OS = "Windows 7";
      else if( window.navigator.userAgent.indexOf( "Windows NT 6.0" )  != -1 ) OS = "Windows Vista";
      else if( window.navigator.userAgent.indexOf( "Windows NT 5.1" )  != -1 ) OS = "Windows XP";
      else if( window.navigator.userAgent.indexOf( "Windows NT 5.0" )  != -1 ) OS = "Windows 2000";
      else if( window.navigator.userAgent.indexOf( "Mac" )             != -1 ) OS = "macOS / iOS";
      else if( window.navigator.userAgent.indexOf( "X11" )             != -1 ) OS = "UNIX";
      else if( window.navigator.userAgent.indexOf( "Linux" )           != -1 ) OS = "Linux";
      else                                                                     OS = "NOT REAL";

      output.innerHTML += `<p style = "white-space: pre">#:                          :#  beautiful-human@mistrrrmedia</p>`;
      output.innerHTML += `<p style = "white-space: pre">@@#:                      :##@  ----------------------------</p>`;
      output.innerHTML += `<p style = "white-space: pre">@@@@#:                  :#*.:@  OS: ${ OS }</p>`;
      output.innerHTML += `<p style = "white-space: pre">@@@@@@#:              :#*.  :@  Host: the best host imaginable</p>`;
      output.innerHTML += `<p style = "white-space: pre">@@@@@@@@#:          :#*.    :@  Shell: nsh 1.0</p>`;
      output.innerHTML += `<p style = "white-space: pre">@@@@@@@@@@#:      :#*.      :@  Resolution: ${ window.screen.availHeight }x${ window.screen.availWidth }</p>`;
      output.innerHTML += `<p style = "white-space: pre">@@@@@@@@@@@@#:  :#*.        :@  DE: only the best desktop environment</p>`;
      output.innerHTML += `<p style = "white-space: pre">@@@@@@@@@@@@@@##*.          :@  WM: not real</p>`;
      output.innerHTML += `<p style = "white-space: pre">@@@@@@@@@@@@@@@@#:          :@  WM Theme: bro i just said its not real</p>`;
      output.innerHTML += `<p style = "white-space: pre">@@@@@@@@@@@@@@@@@@#:        :@  Terminal: mistrrr.media</p>`;
      output.innerHTML += `<p style = "white-space: pre">@@@@@@@@@@@@@@@@@@@@#:      :@  Terminal Font: monospace</p>`; // temporary until object.style.fontFamily returning "undefined" is resolved
      output.innerHTML += `<p style = "white-space: pre">@@@@@@@@@@@@@@@@@@@@@@#:    :@  CPU: toaster </p>`;
      output.innerHTML += `<p style = "white-space: pre">@@@@@@@@@@@@@@@@@@@@@@@@#:  :@  GPU: microwave</p>`;
      output.innerHTML += `<p style = "white-space: pre">@@@@@@@@@@@@@@@@@@@@@@@@@@#::@  Memory: mom says mine is pretty bad</p>`;
      break;

    // downloads

    case "nicotine":
      output.innerHTML += `<a href = "https://drive.google.com/file/d/1cv7IZj-OUjbFuTm-U2UjAuP1aznkEgQO/view?usp=sharing">Free Download</a>`;
      break;

    // stupid shit

    case "cd":
      output.innerHTML += `<p>I wish I could move.<p>`;
      break;

    case "cwd":
      output.innerHTML += `<p>I wish I knew where I was.<p>`;
      break;

    case "ls":
      output.innerHTML += `<p>I wish I knew who I was with.<p>`;
      break;

    case "nsh":
      output.innerHTML += `<p>not (a real) shell<p>`;
      break;

    case "music":
      output.innerHTML += `<p><a href = https://open.spotify.com/artist/7cOcfcAsk4eE5QrgJKGLE8?autoplay=true target = "_blank">Spotify</a> <a href = https://music.apple.com/us/artist/mistrrr/1365281603 target = "_blank">Apple Music</a> <a href = "https://soundcloud.com/mistrrr" target = "_blank">SoundCloud</a></p>`;
      break;


    case "reboot":
    case "restart":
    case "refresh":
    case "reload":
      location.reload();
      break;

    case "resume":
      output.innerHTML += `<p>Opening resume.pdf in a new tab.</p>`;
      window.open( "Resume.pdf", "_blank" );
      break;

    case "sudo":
      output.innerHTML += `<p><b>NO<b><p>`;
      break;
    
    case "w": // w or who output the same thing
    case "who":
      output.innerHTML += `<p>I wish I knew who I am&#8212or who you are.<p>`;
      break;

    // help
    case "help":
      output.innerHTML += `<p>about<p>`;
      output.innerHTML += `<p>clear<p>`;
      output.innerHTML += `<p>color<p>`;
      output.innerHTML += `<p>neofetch<p>`;
      output.innerHTML += `<p>cd<p>`;
      output.innerHTML += `<p>cwd<p>`;
      output.innerHTML += `<p>ls<p>`;
      output.innerHTML += `<p>nsh<p>`;
      output.innerHTML += `<p>sudo<p>`;
      output.innerHTML += `<p>w<p>`;
      output.innerHTML += `<p>who<p>`;
      break;
      
    default:
      output.innerHTML += `<p>nsh: command not found: ${ args[ 0 ] }<p>`;
      break;
  }

  terminalContents.scrollTop = terminalContents.scrollHeight; // scroll to the bottom of the window
                                                              // keeps user's input in view
}