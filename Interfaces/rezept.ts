interface Rezept {
    _id?: string;
    titel: string; 
    imageUrl: string; 
    zutatenliste: Zutat[];
    schritte: string[];
    author: string;
    likedBy?: string[];
}