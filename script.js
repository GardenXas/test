const gameOutput = document.getElementById('game-output');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');

let player = {
    name: "Hero",
    health: 100,
    location: "forest",
    inventory: []
};

let gameData = {
    forest: {
        description: `You are in a dark forest. There are trees all around you.
        
        
        
         /\\
        /  \\
       /    \\
      /______\\
        
        `,
        options: [
            { text: "Go north", action: "go north" },
            { text: "Go east", action: "go east" },
            { text: "Go south", action: "go south" },
            { text: "Go west", action: "go west" }
        ]
    },
    north: {
        description: `You are at a clearing. You see a small cottage.
        
        
        
        /\\
       /  \\
      /____\\
     /      \\
    /________\\
        
        `,
        options: [
            { text: "Go back south", action: "go south" },
            { text: "Enter the cottage", action: "enter cottage" }
        ]
    },
    east: {
        description: `You are at the edge of the forest. You see a river.
        
        
        
        ~~~~~~~~~
        ~       ~
        ~~~~~~~~~
        
        `,
        options: [
            { text: "Go back west", action: "go west" }
        ]
    },
      south: {
        description: `You are at the edge of the forest. You see a path.
        
        
        
        |
        |
        |
        |
        |
        
        `,
        options: [
            { text: "Go back north", action: "go north" }
        ]
    },
    west: {
        description: `You are at the edge of the forest. You see a mountain.
        
        
        
       /\\
      /  \\
     /    \\
    /______\\
        
        `,
        options: [
            { text: "Go back east", action: "go east" }
        ]
    },
    cottage: {
        description: `You are inside a small cottage. There is a table with a key on it.
        
        
        
        ___
       |   |
       |   |
       |___|
        
        `,
        options: [
            { text: "Take the key", action: "take key" },
            { text: "Go back outside", action: "go outside" }
        ]
    }
};

function updateOutput(text) {
    gameOutput.textContent += text + "\n";
    gameOutput.scrollTop = gameOutput.scrollHeight;
}

function displayLocation() {
    const locationData = gameData[player.location];
    updateOutput(locationData.description);
    locationData.options.forEach((option, index) => {
        updateOutput(`${index + 1}. ${option.text}`);
    });
}

function processCommand(command) {
    const locationData = gameData[player.location];
    const optionIndex = parseInt(command) - 1;

    if (optionIndex >= 0 && optionIndex < locationData.options.length) {
        const selectedOption = locationData.options[optionIndex];
        const action = selectedOption.action;

        if (action === "go north") {
            player.location = "north";
        } else if (action === "go east") {
            player.location = "east";
        } else if (action === "go south") {
             player.location = "south";
        } else if (action === "go west") {
             player.location = "west";
        } else if (action === "enter cottage") {
            player.location = "cottage";
        } else if (action === "go outside") {
            player.location = "north";
        } else if (action === "take key") {
            player.inventory.push("key");
            updateOutput("You took the key.");
            gameData.cottage.options = [{ text: "Go back outside", action: "go outside" }];
        }
        displayLocation();
    } else {
        updateOutput("Invalid command.");
    }
}

submitButton.addEventListener('click', () => {
    const command = userInput.value.trim();
    userInput.value = "";
    if (command) {
        processCommand(command);
    }
});

updateOutput("Welcome to the ASCII RPG!");
displayLocation();