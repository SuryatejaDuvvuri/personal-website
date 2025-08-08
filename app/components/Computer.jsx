'use client';
import { time } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
function Computer() 
{
    const ref = useRef(null);

    useEffect(() => {
        if(!ref.current)
        {
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        camera.position.set(0, 0.8, 8);

        const monitor = new THREE.Group();
        scene.add(monitor);

        const render = new THREE.WebGLRenderer({canvas:ref.current,antialias:true,alpha:true});
        render.setSize(window.innerWidth,window.innerHeight);
        render.setPixelRatio(window.devicePixelRatio);
        render.setClearAlpha(0);

        const screenShape = new THREE.Shape();
        const width = 8;
        const height = 4.5;
        const radius = 0.15;

        screenShape.moveTo(-width/2 + radius, -height/2);
        screenShape.lineTo(width/2 - radius, -height/2);
        screenShape.quadraticCurveTo(width/2, -height/2, width/2, -height/2 + radius);
        screenShape.lineTo(width/2, height/2 - radius);
        screenShape.quadraticCurveTo(width/2, height/2, width/2 - radius, height/2);
        screenShape.lineTo(-width/2 + radius, height/2);
        screenShape.quadraticCurveTo(-width/2, height/2, -width/2, height/2 - radius);
        screenShape.lineTo(-width/2, -height/2 + radius);
        screenShape.quadraticCurveTo(-width/2, -height/2, -width/2 + radius, -height/2);

        const screenGeo = new THREE.ShapeGeometry(screenShape);
        const screenMat = new THREE.MeshStandardMaterial({color: 0x2e2e2e, metalness: 0.25, roughness: 0.45, clearcoat:0.1, emissive: 0x0a0a0a, emissiveIntensity: 0.1});
        const screen = new THREE.Mesh(screenGeo,screenMat);
        monitor.add(screen);
    
        const bezelShape = new THREE.Shape();
        const bezelWidth = 8.2;
        const bezelHeight = 4.7;
        const bezelRadius = 0.25;

        bezelShape.moveTo(-bezelWidth/2 + bezelRadius, -bezelHeight/2);
        bezelShape.lineTo(bezelWidth/2 - bezelRadius, -bezelHeight/2);
        bezelShape.quadraticCurveTo(bezelWidth/2, -bezelHeight/2, bezelWidth/2, -bezelHeight/2 + bezelRadius);
        bezelShape.lineTo(bezelWidth/2, bezelHeight/2 - bezelRadius);
        bezelShape.quadraticCurveTo(bezelWidth/2, bezelHeight/2, bezelWidth/2 - bezelRadius, bezelHeight/2);
        bezelShape.lineTo(-bezelWidth/2 + bezelRadius, bezelHeight/2);
        bezelShape.quadraticCurveTo(-bezelWidth/2, bezelHeight/2, -bezelWidth/2, bezelHeight/2 - bezelRadius);
        bezelShape.lineTo(-bezelWidth/2, -bezelHeight/2 + bezelRadius);
        bezelShape.quadraticCurveTo(-bezelWidth/2, -bezelHeight/2, -bezelWidth/2 + bezelRadius, -bezelHeight/2);

        const bezelGeo = new THREE.ShapeGeometry(bezelShape);
        const bezelMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.6 });
        const bezel = new THREE.Mesh(bezelGeo, bezelMat);
        // bezel.position.set(6.5, -1.92, -0.04);
        monitor.add(bezel);


        const standGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 32);
        const standMat = new THREE.MeshStandardMaterial({ color: 0x202020, roughness: 0.7 });
        const stand = new THREE.Mesh(standGeo, standMat);
        // stand.position.set(6.5, -4.85, 0);
        monitor.add(stand);
        
        const baseGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.08, 32);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x202020, roughness: 0.7 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        // base.position.set(6.5, -5.32, 0);
        monitor.add(base);

        screen.position.set(.25, 0, 0.02);
        screen.scale.set(1.495, 1.1, 1);
        // screen.scale.set(2,2,2);
        bezel.position.set(0.25, -0.05, -0.06);
        bezel.scale.set(1.5, 1.14,1.1);
        stand.position.set(0, -3.2, 0);
        stand.scale.set(1, 0.8, 1);
        base.position.set(0, -3.75, 0);
        base.rotation.x = 0;
        base.rotation.y = 0;
        monitor.rotation.y = 0;
        monitor.rotation.x = 0;
        monitor.position.set(0, -2.6, -2);

        const ambient = new THREE.AmbientLight(0xffffff,0.5);
        const directional = new THREE.DirectionalLight(0xffffff,1);
        directional.position.set(5,5,5);
        scene.add(ambient,directional);

        const animate = () => {
            requestAnimationFrame(animate);
            render.render(scene,camera);
        };
        animate();

        const resizeHandle = () => 
        {
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            render.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', resizeHandle);

        return () => {
            window.removeEventListener('resize',resizeHandle);
            render.dispose();
        }
    }, []);

    return <canvas ref = {ref} className = "w-full h-full" />;
}

export default Computer;