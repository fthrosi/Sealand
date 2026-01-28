export type PortfolioInput = {
    name: string;
    description: string;
    img_url: string;
    value: string;
}
export type PortfolioOutput = {
    id: number;
    name: string;
    description: string | null;
    img_url: string | null;
    value: string | null;
}