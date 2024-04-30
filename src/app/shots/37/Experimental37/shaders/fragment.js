export default /*glsl */ `
precision highp float;

uniform sampler2D uTexture;

varying vec2 vPUv;
varying vec2 vUv;

void main() {
	vec4 color = vec4(0.0);
	vec2 uv = vUv;
	vec2 puv = vPUv;

	// pixel color
	vec4 colA = texture2D(uTexture, puv);

	// greyscale
	float grey = colA.r * 0.1 + colA.g * 0.1 + colA.b * 0.07;
	vec4 colB = vec4(grey, grey, grey, 1.0);
	// vec4 colB = vec4(0.0, 0.0, 0.0, 1.0);

	// circle
	float border = 0.3;
	float radius = 0.5;
	float dist = radius - distance(uv, vec2(0.5));
	float t = smoothstep(0.0, border, dist);


  float strength = 0.5 / (distance(vec2(uv.x, (uv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
strength *= 0.5 / (distance(vec2(uv.y, (uv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

	// final color
	color = colB;
	color.a = t;

	gl_FragColor = color;
}`;
