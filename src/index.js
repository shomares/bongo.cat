import { fromEvent, from, of } from "rxjs";

import { concatMap, delay, filter } from 'rxjs/operators'
const clickButton = document.querySelector('#toRecord')


window.sessionStorage.setItem('IsRecording', false)

let toRecording = false

let isPlaying = false
const toClick$ = fromEvent(clickButton, 'click').pipe(
     filter( ()=> !isPlaying)
)


const saveRecordingButton = (toRecord) => {
    window.sessionStorage.setItem('IsRecording', toRecord)
}

const toPlay = (array = []) => {

    isPlaying = true
    const source$ = from(array).pipe(
        concatMap(x => of(x).pipe(delay(x.diff)))
    )

    source$.subscribe( val => {
        $.play(val.instrument, val.key, val.state)
    }, () => {

    }, ()=> {
       window.sessionStorage.removeItem('Record')
       isPlaying = false
       currentNote = null

    })
}


const startPlaying  =() => {
    let recorded = window.sessionStorage.getItem('Record')

    if(recorded){
        recorded= JSON.parse(recorded)
        toPlay(recorded)
    }

}



toClick$.subscribe( () => {
    console.log('Click')
    clickButton.innerHTML = toRecording? 'Record' : 'Recording ...'
    toRecording = !toRecording
    saveRecordingButton(toRecording)

    if(!toRecording)
    {
        startPlaying()
    }
})

console.log(clickButton)