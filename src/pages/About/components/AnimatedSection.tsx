"use client"
import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useAppSelector } from "utils/redux/hooks";

export const AnimatedSection = () => {
  const [init, setInit] = useState(false);
  const themeMode = useAppSelector((state) => state.user.themeMode);
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, [themeMode]);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      id:"tsparticles",
      background: {
        color: {
          value: themeMode==="dark"?"#08012f":"#424fdb",
        },
        opacity:1
      },
      backgroundMask:{
        composite:"destination-out",
        cover:{
          color:{
            value:"#fff"
          },
          opacity:1,
        },
        enable: false,
      },
      fullScreen:{
        enable:false,
        zIndex:2,
      },
      clear:true,
      fpsLimit: 120,
      interactivity: {
        detectsOn:"window",
        modes: {
          trail:{
            delay:1,
            pauseOnStop: false,
            quality:1
          },
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          angle:{
            offset:0,
            value:0
          },
          attract:{
            distance:200,
            enable:false,
            rotate:{
              x:3000,
              y:3000
            }
          },
          center:{
            x:50,
            y:50,
            mode:"percent",
            radius:0,
          },
          gravity:{
            acceleration:9.81,
            enable:false,
            inverse:false,
            maxSpeed:50
          },
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 2,//6
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 8 },
        },
      },
      detectRetina: true,
    }),
    [themeMode],
  );

  if (init) {
    return (

      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{height:"300px", position:"absolute", top:"0px", left:"0px", right:"0px", bottom:"0px"}}
        className="tsparticles-style"
      />
    );
  }

  return <></>;
};
