'use client';
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
        camera.position.z = 5;
        const render = new THREE.WebGLRenderer({canvas:ref.current,antialias:true,alpha:true});
        render.setSize(window.innerWidth,window.innerHeight);
        render.setPixelRatio(window.devicePixelRatio);
        render.setClearAlpha(0);
        const screenGeo = new THREE.BoxGeometry(2,1.2,0.1);
        const screenMat = new THREE.MeshStandardMaterial({color: 0x333333});
        const screen = new THREE.Mesh(screenGeo,screenMat);
        scene.add(screen);

        const standGeo = new THREE.CylinderGeometry(0.1,0.1,0.5,32);
        const standMat = new THREE.MeshStandardMaterial({color: 0x555555});
        const stand = new THREE.Mesh(standGeo,standMat);
        stand.position.set(0,-0.9,0);
        scene.add(stand);

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
  