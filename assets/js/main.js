function makeACloud(){
    let wordsArray = [];
    var wordsDict = {};
    let stop_words = ["the","and","a","an","with","to","for","of","in","on","at","this","i","or","is","you","your","my","when","what","how","that"];
    let subredditURL = document.getElementById("subreddit-url").value.toLowerCase();
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };
    let url = "https://www.reddit.com/r/"+subredditURL+".json?limit=100";
    console.log(url);
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
        var jsonObj = JSON.parse(result);
        document.getElementById("cloud-result").innerHTML="";
        for (let i=0; i<jsonObj.data["children"].length; i++){
            let sentence = jsonObj.data["children"][i]["data"]["title"].split(" ");
            for (word in sentence){
                if(stop_words.indexOf(sentence[word].toLowerCase()) ===  -1 && !sentence[word].match(/^[|\.,—\-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/)){
                    wordsArray.push(sentence[word]);
                    wordsDict[sentence[word]] = 0;
                }
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
