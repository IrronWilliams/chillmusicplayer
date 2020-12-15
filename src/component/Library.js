import React from 'react'
import LibrarySong from './LibrarySong'

/*receives entire data object containing all songs and other props from main App. 
iterates over each song and passes each song to the LibrarySong 
component. The LibrarySong component is responsible for rendering each song to the page.

conditionally rendering the class. working with the library partial which begins with the library class. 
if the libraryStatus is active, update to the active-library class. basically adding/removing the class depending upon 
active state. => hides the library when button is clicked. 

*/
const Library =({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) =>{
    return (
        <div className={`library ${libraryStatus ? 'active-library':''}`}>
            <h2>Library</h2>
            <div className='library-songs'>
                {songs.map((song)=>(
                    <LibrarySong 
                        song={song} 
                        setCurrentSong={setCurrentSong} 
                        songs={songs}
                        id={song.id}
                        key={song.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        setSongs={setSongs}
                />
                ))}
            </div>

        </div>
    )
}

export default Library