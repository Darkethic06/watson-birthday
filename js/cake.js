/* =========================================
   3D CAKE (Three.js)
========================================= */

import * as THREE from "three";

const canvas = document.getElementById("cakeCanvas");

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
camera.position.set(0.7, 3.6, 10);
camera.lookAt(0.7, 1.5, 0);


/* Lights */

scene.add(new THREE.HemisphereLight(0xfff4f8, 0xb35a78, 1.1));

const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
keyLight.position.set(4, 7, 5);
scene.add(keyLight);


/* Materials */

const plateMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.4, roughness: 0.25 });
const spongeMat = new THREE.MeshStandardMaterial({ color: 0xffb6c8, roughness: 0.6 });
const creamMat = new THREE.MeshStandardMaterial({ color: 0xfff6ee, roughness: 0.45 });
const chocoMat = new THREE.MeshStandardMaterial({ color: 0x7a3e2b, roughness: 0.35 });
const candleMat = new THREE.MeshStandardMaterial({ color: 0x8fd3ff, roughness: 0.4 });
const flameMat = new THREE.MeshBasicMaterial({ color: 0xffc547 });


/* Cake */

const cake = new THREE.Group();
scene.add(cake);

const plate = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 1.85, 0.15, 64), plateMat);
plate.position.y = 0.075;
cake.add(plate);

function addTier(radius, height, y) {

    const tier = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 64), spongeMat);
    tier.position.y = y + height / 2;
    cake.add(tier);

    /* Cream layer on top */
    const top = new THREE.Mesh(new THREE.CylinderGeometry(radius + 0.04, radius + 0.04, 0.14, 64), creamMat);
    top.position.y = y + height;
    cake.add(top);

    /* Chocolate drips around the edge */
    const drips = 22;
    for (let i = 0; i < drips; i++) {
        const angle = (i / drips) * Math.PI * 2;
        const length = 0.25 + Math.random() * 0.35;
        const drip = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, length, 4, 8), chocoMat);
        drip.position.set(
            Math.cos(angle) * (radius + 0.02),
            y + height - length / 2,
            Math.sin(angle) * (radius + 0.02)
        );
        cake.add(drip);
    }

    /* Cream dollops around the rim */
    const dollops = 14;
    for (let i = 0; i < dollops; i++) {
        const angle = (i / dollops) * Math.PI * 2 + 0.1;
        const dollop = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), creamMat);
        dollop.position.set(
            Math.cos(angle) * (radius - 0.2),
            y + height + 0.12,
            Math.sin(angle) * (radius - 0.2)
        );
        cake.add(dollop);
    }

    return y + height;
}

let topY = addTier(1.8, 1.0, 0.15);
topY = addTier(1.2, 0.85, topY + 0.05);


/* Sprinkles */

const sprinkleColors = [0xff5c8a, 0xffd447, 0x7be0ad, 0x8fb8ff, 0xffffff];
const sprinkleGeo = new THREE.CapsuleGeometry(0.025, 0.08, 2, 4);

for (let i = 0; i < 60; i++) {
    const r = Math.random() * 0.9;
    const a = Math.random() * Math.PI * 2;
    const sprinkle = new THREE.Mesh(
        sprinkleGeo,
        new THREE.MeshStandardMaterial({ color: sprinkleColors[i % sprinkleColors.length] })
    );
    sprinkle.position.set(Math.cos(a) * r, topY + 0.08, Math.sin(a) * r);
    sprinkle.rotation.set(Math.PI / 2, 0, Math.random() * Math.PI);
    cake.add(sprinkle);
}


/* Candles with flickering flames */

const flames = [];

[-0.5, 0, 0.5].forEach((x, i) => {
    const z = i === 1 ? -0.3 : 0.2;

    const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.6, 16), candleMat);
    candle.position.set(x, topY + 0.37, z);
    cake.add(candle);

    const flame = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), flameMat);
    flame.scale.y = 1.8;
    flame.position.set(x, topY + 0.8, z);
    cake.add(flame);

    const glow = new THREE.PointLight(0xffb347, 1.2, 2.5);
    glow.position.copy(flame.position);
    cake.add(glow);

    flames.push({ flame, glow, offset: i * 1.7 });
});


/* Steam puffs: the cake is still fresh out of the oven */

const steamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
const steam = [];

for (let i = 0; i < 10; i++) {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), steamMat.clone());
    puff.userData = {
        x: (Math.random() - 0.5) * 1.6,
        z: (Math.random() - 0.5) * 1.2,
        speed: 0.25 + Math.random() * 0.2,
        phase: Math.random()
    };
    scene.add(puff);
    steam.push(puff);
}


/* =========================================
   THE CHEF (decorating the cake)
========================================= */

const skinMat = new THREE.MeshStandardMaterial({ color: 0xf1c27d, roughness: 0.6 });
const coatMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
const pantsMat = new THREE.MeshStandardMaterial({ color: 0x3b3355, roughness: 0.6 });
const apronMat = new THREE.MeshStandardMaterial({ color: 0xff7fa3, roughness: 0.5 });
const darkMat = new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.5 });
const frostingMat = new THREE.MeshStandardMaterial({ color: 0xff8fb1, roughness: 0.4 });
const sweatMat = new THREE.MeshStandardMaterial({ color: 0x8fd8ff, roughness: 0.05, transparent: true, opacity: 0.9 });

const chef = new THREE.Group();
chef.position.set(2.55, 0, 0.45);
chef.rotation.y = -0.7; // three-quarter view, facing the cake
scene.add(chef);

/* Legs & shoes */
[-0.22, 0.22].forEach(x => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.9, 16), pantsMat);
    leg.position.set(x, 0.5, 0);
    chef.add(leg);

    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.14, 0.45), darkMat);
    shoe.position.set(x, 0.07, 0.08);
    chef.add(shoe);
});

/* Chef coat & apron */
const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 0.7, 8, 24), coatMat);
torso.position.y = 1.6;
chef.add(torso);

const apron = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.95, 0.06), apronMat);
apron.position.set(0, 1.3, 0.47);
chef.add(apron);

[-0.12, 0.12].forEach(x => {
    const button = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 10), darkMat);
    button.position.set(x, 2.0, 0.49);
    chef.add(button);
});

/* Head */
const headGroup = new THREE.Group();
headGroup.position.y = 2.75;
chef.add(headGroup);

const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 32), skinMat);
headGroup.add(head);

[-0.14, 0.14].forEach(x => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), darkMat);
    eye.position.set(x, 0.06, 0.39);
    headGroup.add(eye);
});

const smile = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.022, 8, 20, Math.PI), darkMat);
smile.rotation.z = Math.PI;
smile.position.set(0, -0.1, 0.39);
headGroup.add(smile);

/* Flour smudge on the cheek: not a professional, after all */
const flour = new THREE.Mesh(new THREE.CircleGeometry(0.07, 16), coatMat);
flour.position.set(0.22, -0.06, 0.355);
flour.rotation.y = 0.5;
headGroup.add(flour);

/* Chef hat */
const hatBand = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.3, 24), coatMat);
hatBand.position.y = 0.45;
headGroup.add(hatBand);

[[0, 0.78, 0], [-0.2, 0.7, 0.05], [0.2, 0.7, 0.05], [0, 0.7, -0.18], [0, 0.72, 0.18]].forEach(([x, y, z]) => {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 20), coatMat);
    puff.position.set(x, y, z);
    headGroup.add(puff);
});

/* Sweat drop */
const sweat = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), sweatMat);
sweat.scale.y = 1.4;
headGroup.add(sweat);

/* Arms */
function makeArm(x) {
    const shoulder = new THREE.Group();
    shoulder.position.set(x, 2.2, 0);
    chef.add(shoulder);

    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.7, 6, 12), coatMat);
    arm.position.y = -0.45;
    shoulder.add(arm);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), skinMat);
    hand.position.y = -0.95;
    shoulder.add(hand);

    return shoulder;
}

/* Right arm holds the piping bag, pointed at the cake */
const pipingArm = makeArm(-0.6);

const pipingBag = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.6, 20), new THREE.MeshStandardMaterial({ color: 0xfff1f6, roughness: 0.4 }));
pipingBag.rotation.x = Math.PI;
pipingBag.position.y = -1.3;
pipingArm.add(pipingBag);

const nozzle = new THREE.Object3D();
nozzle.position.y = -1.62;
pipingArm.add(nozzle);

/* Left arm rests, then wipes his forehead now and then */
const wipeArm = makeArm(0.6);


/* Frosting blobs squeezed out of the bag */

const frostingGeo = new THREE.SphereGeometry(0.09, 12, 12);
const falling = [];
const piped = [];
const maxPiped = 70;
let lastSqueeze = 0;

const cakeLevels = {
    plate: 0.17,
    bottom: 1.24,
    top: topY + 0.08
};

function squeeze() {
    const blob = new THREE.Mesh(frostingGeo, frostingMat);
    nozzle.getWorldPosition(blob.position);
    scene.add(blob);
    falling.push({ blob, speed: 0 });
}

function updateFrosting(dt) {
    for (let i = falling.length - 1; i >= 0; i--) {
        const drop = falling[i];
        drop.speed += 9 * dt;
        drop.blob.position.y -= drop.speed * dt;

        const { x, z } = drop.blob.position;
        const r = Math.hypot(x, z);
        const floor = (r <= 1.2 ? cakeLevels.top : r <= 1.8 ? cakeLevels.bottom : cakeLevels.plate) + cake.position.y;

        if (drop.blob.position.y <= floor) {
            /* Stick it to the cake so it turns with the turntable */
            drop.blob.position.y = floor;
            cake.attach(drop.blob);
            drop.blob.scale.set(1.3, 0.8, 1.3);
            piped.push(drop.blob);
            falling.splice(i, 1);

            if (piped.length > maxPiped) {
                cake.remove(piped.shift());
            }
        }
    }
}


/* Animate the chef */

function animateChef(t) {

    chef.position.y = Math.abs(Math.sin(t * 3)) * 0.03;

    /* Small circles while piping */
    pipingArm.rotation.x = -0.95 + Math.sin(t * 3) * 0.08;
    pipingArm.rotation.z = Math.sin(t * 2) * 0.1;

    /* Wipe-the-sweat cycle */
    const cycle = t % 6;
    const wiping = cycle > 4.4 && cycle < 5.8;

    if (wiping) {
        const k = Math.min(1, (cycle - 4.4) / 0.3, (5.8 - cycle) / 0.3);
        wipeArm.rotation.x = -2.5 * k;
        wipeArm.rotation.z = (-0.55 + Math.sin(t * 14) * 0.15) * k;
    } else {
        wipeArm.rotation.x = 0.1;
        wipeArm.rotation.z = 0.15;
    }

    /* Sweat shows up before the wipe and slides down */
    const sweatPhase = (cycle - 2) / 2.4;
    sweat.visible = cycle > 2 && cycle < 4.4;
    sweat.position.set(0.3, 0.25 - sweatPhase * 0.3, 0.27);

    /* Looks down at his work, glances up while wiping */
    headGroup.rotation.x = wiping ? -0.1 : 0.25 + Math.sin(t * 1.5) * 0.04;
    headGroup.rotation.y = wiping ? 0.3 : -0.25;

    /* Keep squeezing (but not while wiping) */
    if (!wiping && t - lastSqueeze > 0.3) {
        lastSqueeze = t;
        squeeze();
    }
}


/* Resize to the canvas box */

function resize() {
    const { clientWidth, clientHeight } = canvas;
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener("resize", resize);
resize();


/* Animate */

const clock = new THREE.Clock();
let previousTime = 0;

function animate() {

    const t = clock.getElapsedTime();
    const dt = Math.min(t - previousTime, 0.05);
    previousTime = t;

    cake.rotation.y = t * 0.4;
    cake.position.y = Math.sin(t * 1.5) * 0.05;

    flames.forEach(({ flame, glow, offset }) => {
        const flicker = 1 + Math.sin(t * 18 + offset) * 0.12 + Math.sin(t * 31 + offset) * 0.08;
        flame.scale.set(1, 1.8 * flicker, 1);
        glow.intensity = 1.2 * flicker;
    });

    steam.forEach(puff => {
        const { x, z, speed, phase } = puff.userData;
        const p = (t * speed + phase) % 1;
        puff.position.set(x + Math.sin(t + phase * 6) * 0.15, topY + 1 + p * 2.2, z);
        puff.scale.setScalar(0.6 + p * 1.4);
        puff.material.opacity = 0.45 * (1 - p);
    });

    animateChef(t);
    updateFrosting(dt);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
