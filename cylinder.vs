#version 330 core
#extension GL_ARB_separate_shader_objects : enable

layout (location = 0) in vec3 aPos;       // Vertex position
layout (location = 1) in vec3 aNormal;     // Vertex normal
layout (location = 2) in vec2 aTexCoord;   // Texture coordinates (UV)

out vec3 FragPos;                          // Output fragment position
out vec3 Normal;                           // Output normal
out vec2 TexCoord;                         // Output texture coordinates
out mat3 TBN;                              // Output TBN matrix

uniform mat4 model;                        // Model matrix
uniform mat4 view;                         // View matrix
uniform mat4 projection;                   // Projection matrix

void main()
{
    // Transform vertex position to world space
    FragPos = vec3(model * vec4(aPos, 1.0));

    // Calculate tangent and bitangent
    vec3 tangent = normalize(vec3(model * vec4(aTexCoord.x, 0.0, 0.0, 0.0))); // Example tangent direction
    vec3 bitangent = normalize(cross(aNormal, tangent)); // Bitangent is perpendicular to both normal and tangent

    // Set the TBN matrix
    TBN = transpose(mat3(tangent, bitangent, aNormal));

    // Pass texture coordinates and normal
    TexCoord = aTexCoord;
    Normal = normalize(mat3(transpose(inverse(model))) * aNormal); // Transform normal to world space

    // Set final position
    gl_Position = projection * view * vec4(FragPos, 1.0);
}
