'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

function FilmRoll() {
    const containerRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(300, 400);
        if (containerRef.current) {
            containerRef.current.appendChild(renderer.domElement);
        }

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const reelGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.5, 32);
        const reelMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xc0c0c0, 
            metalness: 0.5,  
            roughness: 0.5   
        });
        const reelMesh = new THREE.Mesh(reelGeometry, reelMaterial);

     
       
        const holePositions = [[0, 0]];      
        const numOuterHoles = 5;             
        const outerRadius = 0.55;
        for (let i = 0; i < numOuterHoles; i++) {
            const angle = (i / numOuterHoles) * Math.PI * 2;
            holePositions.push([
                Math.cos(angle) * outerRadius,
                Math.sin(angle) * outerRadius,
            ]);
        }

        
        let reelCSG = CSG.fromMesh(reelMesh);
        holePositions.forEach(([x, y]) => {
            const holeGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.7, 32);
            const holeMesh = new THREE.Mesh(holeGeometry);
            holeMesh.position.set(x, y, 0);
            const holeCSG = CSG.fromMesh(holeMesh);
            reelCSG = reelCSG.subtract(holeCSG);
        });
        const finalReel = CSG.toMesh(reelCSG, reelMesh.matrix, reelMesh.material);
        
        scene.add(finalReel);
        

        const stripGeometry = new THREE.BoxGeometry(2, 8, 0.01);
        const stripMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const strip = new THREE.Mesh(stripGeometry, stripMaterial);
        strip.position.y = -1;
        scene.add(strip);

        const frameMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        for (let i = -3.5; i <= 3.5; i += 1) {
            const points = [
                new THREE.Vector3(-1, i, 0.011),
                new THREE.Vector3(1, i, 0.011)
            ];
            const frameGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const frame = new THREE.Line(frameGeometry, frameMaterial);
            strip.add(frame);
        }
        finalReel.rotation.x = Math.PI / 2; 
       
        let speed = 0.01;

        function animate() {
            requestAnimationFrame(animate);

            finalReel.rotation.y += 0.01;

            strip.position.y -= speed;
            if (strip.position.y < -6) {
                strip.position.y = 2;
            }

            renderer.render(scene, camera);
        }
        animate();

        return () => {
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={containerRef} className="w-[300px] h-[400px]" />;
}

export default FilmRoll;