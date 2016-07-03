# United framework

The united framework bring a background structure to build your game on a safe and flexible foundation. We build the framework code to be efficient and type safe. We are targeting a framework capable of controlling it's execution environment to be sure that all parts of the game is under control.

This framework is under development and we need your help to make new cool addons !

# Wiki

Find the wiki on the "wiki" section of this github.

## Start guide

Make a "global" script on your superpowers project (put it under the framework). And now register your main scenes into the engine :

```ts
United.Engine.addScene("menu","Projets/Scenes/menu");
United.Engine.addScene("game","Projets/Scenes/Jeu");
United.Engine.activeScene = "menu";
```

You are now ready to start :D ! Look into the wiki if you need more examples about core components (Engine,Addons,Behavior etc..)

# Roadmap

- Make a superpowers plugin that work with the github.
- Make a complete wiki!
- Better actors communications & events (with EventEmitter & engine chunks).
- Update collections (better performance, better methodes ...)
- Add immutables collections.
- Work on the engine. (Better team work between core addons).
- Add gamepad support to StackControls.
- Update shortcut (Better Mouse possibility).
- Rework Area (For interaction and collision).
