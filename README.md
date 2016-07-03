# United framework

The united framework bring you a background structure to build your game correctly. We build the framework code to be efficient and type safe. We are targeting a framework capable of controlling it's execution environment to be sure that all parts of the game is under control.

This framework is under development and we need your help to make new cool addons and contribute to the core API.

# Wiki

Find the wiki on the "wiki" section of this github.

## Start guide

Make a "global" script on your superpowers project (put it under the framework). And now register your main scenes to the engine :

```ts
United.Engine.addScene("menu","Projets/Scenes/menu");
United.Engine.addScene("game","Projets/Scenes/Jeu");
United.Engine.activeScene = "menu";
```

This is the most important part of the framework. We want to know the structure schema of your game (here described by your main scenes). With the United framework each scene have their own variables environment & their own addons.

The second step is making your own global variables with the chunk collection :

```ts
interface IPlayer {
    name: string;
    exp: number;
    level: number;
}
const Player : United.Collections.Chunk<IPlayer> = new United.Collections.Chunk<IPlayer>({
    name: "fraxken",
    exp: 0,
    level: 0
});
Sup.log(Player.$.name); // log fraxken
Player.$.level = 10; // Set level to 10
Player.resetVar("level"); // Reset level to the original value : 0
Player.reset(); // Reset all variables of player chunk.
```

> Chunk is not a miracle "solution". You have to use properties of behavior in the most case. Chunk collection can be very usefull on a "level" oriented game like Spherunner.

Now it's done ! You have just to make your game with United addons & normal superpowers components.

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
