export type PortfolioInput = {
    name: string;
    description: string;
    image: File;
    value: string;
}
export type PortfolioOutput = {
    id: string;
    name: string;
    description: string;
    img_url: string;
    value: string;
}