// Your code here.
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const cubes = document.querySelectorAll('.cube');
  
  // Set initial grid positions
  function initializePositions() {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const padding = 10;
    const gap = 10;
    const cubeWidth = (containerWidth - 4 * gap - 2 * padding) / 5;
    const cubeHeight = (containerHeight - 4 * gap - 2 * padding) / 5;
    
    cubes.forEach((cube, index) => {
      const row = Math.floor(index / 5);
      const col = index % 5;
      
      const x = padding + col * (cubeWidth + gap);
      const y = padding + row * (cubeHeight + gap);
      
      cube.style.width = `${cubeWidth}px`;
      cube.style.height = `${cubeHeight}px`;
      cube.style.left = `${x}px`;
      cube.style.top = `${y}px`;
    });
  }
  
  initializePositions();
  
  // Dragging functionality
  let draggedCube = null;
  let offsetX, offsetY;
  
  cubes.forEach(cube => {
    cube.addEventListener('mousedown', (e) => {
      e.preventDefault();
      
      draggedCube = cube;
      offsetX = e.clientX - cube.getBoundingClientRect().left;
      offsetY = e.clientY - cube.getBoundingClientRect().top;
      
      cube.style.zIndex = '1000';
      cube.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    });
  });
  
  document.addEventListener('mousemove', (e) => {
    if (draggedCube) {
      const containerRect = container.getBoundingClientRect();
      const cubeWidth = draggedCube.offsetWidth;
      const cubeHeight = draggedCube.offsetHeight;
      
      // Calculate new position with boundaries
      let newX = e.clientX - containerRect.left - offsetX;
      let newY = e.clientY - containerRect.top - offsetY;
      
      // Constrain within container
      newX = Math.max(0, Math.min(newX, containerRect.width - cubeWidth));
      newY = Math.max(0, Math.min(newY, containerRect.height - cubeHeight));
      
      draggedCube.style.left = `${newX}px`;
      draggedCube.style.top = `${newY}px`;
    }
  });
  
  document.addEventListener('mouseup', () => {
    if (draggedCube) {
      draggedCube.style.zIndex = '';
      draggedCube.style.boxShadow = '';
      draggedCube = null;
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', initializePos