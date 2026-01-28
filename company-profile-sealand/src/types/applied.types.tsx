export type AppliedOutput = {
    id: number;
    job_id: number;
    name: string;
    email: string;
    no_telp: string;
    cv: string;
    img_url: string;
    applied_at: string;
    job : {
        title: string;
        vessel_type: {
            name: string;
        };
        route: string;
    }
};