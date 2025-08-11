'use client';
import { frame, mix } from 'framer-motion';
import React, {useEffect, useRef} from 'react';
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
            75, window.innerWidth/window.innerHeight, 0.1, 1000
        );

        camera.position.z = 5;

        const render = new THREE.WebGLRenderer({canvas:ref.current, antialias:true, alpha:true});
        render.setSize(window.innerWidth,window.innerHeight);
        render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        const frameWidth = 18;
        const frameHeight = 12;
        const thickness = 0.4;
        const depth = 0.8;

        const room = () => {
            const roomGroup = new THREE.Group();
            const wallMat = new THREE.MeshStandardMaterial({
                color: 0xF5F3EF, metalness: 0.1, roughness: 0.9, transparent: true,
            });

            const leftWallGeo = new THREE.PlaneGeometry(frameWidth*2, frameHeight*2);
            const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
            leftWall.position.set(-16, 0, 2);
            leftWall.rotation.y = Math.PI / 2;
            roomGroup.add(leftWall);

            const rightWallGeo = new THREE.PlaneGeometry(frameWidth*2, frameHeight*2);
            const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
            rightWall.position.set(16, 0, 2);
            rightWall.rotation.y = -Math.PI / 2;
            roomGroup.add(rightWall);

            return roomGroup;
        }

        const skyGeo = new THREE.PlaneGeometry(44,50);
        const skyMat = new THREE.ShaderMaterial({
            uniforms: {
                topColor: {value: new THREE.Color(0x0A1530)},
                middleColor: {value: new THREE.Color(0x1A2A56)},
                bottomColor: {value: new THREE.Color(0x2D3B56)},
                mixRatio: {value: 0.0}
            },
            vertexShader: `
                varying vec2 vUv;
                void main() 
                {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 middleColor;
                uniform vec3 bottomColor;
                uniform float mixRatio;
                varying vec2 vUv;
                
                void main() 
                {

                    vec3 dawnTop = vec3(0.04, 0.08, 0.19);
                    vec3 dawnMiddle = vec3(0.10, 0.17, 0.34);
                    vec3 dawnBottom = vec3(0.18, 0.23, 0.34); 
                    
                    vec3 dayTop = vec3(0.29, 0.56, 0.89);
                    vec3 dayMiddle = vec3(0.90, 0.48, 0.27);
                    vec3 dayBottom = vec3(1.0, 0.89, 0.43);
                    
                    vec3 currentTop = mix(dawnTop, dayTop, mixRatio);
                    vec3 currentMiddle = mix(dawnMiddle, dayMiddle, mixRatio);
                    vec3 currentBottom = mix(dawnBottom, dayBottom, mixRatio);
                    vec3 color;
                    if (vUv.y > 0.6) {
                        float t = (vUv.y - 0.6) / 0.4;
                        color = mix(currentMiddle, currentTop, t);
                    }
                    else {
                        float t = vUv.y / 0.6;
                        color = mix(currentBottom, currentMiddle, t);
                    }
                    gl_FragColor = vec4(color, 1.0);
                }
            `,
            side: THREE.DoubleSide,
            });
        const sky = new THREE.Mesh(skyGeo, skyMat);
        sky.position.set(0, -5, -11);
        scene.add(sky);

        const sunGlowGeo = new THREE.CircleGeometry(3.5, 64);
        const sunGlowMat = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xFF6600) },
                time: { value: 0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                uniform float time;
                varying vec2 vUv;
                
                void main() {
                    float dist = distance(vUv, vec2(0.5, 0.5));
                    // Soft outer glow that fades to transparent
                    float alpha = smoothstep(0.5, 0.0, dist);
                    alpha *= 0.6; // Reduce overall opacity
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });
        
        const sunGlow = new THREE.Mesh(sunGlowGeo, sunGlowMat);
        sunGlow.position.set(0, -6, -9);
        scene.add(sunGlow);

        const sunGeo = new THREE.CircleGeometry(3,64)
        const sunMat = new THREE.ShaderMaterial({
            uniforms: {
                color1: { value: new THREE.Color(0xFF3300) },
                color2: { value: new THREE.Color(0xFF1100) },
                time: { value: 0 },
                mixRatio: { value: 0.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color1;
                uniform vec3 color2;
                uniform float time;
                uniform float mixRatio;
                varying vec2 vUv;
                
                void main() {

                    vec3 dawnColor1 = vec3(1.0, 0.2, 0.0);  
                    vec3 dawnColor2 = vec3(1.0, 0.07, 0.0);
                    
                    vec3 dayColor1 = vec3(1.0, 0.8, 0.0);
                    vec3 dayColor2 = vec3(1.0, 0.33, 0.0);
                    
                    vec3 currentColor1 = mix(dawnColor1, dayColor1, mixRatio);
                    vec3 currentColor2 = mix(dawnColor2, dayColor2, mixRatio);

                    float dist = distance(vUv, vec2(0.5, 0.5));
                    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
                    
                    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233) * time)) * 43758.5453);
                    glow += noise * 0.1;
                    
                    vec3 finalColor = mix(currentColor2, currentColor1, glow);
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const sun = new THREE.Mesh(sunGeo, sunMat);
        sun.position.set(0, -51, -11);
        scene.add(sun);
      

        const clouds = new THREE.Group();
        const addCloud = (x,y,scale) => {
            const cloudGeo = new THREE.PlaneGeometry(1, 1);
            const cloudMat = new THREE.MeshBasicMaterial({
                color: 0xFFFFFF, transparent: true, opacity: 0.8, side: THREE.DoubleSide,
            });
            const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
            cloudMesh.position.set(x,y,-8.5);
            cloudMesh.scale.set(scale,scale,1);
            clouds.add(cloudMesh);
        };

        addCloud(-5, 3, 2);
        addCloud(5, 4, 3);
        addCloud(-3, 5, 2.5);
        addCloud(6, 2, 1.5);
        addCloud(-7, 1, 2);

        scene.add(clouds);

        const mountains = new THREE.Group();
        const addMountain = (points,color,z) => {
            const shape = new THREE.Shape();
            shape.moveTo(points[0].x, points[0].y);
            for(let i = 1; i < points.length; i++)
            {
                shape.lineTo(points[i].x,points[i].y);
            }

            const mountainGeo = new THREE.ShapeGeometry(shape);
            const mountainMat = new THREE.MeshBasicMaterial({
                color: color, side: THREE.DoubleSide
            });

            const mountain = new THREE.Mesh(mountainGeo, mountainMat);
            mountain.position.set(0,-3,z);
            mountains.add(mountain);
        }
        addMountain([
        { x: -16, y: -6 },
        { x: -12, y: -3 },
        { x: -8, y: -4 },
        { x: -4, y: -1 },
        { x: 0, y: -2 },
        { x: 4, y: -1 },
        { x: 8, y: -4 },
        { x: 12, y: -3 },
        { x: 16, y: -6 }
        ], 0x2D3B56, -9.8);

        addMountain([
        { x: -16, y: -6 },
        { x: -14, y: -3 },
        { x: -10, y: -5 },
        { x: -6, y: -2 },
        { x: -2, y: -4 },
        { x: 2, y: -3 },
        { x: 6, y: -5 },
        { x: 10, y: -3 },
        { x: 14, y: -4 },
        { x: 16, y: -6 }
        ], 0x1E2B46, -9.8);

       addMountain([
            { x: -14, y: -6 },
            { x: -12, y: -3 },
            { x: -8, y: -5 },
            { x: -4, y: -2 },
            { x: -2, y: -4 },
            { x: 0, y: -3 },
            { x: 2, y: -5 },
            { x: 4, y: -2 },
            { x: 12, y: -4 },
            { x: 14, y: -6 }
        ], 0x0A1530, -9.8);

        scene.add(mountains);

      
        const windowGroup = new THREE.Group();
        const frameMat = new THREE.MeshPhysicalMaterial({
            color: 0x3D2314,
            metalness: 0.2,
            roughness: 0.7,
            clearcoat: 0.5,
            clearcoatRoughness: 0.1,
            transparent: true,
        });
        
        const leftVert = new THREE.Mesh(
            new THREE.BoxGeometry(thickness, frameHeight, depth),
            frameMat
        );
        const rightVert = new THREE.Mesh(
            new THREE.BoxGeometry(thickness, frameHeight, depth),
            frameMat
        );

        const topHorz = new THREE.Mesh(
            new THREE.BoxGeometry(frameWidth + thickness*2, thickness, depth),
            frameMat
        );
        const bottomHorz = new THREE.Mesh(
            new THREE.BoxGeometry(frameWidth + thickness*2, thickness, depth),
            frameMat
        );
        const midVert = new THREE.Mesh(
            new THREE.BoxGeometry(thickness, frameHeight, depth),
            frameMat
        );

        const midHoriz = new THREE.Mesh(
            new THREE.BoxGeometry(frameWidth, thickness, depth),
            frameMat
        );
        leftVert.position.set(-frameWidth/2-thickness/2,0,-4);
        rightVert.position.set(frameWidth/2+thickness/2,0,-4);
        topHorz.position.set(0,frameHeight/2+thickness/2,-4);
        bottomHorz.position.set(0,-frameHeight/2-thickness/2,-4);
        midVert.position.set(0,0,-4);
        midHoriz.position.set(0,0,-4);
        windowGroup.add(leftVert,rightVert,topHorz,bottomHorz,midVert,midHoriz);

        const sillGeo = new THREE.BoxGeometry(frameWidth + thickness*4,thickness*2,depth*2);
        const sillMat = new THREE.MeshPhysicalMaterial({
            color: 0x4D3324,
            metalness: 0.2,
            roughness: 0.7,
        });

        const sill = new THREE.Mesh(sillGeo,sillMat);
        sill.position.set(0,-frameHeight/2-thickness*1.5,-3.5);
        windowGroup.add(sill);
        scene.add(windowGroup);

        const addRoom = room();
        scene.add(addRoom);

        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
        const sunLight = new THREE.DirectionalLight(0xFFCC88, 1.5);
        sunLight.position.set(0, -3, 5);
        const roomLight = new THREE.PointLight(0xffebcd, 1, 20);
        roomLight.position.set(-5, 4, 2);
        
        scene.add(ambientLight, sunLight, roomLight);



        let targetZ = 5;
        let currentZ = 5;
        let scrollProgress = 0;
        const MAX_ZOOM = -5; 
        const ANIMATION_STOP_THRESHOLD = 0.5;

        const handleScroll = () => {
            scrollProgress = window.scrollY / document.documentElement.scrollHeight;
            targetZ = Math.max(5 - (scrollProgress * 15), MAX_ZOOM);

            const fadeOutProgress = Math.min(scrollProgress * 1.5, 1);
            windowGroup.children.forEach(child => {
            child.material.opacity = 1 - fadeOutProgress;
            child.material.transparent = true;
            });
            addRoom.children.forEach(child => {
            child.material.opacity = 1 - fadeOutProgress;
            child.material.transparent = true;
            });
            
            // const maxY = -5
            // camera.position.y = Math.min(scrollProgress*maxY,maxY)

            const maxZ = 4; 
            windowGroup.position.z = Math.min(scrollProgress * 8, maxZ);
            addRoom.position.z = Math.min(scrollProgress * 8, maxZ);


            scene.rotation.x = scrollProgress * 0.15;

            const scale = 1 + (scrollProgress * 0.2);
            windowGroup.scale.set(scale, scale, 1);
            addRoom.scale.set(scale, scale, 1);
        };
        window.addEventListener('scroll', handleScroll);
        let time = 0;
        let complete = false;
        const speed = 0.015;
        const duration = Math.PI;
        
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.016;

            currentZ += (targetZ - currentZ) * 0.05;
            camera.position.z = Math.max(currentZ, MAX_ZOOM);
           
            
            if(sun.material.uniforms)
            {
                sun.material.uniforms.time.value = time;
            }
            if(sunGlow.material.uniforms) 
            {
                sunGlow.material.uniforms.time.value = time;
            }

            if(!complete && scrollProgress < ANIMATION_STOP_THRESHOLD)
            {
                let lastProgress;
                if (!window.lastAnimationTime) 
                {
                    window.lastAnimationTime = time * speed;
                }
                if (scrollProgress < 0.1 && window.wasAboveThreshold) 
                {
                    complete = false;
                    window.wasAboveThreshold = false;
                }
                const progress = Math.min(time*speed,duration);
                const sunY = -25+25*Math.sin(progress);
                sun.position.y = sunY; 
                sunGlow.position.y = sunY;
                if(progress >= duration)
                {
                    complete = true;
                }
                else
                {
                    window.lastAnimationTime = time * speed;
                }
                const normalizedProgress = progress/duration;
                const easedProgress = Math.sin(normalizedProgress * Math.PI / 2);
                skyMat.uniforms.mixRatio.value = easedProgress * 2
                sunMat.uniforms.mixRatio.value = easedProgress * 2
                sunLight.intensity = 0.3 + normalizedProgress * 1.2;

                const color =  new THREE.Color().lerpColors(
                    new THREE.Color(0x4455FF), 
                    new THREE.Color(0xFFAA44), 
                    easedProgress
                );
                sunLight.color.set(color);
                roomLight.intensity = 1 - easedProgress * 0.5;
            }
            else if(scrollProgress >= ANIMATION_STOP_THRESHOLD)
            {
                window.wasAboveThreshold = true;
            }
           
            clouds.children.forEach((cloud) => {
                cloud.position.x += Math.sin(time) * 0.001;
                cloud.position.y += Math.cos(time) * 0.001;
            });
            scene.position.y = Math.sin(time * 0.5) * 0.02;
            render.render(scene,camera);
        }
        animate();

        const handleSize = () => {
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            render.setSize(window.innerWidth, window.innerHeight);
        };
       
        window.addEventListener('resize',handleSize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize',handleSize);
            render.dispose();
        };

    }, []);

    return (
       <canvas ref = {ref} className = "fixed inset-0 w-full h-full -z-10" />
    )
}

export default Sunrise;