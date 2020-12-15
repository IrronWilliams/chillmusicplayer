import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMusic} from '@fortawesome/free-solid-svg-icons'

/* when music button is clicked, updating current state value to its opposite value. meaning default state value is false (closed). 
when button clicked, will change state value to true (open)  */
const Nav = ({setLibraryStatus, libraryStatus}) =>{
    return(
        <nav>
            <h1>CHILLHOP VIBES</h1>
            <button onClick={()=>setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    )
}

export default Nav