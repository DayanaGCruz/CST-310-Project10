#version 330 core

in vec3 FragPos;       // Position of the fragment in world space
in vec3 Normal;        // Normal vector in world space
in vec2 TexCoord;      // Texture coordinates passed from vertex shader
in mat3 TBN;           // Tangent, Bitangent, and Normal matrix passed from vertex shader

out vec4 FragColor;    // Output color

uniform sampler2D normalMap;   // Normal map texture
uniform sampler2D diffuseMap;    // Base texture (color texture)
uniform vec3 lightPos;         // Position of the light
uniform vec3 viewPos;          // Camera (view) position
uniform vec3 lightColor;       // Light color

void main()
{
    // Sample the normal map
    vec3 normal = texture(normalMap, TexCoord).rgb;
    normal = normalize(normal * 2.0 - 1.0);  // Convert normal from [0,1] to [-1,1]

    // Transform the normal from tangent space to world space using the TBN matrix
    normal = normalize(TBN * normal); 

    // Lighting calculations
    // Ambient lighting
    vec3 ambient = 0.1 * lightColor;

    // Diffuse lighting
    vec3 lightDir = normalize(lightPos - FragPos);
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    // Specular lighting
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);  // Specular exponent
    vec3 specular = spec * lightColor;

    // Combine results
    vec3 result = ambient + diffuse + specular;

    // Apply the final color from the base texture (diffuse color)
    vec4 baseColor = texture(diffuseMap, TexCoord);
    
    // Final color output
    FragColor = vec4(result, 1.0) * baseColor;  // Combine lighting with the base texture
}
