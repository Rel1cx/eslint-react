"use client";

import type { PropsWithChildren } from "react";
import { cn } from "#/lib/cn";
import glsl from "dedent";
import { Mesh, Program, Renderer, Triangle, Vec2, Vec3 } from "ogl";
import { useEffect, useRef } from "react";

const vertex = glsl`
  #version 300 es

  precision highp float;

  in vec3 position;
  out vec2 vPos;

  void main(){
  	gl_Position=vec4(position,1.);
  	vPos=position.xy;
  }
`;

const fragment = glsl`
  #version 300 es

  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 color1;
  uniform float colorSpacing;
  uniform vec3 color4;
  uniform float displacement;
  uniform float zoom;
  uniform float spacing;
  uniform vec2 colorOffset;
  uniform vec2 transformPosition;
  uniform float noiseSize;
  uniform float noiseIntensity;

  in vec2 vPos;
  out vec4 outColor;

  // The MIT License
  // Copyright © 2017 Inigo Quilez
  // Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  // Computes the analytic derivatives of a 3D Gradient Noise. This can be used for example to compute normals to a
  // 3d rocks based on Gradient Noise without approximating the gradient by having to take central differences. More
  // info here: http://iquilezles.org/www/articles/gradientnoise/gradientnoise.htm

  // Value    Noise 2D, Derivatives: https://www.shadertoy.com/view/4dXBRH
  // Gradient Noise 2D, Derivatives: https://www.shadertoy.com/view/XdXBRH
  // Value    Noise 3D, Derivatives: https://www.shadertoy.com/view/XsXfRH
  // Gradient Noise 3D, Derivatives: https://www.shadertoy.com/view/4dffRH
  // Value    Noise 2D             : https://www.shadertoy.com/view/lsf3WH
  // Value    Noise 3D             : https://www.shadertoy.com/view/4sfGzS
  // Gradient Noise 2D             : https://www.shadertoy.com/view/XdXGW8
  // Gradient Noise 3D             : https://www.shadertoy.com/view/Xsl3Dl
  // Simplex  Noise 2D             : https://www.shadertoy.com/view/Msf3WH

  vec3 gradientDerivativesNoise3DHash(vec3 p){
  	p=fract(p*vec3(.1031,.1030,.0973));
  	p+=dot(p,p.yxz+33.3333);
  	return fract((p.xxy+p.yxx)*p.zyx);
  }

  // return value noise (in x) and its derivatives (in yzw)
  vec4 gradientDerivativesNoise3D(in vec3 x){
  	// grid
  	vec3 p=floor(x);
  	vec3 w=fract(x);

  	// quintic interpolant
  	vec3 u=w*w*w*(w*(w*6.-15.)+10.);
  	vec3 du=30.*w*w*(w*(w-2.)+1.);

  	// gradients
  	vec3 ga=gradientDerivativesNoise3DHash(p+vec3(0.,0.,0.));
  	vec3 gb=gradientDerivativesNoise3DHash(p+vec3(1.,0.,0.));
  	vec3 gc=gradientDerivativesNoise3DHash(p+vec3(0.,1.,0.));
  	vec3 gd=gradientDerivativesNoise3DHash(p+vec3(1.,1.,0.));
  	vec3 ge=gradientDerivativesNoise3DHash(p+vec3(0.,0.,1.));
  	vec3 gf=gradientDerivativesNoise3DHash(p+vec3(1.,0.,1.));
  	vec3 gg=gradientDerivativesNoise3DHash(p+vec3(0.,1.,1.));
  	vec3 gh=gradientDerivativesNoise3DHash(p+vec3(1.,1.,1.));

  	// projections
  	float va=dot(ga,w-vec3(0.,0.,0.));
  	float vb=dot(gb,w-vec3(1.,0.,0.));
  	float vc=dot(gc,w-vec3(0.,1.,0.));
  	float vd=dot(gd,w-vec3(1.,1.,0.));
  	float ve=dot(ge,w-vec3(0.,0.,1.));
  	float vf=dot(gf,w-vec3(1.,0.,1.));
  	float vg=dot(gg,w-vec3(0.,1.,1.));
  	float vh=dot(gh,w-vec3(1.,1.,1.));

  	// interpolations
  	return vec4(va+u.x*(vb-va)+u.y*(vc-va)+u.z*(ve-va)+u.x*u.y*(va-vb-vc+vd)+u.y*u.z*(va-vc-ve+vg)+u.z*u.x*(va-vb-ve+vf)+(-va+vb+vc-vd+ve-vf-vg+vh)*u.x*u.y*u.z,// value
  	ga+u.x*(gb-ga)+u.y*(gc-ga)+u.z*(ge-ga)+u.x*u.y*(ga-gb-gc+gd)+u.y*u.z*(ga-gc-ge+gg)+u.z*u.x*(ga-gb-ge+gf)+(-ga+gb+gc-gd+ge-gf-gg+gh)*u.x*u.y*u.z+// derivatives
  	du*(vec3(vb,vc,ve)-va+u.yzx*vec3(va-vb-vc+vd,va-vc-ve+vg,va-vb-ve+vf)+u.zxy*vec3(va-vb-ve+vf,va-vb-vc+vd,va-vc-ve+vg)+u.yzx*u.zxy*(-va+vb+vc-vd+ve-vf-vg+vh)));
  }

  float hash(vec2 p){
  	p=50.*fract(p*.3183099+vec2(.71,.113));
  	return-1.+2.*fract(p.x*p.y*(p.x+p.y));
  }

  float computeNoise(in vec2 p){
  	vec2 i=floor(p);
  	vec2 f=fract(p);

  	vec2 u=f*f*(3.-2.*f);

  	return mix(mix(hash(i+vec2(0.,0.)),
  	hash(i+vec2(1.,0.)),u.x),
  	mix(hash(i+vec2(0.,1.)),
  	hash(i+vec2(1.,1.)),u.x),u.y);
  }

  void main(){
  	vec2 pos=vPos;
  	pos.x*=min(1.,uResolution.x/uResolution.y);
  	pos.y*=min(1.,uResolution.y/uResolution.x);
  	pos/=zoom;
  	pos+=transformPosition;

  	vec2 noiseLocalPosition=pos*.5+.5;
  	vec3 displacementNoise=gradientDerivativesNoise3D(vec3(noiseLocalPosition,uTime*.1)).xyz;

  	pos+=displacementNoise.xz*displacement;

  	vec2 offsettedPosition=pos;
  	offsettedPosition-=colorOffset;
  	offsettedPosition=mod(offsettedPosition-spacing,vec2(spacing*2.))-spacing;

  	vec3 color=vec3(0.);
  	color=mix(color1,color,smoothstep(0.,1.,distance(offsettedPosition,vec2(0.,colorSpacing*1.5))));
  	color=mix(color4,color,smoothstep(0.,1.,distance(offsettedPosition,vec2(0.,-colorSpacing*1.5))));
  	float noise=computeNoise(vPos*uResolution/noiseSize);
  	color+=noise*noiseIntensity;
  	color=clamp(color,0.,1.);

  	outColor=vec4(color,.0125);
  }
`;

function createUniforms(width: number, height: number) {
  return {
    color1: {
      value: new Vec3(0.247, 0.341, 0.463),
    },
    color4: {
      value: new Vec3(0.4, 0.44, 0.54),
    },
    colorOffset: {
      value: new Vec2(-0.774, -0.206),
    },
    colorRotation: {
      value: -0.38,
    },
    colorSize: {
      value: 0.58,
    },
    colorSpacing: {
      value: 0.4,
    },
    colorSpread: {
      value: 4.52,
    },
    displacement: {
      value: 1.16,
    },
    noiseIntensity: {
      value: 0.08,
    },
    noiseSize: {
      value: 0.7,
    },
    spacing: {
      value: 4.27,
    },
    transformPosition: {
      value: new Vec2(-0.3, -0.439),
    },
    uResolution: {
      value: new Vec2(width, height),
    },
    uTime: {
      value: 0.8,
    },
    zoom: {
      value: 0.62,
    },
  };
}

function createRenderer(canvas: HTMLCanvasElement, width: number, height: number, dpr = 2) {
  return new Renderer({
    alpha: true,
    antialias: true,
    canvas,
    depth: false,
    dpr,
    height,
    powerPreference: "high-performance",
    premultipliedAlpha: true,
    webgl: 2,
    width,
  });
}

export type EffectLayerProps = PropsWithChildren<{
  className?: string;
}>;

export function EffectLayer({ children, className }: EffectLayerProps) {
  const rRaf = useRef<number>(null);
  const rRoot = useRef<HTMLDivElement>(null);
  const rCanvas = useRef<HTMLCanvasElement>(null);
  const isActive = useRef<boolean>(false);

  useEffect(() => {
    if (rRoot.current == null) return;
    if (rCanvas.current == null) return;

    const root = rRoot.current;
    const canvas = rCanvas.current;
    const rect = root.getBoundingClientRect();
    const uniforms = createUniforms(rect.width, rect.height);
    const renderer = createRenderer(canvas, rect.width, rect.height, window.devicePixelRatio);

    const { gl } = renderer;
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      fragment,
      transparent: true,
      uniforms,
      vertex,
    });
    const mesh = new Mesh(gl, { geometry, program });

    function update(time: number) {
      if (!isActive.current) return;
      uniforms.uTime.value = time * 0.001;
      renderer.dpr = window.devicePixelRatio;
      renderer.render({ scene: mesh });
      rRaf.current = requestAnimationFrame(update);
    }

    function resize(rect: DOMRect) {
      if (!isActive.current) return;
      uniforms.uResolution.value.set(rect.width, rect.height);
      renderer.setSize(rect.width, rect.height);
      renderer.render({ scene: mesh });
    }

    function handleResize() {
      resize(root.getBoundingClientRect());
    }

    const ro = new ResizeObserver(handleResize);

    ro.observe(root);
    rRaf.current = requestAnimationFrame(update);
    canvas.style.opacity = "1";
    isActive.current = true;

    return () => {
      isActive.current = false;
      canvas.style.opacity = "0";
      if (rRaf.current != null) cancelAnimationFrame(rRaf.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(styles.root, className)}
      ref={rRoot}
    >
      <canvas
        className={styles.canvas}
        ref={rCanvas}
      />
      {children}
    </div>
  );
}

const styles = {
  root: cn(
    "z-[0]",
    "absolute",
    "inset-[0]",
    "pointer-events-none",
  ),

  canvas: cn(
    "w-full",
    "h-full",
    "pointer-events-none",
    "opacity-0",
  ),
};
