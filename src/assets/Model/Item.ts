export class Item {
    ItemID: number | null;
    Name: string;
    Quantity: number;
    Price: number;

    constructor(itemID: number | null, name: string, quantity: number, price: number) {
        this.ItemID = itemID;
        this.Name = name;
        this.Quantity = quantity;
        this.Price = price;
    }
}
