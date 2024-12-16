#version 330 core
out vec4 FragColor;

in vec2 TexCoords;  // Texture coordinates from the vertex shader
in vec3 FragPos;    // Fragment position in world space
in vec3 Normal;     // Normal from the vertex shader
in vec3 ViewDir;    // View direction from the vertex shader

uniform sampler2D diffuseMap; // Diffuse texture
uniform sampler2D normalMap;       // Normal map texture
uniform sampler2D heightMap;       // Height map texture (used for parallax mapping)

uniform vec3 lightPos;  // Light position in world space
uniform vec3 lightColor; // Light color

void main()
{
    // Retrieve normal and height values from the normal map and height map
    vec3 normal = texture(normalMap, TexCoords).rgb;
    normal = normalize(normal * 2.0 - 1.0);  // Convert normal from [0, 1] to [-1, 1]
    
    float height = texture(heightMap, TexCoords).r; // Get the height value from the height map

    // Apply parallax mapping to adjust texture coordinates
    vec2 p = TexCoords;
    vec2 parallaxOffset = (normal.xy * (height * 0.1)); // Adjust based on height map value
    p -= parallaxOffset;

    // Re-sample the diffuse texture using the adjusted coordinates
    vec4 diffuse = texture(diffuseMap, p);
    
    // Ambient lighting (just a simple constant value for now)
    vec3 ambient = 0.1 * lightColor;

    // Diffuse lighting
    vec3 lightDir = normalize(lightPos - FragPos);
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuseLighting = diff * lightColor;

    // Combine the final color
    vec3 finalColor = (ambient + diffuseLighting) * diffuse.rgb;

    FragColor = vec4(finalColor, 1.0f);  // Output the final color
}