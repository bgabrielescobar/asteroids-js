import GameConfiguration from "../../Configuration/GameConfiguration.js";

class ResourceManager {

    static loadBackgrounds()
    {
        for (let i = 0 ; i < Object.keys(GameConfiguration.resourcesPath.backgrounds).length ; i++) {
            GameConfiguration.resourcesPath.backgrounds[i].image = new Image();
            GameConfiguration.resourcesPath.backgrounds[i].image.src = GameConfiguration.resourcesPath.backgrounds[i].path;
        }
        this.changeBackground();
    }

    static changeBackground()
    {
        GameConfiguration.backgroundSelected = GameConfiguration.resourcesPath.backgrounds[Math.floor((Math.random() * 4))].image;
    }

    static loadAtlasSprite()
    {
        GameConfiguration.resourcesPath.atlasSprite[0].image = new Image();
        GameConfiguration.resourcesPath.atlasSprite[0].image.src = GameConfiguration.resourcesPath.atlasSprite[0].path;

    }

    static loadResources() {
        this.loadBackgrounds();
        this.loadAtlasSprite();
    }

}

export default ResourceManager;