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
    window.sessionStorage.removeItem('Record')
    
    const source$ = from(array).pipe(
        concatMap(x => of(x).pipe(delay(x.diff)))
    )

    source$.subscribe( val => {
        $.play(val.instrument, val.key, val.state)
    }, () => {

    }, ()=> {
       isPlaying = false
       currentNote = null

    })
}


const startPlaying  =() => {
    let recorded = window.sessionStorage.getItem('Record')

    if(recorded){
        recorded= JSON.parse(recorded)
        toPlay([...recorded])
    }

}



toClick$.subscribe( () => {
    console.log('Click')
    clickButton.innerHTML = toRecording? 'Record' : `
        <span>
            <div>Recording</div> 
        </span>
        <div class='point point--1'>.</div>
        <div class='point point--2'>.</div>
        <div class='point point--1'>.</div>`


    toRecording = !toRecording
    saveRecordingButton(toRecording)



    if(!toRecording)
    {
        startPlaying()
    }
})

console.log(clickButton)