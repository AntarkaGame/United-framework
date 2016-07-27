> V1.3 comming soon with a powerfull debug mode

# United framework v1.2

The United framework bring a structure to build your game on a safe and flexible foundation. We made it to be efficient and type safe. We are targeting a framework capable of controlling it's execution environment to be sure that all parts of the game is under control.

United-framework is a `high-level implementation for Superpowers components`. The goal is not changing the original superpowers behaviors (that can be the bigest mistake your made).

This framework is under development and we need your help to make new cool addons !

# Game made with the framework

[Echo of life](https://antarka.itch.io/echo-of-life)

# Wiki

Find the wiki on the "wiki" tabs. Or by clicking [!!here!!](https://github.com/fraxken/United-framework/wiki).

## Start guide

### Install the framework

Download `core.ts` and `addons.ts` and install them in a empty superpowers script. `core.ts` must be the **first file in the tree**. I strongly recommend to **put the framework at the top of your project** on a separated directory named "united".

### Configure the Engine class

First, make a script named "Globals" on your superpowers project and put it under the "united" directory.

Now register your main scenes into the engine :

```ts
// Variables accessible from GameScene scripts.
interface IGame {
    player?: Sup.Actor;
    map?: Sup.Actor;
    maxLife?: number;
    pause?: boolean;
}

const GameScene: United.Scene<IGame> = new United.Scene<IGame>({
    name: "game",
    asset: "Project/Scenes/Game",
    chunk: new United.Collections.Chunk<IGame>({
        maxLife: 4,
        pause: false
    })
});

// Catch load and die event!
GameScene.on("load",() => {
    Sup.log("Game scene is loaded !!!");
});
United.Engine.startupScene("game"); // Dont set a "default" scene on superpowers. Put this line!
```

Addons & Engine work with no help ! If you want to change the scene dont use Sup.loadScene but :

```ts
United.Engine.activeScene = "Menu";
```

Engine have to work on clearing inactive addons & inactive variables from the activeScene before switching to the new scene.

### Addons

Make your own addons for your game ! For an example look into the [documentation](https://github.com/fraxken/United-framework/wiki/Addons)

**Enjoy and dont forget to pull-request if you have a cool addon idea !**

# Roadmap (Core)

- Make a superpowers plugin that work with git.
- Complete the wiki.
- Work on collections.
- Work on appendScene (Major release).
- Add scanner as a native part of the engine.
- Add a log class (core). All official addons must have a log system installed!
- Work on a mapActor method for the Engine and the Scene chunk.
- Create an observe/mapping system for chunk with EventEmitter.
- Work on better addons reliability.
- Add workers support for multi-threading.
- Rework Scanner API (Better performance and flexibility).

# Roadmap plugins

- Add gamepad support to StackControls. (Review loading by purexo).
- Add more mouse inputs shortcuts, remap native KeyEvents, add fallback & new clean error throw for invalid key name.
- Add Astar addon.
- HUD complete set. (Inputs)
- Tilemap addon. (Complexe calcule on cell). Make Easy IA with Astar.
- 2DCamera addon (Smooth movement, cool and generic methods).
- Particules addon.
- Langage addon with integrated variables.
