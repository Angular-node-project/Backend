const customerModel = require('../models/customer.model');
const OrderModel = require('../models/order.model');
const CategoriesModel = require('../models/category.model');
const SellerModel = require('../models/seller.model');


const CustomersCounts = async () => {
    try {
        const result = await customerModel.aggregate([
            // Match only documents where gender is defined (to exclude null or undefined values)
            { $match: { gender: { $exists: true, $ne: null } } },
            // Group by gender and count the number of occurrences
            {
                $group: {
                    _id: '$gender', // Group by the 'gender' field
                    count: { $sum: 1 } // Count the number of documents in each group
                }
            },
            // Optionally, project the output to make it more readable
            {
                $project: {
                    gender: '$_id', // Rename '_id' to 'gender'
                    count: 1,       // Include the 'count' field
                    _id: 0          // Exclude the default '_id' field
                }
            }
        ]);
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error counting genders:', error);
    }
}

const getRegistrationsPerWeek = async () => {
    try {
        // Step 1: Get registration data grouped by day of the week
        const registrationData = await customerModel.aggregate([
            {
                $project: {
                    createdAt: 1,
                    dayOfWeek: {
                        $add: [
                            { $dayOfWeek: "$createdAt" }, // Get day of the week (1 = Sunday, 7 = Saturday)
                            -1, // Shift Sunday (1) to Saturday (0), Monday (2) to Sunday (1), etc.
                            { $multiply: [{ $dayOfWeek: "$createdAt" }, 0] } // Ensure modulo works correctly
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: { $mod: ["$dayOfWeek", 7] }, // Map days to start from Saturday (0 = Saturday, 1 = Sunday, ..., 6 = Friday)
                    count: { $sum: 1 } // Count the number of registrations
                }
            },
            { $sort: { _id: 1 } }, // Sort by day of the week (Saturday → Friday)
            {
                $project: {
                    _id: 0,
                    day: { $toString: "$_id" }, // Convert day index to string
                    count: 1 // Include the count field
                }
            }
        ]);

        // Step 2: Map numeric day indices to day names (starting from Saturday)
        const daysOfWeek = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        const fullHistory = daysOfWeek.map((day, index) => ({
            day: day,
            count: registrationData.find(d => d.day === String(index))?.count || 0
        }));

        // Step 3: Format the output as "dayName count"
         const result = fullHistory.map(entry => `${entry.count}`);
        return result;
    } catch (error) {
        console.error('Error fetching daily registrations:', error);
        throw error;
    }
};

const getRegistrationMonth = async () => {
    try {
        // Get registration data aggregated by month (ignoring the year)
        const registrationData = await customerModel.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" }, // Group by month only
                    count: { $sum: 1 } // Count the number of registrations
                }
            },
            { $sort: { _id: 1 } }, // Sort by month in ascending order
            {
                $project: {
                    _id: 0,
                    month: { $toString: "$_id" }, // Convert month number to string
                    count: 1 // Include the count field
                }
            }
        ]);

        // Ensure all months (1-12) are included, even if there are no registrations
        const fullHistory = Array.from({ length: 12 }, (_, i) => ({
            month: String(i + 1).padStart(2, '0'), // Months as "01", "02", ..., "12"
            count: registrationData.find(d => d.month === String(i + 1))?.count || 0
        }));

        // Extract just the counts array
        const countsArray = fullHistory.map(entry => entry.count);
        return countsArray;
    } catch (error) {
        console.error('Error fetching monthly registrations:', error);
        throw error;
    }
}
//* Orders

const getOrdersByDayOfWeek = async ()=>{
    try {
        // Step 1: Aggregate orders grouped by day of the week (starting from Saturday)
        const orderData = await OrderModel.aggregate([
            {
                $project: {
                    createdAt: 1,
                    dayOfWeek: {
                        $add: [
                            { $dayOfWeek: "$createdAt" }, // Get day of the week (1 = Sunday, 7 = Saturday)
                            -1, // Shift Sunday (1) to Saturday (0), Monday (2) to Sunday (1), etc.
                            { $multiply: [{ $dayOfWeek: "$createdAt" }, 0] } // Ensure modulo works correctly
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: { $mod: ["$dayOfWeek", 7] }, // Map days to start from Saturday (0 = Saturday, 1 = Sunday, ..., 6 = Friday)
                    count: { $sum: 1 } // Count the number of orders
                }
            },
            { $sort: { _id: 1 } }, // Sort by day of the week (Saturday → Friday)
            {
                $project: {
                    _id: 0,
                    day: { $toString: "$_id" }, // Convert day index to string
                    count: 1 // Include the count field
                }
            }
        ]);

        // Step 2: Map numeric day indices to day names (starting from Saturday)
        const daysOfWeek = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        const fullHistory = daysOfWeek.map((day, index) => ({
            day: day,
            count: orderData.find(d => d.day === String(index))?.count || 0
        }));

        // Step 3: Format the output as "dayName count"
        const result = fullHistory.map(entry => `${entry.count}`);
        return result;
    } catch (error) {
        console.error('Error fetching daily order counts:', error);
        throw error;
    }
};

const getOrdersByMonth = async () => {
    try {
        // Step 1: Aggregate orders grouped by month (ignoring year)
        const orderData = await OrderModel.aggregate([
            {
                $project: {
                    createdAt: 1,
                    month: { $month: "$createdAt" } // Extract the month from the createdAt field
                }
            },
            {
                $group: {
                    _id: "$month", // Group by month (1 = January, 2 = February, ..., 12 = December)
                    count: { $sum: 1 } // Count the number of orders
                }
            },
            { $sort: { _id: 1 } }, // Sort by month in ascending order (January → December)
            {
                $project: {
                    _id: 0,
                    month: { $toString: "$_id" }, // Convert month number to string
                    count: 1 // Include the count field
                }
            }
        ]);

        // Step 2: Ensure all months (1-12) are included, even if there are no orders
        const fullHistory = Array.from({ length: 12 }, (_, i) => ({
            month: String(i + 1).padStart(2, '0'), // Months as "01", "02", ..., "12"
            count: orderData.find(d => d.month === String(i + 1))?.count || 0
        }));

        // Step 3: Format the output as "monthName count"
        const monthNames = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
        const result = fullHistory.map(entry => `${entry.count}`);
        return result;
    } catch (error) {
        console.error('Error fetching monthly order counts:', error);
        throw error;
    }
};

const getOrderCountsByStatus = async () => {
    try {
        // Step 1: Aggregate orders grouped by status
        const orderData = await OrderModel.aggregate([
            {
                $group: {
                    _id: "$status", // Group by the 'status' field
                    count: { $sum: 1 } // Count the number of orders for each status
                }
            },
            { $sort: { _id: 1 } }, // Sort by status in ascending order (alphabetical)
            {
                $project: {
                    _id: 0,
                    status: "$_id", // Rename '_id' to 'status'
                    count: 1 // Include the count field
                }
            }
        ]);

        // Step 2: Ensure all statuses are included, even if there are no orders
        const allStatuses = ['pending', 'processing', 'shipped', 'cancelled', 'delivered']; // Define all possible statuses
        const fullHistory = allStatuses.map(status => ({
            status: status,
            count: orderData.find(d => d.status === status)?.count || 0
        }));

        // Step 3: Format the output as "statusName count"
        const values = fullHistory.map(entry => entry.count); // Array of counts
        const labels = fullHistory.map(entry => entry.status); // Array of status names

        return { values, labels }; // Return both arrays
    } catch (error) {
        console.error('Error fetching order counts by status:', error);
        throw error;
    }
};

//* Sellers
const SellersCountsBystatus = async () => {
    try {
        const result = await SellerModel.aggregate([
            // Match only documents where status is defined (to exclude null or undefined values)
            { $match: { status: { $exists: true, $ne: null } } },
            // Group by status and count the number of occurrences
            {
                $group: {
                    _id: '$status', // Group by the 'status' field
                    count: { $sum: 1 } // Count the number of documents in each group
                }
            },
            // Optionally, project the output to make it more readable
            {
                $project: {
                    status: '$_id', // Rename '_id' to 'status'
                    count: 1,       // Include the 'count' field
                    _id: 0          // Exclude the default '_id' field
                }
            },
            // Sort the results by status (optional, for better readability)
            { $sort: { status: 1 } }
        ]);

        // Extract labels (statuses) and values (counts) into separate arrays
        const labels = result.map(item => item.status); // Array of statuses
        const values = result.map(item => item.count); // Array of counts

        return { labels, values }; // Return both arrays
    } catch (error) {
        console.error('Error counting statuses:', error);
        throw error;
    
}; 
}

const getSellerRegistrationMonth = async () => {
    try {
        // Get registration data aggregated by month (ignoring the year)
        const registrationData = await SellerModel.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" }, // Group by month only
                    count: { $sum: 1 } // Count the number of registrations
                }
            },
            { $sort: { _id: 1 } }, // Sort by month in ascending order
            {
                $project: {
                    _id: 0,
                    month: { $toString: "$_id" }, // Convert month number to string
                    count: 1 // Include the count field
                }
            }
        ]);
        // Ensure all months (1-12) are included, even if there are no registrations
        const fullHistory = Array.from({ length: 12 }, (_, i) => ({
            month: String(i + 1).padStart(2, '0'), // Months as "01", "02", ..., "12"
            count: registrationData.find(d => d.month === String(i + 1))?.count || 0
        }));
        // Extract just the counts array
        const countsArray = fullHistory.map(entry => entry.count);
        return countsArray;
    } catch (error) {
        console.error('Error fetching monthly seller registrations:', error);
        throw error;
    }
};


const getSellerRegistrationsPerWeek = async () => {
    try {
        // Step 1: Get registration data grouped by day of the week
        const registrationData = await SellerModel.aggregate([
            {
                $project: {
                    createdAt: 1,
                    dayOfWeek: {
                        $add: [
                            { $dayOfWeek: "$createdAt" }, // Get day of the week (1 = Sunday, 7 = Saturday)
                            -1, // Shift Sunday (1) to Saturday (0), Monday (2) to Sunday (1), etc.
                            { $multiply: [{ $dayOfWeek: "$createdAt" }, 0] } // Ensure modulo works correctly
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: { $mod: ["$dayOfWeek", 7] }, // Map days to start from Saturday (0 = Saturday, 1 = Sunday, ..., 6 = Friday)
                    count: { $sum: 1 } // Count the number of registrations
                }
            },
            { $sort: { _id: 1 } }, // Sort by day of the week (Saturday → Friday)
            {
                $project: {
                    _id: 0,
                    day: { $toString: "$_id" }, // Convert day index to string
                    count: 1 // Include the count field
                }
            }
        ]);
        // Step 2: Map numeric day indices to day names (starting from Saturday)
        const daysOfWeek = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        const fullHistory = daysOfWeek.map((day, index) => ({
            day: day,
            count: registrationData.find(d => d.day === String(index))?.count || 0
        }));
        // Step 3: Format the output as "dayName count"
        const result = fullHistory.map(entry => `${entry.count}`);
        return result;
    } catch (error) {
        console.error('Error fetching daily seller registrations:', error);
        throw error;
    }
};

module.exports = {
    //*Customers 
    CustomersCounts,
    getRegistrationsPerWeek,
    getRegistrationMonth,
    //* Orders
    getOrdersByDayOfWeek,
    getOrdersByMonth,
    getOrderCountsByStatus,
    //* Sellers
    SellersCountsBystatus,
    getSellerRegistrationsPerWeek,
    getSellerRegistrationMonth
    
}


/*




*/