#version 330 core
out vec4 FragColor; // Returns FragColor

in vec3 Normal; // Receives normal
in vec3 FragPos; // Receives FragPos

uniform vec3 lightPos; // Receives lightPos uniform
uniform vec3 viewPos; // Receives viewPos uniform
uniform vec3 lightColor; // Receives lightColor uniform
uniform vec3 sphereColor; // Receives sphereColor uniform
uniform samplerCube skybox; // Receives the cubemap sampler

void main() {
    // ambient
    float ambientStrength = 0.8; // Set ambient strength
    vec3 ambient = ambientStrength * lightColor; // Sets ambient

    // diffuse
    vec3 norm = normalize(Normal); // Normalizes normal
    vec3 lightDir = normalize(lightPos - FragPos); // Gets lightDir
    float diff = max(dot(norm, lightDir), 0.0); // Gets diff
    vec3 diffuse = diff * lightColor; // Sets diffuse

    // specular
    float specularStrength = 0.25f; // Sets specularStrength
    vec3 viewDir = normalize(viewPos - FragPos); // Get viewDir
    vec3 reflectDir = reflect(-lightDir, norm); // Get reflectDir
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 8); // Get spec
    vec3 specular = specularStrength * spec * lightColor; // Set specular

    // Environment mapping
    vec3 I = normalize(FragPos - viewPos); // Compute the incident view vector
    vec3 R = reflect(I, norm); // Reflect incident vector around the normal
    vec3 envColor = texture(skybox, R).rgb; // Sample the cubemap

    // Blend environment mapping with lighting
    vec3 result = (ambient + diffuse + specular) * sphereColor; // Calculate lighting result
    result = mix(result, envColor, 0.5); // Blend lighting with environment mapping (50% weight)

    FragColor = vec4(result, 1.0f); // Set FragColor output
}
