export class Customer {
    CustomerID: number | null;
    Name: string;
    Address: string;
    Email: string;

    constructor(CustomerID: number | null, Name: string, Address: string, Email: string) {
        this.CustomerID = CustomerID;
        this.Name = Name;
        this.Address = Address;
        this.Email = Email;
    }
}
