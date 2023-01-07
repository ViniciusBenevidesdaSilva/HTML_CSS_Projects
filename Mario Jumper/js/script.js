
const mario =  document.querySelector('.mario');
const pipe =  document.querySelector('.pipe');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        
        mario.classList.remove('jump');

    }, 600);
}

const loop = setInterval(() => {
    
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;



        mario.src = "./assets/sprites/game-over.png";
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        mario.classList.add('game-over');

        //mario.style.bottom =  `${marioPosition}px`;
        setTimeout(() => {
        
            mario.classList.remove('game-over');
            mario.style.bottom = '-150px';
        }, 600);

        clearInterval(loop);
    }

}, 10);


document.addEventListener( 'keydown', jump);

