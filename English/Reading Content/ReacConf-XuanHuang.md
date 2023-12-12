What'up folks
I'm Xuan
I'm a soft engineer of meta
So today I want to talk about React memoization

Here I have yet another TodoList
You know as Javascript todoList
We just really really love todo list
So we enjoy the simplicity of the React code here
until we will open up the dev tools
and we realize whenever we add a todo
or talk about todo, all the added todo is
The badge here shows how many times is todo has been rerender
To fix this, what we usually do is to wrap the todo component in React memo
but don't forget the handleChange is recreated on every render
So we're better also wrap that in useCallback
now when we add todo or toggle todo
no other todoS are getting rerender
That's fixed
But this is going to be a moving target as the app scale up
so later we wanna build a event better todo-list
First we wanna pass down a visibility prop
so we can use it to call getFilter functions to filter our todoS
then, we need second prop, then the themeColor
so users can pick a color to theme their user interface
If we try this code out, it works
but the app feels pretty laxly and slow when we're picking color
And the reason is that, changing theme color will rerender the blazing todoList and todoList, which will eventually call getFilter function again and again
If we pay attention to the zoomed-in number here, is we execute it about 200 times
To fix this, we can wrap the getFilter call with useMemo

So now, if we run this code again, just by fixing this filter, the app feels much more snappy
So this is the user-experience we want
But speaking of developer experience, many of you may be like
"No, I really love react, but not this part"
We understand, the goal of React has always been making it easier to build great user experiences, not harder
But if we look at this code
It's a lot of extra code to write and it feels a bit noisy to read
But it's not just that it's a lot of mental overhead to have to think about all this data dependencies reference identities and worry about accidentally breaking the memorization
THe community have been thinking about what should be the best practice of React now
And it seems like we're reacing a dilemma,
where if we want to write React without some memo, then ux will be suffered especially the app scale up
Or if we want to deliver the best possible user experience then we as developers have to bit the bullet
So how can we fill this gap, the current thought has been that his ergonomics versus performance issue, is just so intrinsic to the mode of React, and doesn't look like we can optimize,
Maybe we should just humbly render in jsx, but we just really like expressivity of jsx,
Or maybe we should go back to class, or start with mutating stuff, so it's easier to track
What we think is there's something that has been missing here
Today I want to give you a snack pice of some research we've been doing
that we think could solve this problem for the future React
to talk about this
we need to rethink how we do memorization
let's take a step back and look at this code again, without all the memoization hook, at the end the day, the todo list is just a function that takes inputs from props and states, and generate outputs, such as UI and effects
And the need to create intermediate value such as filtered and handleChange to do that
To help with understanding, we can also visualize the dependency graph,
ideally we only want to re-execute this getFiltered function if todoList or visibility has changed, so is there any way that we can do it without memo
So here is where things get interesting, Imagining if we can have some kind of magical variables, that call tell us whether or not it's input changed, then maybe we can write this
Well, probably doesn't work
Then, what about his
But what should be put in the else branch here
So essentially, what useMemo does
is to give us the results from the pervious rerender that have been cached
so if we can also have some memoization cache, we can just write the same logic directly at here
we put the result into cache, after some computation, and data, we can read it back
TO replicate useCallback for the handleChange
we can just create it once in initial render
and then just reuse it for the rest of the time
At this moment, we've already reach parity, with the previous code using hook
But what else can we do here
Maybe we can cache this creation of JSX, such as addTodo components, and having to run this filtered.map, on every render can also be very expensive, so maybe we can move it up to here
because it shares the same lifetime with filtered
So they can be memorized together
and eventually, we can just wrap this entire block of code,

Rerender

React.memo

rerender useCallback

filter todoList

picking color

two hundred times

useMemo

much more snap

I love but not this part

braking the memo

DX vs UX

Humbly render

There is something missing here

How we do memo

Todo is a app

has filtered handleChange

using hook

map expensive

a take-way idea

a React compiler

not magic but science

a playground

yarn forget

Compile the

React Forget

An automatic compiler of React
it is a React labs feature
It is the same familiar React

It's all this same in the React

That make React react
