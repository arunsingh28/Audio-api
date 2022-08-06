const audio_list = [{
    url: 'audio/LareeChoote.mp3',
    name: 'lare choote'
},
{
    url: 'audio/be_in_my_bed.mp3',
    name: 'Be in my bed'
},
{
    url: 'audio/junoon.mp3',
    name: 'Junoon'
}]
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
    // log info in DOM
    document.getElementById('showInfo').addEventListener('click', () => { showInfo() })
    // log info in console
    document.getElementById('logInfo').addEventListener('click', () => { logInfo() })
    // show all info about current song
    const showInfo = () => {
        showIndex()
        showName(audio_list[current_song_index].name)
        showTimeDuration()
    }

    const logInfo = () => {
        console.log({ current_song_index, audio_name: audio_list[current_song_index].name, duration: presDuration() })
    }

    const presDuration = (time) => {
        const split_duration = audio.duration.toString().split('.')
        const min = Math.floor(split_duration[0] % 3600 / 60)
        const sec = Math.floor(parseInt(split_duration[1]) % 3600 % 60)
        return min + ':' + sec
    }

    const audio = new Audio(audio_list[0].url)

    const btn = document.getElementById('btn')
    const next = document.getElementById('next')
    const back = document.getElementById('back')
    const show = document.getElementById('show')
    const timeLeft = document.getElementById('time_left')
    let current_song_index = 0;


    timeLeft.addEventListener('click', () => { remaingTime() })



    btn.addEventListener('click', () => {
        timeLeft.disabled = false
        // toggle btn
        if (btn.innerHTML === 'Play') {
            audio.play()
            showName(audio_list[current_song_index].name)
            btn.innerHTML = 'Pause'
            showIndex()
        } else {
            audio.pause()
            clearInterval(timer)
            btn.innerHTML = 'Play'
            showIndex()
        }
    })

    show.addEventListener('click', () => {
        showIndex()
    })

    // calculate timeleft 
    const remaingTime = () => {
        var totalTime = audio.duration
        var currentTime = audio.currentTime
        var remaingTime = totalTime - currentTime
        const split_duration = remaingTime.toString().split('.')
        const min = Math.floor(split_duration[0] % 3600 / 60)
        const sec = Math.floor(parseInt(split_duration[1]) % 3600 % 60)
        setInterval(() => { console.log({ time: min + ':' + sec }) }, 10)
    }

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
        duration.innerHTML = presDuration()
        document.body.append(duration)
        setTimeout(() => {
            document.body.removeChild(duration)
        }, 1000)
    }


    // special keydown function
    document.body.addEventListener('keydown', (e) => {
        if (e.code == 'Space') {
            audio.play()
            console.log('click space')
        }
    })
}
