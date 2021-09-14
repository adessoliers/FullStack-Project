function buildMap(stateUrl,yearMap){ 
    d3.json(stateUrl).then(function(states) {
        var year = yearMap;
        var xFilteredYear = states.filter(states=>states.year==year);
        var filteredYear = xFilteredYear.filter(xFilteredYear=>xFilteredYear.state!='US');
        var states = filteredYear.map(state=>state.state);
        var stateNames = filteredYear.map(state=>state.state_name);
        var greenhouse_data = filteredYear.map(state=>state.greenhouse_emission);
        console.log(greenhouse_data);

        var mapData = [{
            type:'choropleth',
            locationmode:'USA-states',
            locations:states,
            z:greenhouse_data,
            text:stateNames,
            autocolorscale:true
        }];

        var mapLayout = {
            title:`${year} Greenhouse Emissions (per metric tons of CO2)`,
            plot_bgcolor:'rgb(215,215,215)',
            paper_bgcolor:'rgb(215,215,215)',
            geo:{
                bgcolor:'rgb(215,215,215)',
                scope:'usa',
                countrycolor:'rgb(255,255,255)',
                showland:true,
                landcolor:'rgb(255,255,255)',
                showlakes:true,
                lakecolor:'rgb(52,177,242)',
                subunitcolor:'rgb(255,255,255)',
                lonaxis:{},
                lataxis:{}
            }
        }
        Plotly.newPlot('chartChoro', mapData, mapLayout);
    })
};
