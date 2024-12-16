Dayana Gonzalez Cruz & Yulissa Valencia CST-310: Graphics Project 10: Advanced Shaders Part 2
December 16th, 2024 
TR1100A Prof. Citro

Running the Project in Linux Terminal

Ensure you have a Linux terminal instance open (e.g., WSL, Ubuntu).

Verify the Project File is in the Current Directory

Use the ls command to list files in the current directory:
    ls
Check that your project file (main.cpp) is listed in the output. If it’s not, navigate to the correct directory or move the file into the current directory.
Compile

Use the following command to compile the project:
```
        ```g++ -o Project10 main.cpp -lGL -lGLU -lglut -lGLEW -lglfw -lSOIL -lassimp
```
Run the Simulation

Execute the compiled file to launch:
```
    ./Project10
```
A window should pop up displaying the simulation.

Interact with the Simulation

Use arrows to move up, down, left, and right
Use Shift & Ctrl to zoom and rotate with arrow keys instead
Exit the Simulation

Use Ctrl + C in the terminal to close the program if needed.
