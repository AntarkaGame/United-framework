# United framework

The united framework bring a structure to build your game on a safe and flexible foundation. We made it to be efficient and type safe. We are targeting a framework capable of controlling it's execution environment to be sure that all parts of the game is under control.

United-framework is a high-level implementation for Superpowers components. The goal is not changing the original superpowers behaviors (that can be the bigest mistake your made).

This framework is under development and we need your help to make new cool addons !

# Wiki

Find the wiki on the "wiki" tabs. Or by clicking [!!here!!](https://github.com/fraxken/United-framework/wiki).

## Start guide

### Install the framework

Download core.ts and addons.ts and install them in empty superpowers script. core.ts must be the first file in the tree. I strongly recommend to put the framework at the top of your project on a separated directory named "united".

### Configure the Engine class

Make a "global" script on your superpowers project and put it under the "united" directory.

Now register your main scenes into the engine :

```ts
United.Engine.activeScene = "menu"; // If you dont set activeScene, the activeScene is the first scene added to the Engine!
United.Engine.addScene("menu","Projets/Scenes/menu");
United.Engine.addScene("game","Projets/Scenes/Jeu");
```

> Note :  We are working on a united "startup" scene for soon... A lot of modification are coming for the next week-end.

Addons & Engine work with no help ! If you want to change the scene dont use Sup.loadScene but :

```ts
United.Engine.loadScene("game");
```

Engine have to work on clearing inactive addons & inactive variables from the activeScene before switching to the new scene.

### Addons

Make your own addons for your game ! For an example look into the [documentation](https://github.com/fraxken/United-framework/wiki/Addons)

**Enjoy and dont forget to pull-request if you have a cool addon idea !**

# Roadmap (Core)

- Make a superpowers plugin that work with the github.
- Make a complete wiki!
- Better actors communications & events (with EventEmitter & engine chunks).
- Update collections (better performance, better methodes ...)
- Add immutables collections.
- Work on the engine. (Better team work between core addons).
- Rework Area (For interaction and collision).
- Add a log class (core). All official addons must have a log system installed!
- Create an observe/mapping system for chunk with EventEmitter.

# Roadmap plugins

- Add gamepad support to StackControls.
- Add more mouse inputs shortcuts.
