// 3D Map Initialisierung
function init3DMap() {
    const container = document.getElementById('3d-map-container');
    if (!container) return;

    // Basis Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Licht hinzufügen
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Grundfläche erstellen
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshStandardMaterial({
        color: 0x4682b4,
        roughness: 0.8,
        metalness: 0.2
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Villen als Würfel hinzufügen
    const villas = [
        { x: -3, z: -3, color: 0x00bfff, name: "Villa Azur" },
        { x: 0, z: -2, color: 0x4169e1, name: "Villa Saphir" },
        { x: 3, z: -3, color: 0xb9f2ff, name: "Villa Diamant" }
    ];

    villas.forEach(villa => {
        const geometry = new THREE.BoxGeometry(1, 0.5, 1);
        const material = new THREE.MeshStandardMaterial({ color: villa.color });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(villa.x, 0.25, villa.z);
        scene.add(cube);
    });

    // Kamera positionieren
    camera.position.set(0, 5, 5);
    camera.lookAt(0, 0, 0);

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // Responsive Handling
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Bildbereichsauswahl
function setupImageAreas() {
    const mainImages = document.querySelectorAll('.main-image img');

    mainImages.forEach(img => {
        img.addEventListener('click', (e) => {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;

            // Hier könnten Sie die Koordinaten verwenden, um verschiedene Bereiche anzuzeigen
            console.log(`Clicked at ${xPercent}%, ${yPercent}%`);
        });
    });
}

// Formular Handling
function setupContactForm() {
    const form = document.getElementById('property-contact');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.');
            form.reset();
        });
    }
}

// Hover3D Effekt
function setupHover3D() {
    const hoverElements = document.querySelectorAll('.hover3d');

    hoverElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            el.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        el.addEventListener('mouseenter', () => {
            el.style.transition = 'none';
            el.querySelector('img').style.transform = 'scale(1.1)';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transition = 'all 0.5s ease';
            el.style.transform = 'rotateY(0deg) rotateX(0deg)';
            el.querySelector('img').style.transform = 'scale(1)';
        });
    });
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    init3DMap();
    setupImageAreas();
    setupContactForm();
    setupHover3D();
});