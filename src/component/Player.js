/*Component is the Controls for music player. Using FontAwesome as component and passing fonts as props*/

import React, {useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons'


const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, 
                setSongInfo, songInfo, songs, setCurrentSong, setSongs}) =>{
    
    /* using useEffect to run function every time a song is updated. 
    
    song.id represents the song from the state. 
    currentSong.id represents the song user clicks on. if match, copy all
    of the songs and change the active state of to true. if no match, 
    change the active song to false. 
    */
    useEffect(()=>{
       const newSongs = songs.map((song)=>{
        if(song.id===currentSong.id){
            return{...song, active:true}
        }else return{...song, active:false}
        })
        setSongs(newSongs)

        },[currentSong])


       /*'current' is property name to music file. the if/else uses state to 
    allow users to pause/play music */
    const playSongHandler = () =>{
        //console.log(audioRef.current) 
        //audioRef.current.play() 
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
          } else {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
          }        
    }

    /*getTime function formats the number in seconds and minutes
    */
    const getTime = (time) =>{
        return(
            Math.floor(time/60)+':' //showing minute:
            +('0'+Math.floor(time%60))//starts at 0 when reaches 60
            .slice(-2))
    }

    const dragHandler = (e) =>{
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    /*getting index of current song user is on. when moving forward, just moving 
    to next song in array. The modulus in skip-forward goes to position 0 when the
    current index and length become equal. So starts back at beginning of songlist.

    When skipping back logic prevents the app from crashing when user is at beginning of 
    song list. When user at beginning of list, going backward will crash because that 
    position does not exist. So set the position to the last index. Subtraction 1 because
    arrays are 0 based. Need return to break out of if block when code bloc runs. 
    Otherwise the next line will execute and cause app to crash.     
    */
    const skipTrackHandler = async (direction) =>{
        let currentIndex = songs.findIndex((song)=>song.id===currentSong.id)
        if(direction==='skip-forward'){
            await setCurrentSong(songs[(currentIndex+1)%songs.length])
        }
        if(direction==='skip-back'){
            if((currentIndex -1)%songs.length=== -1){
                await setCurrentSong(songs[songs.length -1])
                if(isPlaying) audioRef.current.play()
                return
            }
           await setCurrentSong(songs[(currentIndex-1)%songs.length])
        }
        if(isPlaying) audioRef.current.play()
    }

    //add styles to player animation and pass to div in Input
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
       <div className='player'>
           <div className='time-control'>
               <p>{getTime(songInfo.currentTime)}</p>
               <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}className='track'>
               <input 
                    min={0}
                    max={songInfo.duration||0} 
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                    type='range' 
                />
                <div style={trackAnim} className='animate-track'></div>
               </div>
               <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
           </div>
           <div className='play-control'>
               <FontAwesomeIcon 
                    onClick={()=>skipTrackHandler('skip-back')}
                    className ='skip-back' 
                    icon={faAngleLeft} size={'2x'}/>
               <FontAwesomeIcon 
                    onClick={playSongHandler}
                    className='play' 
                    icon={isPlaying ? faPause:faPlay} 
                    size={'2x'}/>
               <FontAwesomeIcon 
                    className='skip-forward' 
                    icon={faAngleRight} size={'2x'}
                    onClick={()=>skipTrackHandler('skip-forward')} />
           </div>
       </div>
       
        
    )
}

export default Player 