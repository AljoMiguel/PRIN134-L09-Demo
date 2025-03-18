
const controlPanel = document.createElement('div');
controlPanel.id = 'recipe-control-panel';
controlPanel.style.display = 'flex';
controlPanel.style.flexDirection = 'column';
controlPanel.style.gap = '15px';
controlPanel.style.margin = '20px 0';
controlPanel.style.padding = '15px';
controlPanel.style.backgroundColor = '#f8f1e9';
controlPanel.style.borderRadius = '10px';
controlPanel.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';


const panelTitle = document.createElement('h3');
panelTitle.textContent = 'Recipe Interactive Controls';
panelTitle.style.margin = '0 0 10px 0';
panelTitle.style.textAlign = 'center';
panelTitle.style.color = '#5a3921';
controlPanel.appendChild(panelTitle);


const buttonContainer = document.createElement('div');
buttonContainer.style.display = 'flex';
buttonContainer.style.flexWrap = 'wrap';
buttonContainer.style.justifyContent = 'center';
buttonContainer.style.gap = '10px';
controlPanel.appendChild(buttonContainer);


const highlightButton = createButton(' Highlight Ingredients', 'highlight-btn');
const checkInstructionsButton = createButton(' Check Instructions', 'check-btn');
const resetInstructionsButton = createButton(' Reset Instructions', 'reset-btn');



buttonContainer.appendChild(highlightButton);
buttonContainer.appendChild(checkInstructionsButton);
buttonContainer.appendChild(resetInstructionsButton);


const cakeImage = document.getElementById('cake');
cakeImage.parentNode.insertBefore(controlPanel, cakeImage.nextSibling);


const progressContainer = document.createElement('div');
progressContainer.id = 'progress-indicator';
progressContainer.style.height = '8px';
progressContainer.style.backgroundColor = '#e9e9e9';
progressContainer.style.borderRadius = '4px';
progressContainer.style.margin = '10px 0';
progressContainer.style.overflow = 'hidden';
progressContainer.style.display = 'none';

const progressBar = document.createElement('div');
progressBar.style.height = '100%';
progressBar.style.width = '0%';
progressBar.style.backgroundColor = '#8B4513';
progressBar.style.borderRadius = '4px';
progressBar.style.transition = 'width 0.3s ease-in-out';
progressContainer.appendChild(progressBar);

controlPanel.appendChild(progressContainer);


const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes shimmer {
    0% { background-position: -100% 0; }
    100% { background-position: 200% 0; }
  }
  
  .ingredient-highlight {
    background: linear-gradient(90deg, transparent,rgb(202, 29, 52), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  
  .pop-in {
    animation: popIn 0.5s forwards;
  }
  
  @keyframes popIn {
    0% { transform: scale(0); opacity: 0; }
    80% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .checkmark-circle {
    position: absolute;
    left: -30px;
    top: -2px;
    width: 22px;
    height: 22px;
    background-color:rgb(165, 185, 48);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 14px;
  }
  
  .confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    opacity: 0;
  }
  
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
  }
  
  .recipe-heading-hover {
    position: relative;
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  
  .recipe-heading-hover:hover::after {
    content: '👆 Click me!';
    position: absolute;
    right: 0;
    top: -20px;
    font-size: 14px;
    color: #8B4513;
    opacity: 0.7;
  }
  
  .checked-item {
    position: relative;
    padding-left: 5px;
    transition: all 0.5s ease;
  }
  
  .checked-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    height: 2px;
    background-color:rgb(56, 41, 196);
    width: 0;
    transition: width 1s ease;
  }
  
  .checked-item.completed::before {
    width: 100%;
  }
`;
document.head.appendChild(styleSheet);


function createButton(text, id) {
  const button = document.createElement('button');
  button.textContent = text;
  button.id = id;
  button.style.padding = '10px 15px';
  button.style.backgroundColor = '#3F7D58';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';
  button.style.fontFamily = 'inherit';
  button.style.transition = 'all 0.3s ease';
  button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
  button.style.minWidth = '180px';
  
  
  button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = '#007074';
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = '#F6DC43';
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
  });
  
 
  button.addEventListener('mousedown', () => {
    button.style.transform = 'translateY(1px)';
    button.style.boxShadow = '0 1px 2px rgba(0,0,0,0.2)';
  });
  
  button.addEventListener('mouseup', () => {
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
  });
  
  return button;
}


highlightButton.addEventListener('click', () => {
  const ingredients = document.querySelectorAll('#recipe-ingredients li');
  
  
  ingredients.forEach(item => {
    item.className = '';
    item.style.fontWeight = '';
  });
  
  
  ingredients.forEach((item, index) => {
    if (index % 2 === 0) {
      setTimeout(() => {
        item.classList.add('ingredient-highlight');
        item.style.fontWeight = 'bold';
        
        
        item.classList.add('animate__animated', 'animate__bounceIn');
        setTimeout(() => {
          item.classList.remove('animate__animated', 'animate__bounceIn');
        }, 1000);
      }, index * 200);
    }
  });
});


checkInstructionsButton.addEventListener('click', () => {
  const instructions = document.querySelectorAll('#recipe-instructions li');
  let currentIndex = 0;
  const totalSteps = instructions.length;
  
 
  progressContainer.style.display = 'block';
  progressBar.style.width = '0%';
  
  
  instructions.forEach(item => {
    item.style.position = 'relative';
    removeCheckmark(item);
    item.classList.remove('checked-item', 'completed');
  });
  
 
  const interval = setInterval(() => {
    if (currentIndex < instructions.length) {
      const completion = ((currentIndex + 1) / totalSteps) * 100;
      progressBar.style.width = `${completion}%`;
      
      addCheckmark(instructions[currentIndex]);
      instructions[currentIndex].classList.add('checked-item');
      
      
      setTimeout(() => {
        instructions[currentIndex].classList.add('completed');
      }, 300);
      
      currentIndex++;
    } else {
      clearInterval(interval);
      
      
      setTimeout(() => {
        createConfetti();
        progressContainer.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => {
          progressContainer.classList.remove('animate__animated', 'animate__pulse');
        }, 1000);
      }, 500);
    }
  }, 3000);
});


resetInstructionsButton.addEventListener('click', () => {
  const instructions = document.querySelectorAll('#recipe-instructions li');
  progressBar.style.width = '0%';
  
  
  instructions.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('animate__animated', 'animate__fadeOut');
      
      setTimeout(() => {
        removeCheckmark(item);
        item.classList.remove('checked-item', 'completed', 'animate__animated', 'animate__fadeOut');
        item.classList.add('animate__animated', 'animate__fadeIn');
        
        setTimeout(() => {
          item.classList.remove('animate__animated', 'animate__fadeIn');
        }, 500);
      }, 300);
    }, index * 150);
  });
  
 
  setTimeout(() => {
    progressContainer.classList.add('animate__animated', 'animate__fadeOut');
    setTimeout(() => {
      progressContainer.style.display = 'none';
      progressContainer.classList.remove('animate__animated', 'animate__fadeOut');
    }, 500);
  }, instructions.length * 150 + 300);
});


surpriseButton.addEventListener('click', () => {
 
  cakeImage.classList.add('animate__animated', 'animate__wobble');
  
  
  for (let i = 0; i < 30; i++) {
    createSprinkle();
  }
  
  
  const title = document.getElementById('recipe-title');
  title.classList.add('animate__animated', 'animate__heartBeat');
  
 
  setTimeout(() => {
    cakeImage.classList.remove('animate__animated', 'animate__wobble');
    title.classList.remove('animate__animated', 'animate__heartBeat');
  }, 1200);
});


function addCheckmark(element) {
  
  if (element.querySelector('.checkmark-circle')) return;
  
  const checkmarkContainer = document.createElement('div');
  checkmarkContainer.className = 'checkmark-circle pop-in';
  
  const checkmark = document.createElement('span');
  checkmark.innerHTML = '✓';
  checkmarkContainer.appendChild(checkmark);
  
 
  element.style.position = 'relative';
  element.style.color = '#666';
  
  
  element.appendChild(checkmarkContainer);
}

function removeCheckmark(element) {
  const checkmark = element.querySelector('.checkmark-circle');
  if (checkmark) {
    element.removeChild(checkmark);
  }
  element.style.color = '';
}


function createConfetti() {
  const colors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = '100%';
    confetti.style.opacity = '1';
    document.body.appendChild(confetti);
    
    
    const duration = 1 + Math.random() * 2;
    const delay = Math.random() * 0.5;
    
    confetti.style.animation = `float ${duration}s ease-out ${delay}s forwards`;
    
  
    setTimeout(() => {
      document.body.removeChild(confetti);
    }, (duration + delay) * 1000);
  }
}


function createSprinkle() {
  const colors = ['#e27d5f', '#85cdca', '#e8a87c', '#c38d9e', '#41b3a3'];
  const sprinkle = document.createElement('div');
  sprinkle.style.position = 'absolute';
  sprinkle.style.width = `${3 + Math.random() * 5}px`;
  sprinkle.style.height = `${3 + Math.random() * 5}px`;
  sprinkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  sprinkle.style.borderRadius = '50%';
  
  
  const rect = cakeImage.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  sprinkle.style.left = `${rect.left + Math.random() * rect.width}px`;
  sprinkle.style.top = `${rect.top + scrollTop - 10}px`;
  document.body.appendChild(sprinkle);
  
 
  const animDuration = 1 + Math.random() * 2;
  sprinkle.style.transition = `all ${animDuration}s ease-out`;
  
  setTimeout(() => {
    sprinkle.style.top = `${rect.top + scrollTop + rect.height - 10}px`;
    sprinkle.style.opacity = '0';
  }, 10);
  
  
  setTimeout(() => {
    document.body.removeChild(sprinkle);
  }, animDuration * 1000);
}


const ingredientsHeader = document.querySelector('h2.headers:first-of-type');
if (ingredientsHeader) {
  ingredientsHeader.classList.add('recipe-heading-hover');
  ingredientsHeader.addEventListener('click', () => {
    ingredientsHeader.classList.remove('animate__animated', 'animate__flip');
    void ingredientsHeader.offsetWidth; 
    ingredientsHeader.classList.add('animate__animated', 'animate__flip');
    
   
    const ingredients = document.querySelectorAll('#recipe-ingredients li');
    ingredients.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate__animated', 'animate__fadeInLeft');
        setTimeout(() => {
          item.classList.remove('animate__animated', 'animate__fadeInLeft');
        }, 1000);
      }, index * 100);
    });
  });
}


const instructionsHeader = document.querySelector('h2.headers:nth-of-type(2)');
if (instructionsHeader) {
  instructionsHeader.classList.add('recipe-heading-hover');
  instructionsHeader.addEventListener('click', () => {
    instructionsHeader.classList.remove('animate__animated', 'animate__bounceIn');
    void instructionsHeader.offsetWidth; 
    instructionsHeader.classList.add('animate__animated', 'animate__bounceIn');
    
   
    const instructions = document.querySelectorAll('#recipe-instructions li');
    instructions.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate__animated', 'animate__fadeInRight');
        setTimeout(() => {
          item.classList.remove('animate__animated', 'animate__fadeInRight');
        }, 1000);
      }, index * 100);
    });
  });
}


if (cakeImage) {
  cakeImage.style.cursor = 'pointer';
  cakeImage.style.transition = 'transform 0.3s ease';
  
  cakeImage.addEventListener('mouseenter', () => {
    cakeImage.style.transform = 'scale(1.02)';
  });
  
  cakeImage.addEventListener('mouseleave', () => {
    cakeImage.style.transform = 'scale(1)';
  });
  
  cakeImage.addEventListener('click', () => {
    cakeImage.classList.remove('animate__animated', 'animate__pulse');
    void cakeImage.offsetWidth; 
    cakeImage.classList.add('animate__animated', 'animate__pulse');
    
    
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.5s ease';
    
    cakeImage.style.position = 'relative';
    cakeImage.appendChild(overlay);
    
    setTimeout(() => {
      overlay.style.opacity = '0.7';
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          cakeImage.removeChild(overlay);
        }, 500);
      }, 200);
    }, 10);
  });
}


function addTooltip(button, text) {
  const tooltip = document.createElement('div');
  tooltip.textContent = text;
  tooltip.style.position = 'absolute';
  tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  tooltip.style.color = 'white';
  tooltip.style.padding = '5px 10px';
  tooltip.style.borderRadius = '4px';
  tooltip.style.fontSize = '12px';
  tooltip.style.bottom = '100%';
  tooltip.style.left = '50%';
  tooltip.style.transform = 'translateX(-50%)';
  tooltip.style.marginBottom = '5px';
  tooltip.style.whiteSpace = 'nowrap';
  tooltip.style.zIndex = '1000';
  tooltip.style.opacity = '0';
  tooltip.style.transition = 'opacity 0.3s ease';
  tooltip.style.pointerEvents = 'none';
  
  button.style.position = 'relative';
  button.appendChild(tooltip);
  
  button.addEventListener('mouseenter', () => {
    tooltip.style.opacity = '1';
  });
  
  button.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
  });
}

addTooltip(highlightButton, 'Highlight every other ingredient with animation');
addTooltip(checkInstructionsButton, 'Mark instructions complete with 3-second intervals');
addTooltip(resetInstructionsButton, 'Clear all marks and reset animations');
addTooltip(surpriseButton, 'Add a special effect to the cake!');


document.querySelectorAll('.recipe-heading-hover').forEach(el => {
  el.style.position = 'relative';
});