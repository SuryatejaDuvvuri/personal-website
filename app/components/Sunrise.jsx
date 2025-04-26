'use client';
import React, {useEffect, useRef} from 'react';
// import {Canvas} from '@react-three/fiber';
// import {OrbitControls} from '@react-three/drei';
import * as THREE from 'three';


function Sunrise()
{
    const ref = useRef(null);
    
    useEffect(() => {
        if(!ref.current)
        {
            return;
        }

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75, window.innerWidth/window.innerHeight,0.1,1000
        )

        camera.position.z = 5

        const render = new THREE.WebGLRenderer({canvas:ref.current, antialias:true});
        render.setSize(window.innerWidth,window.innerHeight);
        render.setPixelRatio(window.devicePixelRatio);

        const sunGeo = new THREE.SphereGeometry(1,32,32);
        const sunMat = new THREE.MeshStandardMaterial({color: 0xffa500, emissive: 0xff7700, 
            emissiveIntensity:1.25,roughness:0.3,metalness:0.3});
        const light = new THREE.PointLight(0xffaa00,1.5,100);
        
        const sun = new THREE.Mesh(sunGeo, sunMat);
        light.position.set(0,0,5);
        const ambient = new THREE.AmbientLight(0xffd6aa,0.6);
        const directional = new THREE.DirectionalLight(0xffcc88,1);
        directional.position.set(5,10,7);
        const vertBar = new THREE.BoxGeometry(0.05,2,0.01);
        const barMat = new THREE.MeshStandardMaterial({color:0x222222});
        const vertOne = new THREE.Mesh(vertBar, barMat);
        const vertTwo = new THREE.Mesh(vertBar, barMat);
        const horizBar = new THREE.BoxGeometry(1.1,0.05,0.01);
        const horiz = new THREE.Mesh(horizBar,barMat);
        vertOne.position.set(-0.5,0,0.5);
        vertTwo.position.set(0.5,0,0.5);
        horiz.position.set(0,0,0.5);
        scene.add(ambient,directional);
        scene.add(sun);
        scene.add(light);
        // scene.add(vertOne,vertTwo,horiz)
        scene.background = new THREE.Color(0xFDB99B);

        const animate = () => {
            requestAnimationFrame(animate);
            sun.rotation.y += 0.001
            render.render(scene,camera)
        }
        animate();

        const handleSize = () => {
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            render.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize',handleSize);

        return () => {
            window.removeEventListener('resize',handleSize);
            render.dispose();
        };

    }, []);

    return (
       <canvas ref = {ref} className = "fixed inset-0 -z-10" />
    )
}

export default Sunrise;