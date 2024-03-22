import React from 'react';

const Filters = ({ 
    airlines, 
    selectedTimeOfDay, setSelectedTimeOfDay,
    selectedStops, setSelectedStops,
    selectedBudget, setSelectedBudget,
    selectedAirline, setSelectedAirline 
}) => {
    return (
        <div>
            <h4>Filter by</h4>
            {/* Time of Day Filter */}
            <div>
                <label htmlFor="time-of-day">Time of Day</label>
                <select id="time-of-day" value={selectedTimeOfDay} onChange={(e) => setSelectedTimeOfDay(e.target.value)}>
                    <option value="all">All Day</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                </select>
            </div>
            {/* Stops Filter */}
            <div>
                <label htmlFor="stops">Stops</label>
                <select id="stops" value={selectedStops} onChange={(e) => setSelectedStops(e.target.value)}>
                    <option value="all">Any</option>
                    <option value="0">Non-stop</option>
                    <option value="1">1 stop</option>
                    <option value="2+">2+ stops</option>
                </select>
            </div>
            {/* Budget Filter */}
            <div className="budget-filter">
                <label htmlFor="budget">Budget: ${selectedBudget}</label>
                <input
                    type="range"
                    id="budget"
                    name="budget"
                    min="0"
                    max="5000"
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                />
                <div className="budget-values">
                    <span>Min: $0</span>
                    <span>Selected: ${selectedBudget}</span>
                    <span>Max: $5000</span>
                </div>
            </div>
            {/* Airline Filter */}
            <div>
                <label htmlFor="airline">Airline</label>
                <select id="airline" value={selectedAirline} onChange={(e) => setSelectedAirline(e.target.value)}>
                    <option value="all">All Airlines</option>
                    {airlines.map(airline => (
                        <option key={airline} value={airline}>{airline}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filters;
