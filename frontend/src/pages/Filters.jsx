// Filters.jsx
const Filters = () => {
    
    return (
        <div>
            {/* Your filter elements go here */}
            <h4>Filter by</h4>
            {/* Example filter */}
            <div>
                <label htmlFor="stops">Stops</label>
                <select id="stops">
                    <option value="0">Non-stop</option>
                    <option value="1">1 stop</option>
                    <option value="2+">2+ stops</option>
                </select>
            </div>
            {/* Add more filters as needed */}
        </div>
    );
};

export default Filters;
