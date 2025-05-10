'use client';
import { frame } from 'framer-motion';
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
                color: 0xF5F3EF, metalness: 0.1, roughness: 0.9
            });

            const leftWallGeo = new THREE.PlaneGeometry(frameWidth*2, frameHeight*2);
            const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
            leftWall.position.set(-14, 0, -2);
            leftWall.rotation.y = Math.PI / 2;
            roomGroup.add(leftWall);

            const rightWallGeo = new THREE.PlaneGeometry(frameWidth*2, frameHeight*2);
            const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
            rightWall.position.set(14, 0, -2);
            rightWall.rotation.y = -Math.PI / 2;
            roomGroup.add(rightWall);

            // const ceilingGeo = new THREE.PlaneGeometry(18, 2);
            // const ceiling = new THREE.Mesh(ceilingGeo, wallMat);
            // ceiling.position.set(0, 7, -2);
            // ceiling.rotation.x = Math.PI / 2;
            // roomGroup.add(ceiling);     

            // const floorGeo = new THREE.PlaneGeometry(28, 20);
            // const floorMat = new THREE.MeshStandardMaterial({
            //     color: 0xD9C7B3, 
            //     roughness: 0.8,
            //     metalness: 0.2
            // });
            // const floor = new THREE.Mesh(floorGeo, floorMat);
            // floor.position.set(0, -7, -2);
            // floor.rotation.x = -Math.PI / 2;
            // roomGroup.add(floor);

            // const tableMat = new THREE.MeshStandardMaterial({
            //     color: 0x5c3f2a, 
            //     roughness: 0.7,
            //     metalness: 0.2
            // });
            
            // const tableTopGeo = new THREE.BoxGeometry(10, 0.5, 3);
            // const tableTop = new THREE.Mesh(tableTopGeo, tableMat);
            // tableTop.position.set(0, -5.5, -2.5);
            // roomGroup.add(tableTop);

            return roomGroup;
        }

        const skyGeo = new THREE.PlaneGeometry(33,24);
        const skyMat = new THREE.ShaderMaterial({
            uniforms: {
                topColor: {value: new THREE.Color(0x1A2A56)},
                middleColor: {value: new THREE.Color(0xE57B45)},
                bottomColor: {value: new THREE.Color(0xFFE36D)},
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
                varying vec2 vUv;
                
                void main() 
                {
                    vec3 color;
                    if (vUv.y > 0.6) {
                        float t = (vUv.y - 0.6) / 0.4;
                        color = mix(middleColor, topColor, t);
                    }
                    else {
                        float t = vUv.y / 0.6;
                        color = mix(bottomColor, middleColor, t);
                    }
                    gl_FragColor = vec4(color, 1.0);
                }
            `,
            side: THREE.DoubleSide,
            });
        const sky = new THREE.Mesh(skyGeo, skyMat);
        sky.position.set(0, 0, -10);
        scene.add(sky);

        const sunGeo = new THREE.CircleGeometry(3,64)
        const sunMat = new THREE.ShaderMaterial({
            uniforms: {
                color1: { value: new THREE.Color(0xFFCC00) },
                color2: { value: new THREE.Color(0xFF5500) },
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
                uniform vec3 color1;
                uniform vec3 color2;
                uniform float time;
                varying vec2 vUv;
                
                void main() {
                    float dist = distance(vUv, vec2(0.5, 0.5));
                    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
                    
                    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233) * time)) * 43758.5453);
                    glow += noise * 0.1;
                    
                    vec3 finalColor = mix(color2, color1, glow);
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
        });

        const sun = new THREE.Mesh(sunGeo, sunMat);
        sun.position.set(0, -2, -9.5);
        // sun.scale.set(0.8,0.8,1);
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
            const scaleX = (frameWidth - 1) / 40; 
            const scaleY = (frameHeight - 1) / 6; 
            shape.moveTo(points[0].x, points[0].y);
            for(let i = 1; i < points.length; i++)
            {
                shape.lineTo(points[i].x,points[i].y );
            }

            const mountainGeo = new THREE.ShapeGeometry(shape);
            const mountainMat = new THREE.MeshBasicMaterial({
                color: color, side: THREE.DoubleSide
            });

            const mountain = new THREE.Mesh(mountainGeo, mountainMat);
            mountain.position.set(0,-4,z);
            mountains.add(mountain);
        }

        addMountain([
            { x: -20, y: -5 },
            { x: -15, y: -2 },
            { x: -10, y: -3 },
            { x: -5, y: 0 },
            { x: 0, y: -1 },
            { x: 5, y: 1 },
            { x: 10, y: -2 },
            { x: 15, y: 0 },
            { x: 20, y: -5 }
        ], 0x2D3B56, -8.8);

        addMountain([
            { x: -20, y: -5 },
            { x: -12, y: -1 },
            { x: -8, y: -3 },
            { x: -3, y: 0 },
            { x: 5, y: -2 },
            { x: 9, y: -1 },
            { x: 15, y: -3 },
            { x: 20, y: -5 }
        ], 0x1E2B46, -8.5);
    
        addMountain([
            { x: -20, y: -5 },
            { x: -18, y: -1 },
            { x: -12, y: -4 },
            { x: -6, y: -1 },
            { x: -2, y: -3 },
            { x: 3, y: -2 },
            { x: 7, y: -4 },
            { x: 12, y: -1 },
            { x: 16, y: -3 },
            { x: 20, y: -5 }
        ], 0x0A1530, -8.2);

        scene.add(mountains);

      
        const windowGroup = new THREE.Group();
        const frameMat = new THREE.MeshPhysicalMaterial({
            color: 0x3D2314,
            metalness: 0.2,
            roughness: 0.7,
            clearcoat: 0.5,
            clearcoatRoughness: 0.1,
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
        // windowGroup.add(sill);
        scene.add(windowGroup);

        // const addRoom = room();
        // scene.add(addRoom);

        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
        const sunLight = new THREE.DirectionalLight(0xFFCC88, 1.5);
        sunLight.position.set(0, -3, 5);
        const roomLight = new THREE.PointLight(0xffebcd, 1, 20);
        roomLight.position.set(-5, 4, 2);
        
        scene.add(ambientLight, sunLight, roomLight);


        let time = 0;
        let complete = false;
        const speed = 0.002;
        const duration = Math.PI;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.003;
            if(sun.material.uniforms)
            {
                sun.material.uniforms.time.value = time;
            }

            if(!complete)
            {
                const progress = Math.min(time*speed,duration);
                const sunY = -6+11*Math.sin(progress);
                sun.position.y = sunY; 
                if(time >= duration)
                {
                    complete = true;
                }
                const normalizedProgress = progress/duration;
                sunLight.intensity = 0.5 + normalizedProgress;

                const color =  new THREE.Color().lerpColors(
                    new THREE.Color(0x8088ff), 
                    new THREE.Color(0xffcc88), 
                    normalizedProgress
                );
                sunLight.color.set(color);
                roomLight.intensity = 1 - normalizedProgress * 0.5;
            }
           
            clouds.children.forEach((cloud) => {
                cloud.position.x += Math.sin(time) * 0.001;
                cloud.position.y += Math.cos(time) * 0.001;
            });
            scene.position.y = Math.sin(time) * 0.05;
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
            window.removeEventListener('resize',handleSize);
            render.dispose();
        };

    }, []);

    return (
       <canvas ref = {ref} className = "fixed inset-0 -z-10" />
    )
}

export default Sunrise;