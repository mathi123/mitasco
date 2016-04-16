export class Company {
    private _name: string;
    private _email: string;
    private _phone: string;
    private _fax: string;
    private _gsm: string;
    private _isCustomer: boolean;
    private _isSupplier: boolean;
    private _isCompetitor: boolean;
    private _vat: string;

    constructor() {

    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get phone(): string {
        return this._phone;
    }

    public set phone(value: string) {
        this._phone = value;
    }

    public get fax(): string {
        return this._fax;
    }

    public set fax(value: string) {
        this._fax = value;
    }

    public get gsm(): string {
        return this._gsm;
    }

    public set gsm(value: string) {
        this._gsm = value;
    }

    public get isCustomer(): boolean {
        return this._isCustomer;
    }

    public set isCustomer(value: boolean) {
        this._isCustomer = value;
    }

    public get isSupplier(): boolean {
        return this._isSupplier;
    }

    public set isSupplier(value: boolean) {
        this._isSupplier = value;
    }

    public get isCompetitor(): boolean {
        return this._isCompetitor;
    }

    public set isCompetitor(value: boolean) {
        this._isCompetitor = value;
    }

    public get vat(): string {
        return this._vat;
    }

    public set vat(value: string) {
        this._vat = value;
    }

    public validate(): boolean {
        if (this._name) {
            return this._name.length > 3;
        }
        else {
            return false;
        }
    }

    public toString(): string {
        let nummer: string = "";

        if (this._gsm) {
            nummer = ` (${this._gsm})`
        }
        else if (this._phone) {
            nummer = ` (${this._phone})`;
        }

        return this._name + nummer;
    }
}
