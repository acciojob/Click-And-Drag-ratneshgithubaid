document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const cubes = document.querySelectorAll('.cube');
    
    let currentCube = null;
    let offsetX = 0;
    let offsetY = 0;
    let startX = 0;
    let startY = 0;
    
    // Initialize cubes with their default grid positions
    cubes.forEach(cube => {
        const rect = cube.getBoundingClientRect();
        cube.dataset.defaultX = rect.left - container.getBoundingClientRect().left;
        cube.dataset.defaultY = rect.top - container.getBoundingClientRect().top;
    });
    
    // Mouse down event for cube selection
    cubes.forEach(cube => {
        cube.addEventListener('mousedown', function(e) {
            e.preventDefault();
            
            currentCube = this;
            currentCube.classList.add('dragging');
            
            // Calculate offset between mouse and cube position
            const rect = currentCube.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            
            // Store initial position for boundary checks
            startX = rect.left - container.getBoundingClientRect().left;
            startY = rect.top - container.getBoundingClientRect().top;
            
            // Make cube position absolute for dragging
            currentCube.style.position = 'absolute';
            currentCube.style.left = `${startX}px`;
            currentCube.style.top = `${startY}px`;
            currentCube.style.width = `${rect.width}px`;
            currentCube.style.height = `${rect.height}px`;
        });
    });
    
    // Mouse move event for dragging
    document.addEventListener('mousemove', function(e) {
        if (!currentCube) return;
        
        const containerRect = container.getBoundingClientRect();
        const cubeWidth = currentCube.offsetWidth;
        const cubeHeight = currentCube.offsetHeight;
        
        // Calculate new position
        let newX = e.clientX - containerRect.left - offsetX;
        let newY = e.clientY - containerRect.top - offsetY;
        
        // Apply boundary constraints
        newX = Math.max(0, Math.min(newX, containerRect.width - cubeWidth));
        newY = Math.max(0, Math.min(newY, containerRect.height - cubeHeight));
        
        // Update cube position
        currentCube.style.left = `${newX}px`;
        currentCube.style.top = `${newY}px`;
    });
    
    // Mouse up event to release cube
    document.addEventListener('mouseup', function() {
        if (!currentCube) return;
        
        currentCube.classList.remove('dragging');
        currentCube = null;
    });
    
    // Reset cubes to their initial positions (for testing)
    function resetCubes() {
        cubes.forEach(cube => {
            cube.style.position = 'relative';
            cube.style.left = 'auto';
            cube.style.top = 'auto';
            cube.style.width = 'auto';
            cube.style.height = 'auto';
        });
    }
    
    // Add reset button for testing
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset Cubes';
    resetBtn.style.position = 'fixed';
    resetBtn.style.top = '20px';
    resetBtn.style.right = '20px';
    resetBtn.style.padding = '10px 20px';
    resetBtn.addEventListener('click', resetCubes);
    document.body.appendChild(resetBtn);
});