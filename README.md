# Discord logger
It works on two accounts. main account and bot.
It logs only deleted messages, along with photos and files.
____ 
## Manual
- delete the commented lines in the code
- to use it, you need to install [node.js](https://nodejs.org) and write in console on directory ``` npm i ```
- add tokens, id  channel (where do you want to log) and id servers in config.example.json(all by comments in code file [index.js](https://github.com/akrisfx/Discord-self-logger/blob/main/index.js))
- write in console 
```
    node index.js 
``` 
or use "start.bat"(before use .bat file, enter the path to the folder where it is located "index.js") 
- you can add a shortcut to "start. bat" in windows startup (win + r and write ```shell:startup```)

### Limits
- Now, logger can't log more than one file in one message
- Logger can't log videofiles 