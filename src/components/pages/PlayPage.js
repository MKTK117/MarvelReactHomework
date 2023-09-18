import { useState, useEffect } from "react";


const PlayPage = () => {
    
    const [playerX, setPlayerX] = useState(400);
    const [playerY, setPlayerY] = useState(300);
    const [foodX, setFoodX] = useState(Math.floor(Math.random() * (600 - 0) + 0));
    const [foodY, setFoodY] = useState(Math.floor(Math.random() * (800 - 0) + 0));
    const [grow, setGrow] = useState(50);
 
   
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
        document.removeEventListener('keydown', handleKeyDown);
        };
        
    }, []);
    
    const handleKeyDown = (event) => {
        const arrowKeys = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        };
    
        if (event.keyCode === arrowKeys.left) {
        setPlayerX((prevX) => prevX - 20 - 10);
        }
        if (event.keyCode === arrowKeys.right) {
        setPlayerX((prevX) => prevX + 20 + 10);
        }
        if (event.keyCode === arrowKeys.up) {
        setPlayerY((prevY) => prevY - 20 - 10);
        }
        if (event.keyCode === arrowKeys.down) {
        setPlayerY((prevY) => prevY + 20 + 10);
        }
    };

    const player = {
        x: playerX,
        y: playerY,
        width: grow,
        height: grow,
      };
    const food = {
        x: foodX,
        y: foodY,
        width: grow,
        height: grow,
      };

      function checkCollision(object1, object2) {
        const rect1 = {
          x: object1.x,
          y: object1.y,
          width: object1.width,
          height: object1.height,
        };
      
        const rect2 = {
          x: object2.x,
          y: object2.y,
          width: object2.width,
          height: object2.height,
        };
      
        return (
          rect1.x < rect2.x + rect2.width &&
          rect1.x + rect1.width > rect2.x &&
          rect1.y < rect2.y + rect2.height &&
          rect1.y + rect1.height > rect2.y
        );
      }
    
      const isCollision = checkCollision(player, food)

      if(isCollision) {
        setGrow((grow) => grow + 50 );
        setFoodX(Math.floor(Math.random() * (600 - 0) + 0));
        setFoodY(Math.floor(Math.random() * (800 - 0) + 0));
      }


    
    
    return (
        <div className="Catch'Em!">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
        <h1>Catch 'em! Eat 'em!</h1>
        <div className="player"
            style={{
            textAlign: 'center',
            color: '#FFF',
            position: 'absolute',
            left: playerX,
            top: playerY,
            width: `${grow}px`,
            height: `${grow}px`,
            background: 'blue',
            transition: 'all 0.5s',
            borderRadius: '100%'
            }}
        >{grow}</div>
        <div className="food"
            style={{
                position: 'absolute',
                left: foodX,
                top: foodY,
                width: '15px',
                height: '15px',
                background: 'red',
                // transition: 'all 0.5s',
                borderRadius: '50%'
            }}
            ></div>
        </div>
    );
}

export default PlayPage;