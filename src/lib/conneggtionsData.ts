export interface ConneggtionsGroup {
  category: string;
  words: string[];
  difficulty: 0 | 1 | 2 | 3;
}

export interface ConneggtionsPuzzle {
  groups: [ConneggtionsGroup, ConneggtionsGroup, ConneggtionsGroup, ConneggtionsGroup];
}

export const PUZZLE: ConneggtionsPuzzle = {
  groups: [
    {
      category: "Egg ____",
      words: ["NOG", "SHELL", "HEAD", "PLANT"],
      difficulty: 0,
    },
    {
      category: "Easter Symbols",
      words: ["BUNNY", "LAMB", "LILY", "CROSS"],
      difficulty: 1,
    },
    {
      category: "Animals That Hatch from Eggs",
      words: ["CHICK", "TURTLE", "ROBIN", "CRICKET"],
      difficulty: 2,
    },
    {
      category: "____ Basket",
      words: ["BREAD", "LAUNDRY", "EASTER", "PICNIC"],
      difficulty: 3,
    },
  ],
};
