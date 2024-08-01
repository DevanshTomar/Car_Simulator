class Controls{
  constructor(type){
    // attributes to control the car
    this.forward = false;
    this.backward = false;
    this.left = false;
    this.right = false;

    // event listeners
    switch(type){
      case 'KEYS':
        this.#keyboardInstructions();
        break;
      case 'DUMMY':
        this.forward = true;
        break;
    }
  }

  #keyboardInstructions(){
    window.addEventListener('keydown', (e) => {
      switch(e.key){
        case 'ArrowUp':
          this.forward = true;
          break;
        case 'ArrowDown':
          this.backward = true;
          break;
        case 'ArrowLeft':
          this.left = true;
          break;
        case 'ArrowRight':
          this.right = true;
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch(e.key){
        case 'ArrowUp':
          this.forward = false;
          break;
        case 'ArrowDown':
          this.backward = false;
          break;
        case 'ArrowLeft':
          this.left = false;
          break;
        case 'ArrowRight':
          this.right = false;
          break;
      }
    });
  }
}