'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function FilmRoll() {
    const containerRef = useRef(null);
    const reelRef = useRef(null);
    const stripRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.set(0, 0, 10);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        renderer.setSize(700, 700);
        
        if (containerRef.current) {
            containerRef.current.appendChild(renderer.domElement);
        }

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const reelGroup = new THREE.Group();
        const stripGroup = new THREE.Group();

        const reelGeometry = new THREE.CylinderGeometry(2, 2, 0.3, 32);
        const reelMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.5
        });
        const reel = new THREE.Mesh(reelGeometry, reelMaterial);
        reelGroup.position.set(-3, 3, 0);
        reel.rotation.x = Math.PI / 2;
        reelGroup.add(reel);

        const holeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 16);
        const holeMaterial = new THREE.MeshStandardMaterial({
            color: 0x000000,
            metalness: 0.1,
            roughness: 0.5
        });

        const centerHole = new THREE.Mesh(holeGeometry, holeMaterial);
        centerHole.rotation.x = Math.PI / 2;
        reelGroup.add(centerHole);


        const numHoles = 6;
        const holeDistance = 1.4;
        for (let i = 0; i < numHoles; i++) {
            const angle = (i / numHoles) * Math.PI * 2;
            const hole = new THREE.Mesh(holeGeometry, holeMaterial);
            hole.position.set(
                Math.cos(angle) * holeDistance,
                Math.sin(angle) * holeDistance,
                0
            );
            hole.rotation.x = Math.PI / 2;
            reelGroup.add(hole);
        }

        const stripLength = 40;
        const stripHeight = 1.2;
        const stripGeometry = new THREE.PlaneGeometry(stripHeight, stripLength, 1,100);
        const createFilmTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512; 
    canvas.height = 4096;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const frameHeight = 500;  
    const numFrames = Math.ceil(canvas.height / frameHeight);
    
    for (let i = 0; i < numFrames; i++) {

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, i * frameHeight, canvas.width, frameHeight);
        
        ctx.fillStyle = '#000000';
        const innerMargin = 20;
        ctx.fillRect(
            innerMargin, 
            i * frameHeight + innerMargin, 
            canvas.width - (innerMargin * 2), 
            frameHeight - (innerMargin * 2)
        );
        
        ctx.fillStyle = '#FFFFFF';
        const holeWidth = 20;
        const holeHeight = 30;
        

        ctx.fillRect(5, i * frameHeight + 60, holeWidth, holeHeight);
        ctx.fillRect(5, i * frameHeight + frameHeight - 60, holeWidth, holeHeight);
        
        ctx.fillRect(
            canvas.width - holeWidth - 5, 
            i * frameHeight + 30, 
            holeWidth, 
            holeHeight
        );
        ctx.fillRect(
            canvas.width - holeWidth - 5, 
            i * frameHeight + frameHeight - 60, 
            holeWidth, 
            holeHeight
        );
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 8);
    
    return texture;
};
        const stripMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            side: THREE.DoubleSide,
            metalness: 0.1,
            roughness: 0.5,
            map: createFilmTexture()
        });
        const strip = new THREE.Mesh(stripGeometry, stripMaterial);
        strip.position.set(-3, -stripLength/2 + 2, 0.2);

        const createPerforation = (x, y) => {
            const holeGeo = new THREE.CircleGeometry(0.04, 12);
            const holeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const hole = new THREE.Mesh(holeGeo, holeMat);
            hole.position.set(x, y, 0.01);
            return hole;
        };

       for (let i = 0; i < Math.floor(stripLength / 0.4); i++) {
            strip.add(createPerforation(stripHeight/2 - 0.1, -i * 0.4));  
            strip.add(createPerforation(-stripHeight/2 + 0.1, -i * 0.4));
        }

        strip.userData.initialPositions = Array.from(stripGeometry.attributes.position.array);
        stripGroup.add(strip);
        

        scene.add(reelGroup);
        scene.add(stripGroup);
        reelRef.current = reelGroup;
        stripRef.current = strip;

        let time = 0;
        let offset = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.02;
            offset += 0.01
            if (reelRef.current) {
                reelRef.current.rotation.z += 0.02; 
            }

            if (stripRef.current) {
                const positions = stripRef.current.geometry.attributes.position;
                const initialPositions = stripRef.current.userData.initialPositions;

                for (let i = 0; i < positions.count; i++) {
                    const y = initialPositions[i * 3 + 1];
                    const wave1 = Math.sin(y * 0.3 + time) * 0.2;
                    const wave2 = Math.cos(y * 0.2 + time * 0.7) * 0.15;
                    const wave3 = Math.sin(y * 0.1 + time * 0.5) * 0.1;
                    const falloff = Math.pow(Math.abs(y) / stripLength, 0.8);
                    
                    positions.setX(i, initialPositions[i * 3] + (wave1 + wave3) * falloff);
                    // positions.setZ(i, initialPositions[i * 3 + 2] + wave2 * falloff);
                }
                stripRef.current.material.map.offset.y = offset;
                positions.needsUpdate = true;
            }

            renderer.render(scene, camera);
        }
        animate();

        return () => {
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }

            renderer.dispose();
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="w-[500px] h-[500px] flex items-center justify-center"
        />
    );
}

export default FilmRoll;