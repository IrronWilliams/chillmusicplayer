/*Song component is the top part of the app. Shows song, name, artist and pic */
import React from 'react'

/*received the full music object as a state prop from main App. this displays the song pic, name, artist.
updates the song component to current state*/
const Song = ({currentSong}) =>{
    return (
       <div className='song-container'>
           <img alt={currentSong.name} src={currentSong.cover}></img>
           <h2>{currentSong.name}</h2>
           <h3>{currentSong.artist}</h3>
       </div>
        
    )
}

export default Song 