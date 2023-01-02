// Arquivo Javascript do jogo


// Canvas refere-se ao background
const canvas = document.querySelector('canvas');
// c ao seu contexto (como ele será preenchido)
const c = canvas.getContext('2d');


// Largura e altura do canvas
canvas.width = 1024;
canvas.height = 576;

// Preenche o fundo de forma sólida
c.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.5;


// Classe sprite que desenha e
// movimenta os personagens na tela
class Sprite {

    constructor({position, velocity, color = 'red'}) {
        // Posição inicial (objeto com x e y)
        this.position = position; 
        // Velocidade, também um objeto com x e y
        this.velocity = velocity;

        this.height = 150;
        this.width = 50;

        this.color = color;
        this.lastKey;
        // Última tecla pressionada

        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50 
        }

        this.isAttacking = false;
    }

    // Método que desenha o personagem
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    
        // Attack box
        if(this.isAttacking) {
            c.fillStyle = 'green';
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height) 
        }
        
    }

    update() {
        this.draw();
        
        // Posição em x  --> Não pode passar das bordas
        if(this.position.x + this.width + this.velocity.x >= canvas.width) {
            this.velocity.x = 0;
        }
        else if (this.position.x + this.velocity.x <= 0){
            this.velocity.x = 0;
        }

        this.position.x += this.velocity.x;

        // Posição em y  --> Não pode passar do chão
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        }
        else{
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.isAttacking = true
        
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}


// Criação do jogador
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    }, 
    velocity: {
        x: 0,
        y: 0
    }
});

player.draw();


// Criação do inimigo
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    }, 
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue'
    
});

enemy.draw();

//console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

let lastKey;  
// TODO: essa variavel armazena a ultima tecla pressionada,
// mas se eu clico a, d e para o d, 
// ele não se move para a mais

function animate() {

    // Essa função chama ela mesma novamente a cada frame
    window.requestAnimationFrame(animate)

    // Limpa os elementos da tela
    c.fillStyle = 'black';  
    c.fillRect(0, 0, canvas.width, canvas.height);  

    // Reinicia os sprites, movendo-os
    player.update();
    enemy.update();


    // Player Movement
    player.velocity.x = 0

    if(keys.d.pressed && player.lastKey === 'd') {  // Se pressionar d, move para a direta
        player.velocity.x = 5
    }
    else if (keys.a.pressed && player.lastKey === 'a') {  // Se pressionar a, para a esquerda
        player.velocity.x = -5
    }

    // Player Movement
    enemy.velocity.x = 0

    if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {  // Se pressionar d, move para a direta
        enemy.velocity.x = 5
    }
    else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {  // Se pressionar a, para a esquerda
        enemy.velocity.x = -5
    }


    // Detect for collision
    if(
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x
        && player.attackBox.position.x <= enemy.position.x + enemy.width
        && player.attackBox.position.y + player.attackBox.height >= enemy.position.y
        && player.attackBox.position.y <= enemy.position.y + enemy.height
        && player.isAttacking){
        
        player.isAttacking = false
        console.log('Attack')
    }

}

animate();

// Mover-se
window.addEventListener('keydown', (event) => {
    //console.log(event.key);

    switch(event.key){
        // Player 1
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;

        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break;

        case 'w':
            player.velocity.y = -13
            break;

        case 's':
            if(player.position.y + player.height + 17 < canvas.height) {
                player.velocity.y = 20
            }
            break;
        
        case ' ':
            player.attack()
            break;


        // Player 2
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break;

        case 'ArrowUp':
            enemy.velocity.y = -13
            break;
    
        case 'ArrowDown':
            if(enemy.position.y + enemy.height + 17 < canvas.height) {
                enemy.velocity.y = 20
            }
            break;
    }
})

// Parar de se mover
window.addEventListener('keyup', (event) => {

    switch(event.key){

        // Player 1
        case 'd':
            keys.d.pressed = false
            player.lastKey = 'a'
            break;

        case 'a':
            keys.a.pressed = false
            player.lastKey = 'd'
            break;

        // Player 2
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            enemy.lastKey = 'ArrowLeft'
            break;
    
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            enemy.lastKey = 'ArrowRight'
            break;
    }
})


// 1:04:10