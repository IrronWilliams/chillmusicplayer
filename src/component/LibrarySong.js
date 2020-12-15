import React from 'react'


/*receives song data from Library.js. 
creates a component for each song */
const LibrarySong = ({ song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs }) =>{
    const songSelectHandler = async ()=>{
        //const selectedSong = songs.filter((state) =>state.id ===id) //filter out the clicked song that is equal to the current song in state.  
        //console.log(selectedSong)
        //setCurrentSong(selectedSong[0]) //update state with the the clicked song. Filter returns an array so need to select the 1st element. this will update the player with clicked song
        await setCurrentSong(song)
        
        /*function adds active song in the library. the song.id represents the song from the state. 
        id represents the song user clicks on. if match, copy all
        of the songs but change the active property by changing the active state to true. if no match/if id's don't =, 
        change the active song to false. 
        */
        const newSongs = songs.map((song)=>{
            if(song.id===id){
                return{...song, active:true}
            }else return{...song, active:false}
        })
        setSongs(newSongs) //update state with the active song

        //checking if song is playing. if so, play song
        if(isPlaying) audioRef.current.play()
    }
    
    /*adding click event on the song library. conditionally rendering the class. 
    if song.active state is true, select the selected class the library partial, otherwise no class. this basically means 
    the background color of the song in library will change color when clicked.   */
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