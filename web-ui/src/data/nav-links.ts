export type NavLink = {
    id: string;
    name: string;
    link: string;
}

export const navLinks: NavLink[] = [
    {
        id: "be230b20-2e66-4661-a0d3-92f46a169668",
        name: "Home",
        link: "/"
    },
    {
        id: "fe61c02a-b7d6-4aa3-addc-11deb5053cba",
        name: "Camera",
        link: "/camera"
    },
    {
        id: "b2563bba-3ccf-454a-b705-011a6610ab75",
        name: "Number Plates",
        link: "/number-plate"
    }
] 