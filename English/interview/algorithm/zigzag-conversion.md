Zig zag conversion

first create a empty two-dimensional array
second create direction, include two properties, x and y

if the numRows is less than and equal to 1, return s, it is a edge case

after that create a loop, and when the ary vect.x is undefined, you must change the direction use the function called switcher
and if ary vect.x is defined, put the char from this string, at the ary vect.x vect.y
after that vect.x and vect.y plus the direction, enter another round of loop

declare a function called switcher, it's mainly used to switch the direction when the ary vect.x member is empty or undefined,
first you need get the current direction, and judge the direction is down or right up, and then vect.x and vect.y minus the current direction, to backspace, after that change the current direction to the other direction, after that, plus the direction to the vect.x and vect.y, to process the next step

until the loop end, return the ary.reduce, first input a function, have two parameter, result and row, this function return result plus row join space
second input a empty string, it will be input in the first function as a parameter
