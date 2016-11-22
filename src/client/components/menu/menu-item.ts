export class MenuItem {
    public description: string;
    public link: string;
    public isRouterLink: boolean;
    public target: string;
    public href: string;

    public constructor(description: string, link: string, isRouterLink: boolean, target: string, href: string) {
        this.description = description;
        this.link = link;
        this.isRouterLink = isRouterLink;
        this.target = target;
        this.href = href;
    }
}