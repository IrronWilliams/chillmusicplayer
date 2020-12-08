import React from 'react'


/*receives song data from Library.js. 
creates a component for each song */
const LibrarySong = ({ song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs }) =>{
    const songSelectHandler = async ()=>{
        //const selectedSong = songs.filter((state) =>state.id ===id)
        //console.log(selectedSong)
        //setCurrentSong(selectedSong[0])
        await setCurrentSong(song)
        
        /*function adds active song. the song.id represents the song from the state. 
        id represents the song user clicks on. if match, copy all
        of the songs and change the active state of to true. if no match, 
        change the active song to false. 
        */
        const newSongs = songs.map((song)=>{
            if(song.id===id){
                return{...song, active:true}
            }else return{...song, active:false}
        })
        setSongs(newSongs)

        //checking if song is playing. 
        if(isPlaying) audioRef.current.play()
    }
    
    return (
       <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
           <img alt={song.name} src={song.cover}></img>
           <div className='song-description'>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
           </div>
       </div>
        
    )
}

export default LibrarySong