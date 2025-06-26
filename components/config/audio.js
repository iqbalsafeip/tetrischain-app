


const audio = {
    gamePlay: '/sounds/gamePlay.mp3', //dipakai saat game dimulai koreksi dikit
    gameOver: '/sounds/GameOver.mp3',  //dipakai saat gameover koreksi dikit 
    idle:  'can aya sound na',
    blockMoving: '/sounds/move.mp3', //lebih dari satu sound, jadi tidak monoton setiap block bergerak
    blockRotate: '/sounds/rotate.mp3', //possibly bisa lebih dari satu sound
    blockDownFast: '/sounds/drop.mp3', //jebred
    blockClear: (index = 1)=> `/sounds/pecah${index}.mp3`, // CETASSS BELEDAAAGGGGG
}

export default audio;