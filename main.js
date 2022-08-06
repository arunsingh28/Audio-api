const audio1 = {
    url: 'LareeChoote.mp3',
    name: 'lare choote'
}
const audio2 = {
    url: 'be_in_my_bed.mp3',
    name: 'Be in my bed'
}
const audio3 = {
    url: 'junoon.mp3',
    name: 'Junoon'
}
/**
 * @description_of_song
 * 
 * @audio1 : Mitraz 0
 * @audio2 : Be in my bed 1
 * 
 */

document.addEventListener('DOMContentLoaded', () => {
    window.console.info('Ready to use.')
    init()
})



const init = () => {

    document.getElementById('showInfo').addEventListener('click', () => { showInfo() })
    // show all info about current song
    const showInfo = () => {
        showIndex()
        showName(audio_list[current_song_index].name)
        showTimeDuration()
    }

    const audio_list = [audio1, audio2, audio3]
    const audio = new Audio()

    const btn = document.getElementById('btn')
    const next = document.getElementById('next')
    const back = document.getElementById('back')
    const show = document.getElementById('show')
    let current_song_index = 0;


    btn.addEventListener('click', () => {
        if (btn.innerHTML === 'Play') {
            audio.src = audio_list[current_song_index].url
            audio.play()
            showName(audio_list[current_song_index].name)
            btn.innerHTML = 'Pause'
            showIndex()
        } else {
            audio.pause()
            btn.innerHTML = 'Play'
            showIndex()
        }
    })

    show.addEventListener('click', () => {
        showIndex()
    })

    // click on next button
    next.addEventListener('click', () => {
        if (current_song_index >= audio_list.length - 1) {
            current_song_index = 0
        }
        audio.src = audio_list[++current_song_index].url
        audio.play()
        showName(audio_list[current_song_index].name)
        btn.innerHTML = 'Pause'
        showIndex()
    })

    // click on back button
    back.addEventListener('click', () => {
        if (current_song_index <= 0) {
            console.log(current_song_index)
            current_song_index = 0
            back.disabled = true
        }
        else {
            back.disabled = false
            audio.src = audio_list[--current_song_index].url
            audio.play()
            showName(audio_list[current_song_index].name)
            btn.innerHTML = 'Pause'
            showIndex()
        }
    })

    const renderTime = () => {
        const time = document.createElement('code')
        time.innerHTML = audio.duration / 60
        document.body.append(time)
    }

    // show current index of song
    const showIndex = () => {
        const h5 = document.createElement('ins')
        h5.innerHTML = ' ' + current_song_index
        document.body.append(h5)
        setTimeout(() => {
            document.body.removeChild(h5)
        }, 1000)
    }
    // show name of current song
    const showName = (name) => {
        const li = document.createElement('code')
        li.innerHTML = name
        document.body.append(li)

        setTimeout(() => {
            document.body.removeChild(li)
        }, 1000)
    }
    // show time duration of current song
    const showTimeDuration = () => {
        const duration = document.createElement('time')
        duration.innerHTML = Math.floor(audio.duration / 60).toFixed(1)
        document.body.append(duration)
    }


    // special keydown function
    document.body.addEventListener('keydown', (e) => {
        if (e.code == 'Space') {
            audio.play()
            console.log('click space')
        }
    })
}
