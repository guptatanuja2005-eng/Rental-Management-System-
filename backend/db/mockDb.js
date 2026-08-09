const mockProducts = [
    {
        id: 1,
        name: "Dell Laptop",
        description: "Company laptop",
        category: "Electronics",
        price_per_day: 500,
        security_deposit: 5000,
        total_quantity: 5,
        available_quantity: 5,
        status: "available"
    },
    {
        id: 2,
        name: "Projector",
        description: "HD meeting room projector",
        category: "Electronics",
        price_per_day: 300,
        security_deposit: 3000,
        total_quantity: 3,
        available_quantity: 3,
        status: "available"
    },
    {
        id: 3,
        name: "DSLR Camera",
        description: "Company event camera",
        category: "Equipment",
        price_per_day: 700,
        security_deposit: 7000,
        total_quantity: 2,
        available_quantity: 2,
        status: "available"
    },
    {
        id: 4,
        name: 'City Bike 26"',
        description: "Lightweight city commuter bike.",
        category: "Cycles",
        price_per_day: 200,
        security_deposit: 2000,
        total_quantity: 6,
        available_quantity: 6,
        status: "available"
    }
];


const mockUsers = [
    {
        id: 1,
        name: "Admin",
        email: "admin@demo.com",
        role: "admin"
    },
    {
        id: 2,
        name: "Employee",
        email: "employee@demo.com",
        role: "employee"
    }
];


const mockRentals = [];


module.exports = {
    mockProducts,
    mockUsers,
    mockRentals
};