# Mars Rover Project

## Welcome to the surface of Mars

This code will input a grid size, initial coordinates and movements for Mars Rovers

The program will find the position and direction the rovers will end in when movement's finished

## How the code works

Type `npm start` into the command line to begin the program.

You will be asked a set of questions about your set-up. These involve:

  - The size of the grid. Just type in two numbers such as `3 3`, `10 14` etc.

  - The initial position of the rover. Type in the coordinates and the direction it's facing such as `4 5 E`

  - Instructions to give to the rover. Type them in the form `MLR` where `M` is move, `L` is turn left and `R` is turn right.

You can have as many rovers as you'd like.

## Rules

  - One rover will make all of its instructions at a time. Rover 2 will not start moving until Rover 1 has finished.

  - If a rover is driving outside the grid, it will not move but will carry on with the other instructions is possible.

  - A rover cannot drive into the final position of a previous rover or into the initial position of a rover that hasn't moved.

  - A rover cannot start in the same place as a previous rover.

  - A rover cannot start outside the grid.

If any of the two previous rules are broken the program will return null.

## How to input a file

  - First run `npm i`

  - Then type `npm run-script fileInput /path/to/input.txt /path/to/output.txt`.

## Things to do in the future

  - Have different shapes other than rectangular plateaus

    - Use a hexagonal based grid as a plateau

    - Keep but the grid is restricted to a certain shape (i.e circles)

  - Insert obstacles in the plateau

  - Reverse the problem. Try inputting a goal destination and have the code output a set of instructions that avoids other rovers.

  - Use a config file to change the rules. For example rovers can fall off the plateau or crash into each other.
