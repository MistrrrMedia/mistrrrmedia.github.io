const inputForm = document.getElementById( "terminal-input" );
const userIn = document.getElementById( "command-input" );
const output = document.getElementById( "terminal-output" );
const terminalWindow = document.getElementById( "terminal" );

inputForm.addEventListener( "submit", ( event ) => {
  event.preventDefault(); 
  const input = userIn.value.trim(); // remove before and after white space
  handleInput( input ); 
  userIn.value = ''; // clear input
} );

terminalWindow.addEventListener( "click", ( event ) => {
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
      output.innerHTML += `<p>I'm just a guy!</p>`;
      break;

    case "clear":
      output.innerHTML = ``;
      break;

    case "color":
      if( args[ 1 ] == null )
        output.innerHTML += `<p>usage: color string</p>`;
      else 
        terminalWindow.style.color = args[ 1 ];
        userIn.style.color = args[ 1 ];
      break;
    
    case "madi": // madi & madison output the same thing
    case "madison":
      output.innerHTML += `<p>For Madison &#8212 May 30, 2023.<p>`;
      break;

    case "neofetch":
      var OS = "idk";
      if( window.navigator.userAgent.indexOf( "Windows NT 10.0" ) != -1 ) OS = "Windows 10";
      if( window.navigator.userAgent.indexOf( "Windows NT 6.3" )  != -1 ) OS = "Windows 8.1";
      if( window.navigator.userAgent.indexOf( "Windows NT 6.2" )  != -1 ) OS = "Windows 8";
      if( window.navigator.userAgent.indexOf( "Windows NT 6.1" )  != -1 ) OS = "Windows 7";
      if( window.navigator.userAgent.indexOf( "Windows NT 6.0" )  != -1 ) OS = "Windows Vista";
      if( window.navigator.userAgent.indexOf( "Windows NT 5.1" )  != -1 ) OS = "Windows XP";
      if( window.navigator.userAgent.indexOf( "Windows NT 5.0" )  != -1 ) OS = "Windows 2000";
      if( window.navigator.userAgent.indexOf( "Mac" )             != -1 ) OS = "macOS / iOS";
      if( window.navigator.userAgent.indexOf( "X11" )             != -1 ) OS = "UNIX";
      if( window.navigator.userAgent.indexOf( "Linux" )           != -1 ) OS = "Linux";

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

  terminalWindow.scrollTop = terminalWindow.scrollHeight; // scroll to the bottom of the window
                                                          // keeps user's input in view
}