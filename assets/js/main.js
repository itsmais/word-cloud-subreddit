function makeACloud(){
    let wordsArray = [];
    var wordsDict = {};
    let stop_words = ["the","and","a","an","with","to","for","of","in","on","at","this","i","or","is","you","your","my","when","what","how","that"];
    let subredditURL = document.getElementById("subreddit-url").value.toLowerCase();
    if(subredditURL.length == 0){
        document.getElementById("error").style.display="block";
        document.getElementById("subreddit-url").classList.add("red-border");
        return;
    }
    document.getElementById("subreddit-url").classList.remove("red-border");
    document.getElementById("error").style.display="none";

    document.getElementById("cloud-result").style.display="none";
    document.getElementById("loader").style.display="block";
    
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
        if (document.getElementById("toggle").innerHTML == "⛅") {
          chart.background().fill("#fff")
        } else {
          chart.background().fill("rgb(24, 26, 27)")
        }
        chart.draw();
    }).then(() => {
        document.getElementById("loader").style.display="none";
        document.getElementById("cloud-result").style.display="block";
    })
    .catch(error =>
        {
            console.log('error', error)
        });
}

function lightsOut() {
  document.getElementById("toggle").innerHTML = "&#9729;&#65039";
  document.body.style.background = "rgb(24, 26, 27)";
  document.body.style.color = "rgb(209, 205, 199)";
  document.getElementById("subreddit-url").style.background = "rgb(24, 26, 27)";
  document.getElementById("subreddit-url").style.color = "rgb(158, 150, 137)";
  document.getElementById("cloud-result").style.background = "rgb(24, 26, 27)";

  try {
    var paths = document.querySelectorAll("path");
    paths[0].setAttribute("style", "fill:rgb(24, 26, 27)");
  } catch (error) {
    return;
  }
}

function lightsOn() {
  document.getElementById("toggle").innerHTML = "⛅";
  document.body.style.background = "#fff";
  document.body.style.color = "#000";
  document.getElementById("subreddit-url").style.background = "#fff";
  document.getElementById("subreddit-url").style.color = "#6c757d";

  try {
    var paths = document.querySelectorAll("path");
    paths[0].setAttribute("style", "fill:#fff"); 
  } catch (error) {
    return;
  }
}

document.getElementById("toggle").addEventListener("click", () => {
  if (document.getElementById("toggle").innerHTML == "⛅") {
    lightsOut();
  } else {
    lightsOn();
  }
});
