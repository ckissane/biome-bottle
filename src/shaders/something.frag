precision mediump float;
varying vec2 v_uv;
uniform float time;
uniform float aspect;
void main () {
    vec3 p=vec3(v_uv*vec2(1.0,aspect).yx,1.0)*2.0;
    float m=1.0;
    for (int i=0;i<20;i++) {
        p=((abs(p)/dot((p),(p))-vec3(sin(time),cos(time),0.0)*0.5-0.5)*200.0)/200.0;
        //m=m/2.0;
    }
    gl_FragColor = vec4(floor((sin(p)*0.5+0.5)*3.0)/3.0,1.0);
}
