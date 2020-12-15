import React, {useState, useRef} from 'react'
import Player from './component/Player'
import Song from './component/Song'
import Library from './component/Library'
import './styles/app.scss'
import data from './data'
import Nav from './component/Nav'


function App() {
  const audioRef = useRef(null) //referencing the audio tag. not able to access element using const audio = document.querySelector('audio')
  const [songs, setSongs] = useState(data()) //state for music file
  const [currentSong, setCurrentSong] = useState(songs[0]) //grabbing 1st song from array of objects from state 
  const [isPlaying, setIsPlaying] = useState(false)        //state tracks if song is playing or not. 
  const [songInfo, setSongInfo] = useState({currentTime: 0, duration: 0, animatePercentage: 0,})
  const [libraryStatus, setLibraryStatus] = useState(false) //state to track if library is open or not. default is false or closed
  
  /*have access to the audio tags special event called onTimeUpdate. can extract the current time of where I am in song & duration 
  of song. e.target returns the audio file. can now update state with the current song info.  */
  const timeUpdateHandler = (e) =>{
    const current = e.target.currentTime
    const duration = e.target.duration
    //console.log(current)

    //calculate % for slider
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animation = Math.round((roundedCurrent/roundedDuration *100))
    
    /*updating state with the current song info. this is an object. copying song info in object but update the current time and duration. when hit
    play button the currentTime increases, duration stays the same.   */
    setSongInfo({...songInfo, currentTime: current, duration: duration, animationPercentage: animation})       
  }

  /*function skips forward to next song when song ends */
  const songEndHandler = async () =>{
    let currentIndex = songs.findIndex((song)=>song.id===currentSong.id) //finds current index of song
    await setCurrentSong(songs[(currentIndex+1)%songs.length]) //moves song forward. modulus is 0 when length and index are equal. makes sure index does not increment out of array. 
    if(isPlaying) audioRef.current.play()
  }

  return (
    <div>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      
      {/*passing down the currentSong from state as a prop to the Song component */}
      <Song currentSong={currentSong}/>

      {/*passing down state props to the Player component */}
      <Player 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />

       {/*library will hold the songs from state. passing props to components. passing down all songs from state, the function setCurrentSong
       to change the current song to another song,  each individual song and respective info, the song id and key(React requirement), audioRef
       for each individual song */}
      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
        
      />
      {/*audio tag has a special event called onTimeUpdate which runs every time the time changes in the audio. set the event = to the 
      timeUpdateHandler function which will have access to the event. onLoadedMetadata is another special event that will automatically 
      fetch the time and duration of song when the audio tag loads.  
      */}
      <audio 
        onTimeUpdate={timeUpdateHandler} //passing function to get time and duration
        onLoadedMetadata={timeUpdateHandler} //do not have to press play to load song duration
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler} //onEnded event occurs when the audio has reached an end. passing function that skips forward to next song
      ></audio>
    </div>
  );
}

export default App;

 /*state is used to keep track of playing time. audio tag has an event called
    onTimeUpdate which will run when the time changes on the audio. Function will 
    extract current time and duration of the song. using onLoadedMetadata event 
    on the audio tag to load the duration w/o having to click the play button, when
    info about song loads, update the duration on the player.  


    Refactored the Player component. Moved a bunch of code from 
    Player.js up to App.js in order to pass down as props. I needed access to the audio ref
    to pass down to the Library component. Before the refactor, when I clicked on a song
    the song will default to pause mode; the play button was not active/visible.    

    to access an html element/tag in a component, use a reference. 
    cannot access via vanilla JS:
     => const audio = document.querySelector('audio')
    The const audioRef can be passed as a property to 'ref' in the audio 
    element.  Can access the music file via the current property; ie audioRef.current.play()

    */
  