const ctx = $('#myChart');

const qry_url = 'https://services2.arcgis.com/23RzpZFMLfrk9IGV/arcgis/rest/services/survey123_b52673fc83954384a0e558483a2a2d20/FeatureServer/0/query?where=OBJECTID+IS+NOT+NULL&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=purpose&returnHiddenFields=false&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=fiGwnG5BcEN16rF18DcbE-ZRL1Ccpu25cOHOBk3WNrgBqh2W52Sc0B7tUUlrOOFbM14860j3oBIWbOeqot-4RMsjYcbjujKMhh0BhZwKFAz1DWgaQMKjOW1Lsb05leFXerbvb59QInKKrWyvpfsRPh2BzYhmLLMDdb7PjLi4u9kxMGkpr5ds-88J-1ZA3uWjqlV6QezpLnUZASOyHCZyegDQNg032H9IXOBibxEtVnl9CunoIuvLgV8mSKLmAhxT'
$.get(qry_url, (data) => {
    let d = JSON.parse(data);

    let often = [];

    for (let i = 0; i < d.features.length; i++){
        often.push(d.features[i].attributes.purpose)
    };

    let reses = [] 

    for (let p = 0; p < often.length; p++){
        if (often[p] != null){
            let split_res = often[p].split(",")
            for (let s = 0; s < split_res.length; s++){
                reses.push(split_res[s])
            }
        }
        
    }
    
    let a = [], b = [], prev;

    reses.sort();
    for ( var i = 0; i < reses.length; i++ ) {
        if ( reses[i] !== prev ) {
            a.push(reses[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = reses[i];
    }

    console.log([a, b]);
    setTimeout(() => {
        const myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Exercise", "Recreation/Social", "To shopping/social activities", "To get to work or school", "Other", "To get to a transit station or bus stop",],
                datasets: [{
                    label: 'For what purposes do you use the trails in Jefferson County?',
                    data: [b[0],b[2],b[4],b[5],b[1],b[3]],
                    backgroundColor: [
                        'rgba(98, 125, 119, 1)',
                        'rgba(115, 150, 0, 1)',
                        'rgba(106, 64, 97, 1)',
                        'rgba(38, 63, 106, 1)',
                        'rgba(190, 214, 0, 1)',
                        'rgba(166, 71, 56, 1)'
                    ],
                    // borderColor: [
                    //     'rgba(255, 99, 132, 1)',
                    //     'rgba(54, 162, 235, 1)',
                    //     'rgba(255, 206, 86, 1)',
                    //     'rgba(75, 192, 192, 1)',
                    //     'rgba(153, 102, 255, 1)',
                    //     'rgba(255, 159, 64, 1)'
                    // ],
                    // borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }, 500)
    
});