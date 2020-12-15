/*function returns an array of objects. Installed uuid to generate a random id; so that each song 
can have a unique id. Manually extracted data from chillhop site. Array of colors will be used for 
the input slider. */

import {v4 as uuidv4} from 'uuid'

function chillHop() {
    return [
        {
            name: 'Frozen Firs',
            artist: 'goosetaf, xander., Anbuu ',
            cover: 'https://chillhop.com/wp-content/uploads/2020/10/0e5bb63f838ff92eeac142aae944e9f678df13c9-1024x1024.jpg',
            id: uuidv4(),
            active: true, 
            color: ['#dcafc3', '#8e7a81'],
            audio: 'https://mp3.chillhop.com/serve.php/?mp3=10313'

        },
        {
            name: 'Harbor',
            artist: 'Stan Forebee, The Field Tapes, azula, Francis',
            cover: 'https://chillhop.com/wp-content/uploads/2020/11/8a0c857ddad531279d0757f5362380a6837b1b69-1024x1024.jpg',
            id: uuidv4(),
            active: false,
            color: ['#c9dddc', '#899884'],
            audio: 'https://mp3.chillhop.com/serve.php/?mp3=11245'

        },
        {
            name: 'Bliss',
            artist: 'Misha, Jussi Halme ',
            cover: 'https://chillhop.com/wp-content/uploads/2020/09/5bff1a6f1bd0e2168d29b4c841b811598135e457-1024x1024.jpg',
            id: uuidv4(),
            active: false,
            color: ['#0b233d', '#8b8bad'],
            audio: 'https://mp3.chillhop.com/serve.php/?mp3=9248'

        },
        {
            name: 'Glory Days',
            artist: 'Sitting Duck, Hoffy Beats, Otaam',
            cover: 'https://chillhop.com/wp-content/uploads/2020/08/63d2d2cdabbc5df023603b5f47b2fb97963cb537-1024x1024.jpg',
            id: uuidv4(),
            active: false,
            color: ['#d4c37e', '#412726'],
            audio: 'https://mp3.chillhop.com/serve.php/?mp3=7981'

        },
        {
            name: 'fiveyearsago',
            artist: 'Psalm Trees',
            cover: 'https://chillhop.com/wp-content/uploads/2020/05/861564cb8a53229de4e63541a44f507c8b0da6ec-1024x1024.jpg',
            id: uuidv4(),
            active: false,
            color: ['#cc3033', '#26211d'],
            audio: 'https://mp3.chillhop.com/serve.php/?mp3=9021'

        },
        {
            name: 'The End',
            artist: 'Philanthrope, Fujitsu ',
            cover: 'https://chillhop.com/wp-content/uploads/2020/10/efaa848553d09b4d9fc0752844456e41b34de276-1024x1024.jpg',
            id: uuidv4(),
            active: false,
            color: ['#272817', '#6996b9'],
            audio: 'https://mp3.chillhop.com/serve.php/?mp3=8518'

        },  {
            name: 'Cold Outside',
            artist: ' Nymano, Hyume ',
            cover: 'https://chillhop.com/wp-content/uploads/2020/09/09fb436604242df99f84b9f359acb046e40d2e9e-1024x1024.jpg',
            id: uuidv4(),
            active: false,
            color: ['#5d5285', '#695a81'],
            audio: 'https://mp3.chillhop.com/serve.php/?mp3=10150'

        },  
        {
            name: 'Colors Fade',
            artist: 'Sleepy Fish',
            cover: 'https://chillhop.com/wp-content/uploads/2020/09/686808356b2bbc6a368e372ea604150bc346c788-1024x1024.jpg',
            id: uuidv4(),
            active: false,
            color: ['#b9d7d6', '#d4e9ec'],
            audio: 'https://mp3.chillhop.com/serve.php/?mp3=10023'

        },
    ]
}


export default chillHop