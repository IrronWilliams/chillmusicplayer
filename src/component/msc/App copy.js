/*Code for player prior to customizing/animating the slider*/

import React, {useState, useRef} from 'react'
import Player from './component/Player'
import Song from './component/Song'
import Library from './component/Library'
import './styles/app.scss'
import data from './data'
import Nav from './component/Nav'


function App() {
  const audioRef = useRef(null)
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({currentTime: 0, duration: 0,})
  const [libraryStatus, setLibraryStatus] = useState(false)
  const timeUpdateHandler = (e) =>{
    const current = e.target.currentTime
    const duration = e.target.duration
    //console.log(current)
    setSongInfo({...songInfo, currentTime: current, duration: duration})       
  }

  return (
    <div>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
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
      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
        
      />
      <audio 
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef} 
        src={currentSong.audio}>
      </audio>
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
    */
  