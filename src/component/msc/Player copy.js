/*
This was state of component before refactoring. Moved a bunch of code from 
this component up to App.js to pass down as props. I needed access to the audio ref
to pass down to the Library component. Before the refactor, when I clicked on a song
the song will default to pause mode; the play button was not active/visible.

Component is the Controls for music player. Using FontAwesome as component and passing fonts as props*/

import React, {useRef, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons'


const Player = ({currentSong, isPlaying, setIsPlaying}) =>{
    
    /*to access an html element/tag in a component, use a reference. 
    cannot access via vanilla JS:
     => const audio = document.querySelector('audio')
    The const audioRef can be passed as a property to 'ref' in the audio 
    element.  
    */
    const audioRef = useRef(null)

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

    /*state is used to keep track of playing time. audio tag has an event called
    onTimeUpdate which will run when the time changes on the audio. Function will 
    extract current time and duration of the song. using onLoadedMetadata event 
    on the audio tag to load the duration w/o having to click the play button, when
    info about song loads, update the duration on the player
    
    getTime function formats the number in seconds and minutes
    */
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    })
    
    const timeUpdateHandler = (e) =>{
        const current = e.target.currentTime
        const duration = e.target.duration
        //console.log(current)
        setSongInfo({...songInfo, currentTime: current, duration: duration})       
    }

    const getTime = (time) =>{
        return(
            Math.floor(time/60)+':' //showing minute:
            +('0'+Math.floor(time%60))//starts at 0 when reaches 60
            .slice(-2)
        )
    }

    const dragHandler = (e) =>{
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})

    }

    

    return (
       <div className='player'>
           <div className='time-control'>
               <p>{getTime(songInfo.currentTime)}</p>
               <input 
                    min={0}
                    max={songInfo.duration}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                    type='range' />
               <p>{getTime(songInfo.duration)}</p>
           </div>
           <div className='play-control'>
               <FontAwesomeIcon 
                    className ='skip-back' 
                    icon={faAngleLeft} size={'2x'}/>
               <FontAwesomeIcon 
                    onClick={playSongHandler}
                    className='play' 
                    icon={isPlaying ? faPause:faPlay} 
                    size={'2x'}/>
               <FontAwesomeIcon 
                    className='skip-forward' 
                    icon={faAngleRight} size={'2x'} />
           </div>
           <audio 
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef} 
                src={currentSong.audio}>
            </audio>
       </div>
       
        
    )
}

export default Player 