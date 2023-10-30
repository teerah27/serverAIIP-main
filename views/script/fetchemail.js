async function fetchUserEmailFromDatabase(userId) {
    try {
        const result = await pool.query('SELECT email FROM user_details WHERE id = $1', [userId]);
        if (result.rows.length > 0) {
            return result.rows[0].email;
        } else {
            return null; // User not found or email not available
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { fetchUserEmailFromDatabase };