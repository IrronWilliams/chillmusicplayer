/*Player component is the controls for music player. Using FontAwesome as component and passing 
fonts as props. Installed font awesome packages*/

import React, {useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons'

/*have access to pieces of state due to props passed from App.  */
const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, 
                setSongInfo, songInfo, songs, setCurrentSong, setSongs}) =>{
    
    /* using useEffect to run function every time a song is updated. 
    
    song.id represents the song from the state. 
    currentSong.id represents the song user clicks on. if match, copy all
    of the songs and change the active state of to true. if no match, 
    change the active song to false. This ensures when user clicks the forward or back
    button on the player, the song in the UI/library will update the active property, which
    will highlight the selected song.  
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

    /*getTime function formats the number in seconds and minutes (example from Stackoverflow on how to format time)
    function is helpful to start time when play button is clicked*/
    const getTime = (time) =>{
        return(
            Math.floor(time/60)+':' //showing minute:
            +('0'+Math.floor(time%60))//starts at 0 when reaches 60
            .slice(-2)) //slice returns a portion of array. extracts the last 2 elements
    }

    /*receiving event from onChange. e.target.value returns the min and max time of song (from 0 to duration). so when slider is pulled
    the min and duration values are returned. passing this value to the state setter. copy current songInfo but change the current time 
    to whatever time of the current slider/where I am in the song (position to where I pulled the slider)*/ 
    const dragHandler = (e) =>{
        audioRef.current.currentTime = e.target.value //prevents the slider from snapping back to beginning when letting go of slider
        setSongInfo({...songInfo, currentTime: e.target.value}) //updating state to the position of where slider has been positioned
    }

    /*getting index of current song user is on. when moving forward, just moving 
    to next song in array. The modulus in skip-forward goes to position 0 when the
    current index and length become equal. If current index is 7 and length is 8, the reminder is 1; current index is 1. 
    If both current index and length are 8, the remainder is 0. So starts back at beginning of songlist 
    and prevents incrementing to a value greater then the array length and prevents app from crashing

    When skipping back logic prevents the app from crashing when user is at beginning of 
    song list. When user at beginning of list, going backward will crash because that 
    position does not exist. So set the position to the last index. Subtraction 1 because
    arrays are 0 based. Need return to break out of if block when code bloc runs. 
    Otherwise the next line will execute and cause app to crash.  
    
    using 2 pieces of state, songs and currentSong. I want the index of the song where the 2 state ids states match. 
    this means I am on the current song.  
    */
    const skipTrackHandler = async (direction) =>{
        let currentIndex = songs.findIndex((song)=>song.id===currentSong.id) //selects index of the current song in the library
        if(direction==='skip-forward'){
            await setCurrentSong(songs[(currentIndex+1)%songs.length]) //moving index forward to next song and updating state
        }
        if(direction==='skip-back'){
            if((currentIndex -1)%songs.length=== -1){ //if current index and array length = -1, then subtract -1 from length because arrays start with 0. 
                await setCurrentSong(songs[songs.length -1]) //setting song to the last song in array
                if(isPlaying) audioRef.current.play()
                return                                      //adding return to exit function and not run the await
            }
           await setCurrentSong(songs[(currentIndex-1)%songs.length]) //with this code alone, app will crash because -1 position in array does not exist.
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
               <p>{getTime(songInfo.currentTime)}</p> {/*invoking function and passing songs current time. time starts when play button is clicked  */}
               <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}className='track'>
               
               <input //using min, max and value so that slider moves as song plays. when manually move slider, dragHandler function runs
                    min={0}
                    max={songInfo.duration||0} //when changing songs, it takes a few seconds for song to load. during this time, duration value errors out(Nan error). default value to 0 to fix error. 
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                    type='range' //creates the slider
                />
                <div style={trackAnim} className='animate-track'></div>
               </div>
               <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>  {/*invoking function and passing songs duration. duration is displayed when play button is clicked. if song duration not available, default to 0  */}
           </div>

           <div className='play-control'>
               <FontAwesomeIcon 
                    onClick={()=>skipTrackHandler('skip-back')}
                    className ='skip-back' 
                    icon={faAngleLeft} size={'2x'}/>
               <FontAwesomeIcon 
                    onClick={playSongHandler}
                    className='play' 
                    icon={isPlaying ? faPause:faPlay} //ternary using state. if song is playing show the pause icon. if not show play icon
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