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
    // current song index
    let current_song_index = 0;


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
        console.log({ current_song_index, audio_name: audio_list[current_song_index].name, duration: presDuration(), volume_level: audio.volume, src: audio.src })
    }

    const presDuration = () => {
        const split_duration = audio.duration.toString().split('.')
        const min = Math.floor(split_duration[0] % 3600 / 60)
        const sec = Math.floor(parseInt(split_duration[1]) % 3600 % 60)
        // if duration is not ther then 00:00 will be there
        if (isNaN(audio.duration)) {
            return '00:00'
        }
        return min + ':' + sec
    }


    const audio = new Audio(audio_list[current_song_index].url)

    const btn = document.getElementById('btn')
    const next = document.getElementById('next')
    const back = document.getElementById('back')
    const show = document.getElementById('show')
    const volume = document.getElementById('volume')
    const timeLeft = document.getElementById('time_left')

    // global changes
    if (audio.duration == audio.duration) {
        // btn.innerHTML = 'Play'
        console.log('song finish')
        audio.src = audio_list[++current_song_index].url
    }

    // set default volume
    audio.volume = volume.value


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

    // volume inc / dec
    volume.addEventListener('input', () => {
        audio.volume = volume.value
    })

    // click on back button
    back.addEventListener('click', () => {
        if (current_song_index <= 0) {
            back.disabled = true
            console.log(current_song_index)
            current_song_index = 0
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
        if (isNaN(audio.duration)) {
            duration.innerHTML = '00:00'
        }
        document.body.append(duration)
        setTimeout(() => {
            document.body.removeChild(duration)
        }, 1000)
    }


    // special keydown function
    // toggle btn for play & pause with spacebar
    let toggle = false
    document.body.addEventListener('keydown', (e) => {
        if (e.code == 'Space' || e.keyCode == 32 || e.key == ' ') {
            if (toggle) {
                toggle = false
                audio.pause()
                btn.innerHTML = 'Play'
            } else {
                toggle = true
                audio.play()
                btn.innerHTML = 'Pause'
            }
        }
        // seek -1
        if (e.code == 'ArrowRight' || e.which == 39) {
            audio.src = audio_list[++current_song_index].url
            audio.play()
            showName(audio_list[current_song_index].name)
            btn.innerHTML = 'Pause'
        }
        // seek + 1
        if (e.code == 'ArrowLeft' || e.which == 37) {
            audio.src = audio_list[--current_song_index].url
            audio.play()
            showName(audio_list[current_song_index].name)
            btn.innerHTML = 'Pause'
        }
        // voume + 
        if (e.code == 'ArrowUp') {
            console.log(audio.volume)
            // audio.volume += .2
            if (audio.volume >= 1) {
                console.info('Please decrease the volume its harmfull for your ears as per goverment guidline.')
            }
            else {
                volume.value += .2
                audio.volume += .2
            }
            // controll voulume to range 1 to 0
        }
        if (e.code == 'ArrowDown') {
            if (audio.volume <= 0) {
                console.info('silence')
            } else {
                volume.value -= .2
                audio.volume -= .2
            }
            // controll voulume to range 1 to 0
        }
    }, false)
    // adding new song to list
    addingNewAudio()
}


// adding new song url
const addingNewAudio = (audio_src) => {
    const input = document.createElement('input')
    const addBtn = document.createElement('button')
    input.setAttribute('type', 'url')
    addBtn.innerHTML = 'Add'
    document.body.append(input)
    document.body.append(addBtn)

    addBtn.addEventListener('click', () => {
        if (input.value === '' || input.value == null) {
            alert('can not perform this action enter the url')
        }
        else {
            audio_list.push({
                url: input.value,
                name: input.value.substring(0, input.value.lastIndexOf("."))
            })
            window.console.info(input.value.substring(0, input.value.lastIndexOf(".")) + ' is Added to list')
            input.value = ''
            console.log(audio_list)
        }
    })
}

// sample url = https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav
