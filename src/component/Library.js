import React from 'react'
import LibrarySong from './LibrarySong'

/*receives entire data object containing all songs. 
iterates over each song and passes each song to the LibrarySong 
component.  */
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