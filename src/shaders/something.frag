precision mediump float;
varying vec2 v_uv;
uniform float time;
uniform float aspect;
void main () {
    vec2 position=v_uv*vec2(aspect,1.0);
    vec3 RGBcolor=vec3(0.0);

    float WAVE_SPEED = 10.05;
    float WAVE_LENGTH = 0.2;
    float WAVE_AMPLITUDE = 0.05;

    // Floaing Object

    vec2 squareCenter = vec2(0.5,0.0);
    squareCenter.y = sin((squareCenter.x+time*WAVE_SPEED)/WAVE_LENGTH)*WAVE_AMPLITUDE;

    float angle=atan(-cos((squareCenter.x+time*WAVE_SPEED)/WAVE_LENGTH),2.0);
    float minSquareSize = 0.1;
    float squareSize = max(0.0*abs(sin(time*10.0)), minSquareSize);
    vec2 squareOffset=position-squareCenter;
    squareOffset=vec2(
        squareOffset.x*cos(angle)-squareOffset.y*sin(angle),
        squareOffset.x*sin(angle)+squareOffset.y*cos(angle)
    );
    if (
        squareOffset.x < squareSize&& squareOffset.x > -squareSize &&
        squareOffset.y < squareSize&& squareOffset.y > -squareSize
    ) {
        RGBcolor=vec3(1.0,0.0,0.0);
    }

    // Water
    if (
        position.y < sin((position.x+time*WAVE_SPEED)/WAVE_LENGTH)*WAVE_AMPLITUDE
    ) {
        RGBcolor+=vec3(0.0,0.0,1.0);
    }


    gl_FragColor = vec4(RGBcolor,1.0);
}
