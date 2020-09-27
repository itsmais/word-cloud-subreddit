function makeACloud(){
    let wordsArray = [];
    var wordsDict = {};
    let subredditURL = document.getElementById("subreddit-url").value.toLowerCase();
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };
    let url = "https://www.reddit.com/r/"+subredditURL+".json";
    console.log(url);
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
        var jsonObj = JSON.parse(result);
        document.getElementById("cloud-result").innerHTML="";
        for (let i=0; i<jsonObj.data["children"].length; i++){
            let sentence = jsonObj.data["children"][i]["data"]["title"].split(" ");
            for (word in sentence){
                wordsArray.push(sentence[word]);
                wordsDict[sentence[word]] = 0;
            }
        }
        
        // count frequencies
        for (i in wordsArray){
            wordsDict[wordsArray[i]] ++;
        }

        document.getElementById("cloud-result").style.height="400px";
        var data = [];
        for(var key in wordsDict) {
            let line = [];
            line.push(key);
            line.push(wordsDict[key])
            data.push(line);
        }
        
        var chart = anychart.tagCloud(data);
        chart.angles([0])
        // enable a color range
        chart.colorRange(true);
        // set the color range length
        chart.colorRange().length('80%');
        // display the word cloud chart
        chart.container("cloud-result");
        chart.draw();
    })
    .catch(error => 
        {
            console.log('error', error)
        });
}

// to do: remove common words from the array
