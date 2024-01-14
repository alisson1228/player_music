let musicas = [
    {
        titulo: "Enemy",
        artista: "Imagine Dragons",
        capa: "./img/capa/enemy.jpg",
        local: "music/Enemy.mp3"
    },
    {
        titulo: "Homage",
        artista: "Mild High Club",
        capa: "./img/capa/homagy.jpg",
        local: "music/homage.mp3"
    },
    {
        titulo: "Oceans",
        artista: "Hillsong United",
        capa: "./img/capa/oceans.jpg",
        local: "music/Oceans.mp3"
    },
]

const musica = document.getElementById("music")
const play = document.getElementById("play")
const volumec = document.getElementById("volume")
const btnvolum = document.getElementById("volum")
const cduracao = document.getElementById("prog")
const autoplay = document.getElementById("autoplay")
const repetir = document.getElementById("repetir")
const btnlista = document.getElementById("btnlista")
const lista = document.getElementById("lista")

const tempocorrent = document.getElementById("corrente")
const totaltempo = document.getElementById("totaltime")

const titulo = document.getElementById("titulo")
const artista = document.getElementById("artista")
const capa = document.getElementById("capa")

const musics = document.getElementById("musicas")

let indexMusica = 0;
let indexrepetir = 0
let indexautoplay = 0
let estadoplay = 0

//renderizarMusica(indexMusica);
//renderizarEstado(estadoDaMusica);


//eventos

musica.addEventListener('timeupdate', update)


//controladores principais
function playmusica() {
    if(musica.paused) {
        musica.play()

        estadoplay = 1
    } else {
        musica.pause()

        estadoplay = 0
    }

    iconPlay()
}

function back() {
    cduracao.value = 0
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = musicas.length;
    }
    renderizarMusica(indexMusica);
};

function next() {
    cduracao.value = 0
    indexMusica++;
    if (indexMusica == musicas.length) {
        indexMusica = 0;
    }

    renderizarMusica(indexMusica);
};

function repet() {
    indexrepetir++
    if(indexrepetir > 2){
        indexrepetir = 0
    }

    if(indexrepetir == 1) {
        if(indexautoplay == 0){
            autoplayer()
        }
        
    }

    if(indexrepetir == 0) {
        if(indexautoplay == 1){
            autoplayer()
        }
    }

    if(indexrepetir == 2) {

    }

    iconRepetir()
}

function autoplayer() {
    if(indexautoplay == 0){
        indexautoplay = 1
    } else {
        indexautoplay = 0
    }

    iconAutoplay()
}

function mutar() {
    if(musica.muted){
        musica.muted = false
    } else {
        musica.muted = true
    }

    iconVolum()
}

function volumes() {
    musica.volume = volumec.value/100

    iconVolum()
}

function openlist() {
    if(lista.classList[1] == "active") {
        lista.classList.remove("active")
    } else {
        lista.classList.add("active")
    }

    iconLista()
}


//função rende
let id = -1 
let eventid = -1

musicas.forEach((music) => {
    id++

    let tit = '<h5 class="titulo">'+ music.titulo +'</h5>'
    let art = '<p class="artista">'+ music.artista +'</p>'

    let divmusic = '<div class="main-player-lister-musics-music btnmusica" id="btn'+ id +'" data-btn="'+ id +'">'
    let divimg = '<div class="main-player-lister-musics-music-img" style="background-image: url(\''+ music.capa +'\')"></div>'
    let divinfo = '<div class="main-player-lister-musics-music-infos">'

    let fechadiv = '</div>'

    musics.innerHTML += divmusic + divimg + divinfo + tit + art + fechadiv + fechadiv

    renderizarMusica(indexMusica);

})

musicas.forEach(() => {
    eventid++

    let btnid = "btn" + eventid

    document.getElementById(btnid).addEventListener("click", () => {
        cduracao.value = 0
        indexMusica = document.getElementById(btnid).dataset.btn
        renderizarMusica(indexMusica)
        document.getElementById("btn"+index).classList.add("active")
    })
})

function renderizarMusica(index){
    musica.setAttribute('src', musicas[index].local);
    titulo.textContent = musicas[index].titulo;
    artista.textContent = musicas[index].artista;
    musica.addEventListener('loadeddata', () => {
        capa.style.backgroundImage = "url('" + musicas[index].capa + "')"
        totaltempo.textContent = segundosParaMinutos(Math.floor(musica.duration));
        tempocorrent.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
    });
    if(estadoplay == 1) {
        playmusica()
    }

    if(document.querySelector(".btnmusica.active") == null) {
        document.getElementById("btn"+index).classList.add("active")
    } else {
        document.querySelector(".btnmusica.active").classList.remove("active")
        document.getElementById("btn"+index).classList.add("active")
    }
}

function update() {

    let currentMinutes = Math.floor(musica.currentTime / 60)
    let currentSeconds = Math.floor(musica.currentTime - currentMinutes * 60)
    let durationMinutes = Math.floor(musica.duration / 60)
    let durationSeconds = Math.floor(musica.duration - durationMinutes * 60)

    let currentHoras = Math.floor(currentMinutes / 60)
    let duracaoHoras = Math.floor(durationMinutes / 60)

    if(currentHoras > 0) {currentMinutes = currentMinutes - currentHoras * 60}
    if(duracaoHoras > 0) {durationMinutes = durationMinutes - duracaoHoras * 60}

    if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds }
    if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes }

    if(musica.currentTime > 0) {
        cduracao.value = musica.currentTime * (10000 / musica.duration)

        if(duracaoHoras != 0) {
            tempocorrent.textContent = currentHoras + ":" + currentMinutes + ":" + currentSeconds
        } else {
            tempocorrent.textContent = currentMinutes + ":" + currentSeconds
        }
    }

    if(cduracao.value == 10000 && indexautoplay == 1) {
        if(indexrepetir == 1) {
            next()
        }

        if(indexrepetir == 0) {
            if(cduracao.value == 10000 && indexMusica < (musicas.length - 1)){
                next()
                console.log("erro")
            } else if(cduracao.value == 10000 && indexMusica == (musicas.length - 1)) {
                play.classList.remove("pause")
                play.classList.remove("repet")
                play.classList.remove("play")
                play.classList.add("repet")
            }
        }

        if(indexrepetir == 2) {
            playmusica()
        }
    } else {

        if(cduracao.value == 10000 && play.classList[1] != "repet") {
            play.classList.remove("pause")
            play.classList.remove("repet")
            play.classList.remove("play")
            play.classList.add("repet")
        } else if(cduracao.value != 10000 && play.classList[1] == "repet") {
            iconPlay()

            if(estadoplay == 0) {
                playmusica()
            }
        }

    }
}

//função de audio
function autoplayer() {
    if(indexautoplay == 0){
        indexautoplay = 1
    } else {
        indexautoplay = 0
    }

    iconAutoplay()
}

function mutar() {
    if(musica.muted){
        musica.muted = false
    } else {
        musica.muted = true
    }

    iconVolum()
}

function volumes() {
    musica.volume = volumec.value/100

    iconVolum()
}

function duracao() {
    musica.currentTime = musica.duration/10000*cduracao.value

    iconPlay()
}

// função converter TEMPO
function segundosParaMinutos(segundos){
    let campoMinutes = Math.floor(segundos / 60)
    let campoSeconds = Math.floor(segundos % 60)

    let campoHoras = Math.floor(campoMinutes / 60)

    if(campoHoras > 0) {Math.floor(campoMinutes = campoMinutes - campoHoras * 60)}

    if(campoSeconds < 10) {campoSeconds = "0" + campoSeconds }
    if(campoMinutes < 10) {campoMinutes = "0" + campoMinutes }

    if(campoHoras != 0 ) {
        return campoHoras + ":" + campoMinutes + ":" + campoSeconds
    } else {
        return campoMinutes + ":" + campoSeconds
    }
}

// funções de ICON
function iconPlay() {
    if(musica.paused) {
        play.classList.remove("pause")
        play.classList.remove("repet")
        play.classList.remove("play")
        play.classList.add("play")
    } 
    if(!musica.paused) {
        play.classList.remove("pause")
        play.classList.remove("repet")
        play.classList.remove("play")
        play.classList.add("pause")
    }
}

function iconVolum() {
    if(musica.muted){
        btnvolum.classList.remove("high")
        btnvolum.classList.remove("low")
        btnvolum.classList.remove("off")
        btnvolum.classList.add("xmark")
    } else {
        if(volumec.value > 50) {
            btnvolum.classList.remove("high")
            btnvolum.classList.remove("low")
            btnvolum.classList.remove("off")
            btnvolum.classList.remove("xmark")
            btnvolum.classList.add("high")
        } else if (volumec.value < 50 && volumec.value != 0) {
            btnvolum.classList.remove("high")
            btnvolum.classList.remove("low")
            btnvolum.classList.remove("off")
            btnvolum.classList.remove("xmark")
            btnvolum.classList.add("low")
        } else if (volumec.value == 0) {
            btnvolum.classList.remove("high")
            btnvolum.classList.remove("low")
            btnvolum.classList.remove("off")
            btnvolum.classList.remove("xmark")
            btnvolum.classList.add("off")
        }
    }
}

function iconAutoplay() {
    if(indexautoplay == 0){
        autoplay.classList.remove("li")
        autoplay.classList.add("de")
    } else {
        autoplay.classList.remove("de")
        autoplay.classList.add("li")
    }
}

function iconRepetir() {
    if(indexrepetir == 0){
        repetir.classList.remove("r1")
        repetir.classList.remove("re")
        repetir.classList.add("rn")
    } else if(indexrepetir == 1){
        repetir.classList.remove("rn")
        repetir.classList.remove("r1")
        repetir.classList.add("re")
    } else if(indexrepetir == 2){
        repetir.classList.remove("rn")
        repetir.classList.remove("re")
        repetir.classList.add("r1")
    }
}

function iconLista() {
    if(lista.classList[1] == "active") {
        btnlista.classList.remove("lf")
        btnlista.classList.add("la")
    } else {
        btnlista.classList.remove("la")
        btnlista.classList.add("lf")
    }
}
