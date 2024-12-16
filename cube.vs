#version 330 core

layout (location = 0) in vec3 aPos; // Position
layout (location = 1) in vec3 aNormal; // Normal
layout (location = 2) in vec2 aTexCoords; // Texture coordinates

out vec2 TexCoords; // Texture coordinates to pass to the fragment shader
out vec3 FragPos; // Fragment position to pass to the fragment shader
out vec3 Normal; // Normal to pass to the fragment shader
out vec3 ViewDir; // View direction to pass to the fragment shader

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
    // Compute final vertex position
    gl_Position = projection * view * model * vec4(aPos, 1.0f);
    
    // Calculate world position of the fragment
    FragPos = vec3(model * vec4(aPos, 1.0));
    
    // Pass the normal to the fragment shader
    Normal = mat3(transpose(inverse(model))) * aNormal;
    
    // Pass the texture coordinates to the fragment shader
    TexCoords = aTexCoords;
    
    // Calculate the view direction
    ViewDir = normalize(view[3] - vec4(FragPos, 1.0f)).xyz;
}