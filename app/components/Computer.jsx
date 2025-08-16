'use client';
import { time } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
function Computer({zoomProgress = 0}) 
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

        // const computerGroup = new THREE.Group();
        // scene.add(computerGroup);

        const render = new THREE.WebGLRenderer({canvas:ref.current,antialias:true,alpha:true});
        render.setSize(window.innerWidth,window.innerHeight);
        render.setPixelRatio(window.devicePixelRatio);
        render.setClearAlpha(0);

        const computerGroup = new THREE.Group();
        scene.add(computerGroup);

        const screenShape = new THREE.Shape();
        const width = 7.5;
        const height = 3.0;
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
        computerGroup.add(screen);
    
        const bezelShape = new THREE.Shape();
        const bezelWidth = 7.8;
        const bezelHeight = 3.3;
        const bezelRadius = 0.15;

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
        computerGroup.add(bezel);


        const standGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 32);
        const standMat = new THREE.MeshStandardMaterial({ color: 0x202020, roughness: 0.7 });
        const stand = new THREE.Mesh(standGeo, standMat);
        // stand.position.set(6.5, -4.85, 0);
        computerGroup.add(stand);
        
        const baseGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.08, 32);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x202020, roughness: 0.7 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        // base.position.set(6.5, -5.32, 0);
        computerGroup.add(base);

        screen.position.set(.25, 0.05, 0.02);
        screen.scale.set(1.249*1.465, 1.649*1.05, 1);
        // screen.scale.set(2,2,2);
        bezel.position.set(0.25, 0.05, -0.06);
        bezel.scale.set(1.25*1.5, 1.65*1.14,1);
        stand.position.set(0, -3.5, 0);
        stand.scale.set(1, -0.75, 1);
        base.position.set(0, -3.85, 0);
        base.rotation.x = 0;
        base.rotation.y = 0;
        computerGroup.rotation.y = 0;
        computerGroup.rotation.x = 0;
        computerGroup.position.set(0, -2.6, -2);

        const ambient = new THREE.AmbientLight(0xffffff,0.5);
        const directional = new THREE.DirectionalLight(0xffffff,1);
        directional.position.set(5,5,5);
        scene.add(ambient,directional);
        computerGroup.add(screen);
        computerGroup.add(bezel);
        computerGroup.add(stand);
        computerGroup.add(base);

        const handleScroll = () => {
            const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            camera.position.z = 8 - 6 * scrollProgress;
        };
        window.addEventListener('scroll', handleScroll);

        const animate = () => 
        {
            requestAnimationFrame(animate);
            camera.position.z = 8 - (6 * Math.pow(zoomProgress, 1.5));
            camera.position.y = 0.8 + (0.7 * zoomProgress);
            camera.fov = 75 - (25 * zoomProgress);
            camera.updateProjectionMatrix();
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
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize',resizeHandle);
            render.dispose();
        }
    }, [zoomProgress]);

    return <canvas ref = {ref} className = "w-full h-full" />;
}

export default Computer;